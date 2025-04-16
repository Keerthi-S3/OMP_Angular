import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { IProductDTO } from '../../model/class/interface/Products';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { take, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers : [UserService,ProductService]
})
export class HomeComponent implements OnInit, OnDestroy {
  userSpecificSubscriptions: IProductDTO[] = [];
  TopSubscribedProductList: IProductDTO[] = [];
  TopRatedProductsList: IProductDTO[] = [];
  isLoggedIn: boolean = false;
  loadingUserSubscriptions: boolean = false;
  userIdSubscription: Subscription | undefined;

  productService = inject(ProductService);
  userService = inject(UserService);

  ngOnInit(): void {
    this.subscribeToUserIdChanges();
    this.checkLoginStatusAndLoadData();
  }

  ngOnDestroy(): void {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }

  subscribeToUserIdChanges(): void {
    this.userIdSubscription = this.userService.watchUserId().subscribe(newUserId => {
      this.isLoggedIn = newUserId !== null;
      this.checkLoginStatusAndLoadData();
    });
  }

  checkLoginStatusAndLoadData(): void {
    this.isLoggedIn = this.userService.userId !== null;
    if (this.isLoggedIn) {
      this.loadUserSpecificSubscriptions();
      this.loadDefaultTopRated();
    } else {
      this.loadDefaultTopSubscribed();
      this.loadDefaultTopRated();
    }
  }

  loadUserSpecificSubscriptions(): void {
    const userId = this.userService.userId;
    if (userId !== null) {
      this.loadingUserSubscriptions = true;
      this.userService.getProductSubscriptionList(userId).pipe(take(1)).subscribe({
        next: (products: IProductDTO[]) => {
          this.userSpecificSubscriptions = products;
          console.log('User Subscriptions:', this.userSpecificSubscriptions);
          this.userSpecificSubscriptions.forEach((sub, index) => {
            console.log(`Subscription at index ${index}:`, sub);
            if (sub && sub.productid) {
              console.log(`ProductDTO for index ${index}:`, sub.productid);
            } else {
              console.log(`Subscription at index ${index} has missing productDTO!`);
            }
          });
        },
        error: (error) => {
          alert('Cannot load Your Subscribed Products');
          console.error(error);
        },
        complete: () => {
          this.loadingUserSubscriptions = false;
          console.log('Successfully loaded Your Subscribed Products completed');
        }
      });
    } else {
      this.userSpecificSubscriptions = []; // Clear previous user's data
    }
  }

  loadDefaultTopSubscribed(): void {
    this.productService.getTopSubscribedProducts().pipe(take(1)).subscribe({
      next: (products: IProductDTO[]) => {
        this.TopSubscribedProductList = products;
      },
      error: (error) => {
        alert('Cannot load Top Subscribed Products');
      },
      complete: () => {
        console.log('Successfully loaded Top Subscribed Products', this.TopSubscribedProductList);
      }
    });
  }

  loadDefaultTopRated(): void {
    this.productService.getTopRatedProducts().pipe(take(1)).subscribe({
      next: (products: IProductDTO[]) => {
        this.TopRatedProductsList = products;
      },
      error: (error) => {
        alert('Cannot load Top Rated Products');
      },
      complete: () => {
        console.log('Successfully loaded Top Rated Products', this.TopRatedProductsList);
      }
    });
  }
}
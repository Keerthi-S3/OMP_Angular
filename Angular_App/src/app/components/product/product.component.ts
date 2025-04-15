import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchfilterComponent } from "../searchfilter/searchfilter.component";
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../product.service';
//import { ProductDataService } from '../../productData.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, SearchfilterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy {

  public productList: any[] = [];
  private searchResults: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
    //private productDataService: ProductDataService
  ) { }

  ngOnInit(): void {
    console.log('ProductComponent initialized');
    this.productService.getProductList().subscribe(
      (response) => {
        this.productList = response; // Initially load all products
        console.log('Initial Products: ', this.productList);
      },
      (error) => {
        console.error('Error fetching initial products: ', error);
      }
    );

    // Subscribe to search results from the service
    this.searchResults = this.productService.searchResults$.subscribe(
      (results) => {
        this.productList = results; // Update productList with search results
        console.log('Search Results Received: ', this.productList);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.searchResults) {
      this.searchResults.unsubscribe();
    }
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }
}

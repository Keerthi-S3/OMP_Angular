import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { SubscribeProductComponent } from "../subscribe-product/subscribe-product.component";
import { AddReviewProductComponent } from '../add-review-product/add-review-product.component';
import { UserReviewComponent } from "../user-review/user-review.component";

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule, RouterOutlet, SubscribeProductComponent, AddReviewProductComponent, UserReviewComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  [x: string]: any;


  public product: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.http.get(`http://localhost:8090/OMP/viewProductDetails/${productId}`).subscribe(
        (product: any) => {
          this.product = product;
        },
        error => {

          this.product = null;
        }
      );
    } else {
      this.product = null;
    }
  }
}




import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-review-product',
  imports: [CommonModule],
  templateUrl: './add-review-product.component.html',
  styleUrl: './add-review-product.component.css'
})
export class AddReviewProductComponent {

  
isReviewVisible = false;
  username = 'JohnDoe'; // This should be retrieved from the database
  reviewDescription = '';
  rating = 0;
  stars = [1, 2, 3, 4, 5];

  showReviewPopup() {
    this.isReviewVisible = true;
  }

  closeReviewPopup() {
    this.isReviewVisible = false;
}


rate(value: number) {
      this.rating = value;
    }
  
    onSubmit() {
      alert('Review added');
    }
  


}

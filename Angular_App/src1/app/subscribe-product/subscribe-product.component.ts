import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-subscribe-product',
  imports: [CommonModule],
  templateUrl: './subscribe-product.component.html',
  styleUrl: './subscribe-product.component.css'
})
export class SubscribeProductComponent {


  isVisible = false;
  username = 'User123'; // This should be retrieved from the database
  subscribeStatus = false;

  showPopup() {
    this.isVisible = true;
  }

  closePopup() {
    this.isVisible = false;
  }

  onSubmit() {
    alert('Product subscribed!');
    this.closePopup();
  }


}

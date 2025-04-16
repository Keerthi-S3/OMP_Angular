import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from "./components/product/product.component";
import { SearchfilterComponent } from "./components/searchfilter/searchfilter.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
// import { HttpClientModule } from '@angular/common/http'; - deprecated

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule, CommonModule, ReactiveFormsModule, HomeComponent, ProductComponent, SearchfilterComponent, HeaderComponent, FooterComponent, FormsModule, ProductDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[ProductService]
})
export class AppComponent {
  title = 'Angular_App';
}

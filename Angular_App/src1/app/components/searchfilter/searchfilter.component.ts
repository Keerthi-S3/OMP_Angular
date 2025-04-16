import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Observable } from 'rxjs';
//import { ProductDataService } from '../../productData.service';

interface ProductView {
  productid: number;
  name: string;
  description: string;
  avg_rating: number;
  subscription_count: number;
}

@Component({
  selector: 'app-searchfilter',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './searchfilter.component.html',
  styleUrl: './searchfilter.component.css'
})
export class SearchfilterComponent {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    //private productDataService: ProductDataService
  ) {
    this.searchForm = this.fb.group({
      productName: [''],
      count: [''],
      rating: ['']
    });
  }

  onSubmit() {
    // const productName = this.searchForm.value.productName;
    // console.log('Searching for:', productName);

    const filters = this.searchForm.value;
    console.log(filters);

    let results$: Observable<ProductView[]> | undefined;

    if (filters.productName && !filters.rating && !filters.count) {
      results$ = this.productService.searchProductByName(filters.productName);
    } else if (!filters.productName && !filters.rating && filters.count) {
      results$ = this.productService.searchProductBySubsCount(filters.count);
    } else if (!filters.productName && filters.rating && !filters.count) {
      results$ = this.productService.searchProductByRating(filters.rating);
    } else if (!filters.productName && filters.rating && filters.count) {
      results$ = this.productService.searchProductBySubsCountAndRating(filters.count, filters.rating);
    } else if (filters.productName && !filters.rating && filters.count) {
      results$ = this.productService.searchProductByNameAndSubsCount(filters.productName, filters.count);
    } else if (filters.productName && filters.rating && !filters.count) {
      results$ = this.productService.searchProductByNameAndRating(filters.productName, filters.rating);
    } else if (filters.productName && filters.rating && filters.count) {
      results$ = this.productService.searchProductByNameSubsRating(filters.productName, filters.rating, filters.count);
    } else {
      results$ = this.productService.getProductList();
    }


    if(results$){
      results$?.subscribe(
        (results) => {
          console.log('Filtered Results:', results);
          this.productService.setSearchResults(results);
        },
        (error) => {
          console.error('Error during search:', error);
        }
      )
    } 
    // this.productService.searchProductByName(productName).subscribe(
    //   (res) => {
    //     const searchResults = res as ProductView[];
    //     console.log('Search API Response: ', searchResults);
    //     this.productService.setSearchResults(searchResults);
    //   },
    //   (err) => {
    //     console.error('Search API error: ', err);
    //   }
    //);
  }
}
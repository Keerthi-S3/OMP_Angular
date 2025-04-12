import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchfilterComponent } from "../searchfilter/searchfilter.component";
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, SearchfilterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  
  public productList:any=[];
  
  ngOnInit(): void {
    console.log('ProductComponent initialized');
    this.productService.getProductList().subscribe(response=>{
    this.productList=response;
    })
  }

  viewProductDetails(productId: string) {
      this.router.navigate(['/product-details', productId]);
    }
  

  constructor(private productService: ProductService, private router: Router){

  }

  // productList: any[]=[];

  // constructor(private http: HttpClient){
      
  // }

  // getProducts(){
  //   this.http.get("http://localhost:8090/OMP/viewAllProducts").subscribe((result:any)=>{
  //     this.productList=result;
  //   })
  // } 


}

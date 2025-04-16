import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface ProductView {
  productid: number;
  name: string;
  description: string;
  avg_rating: number;
  subscription_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private searchResultsSource = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSource.asObservable();
  
  setSearchResults(results: any[]) {
    this.searchResultsSource.next(results);
  }

  getProductList():Observable<any>{
    return this.http.get<[]>("http://localhost:8090/OMP/viewAllProducts");
  }

  searchProductByName(productName: string): Observable<ProductView[]>{
    return this.http.get<[]>(`http://localhost:8090/OMP/searchProductByName?productName=${productName}`);
  }

  searchProductBySubsCount(count: number) {
    return this.http.get<[]>(`http://localhost:8090/OMP/searchProductBySubsCount?count=${count}`);
  }

  searchProductByRating(rating: number) {
    return this.http.get<[]>(`http://localhost:8090/OMP/searchProductByRating?rating=${rating}`);
  }

  searchProductBySubsCountAndRating(count: number, rating: number) {
    return this.http.get<[]>(`http://localhost:8090/OMP/searchProductBySubsCountAndRating?count=${count}&rating=${rating}`);
  }
  
  searchProductByNameAndSubsCount(productName: string, count: number) {
    return this.http.get<[]>(`http://localhost:8090/OMP/searchProductByNameAndSubsCount?name=${productName}&count=${count}`);
  }

  searchProductByNameAndRating(productName: string, rating: number) {
    return this.http.get<[]>(`http://localhost:8090/OMP/searchProductByNameAndRating?name=${productName}&rating=${rating}`);
  }

  searchProductByNameSubsRating(productName: string, rating: number, count: number) {
    return this.http.get<[]>(`http://localhost:8090/OMP/searchProductByNameSubsRating?name=${productName}&rating=${rating}&count=${count}`);
  }
}

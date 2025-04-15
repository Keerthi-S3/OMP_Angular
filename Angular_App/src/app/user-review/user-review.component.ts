import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-review',
  imports: [CommonModule],
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.css'
})
export class UserReviewComponent {

  
reviews: any[] = [];
  isAdmin: boolean = true; // Set this based on your authentication logic

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    this.http.get<any[]>('https://localhost:8090/OMP/reviews/getReviews').subscribe(data => {
          this.reviews = data;
        });
    }
  
    exportToExcel(): void {
      // Implement your Excel export logic here
    }
  


}

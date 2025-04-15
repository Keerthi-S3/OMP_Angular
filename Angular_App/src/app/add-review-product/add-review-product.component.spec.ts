import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewProductComponent } from './add-review-product.component';

describe('AddReviewProductComponent', () => {
  let component: AddReviewProductComponent;
  let fixture: ComponentFixture<AddReviewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReviewProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReviewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

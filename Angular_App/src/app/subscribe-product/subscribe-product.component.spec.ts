import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeProductComponent } from './subscribe-product.component';

describe('SubscribeProductComponent', () => {
  let component: SubscribeProductComponent;
  let fixture: ComponentFixture<SubscribeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

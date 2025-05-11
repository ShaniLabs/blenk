import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BkButtonComponent } from './bk-button.component';

describe('NkButtonComponent', () => {
  let component: BkButtonComponent;
  let fixture: ComponentFixture<BkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BkButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

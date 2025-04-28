import { ComponentFixture, TestBed } from '@angular/core/testing';
import UserAdminFormLayoutComponent from './form-layout.component';

describe('NewUserFormLayoutComponent', () => {
  let component: UserAdminFormLayoutComponent;
  let fixture: ComponentFixture<UserAdminFormLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAdminFormLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAdminFormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

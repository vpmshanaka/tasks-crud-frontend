import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxRendererComponent } from './checkbox-renderer.component';

describe('CheckboxRendererComponent', () => {
  let component: CheckboxRendererComponent<any>;
  let fixture: ComponentFixture<CheckboxRendererComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxRendererComponent<any>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

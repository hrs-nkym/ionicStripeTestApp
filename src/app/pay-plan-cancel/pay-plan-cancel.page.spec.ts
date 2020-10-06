import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayPlanCancelPage } from './pay-plan-cancel.page';

describe('PayPlanCancelPage', () => {
  let component: PayPlanCancelPage;
  let fixture: ComponentFixture<PayPlanCancelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPlanCancelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayPlanCancelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

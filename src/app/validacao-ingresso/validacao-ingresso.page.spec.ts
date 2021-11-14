import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidacaoIngressoPage } from './validacao-ingresso.page';

describe('ValidacaoIngressoPage', () => {
  let component: ValidacaoIngressoPage;
  let fixture: ComponentFixture<ValidacaoIngressoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacaoIngressoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidacaoIngressoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

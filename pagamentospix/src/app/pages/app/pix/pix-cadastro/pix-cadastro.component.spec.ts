import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixCadastroComponent } from './pix-cadastro.component';

describe('PixCadastroComponent', () => {
  let component: PixCadastroComponent;
  let fixture: ComponentFixture<PixCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PixCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

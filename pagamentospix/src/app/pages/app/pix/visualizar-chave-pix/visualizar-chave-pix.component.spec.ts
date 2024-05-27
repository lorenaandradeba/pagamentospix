import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarChavePixComponent } from './visualizar-chave-pix.component';

describe('VisualizarChavePixComponent', () => {
  let component: VisualizarChavePixComponent;
  let fixture: ComponentFixture<VisualizarChavePixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarChavePixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarChavePixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIncidenciaComponent } from './update-incidencia.component';

describe('UpdateIncidenciaComponent', () => {
  let component: UpdateIncidenciaComponent;
  let fixture: ComponentFixture<UpdateIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateIncidenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

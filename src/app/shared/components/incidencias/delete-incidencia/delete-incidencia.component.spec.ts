import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIncidenciaComponent } from './delete-incidencia.component';

describe('DeleteIncidenciaComponent', () => {
  let component: DeleteIncidenciaComponent;
  let fixture: ComponentFixture<DeleteIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteIncidenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

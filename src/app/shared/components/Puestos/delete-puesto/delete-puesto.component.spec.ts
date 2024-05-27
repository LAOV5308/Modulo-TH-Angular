import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePuestoComponent } from './delete-puesto.component';

describe('DeletePuestoComponent', () => {
  let component: DeletePuestoComponent;
  let fixture: ComponentFixture<DeletePuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletePuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

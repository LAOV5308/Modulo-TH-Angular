import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePuestoComponent } from './update-puesto.component';

describe('UpdatePuestoComponent', () => {
  let component: UpdatePuestoComponent;
  let fixture: ComponentFixture<UpdatePuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuthorsComponent } from './create-authors.component';

describe('CreateAuthorsComponent', () => {
  let component: CreateAuthorsComponent;
  let fixture: ComponentFixture<CreateAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAuthorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

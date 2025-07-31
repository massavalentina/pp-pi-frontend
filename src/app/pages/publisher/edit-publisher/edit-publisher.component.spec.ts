import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPublisher } from './edit-publisher.component';

;

describe('EditPublisher', () => {
  let component: EditPublisher;
  let fixture: ComponentFixture<EditPublisher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPublisher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPublisher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

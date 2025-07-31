import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CreatePublisher, Publisher } from '../../models/publisher.model';
import { PublisherService } from '../../services/publisher/publisher.service';

@Component({
  selector: 'app-publisher-form-component',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './publisher-form-component.component.html',
  styleUrl: './publisher-form-component.component.css'
})
export class PublisherFormComponent {

  private readonly formBuildeer = inject(FormBuilder);

  @Input({required: true})
   title!: string

  @Input()
  model?: Publisher

  @Output()
   postForm = new EventEmitter<CreatePublisher>()

  ngOnInit(): void {
    if (this.model !== undefined){
      this.publisherForm.patchValue(this.model)
    }
  }

  publisherForm = this.formBuildeer.group({
     name: [''],
     country: [''],
     websiteUrl: [''],
     foundedAt: [''],
     isActive: [true],
     createdAt: [new Date()]
   });

  saveChanges(){
      let publisher = this.publisherForm.value as CreatePublisher;
      publisher.isActive = typeof publisher.isActive === 'string' ? publisher.isActive === true : !!publisher.isActive;
      this.postForm.emit(publisher)
     }

}



import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublisherService } from '../../../services/publisher/publisher.service';
import { CreatePublisher, Publisher } from '../../../models/publisher.model';
import { PublisherFormComponent } from '../../../components/publisher-form-component/publisher-form-component.component';

@Component({
  selector: 'app-edit-publisher',
  standalone: true,
  imports: [PublisherFormComponent],
  templateUrl: './edit-publisher.component.html',
  styleUrl: './edit-publisher.component.css'
})
export class EditPublisher implements OnInit {

  @Input({transform: numberAttribute})
  id!: number

  publisherService = inject(PublisherService);
  router = inject(Router);
  model?: Publisher;

  ngOnInit(): void {
    this.publisherService.getById(this.id).subscribe(publisher => {
      this.model = publisher;
    });
  }

  saveChanges(publisher: CreatePublisher){
    this.publisherService.updatePublisher(this.id, publisher).subscribe(() => {
      this.router.navigate(['/ruta1']);
    })
  }
}
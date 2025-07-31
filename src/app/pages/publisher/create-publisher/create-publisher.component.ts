import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { PublisherService } from '../../../services/publisher/publisher.service';
import { CreatePublisher } from '../../../models/publisher.model';
import { PublisherFormComponent } from '../../../components/publisher-form-component/publisher-form-component.component';

@Component({
  selector: 'app-create-publisher',
  standalone: true,
  imports: [PublisherFormComponent],
  templateUrl: './create-publisher.component.html',
  styleUrl: './create-publisher.component.css'
})
export class CreatePublisherComponent {

  router = inject(Router);
  publisherService = inject(PublisherService);

  saveChanges(publisher: CreatePublisher){
    this.publisherService.createPublisher(publisher).subscribe(() => {
      this.router.navigate(["/ruta1"]);
    });
  }

}

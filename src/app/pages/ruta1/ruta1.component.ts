import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PublisherService } from '../../services/publisher/publisher.service';
import { Publisher } from '../../models/publisher.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-ruta1',
  imports: [MatButtonModule, RouterLink, MatTableModule],
  templateUrl: './ruta1.component.html',
  styleUrl: './ruta1.component.css'
})
export class Ruta1Component {
  publisherService = inject(PublisherService);
  publishers?: Publisher[];
  tableColumns = ['nombre', 'acciones']

  constructor(){
    this.loadPublishers();
  }

  loadPublishers(){
    this.publisherService.getAllPublishers().subscribe(publishers => {
      this.publishers = publishers
    });
  }

  deletePublishers(id: number){
    this.publisherService.deletePublisher(id).subscribe(() => {
      this.loadPublishers();
    });
  }
}

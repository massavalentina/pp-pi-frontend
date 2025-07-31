import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PublisherService } from '../../../services/publisher/publisher.service';
import { Publisher } from '../../../models/publisher.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PublisherFormComponent } from '../../../components/publisher/publisher-form-component/publisher-form-component.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import Swal from 'sweetalert2'; 
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ruta1',
  imports: [
    CommonModule,
    MatIconModule, 
    MatMenuModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatTableModule
  ],
  templateUrl: './ruta1.component.html',
  styleUrls: ['./ruta1.component.css'], 
})

export class Ruta1Component {
  publisherService = inject(PublisherService);
  publishers = new MatTableDataSource<Publisher>(); 
  tableColumns = ['nombre', 'pais', 'fecha-fundacion','actividad', 'url', 'acciones'];
  dialog = inject(MatDialog);

  constructor() {
    this.loadPublishers();
  }

  loadPublishers() {
    this.publisherService.getAllPublishers().subscribe(
      (publishers) => {
        this.publishers.data = publishers || []; 
      },
      (error) => {
        console.error('Error al cargar editoriales:', error);
        this.publishers.data = []; 
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  }

  deletePublishers(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la editorial de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass:{
        confirmButton: 'btn-confirm',
        cancelButton: 'btn-cancel',
        title: 'swal2-title'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.publisherService.deletePublisher(id).subscribe(
          () => {
            this.loadPublishers();
            this.showSuccess('Editorial eliminada', 'La editorial se eliminó correctamente.');
          },
          (error) => {
            this.showError('Error al eliminar', 'No se pudo eliminar la editorial.');
          }
        );
      }
    });
  }

  openForm(publisher?: Publisher) {
    const dialogRef = this.dialog.open(PublisherFormComponent, {
      width: '600px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '150ms',
    });

    dialogRef.componentInstance.title = publisher 
      ? 'Editar editorial' 
      : 'Nueva editorial';
    dialogRef.componentInstance.model = publisher;

    dialogRef.componentInstance.postForm.subscribe((result) => {
      const obs = publisher
        ? this.publisherService.updatePublisher(publisher.id, result)
        : this.publisherService.createPublisher(result);

      Swal.fire({
        title: 'Cargando...',
        text: publisher ? 'Actualizando la editorial...' : 'Creando la editorial...',
        allowOutsideClick: false, 
        didOpen: () => {
          Swal.showLoading();
        },
      });

      obs.subscribe(
        () => {
          Swal.close();
          Swal.fire({
            title: publisher ? 'Editorial actualizada' : 'Editorial creada',
            text: publisher
              ? 'La editorial se actualizó correctamente.'
              : 'La editorial se creó correctamente.',
            icon: 'success',
          });
          this.loadPublishers();
        },
        (error) => {
          Swal.close();
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al procesar la solicitud.',
            icon: 'error',
          });
          console.error(error);
        }
      );
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Formulario cerrado');
    });
  }

  private showSuccess(title: string, message: string): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
    });
  }

  private showError(title: string, message: string): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
    });
  }
}
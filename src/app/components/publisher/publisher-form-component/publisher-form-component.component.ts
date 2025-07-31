import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CreatePublisher, Publisher } from '../../../models/publisher.model';
import { PublisherService } from '../../../services/publisher/publisher.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-publisher-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './publisher-form-component.component.html',
  styleUrl: './publisher-form-component.component.css',
})
export class PublisherFormComponent {
  dialogRef = inject(MatDialogRef<PublisherFormComponent>);
  formBuilder = inject(FormBuilder);

  @Input({ required: true }) title!: string;

  @Input() model?: Publisher;

  @Output() postForm = new EventEmitter<CreatePublisher>();

  publisherForm = this.formBuilder.group({
    name: [
      '', 
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    country: ['', [Validators.required, Validators.minLength(2)]],
    websiteUrl: [
      '', 
      [Validators.required, Validators.pattern('https?://.+')],
    ],
    foundedAt: [
      '', 
      [Validators.required, this.validateDateNotFuture()],
    ],
    isActive: [true],
    createdAt: [new Date()],
  });

  ngOnInit(): void {
    if (this.model !== undefined) {
      this.publisherForm.patchValue(this.model);
    }
  }

  saveChanges(): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: this.model ? 'Estás a punto de actualizar la editorial.' : 'Estás a punto de crear una nueva editorial.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: this.model ? 'Actualizar' : 'Crear',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'btn-confirm',
      cancelButton: 'btn-cancel',
      title: 'swal2-title'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      let publisher = this.publisherForm.value as CreatePublisher;
      publisher.isActive =
        typeof publisher.isActive === 'string'
          ? publisher.isActive === true
          : !!publisher.isActive;

      this.postForm.emit(publisher);
      this.dialogRef.close(); 
    }
  }).catch((err) => {
    Swal.fire({
      title: 'Error',
      text: 'Ocurrió un error al confirmar la acción.',
      icon: 'error',
    });
    console.error(err);
  });
}

  cancel() {
    this.dialogRef.close(); 
  }

  validateDateNotFuture() {
    return (control: AbstractControl) => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      if (selectedDate > today) {
        return { futureDate: 'La fecha no puede estar en el futuro.' };
      }
      return null;
    };
  }

  get controls() {
    return this.publisherForm.controls;
  }
}


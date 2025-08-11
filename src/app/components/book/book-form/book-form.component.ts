import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { IBook, IBookCreation } from '../../../models/books.model';
import { AuthorsService } from '../../../services/author/authors.service';
import { PublisherService } from '../../../services/publisher/publisher.service';
import { IAuthors } from '../../../models/authors.models';

@Component({
  selector: 'app-book-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {

  dialogRef = inject(MatDialogRef<BookFormComponent>);
  formBuilder = inject(FormBuilder);
  authorService = inject(AuthorsService);
  publisherService = inject(PublisherService);

  @Input({ required: true }) title!: string;
  @Input() model?: IBook;
  @Output() postForm = new EventEmitter<IBookCreation>();

  authors: (IAuthors & { fullName: string })[] = [];
  publishers: { id: number; name: string }[] = [];

  bookForm = this.formBuilder.group({
    title: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    authorId: [0, Validators.required],
    publisherId: [0, Validators.required],
    description: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(200)],
    ],
    publicationDate: [
      '',
      [Validators.required, this.validateDateNotFuture()],
    ],
    imageUrl: [
      '',
      [Validators.required, Validators.pattern('https?://.+')],
    ],
  });


  ngOnInit(): void {
    // Cargar selects
    this.loadAuthors();
    this.loadPublishers();

    // Si viene modelo (edición), cargar valores
    if (this.model) {
      const patchValue = {
        ...this.model,
        publicationDate:
          this.model.publicationDate instanceof Date
            ? this.model.publicationDate.toISOString().substring(0, 10)
            : this.model.publicationDate
      };
      this.bookForm.patchValue(patchValue);
    }
  }

  loadAuthors() {
  this.authorService.GetAll().subscribe({
    next: (data) => {
      this.authors = data.map(a => ({
        ...a,
        fullName: `${a.firstName} ${a.lastName}`
      }));
    },
    error: (err) => console.error('Error cargando autores', err)
  });
}

  loadPublishers() {
    this.publisherService.getAllPublishers().subscribe({
      next: (data) => (this.publishers = data),
      error: (err) => console.error('Error cargando editoriales', err)
    });
  }

  saveChanges(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: this.model
        ? 'Estás a punto de actualizar el libro.'
        : 'Estás a punto de crear un nuevo libro.',
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
        const formValue = this.bookForm.value;
        const book: IBookCreation = {
          title: formValue.title ?? '',
          authorId: formValue.authorId ?? 0,
          publisherId: formValue.publisherId ?? 0,
          description: formValue.description ?? '',
          publicationDate: formValue.publicationDate
            ? new Date(formValue.publicationDate)
            : new Date(),
          imageUrl: formValue.imageUrl ?? ''
        };

        this.postForm.emit(book);
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
    return this.bookForm.controls;
  }
}

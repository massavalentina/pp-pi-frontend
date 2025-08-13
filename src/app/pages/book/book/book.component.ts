import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { BookFormComponent } from '../../../components/book/book-form/book-form.component'
import { IBook } from '../../../models/books.model';
import { BooksService } from '../../../services/book/books.service';
import { BookListComponent } from '../../../components/book/book-list/book-list.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule,
    MatIconModule, 
    MatMenuModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatTableModule,
  BookListComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  bookService = inject(BooksService);
  books = new MatTableDataSource<IBook>(); 
  dialog = inject(MatDialog);

  constructor() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.GetAllBooks().subscribe(
      (books) => {
        this.books.data = books || []; 
      },
      (error) => {
        console.error('Error al cargar libros:', error);
        this.books.data = []; 
      }
    );
  }

  openForm(book?: IBook) {
      const dialogRef = this.dialog.open(BookFormComponent, {
        width: '600px',
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '150ms',
      });
  
      dialogRef.componentInstance.title = book 
        ? 'Editar libro' 
        : 'Nuevo libro';
      dialogRef.componentInstance.model = book;
  
      dialogRef.componentInstance.postForm.subscribe((result) => {
        const obs = book
          ? this.bookService.UpdateBook(book.id, result)
          : this.bookService.CreateBook(result);
  
        Swal.fire({
          title: 'Cargando...',
          text: book ? 'Actualizando libro...' : 'Creando libro...',
          allowOutsideClick: false, 
          didOpen: () => {
            Swal.showLoading();
          },
        });
  
        obs.subscribe(
          () => {
            Swal.close();
            Swal.fire({
              title: book ? 'libro actualizada' : 'libro creada',
              text: book
                ? 'La libro se actualizó correctamente.'
                : 'La libro se creó correctamente.',
              icon: 'success',
            });
            this.loadBooks();
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
  
    // private showSuccess(title: string, message: string): void {
    //   Swal.fire({
    //     title: title,
    //     text: message,
    //     icon: 'success',
    //   });
    // }
  
    // private showError(title: string, message: string): void {
    //   Swal.fire({
    //     title: title,
    //     text: message,
    //     icon: 'error',
    //   });
    // }

}

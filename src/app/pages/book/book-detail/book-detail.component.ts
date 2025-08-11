import { ActivatedRoute, Router } from "@angular/router";
import { IBook, IBookCreation } from "../../../models/books.model";
import { Component, inject, OnInit } from "@angular/core";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { BooksService } from "../../../services/book/books.service";
import { BookFormComponent } from "../../../components/book/book-form/book-form.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private bookService = inject(BooksService);

  book?: IBook;
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID inválido';
      this.loading = false;
      return;
    }

    this.bookService.GetBookById(id).subscribe({
      next: (data) => {
        this.book = data;
        this.loading = false;
        console.log(data);
      },
      error: () => {
        this.error = 'No se pudo cargar el libro';
        this.loading = false;
      }
    });
  }

    editBook() {
    if (!this.book) return;

    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '600px',
      data: {
        title: 'Editar Libro',
        model: this.book
      }
    });
    
  // Necesitamos pasar la data como Inputs manualmente
    const instance = dialogRef.componentInstance;
    instance.title = 'Editar Libro';
    instance.model = this.book;

    instance.postForm.subscribe((updatedBook: IBookCreation) => {
      if (!this.book) return;

      this.bookService.UpdateBook(this.book.id, updatedBook).subscribe({
        next: (updated) => {
          this.book = { ...this.book!, ...updatedBook }; // refrescar en pantalla
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    });
  }

  goBack() {
    this.router.navigate(['/books']);
  }
}

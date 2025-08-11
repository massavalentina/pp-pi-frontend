import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';  // <-- Importar NgFor explícitamente
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReviewFormComponent } from '../review-form/review-form.component';

import { BooksService } from '../../../services/book/books.service';
import { ReviewService } from '../../../services/review/review.service';
import { Router } from '@angular/router';
import { BookForSelect } from '../../../models/reviews.models';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [
    ReviewFormComponent,
    CommonModule,
    NgFor,  // <--- acá
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './create-review.component.html',
})
export class CreateReviewComponent implements OnInit {
  books: BookForSelect[] = [];
  selectedBook?: BookForSelect;

  private bookService = inject(BooksService);
  private reviewService = inject(ReviewService);
  private router = inject(Router);

  ngOnInit() {
    this.bookService.GetBooksForReviews().subscribe(books => {
      this.books = books;
    });
  }

  onBookSelected(bookId: number) {
    if (bookId === 0) {
      this.selectedBook = { id: 0, title: 'Libro no encontrado', authorName: '', publisherName: '' };
    } else {
      this.selectedBook = this.books.find(b => b.id === bookId);
    }
  }

  guardar(data: { comment: string; rating: number }) {
    if (!this.selectedBook || this.selectedBook.id === 0) {
      alert('Seleccioná un libro válido para crear la reseña');
      return;
    }

    const reviewPayload = {
      bookId: this.selectedBook.id,
      comment: data.comment,
      rating: data.rating
    };

    this.reviewService.crear(reviewPayload).subscribe(() => {
      alert('Reseña creada con éxito');
      this.router.navigate(['/reseñas']);
    });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Review } from '../../../models/reviews.models';
import { BookForSelect } from '../../../models/reviews.models';
import { BooksService } from '../../../services/book/books.service';
import { ReviewService } from '../../../services/review/review.service';
import { IBook } from '../../../models/books.model';

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class ReviewsListComponent implements OnInit {
  books: BookForSelect[] = [];
  selectedBook: BookForSelect | null = null;
  reviews: Review[] = [];
  columnasAMostrar = ['comentario', 'puntaje', 'acciones'];

  private booksService = inject(BooksService);
  private reviewsService = inject(ReviewService);

  ngOnInit(): void {
    this.booksService.GetAllBooks().subscribe((books: IBook[]) => {
      this.books = books.map(b => ({
        id: b.id,
        title: b.title,
        authorName: (b as any).authorName ?? '',
        publisherName: (b as any).publisherName ?? ''
      }));
    });
  }

  onBookSelected(bookId: number) {
    if (bookId === 0) {
      this.selectedBook = { id: 0, title: 'Libro no encontrado', authorName: '', publisherName: '' };
      this.reviews = [];
      return;
    }

    this.selectedBook = this.books.find(b => b.id === bookId) || null;

    if (this.selectedBook) {
      this.reviewsService.getReviewsByBook(bookId).subscribe(revs => {
        this.reviews = revs;
      });
    }
  }

  eliminarResena(id: number) {
    this.reviewsService.borrar(id).subscribe(() => {
      this.reviews = this.reviews.filter(r => r.id !== id);
    });
  }
}

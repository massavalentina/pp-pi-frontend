import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BooksService } from '../../../services/book/books.service';
import { BookForSelect } from '../../../models/reviews.models';
import { IBook } from '../../../models/books.model';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './books-list.component.html'
})
export class BooksListComponent implements OnInit {
  books: IBook[] = [];
  columnasAMostrar = ['Titulo', 'Autor', 'Editorial', 'Acciones'];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.GetAllBooks().subscribe(data => {
      this.books = data;
    });
  }
}

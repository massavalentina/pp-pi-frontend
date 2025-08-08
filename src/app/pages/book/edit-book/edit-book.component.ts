import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../../services/book/books.service';
import { IBook, IBookCreation } from '../../../models/books.model';

@Component({
  selector: 'app-edit-book',
  imports: [],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit {

  @Input({transform: numberAttribute})
  id!: number

  bookService = inject(BooksService);
  router = inject(Router);
  model?: IBook;

  ngOnInit(): void {
    this.bookService.GetBookById(this.id).subscribe(book => {
      this.model = book;
    });
  }

  saveChanges(book: IBookCreation){
    this.bookService.UpdateBook(this.id, book).subscribe(() => {
      this.router.navigate(['/book']);
    })
  }
}

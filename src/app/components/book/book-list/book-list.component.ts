import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IBook } from '../../../models/books.model';
import { BooksService } from '../../../services/book/books.service';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  constructor(private bookService:BooksService, private router: Router){}

  ngOnInit(): void {
    console.log("BookListComponent loaded");
    this.bookService.GetAllBooks().subscribe({
      next: (data) => {
        console.log("Received books: ", data);
        this.books = data;
        this.isLoading = false;
      },
      error: (err) => {console.error("Failed to get books: ", err)
        this.isLoading = false;
      }
    })}
    
  books: IBook[] = [];
  isLoading = true;

  goToDetail(bookId:number):void{
    this.router.navigate(['/book', bookId]);
  }
}

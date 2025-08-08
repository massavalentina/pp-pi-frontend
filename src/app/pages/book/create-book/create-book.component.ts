import { Component, inject} from '@angular/core';
import { BooksService } from '../../../services/book/books.service';
import { IBookCreation } from '../../../models/books.model';
import { BookFormComponent } from '../../../components/book/book-form/book-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-book',
  imports: [BookFormComponent],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})

export class CreateBookComponent {
    router = inject(Router);
  bookService = inject(BooksService);

  saveChanges(book: IBookCreation){
    this.bookService.CreateBook(book).subscribe(() => {
      this.router.navigate(["/book"]);
    });
  }
}

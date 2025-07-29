import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { AuthorsService } from '../../../authors.service';
import { IAuthorCreation, IAuthors } from '../authors.models';
import { AuthorFormComponent } from '../author-form/author-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-authors',
  imports: [AuthorFormComponent],
  templateUrl: './edit-authors.component.html',
  styleUrl: './edit-authors.component.css'
})
export class EditAuthorsComponent implements OnInit{
  
  @Input({transform:numberAttribute})
  id!:number

  authorService = inject(AuthorsService);
  authorToEdit?: IAuthors;
  router = inject(Router);

  ngOnInit(): void {
    this.authorService.GetById(this.id)
    .subscribe(author => {this.authorToEdit = author});
  }

  SaveChanges(author:IAuthorCreation){
    this.authorService.Update(this.id,author)
    .subscribe(()=> {this.router.navigate(['/ruta2']);})
  }
}


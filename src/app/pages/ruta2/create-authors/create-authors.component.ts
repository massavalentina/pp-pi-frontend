import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { Router, RouterLink } from '@angular/router';
import { AuthorsService } from '../../../services/author/authors.service';
import { IAuthorCreation } from '../../../models/authors.models';
import { AuthorFormComponent } from '../author-form/author-form.component';

@Component({
  selector: 'app-create-authors',
  standalone:true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, AuthorFormComponent],
  templateUrl: './create-authors.component.html',
  styleUrl: './create-authors.component.css'
})
export class CreateAuthorsComponent {

  authorService = inject(AuthorsService)
  router = inject(Router);

  SaveChanges(author:IAuthorCreation){
    this.authorService.Create(author).subscribe(()=>{
      this.router.navigate(["ruta2"])
    })
  }
}

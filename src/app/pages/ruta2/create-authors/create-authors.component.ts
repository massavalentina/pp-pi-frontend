import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { Router, RouterLink } from '@angular/router';
import { AuthorsService } from '../../../authors.service';
import { authorCreation } from '../authors.models';

@Component({
  selector: 'app-create-authors',
  standalone:true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './create-authors.component.html',
  styleUrl: './create-authors.component.css'
})
export class CreateAuthorsComponent {
  private readonly formBuilder = inject(FormBuilder)
  authorService = inject(AuthorsService)
  router = inject(Router)
  form = this.formBuilder.group({
    firstName: [''],
    lastName: ['']
  })

  saveChanges(){
    let author = this.form.value as authorCreation
    this.authorService.create(author).subscribe(()=>{
      this.router.navigate(["ruta2"])
    })
  }
}

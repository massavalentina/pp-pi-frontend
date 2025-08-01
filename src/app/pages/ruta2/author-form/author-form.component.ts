import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthorsService } from '../../../services/author/authors.service';
import { IAuthorCreation, IAuthors } from '../../../models/authors.models';

@Component({
  selector: 'app-author-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.css'
})
export class AuthorFormComponent implements OnInit{
  
  
  private readonly formBuilder = inject(FormBuilder)
    
    @Input({required:true})
    title!:string;
  
    @Input()
    author?:IAuthors;

    @Output()
    formPost = new EventEmitter<IAuthorCreation>();

    ngOnInit(): void {if (this.author!==undefined){
      this.form.patchValue(this.author);
    }}


    form = this.formBuilder.group({
      firstName: [''],
      lastName: ['']
    })

    SaveChanges(){
        let author = this.form.value as IAuthorCreation;
        this.formPost.emit(author)
      }
}

import { Component, inject } from '@angular/core';
import { MatButtonModule} from '@angular/material/button'
import { RouterLink } from '@angular/router';
import { AuthorsService } from '../../authors.service';
import { IAuthors } from './authors.models';
import { MatTableModule} from '@angular/material/table';
import { NgIf} from '@angular/common';


@Component({
  selector: 'app-ruta2',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule],
  templateUrl: './ruta2.component.html',
  styleUrls: ['./ruta2.component.css']
})

export class Ruta2Component {
  // Injects the Authors service, and addiotionally creates a list of authors
  authorService = inject(AuthorsService); 
  authors?: IAuthors[];

  // Columns to show in the material table
  columnsToShow = ['firstName', 'lastName', 'actions'];

  constructor(){this.LoadAuthors();}
    
  LoadAuthors(){
    this.authorService.GetAll()
    .subscribe(authors =>{this.authors = authors;})
  }

  Delete(id:number){
    this.authorService.Delete(id).subscribe(()=>{});
    this.LoadAuthors();
  }
  
}

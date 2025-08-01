import { Component, inject } from '@angular/core';
import { MatButtonModule} from '@angular/material/button'
import { RouterLink } from '@angular/router';
import { AuthorsService } from '../../services/author/authors.service';
import { IAuthors } from '../../models/authors.models';
import { MatTableModule} from '@angular/material/table';
import Swal from 'sweetalert2';



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

  Delete(id:number):void{
    Swal.fire({      
      title: '¿Desea eliminar el registro?', // Title for the alert
      text: 'Esta acción no se puede deshacer', // Text of the alert
      icon: 'warning', // The big icon - Warn
      showCancelButton: true, // Cancellation enabled
      confirmButtonText: 'Sí, deseo eliminar el registro', // Confirmation button
      cancelButtonText: 'Cancelar' // Cancellation button
    })
    
    .then((result)=>{ 
      if (result.isConfirmed) // Executes if the user confirm the deletion
        {this.authorService.Delete(id).subscribe(()=>{ // Executes the deletion
          Swal.fire({
            icon: 'success', // The big icon - Success
            title: 'Registro eliminado', // The message
            text: 'El registro fue eliminado correctamente.',
            timer: 5000,
            showConfirmButton: false
              
          });
          this.LoadAuthors(); // Load the table of authors again
        })}})}}

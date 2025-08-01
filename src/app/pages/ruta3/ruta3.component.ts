import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { ReviewService } from '../../services/review/review.service';
import { Review } from '../../models/reviews.models';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-ruta3',
  standalone: true,
  imports: [MatButtonModule, RouterLink, RouterModule, MatTableModule],
  templateUrl: './ruta3.component.html',
  styleUrl: './ruta3.component.css'
})

export class Ruta3Component {
  reviewService = inject(ReviewService);
  reviews?: Review[];
  colummasAMostrar = ['Comentario', 'Puntaje', 'Acciones']

  constructor(){
    this.cargarProductos();
  }

  cargarProductos(){
    this.reviewService.obtenerTodos().subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  borrar(id: number){
    this.reviewService.borrar(id).subscribe(() => {
      this.cargarProductos();
    })
  }
}

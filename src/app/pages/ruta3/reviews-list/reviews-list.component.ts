import { Component, OnInit } from '@angular/core';
import { Review } from '../../../models/reviews.models'; // tu modelo de reseña
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../../services/review/review.service';
import { CommonModule } from '@angular/common'; // para *ngIf, *ngFor, etc
import { MatTableModule } from '@angular/material/table'; // para mat-table
import { MatButtonModule } from '@angular/material/button'; // para botones de material
import { RouterModule } from '@angular/router'; // para routerLink


@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css'],
   imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class ReviewsListComponent implements OnInit {
  reviews: Review[] = [];
  columnasAMostrar = ['titulo', 'comentario', 'puntaje', 'acciones'];

  constructor(
    private reviewsService: ReviewService,
    private route: ActivatedRoute
  ) {}

   eliminarResena(id: number) {  // sin ñ
    this.reviewsService.borrar(id).subscribe(() => {
      this.reviews = this.reviews.filter(r => r.id !== id);
    });
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id'); // ID del libro
    if (bookId) {
      this.reviewsService.obtenerPorLibro(+bookId).subscribe(data => {
        this.reviews = data;
      });
    }
  }
}


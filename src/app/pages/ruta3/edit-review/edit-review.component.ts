import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreationReview, Review } from '../../../models/reviews.models';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { ReviewService } from '../../../services/review/review.service';

@Component({
  selector: 'app-edit-review',
  standalone: true,
  imports: [ReviewFormComponent],
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {
  id!: number;
  comment: string = '';
  rating: number = 1;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewService.obtenerPorId(this.id).subscribe((review: Review) => {
      this.comment = review.Comentario;
      this.rating = review.Puntaje;
    });
  }

  guardar(data: { comment: string; rating: number }) {
    const review: CreationReview = {
      Comment: data.comment,
      Rating: data.rating
    };

    this.reviewService.actualizar(this.id, review).subscribe(() => {
      this.router.navigate(['/ruta3']);
    });
  }
}



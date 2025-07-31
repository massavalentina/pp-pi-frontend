import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from '../review.service';
import { CreationReview } from '../reviews.models';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [ReviewFormComponent],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent {
  constructor(private router: Router, private reviewService: ReviewService) {}

  guardar(data: { comment: string; rating: number }) {
    const review: CreationReview = {
      Comment: data.comment,
      Rating: data.rating
    };

    this.reviewService.crear(review).subscribe(() => {
      this.router.navigate(['/ruta3']);
    });
  }
}

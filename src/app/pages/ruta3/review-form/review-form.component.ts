import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-form',
  standalone: true,
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ],
})
export class ReviewFormComponent implements OnChanges {
  @Input() titulo: string = 'Formulario de Reseña';
  @Input() comment: string = '';
  @Input() rating: number = 1;

  @Output() postForm = new EventEmitter<{ comment: string; rating: number }>();

  form: FormGroup;
  rates: number[] = [1, 2, 3, 4, 5];

  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      comment: [this.comment],
      rating: [this.rating],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['comment'] && !changes['comment'].firstChange) {
      this.form.get('comment')?.setValue(this.comment);
    }
    if (changes['rating'] && !changes['rating'].firstChange) {
      this.form.get('rating')?.setValue(this.rating);
    }
  }

  guardarCambios(): void {
    if (this.form.valid) {
      this.postForm.emit(this.form.value);
    }
  }

  cancelar(): void {
    this.router.navigate(['/reseñas']); // Ruta principal
  }
}


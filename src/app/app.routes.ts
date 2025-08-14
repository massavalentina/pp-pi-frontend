import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Ruta1Component } from './pages/publisher/ruta1/ruta1.component';
import { Ruta2Component } from './pages/ruta2/ruta2.component';
import { Ruta3Component } from './pages/ruta3/ruta3.component';
import { CreateAuthorsComponent } from './pages/ruta2/create-authors/create-authors.component';
import { EditAuthorsComponent } from './pages/ruta2/edit-authors/edit-authors.component';
import { CreateReviewComponent } from './pages/ruta3/create-review/create-review.component';
import { AppComponent } from './app.component';
import { EditReviewComponent } from './pages/ruta3/edit-review/edit-review.component';
import { CreatePublisherComponent } from './pages/publisher/create-publisher/create-publisher.component';
import { EditPublisher } from './pages/publisher/edit-publisher/edit-publisher.component';
import { BookComponent } from './pages/book/book/book.component';
import { BookDetailComponent } from './pages/book/book-detail/book-detail.component';
import { ReportingComponent } from './pages/reporting/reporting.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ruta1', component: Ruta1Component },
  { path: 'ruta1/create-publisher', component: CreatePublisherComponent },
  { path: 'ruta1/edit-publisher/:id', component: EditPublisher},
  { path: 'ruta2', component: Ruta2Component },
  { path: 'ruta2/createAuthor', component: CreateAuthorsComponent },
  { path: 'ruta2/editAuthor/:id', component: EditAuthorsComponent },
  { path: 'ruta3', component: Ruta3Component },
  { path: 'ruta3/crear', component: CreateReviewComponent},
  { path: 'ruta3/editar/:id', component: EditReviewComponent},
  { path: 'book', component: BookComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'reporting', component: ReportingComponent },

];

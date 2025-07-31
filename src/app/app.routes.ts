import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Ruta1Component } from './pages/publisher/ruta1/ruta1.component';
import { Ruta2Component } from './pages/ruta2/ruta2.component';
import { Ruta3Component } from './pages/ruta3/ruta3.component';
import { AppComponent } from './app.component';
import { CreatePublisherComponent } from './pages/publisher/create-publisher/create-publisher.component';
import { EditPublisher } from './pages/publisher/edit-publisher/edit-publisher.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ruta1', component: Ruta1Component },
  { path: 'ruta1/create-publisher', component: CreatePublisherComponent },
  { path: 'ruta1/edit-publisher/:id', component: EditPublisher},
  { path: 'ruta2', component: Ruta2Component },
  { path: 'ruta3', component: Ruta3Component }
];

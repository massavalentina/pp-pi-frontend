import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Ruta1Component } from './pages/ruta1/ruta1.component';
import { Ruta2Component } from './pages/ruta2/ruta2.component';
import { Ruta3Component } from './pages/ruta3/ruta3.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'ruta1', component: Ruta1Component },
  { path: 'ruta2', component: Ruta2Component },
  { path: 'ruta3', component: Ruta3Component },
];

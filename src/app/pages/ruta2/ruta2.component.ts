import { Component } from '@angular/core';
import { MatButtonModule} from '@angular/material/button'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ruta2',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './ruta2.component.html',
  styleUrls: ['./ruta2.component.css']
})
export class Ruta2Component {

}

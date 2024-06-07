import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ServiceService } from './Service/service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'assigment';
 
}

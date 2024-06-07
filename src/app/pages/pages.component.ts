import { Component } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css',
})
export class PagesComponent {
  constructor(private service: ServiceService, private router: Router,private toastr: ToastrService) {}
  logout() {
    this.service.logout('').subscribe((res:any) => {
      sessionStorage.clear();
      this.toastr.success(res.status);

      this.router.navigate(['/']);
    });
  }
}

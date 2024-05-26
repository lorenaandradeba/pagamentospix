import { Component } from '@angular/core';
import { Router, RouterEvent,  } from '@angular/router';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  constructor(private router: Router) {}

  navegateToLogin() {
    this.router.navigate(['login']);
  }

  navegateToRegister() {
    this.router.navigate(['register']);
  }
}

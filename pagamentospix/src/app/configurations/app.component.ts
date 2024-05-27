import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PixComponent } from '../pages/app/pix/pix.component';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../pages/app/sidenav/sidenav.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AppComponent, PixComponent, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pagamentospix';
}

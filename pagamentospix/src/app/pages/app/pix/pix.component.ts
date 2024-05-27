import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-pix',
  standalone: true,
  imports: [CommonModule, SidenavComponent, RouterOutlet
  ],
  templateUrl: './pix.component.html',
  styleUrl: './pix.component.css'
})
export class PixComponent {

}

import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-pix',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidenavComponent, HomeComponent, RouterOutlet
  ],
  templateUrl: './pix.component.html',
  styleUrl: './pix.component.css'
})
export class PixComponent {

}

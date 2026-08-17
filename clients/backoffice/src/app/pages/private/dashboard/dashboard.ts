// Angular Imports
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Components
import { Sidebar } from '@components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}

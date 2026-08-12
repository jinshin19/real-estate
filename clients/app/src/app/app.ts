// Angular Imports
import { RouterOutlet } from '@angular/router';
import { Component, signal } from '@angular/core';
// Components
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('app');
}

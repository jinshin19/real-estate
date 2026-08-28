// Angular Imports
import { RouterOutlet } from '@angular/router';
import { Component, signal } from '@angular/core';
// Libs
import { HlmToaster } from '@libs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmToaster],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('backoffice');
}

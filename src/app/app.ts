import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent],
  template: `<app-main-layout></app-main-layout>`,
  styles: [] // Using global styles mostly
})
export class App {
  // Logic moved to EditorState and Feature Components
}

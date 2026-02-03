import { Component, inject } from '@angular/core';
import { EditorState } from '../../state/editor.state';

@Component({
  selector: 'app-activity-bar',
  standalone: true,
  template: `
    <aside class="activity-bar">
      <div 
        class="icon" 
        [class.active]="editorState.isSidebarVisible()"
        (click)="editorState.toggleSidebar()">
        <i class="pi pi-copy" style="font-size: 1.5rem"></i>
      </div>
      <div class="icon">
        <i class="pi pi-search" style="font-size: 1.5rem"></i>
      </div>
      <div class="icon">
        <i class="pi pi-sitemap" style="font-size: 1.5rem"></i>
      </div>
      <div class="spacer"></div>
      <div class="icon">
        <i class="pi pi-user" style="font-size: 1.5rem"></i>
      </div>
      <div class="icon">
        <i class="pi pi-cog" style="font-size: 1.5rem;"></i>
      </div>
    </aside>
  `,
  styles: [`
    .activity-bar {
      width: 50px;
      background-color: var(--vscode-activity-bar-bg);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10px;
      height: 100%;
    }
    
    .icon {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #6a6a6a;
      border-left: 2px solid transparent;
      transition: color 0.2s ease;
    }
    
    @media (hover: hover) {
      .icon:hover {
        color: var(--vscode-text);
      }
    }
    
    .icon.active {
      color: var(--vscode-text);
      border-left-color: var(--vscode-text);
    }

    .spacer {
      margin-top: auto;
    }

    i {
      font-size: 1.5rem;
    }

    /* Empujo la configuración al fondo */
    .icon:last-child {
      margin-bottom: 10px;
    }

    @media (max-width: 768px) {
      .activity-bar {
        flex-direction: row;
        width: 100%;
        height: 48px;
        padding-top: 0;
        justify-content: space-around;
      }

      .icon {
        width: 48px;
        height: 48px;
        border-left: none;
        border-bottom: 2px solid transparent;
      }

      .icon.active {
        border-bottom-color: var(--vscode-text);
      }

      .spacer {
        display: none;
      }

      .icon:last-child {
        margin-bottom: 0;
      }
    }
  `]
})
export class ActivityBarComponent {
  editorState = inject(EditorState);
}

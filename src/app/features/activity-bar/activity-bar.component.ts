import { Component, inject } from '@angular/core';
import { EditorState } from '../../state/editor.state';

@Component({
  selector: 'app-activity-bar',
  standalone: true,
  template: `
    <aside class="activity-bar">
      <div 
        class="icon" 
        [class.active]="editorState.isSidebarVisible() && editorState.activeSidebarTab() === 'explorer'"
        (click)="editorState.setActiveSidebarTab('explorer')"
        title="Explorador">
        <i class="pi pi-copy"></i>
      </div>
      <div 
        class="icon" 
        [class.active]="editorState.isSidebarVisible() && editorState.activeSidebarTab() === 'search'"
        (click)="editorState.setActiveSidebarTab('search')"
        title="Buscar">
        <i class="pi pi-search"></i>
      </div>
      <div 
        class="icon" 
        [class.active]="editorState.isSidebarVisible() && editorState.activeSidebarTab() === 'source-control'"
        (click)="editorState.setActiveSidebarTab('source-control')"
        title="Control de código fuente">
        <i class="pi pi-sitemap"></i>
      </div>
      <div 
        class="icon" 
        [class.active]="editorState.isSidebarVisible() && editorState.activeSidebarTab() === 'extensions'"
        (click)="editorState.setActiveSidebarTab('extensions')"
        title="Extensiones">
        <i class="pi pi-th-large"></i>
      </div>
      
      <div class="spacer"></div>

      <div 
        class="icon" 
        [class.active]="editorState.isSidebarVisible() && editorState.activeSidebarTab() === 'user'"
        (click)="editorState.setActiveSidebarTab('user')"
        title="Perfil">
        <i class="pi pi-user"></i>
      </div>
      <div 
        class="icon" 
        [class.active]="editorState.isSidebarVisible() && editorState.activeSidebarTab() === 'settings'"
        (click)="editorState.setActiveSidebarTab('settings')"
        title="Configuración">
        <i class="pi pi-cog"></i>
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

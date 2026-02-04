import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityBarComponent } from '../features/activity-bar/activity-bar.component';
import { ExplorerComponent } from '../features/explorer/explorer.component';
import { EditorTabsComponent } from '../features/editor-tabs/editor-tabs.component';
import { CodeEditorComponent } from '../features/code-editor/code-editor.component';
import { StatusBarComponent } from './status-bar.component';
import { EditorState } from '../state/editor.state';
import { SearchComponent } from '../features/sidebar-views/search.component';
import { SourceControlComponent } from '../features/sidebar-views/source-control.component';
import { UserProfileComponent } from '../features/sidebar-views/user-profile.component';
import { SettingsComponent } from '../features/sidebar-views/settings.component';
import { ExtensionsComponent } from '../features/sidebar-views/extensions.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    ActivityBarComponent,
    ExplorerComponent,
    EditorTabsComponent,
    CodeEditorComponent,
    StatusBarComponent,
    SearchComponent,
    SourceControlComponent,
    UserProfileComponent,
    SettingsComponent,
    ExtensionsComponent
  ],
  template: `
    <div class="main-container" [class.sidebar-hidden]="!editorState.isSidebarVisible()">
      <div class="activity-bar-area">
        <app-activity-bar></app-activity-bar>
      </div>
      
      <div 
        class="sidebar-area" 
        [class.visible]="editorState.isSidebarVisible()">
        @switch (editorState.activeSidebarTab()) {
          @case ('explorer') { <app-explorer></app-explorer> }
          @case ('search') { <app-search></app-search> }
          @case ('source-control') { <app-source-control></app-source-control> }
          @case ('user') { <app-user-profile></app-user-profile> }
          @case ('settings') { <app-settings></app-settings> }
          @case ('extensions') { <app-extensions></app-extensions> }
        }
      </div>

      <!-- Backdrop for mobile -->
      <div 
        class="sidebar-backdrop" 
        [class.active]="editorState.isSidebarVisible()"
        (click)="editorState.setSidebarVisibility(false)">
      </div>
      
      <div class="editor-area">
        <app-editor-tabs></app-editor-tabs>
        <div class="code-container">
          <app-code-editor></app-code-editor>
        </div>
      </div>
      
      <div class="status-bar-area">
        <app-status-bar></app-status-bar>
      </div>
    </div>
  `,
  styles: [`
    .main-container {
      display: grid;
      grid-template-columns: 50px 250px 1fr;
      grid-template-rows: 1fr 22px;
      grid-template-areas: 
        "activity sidebar editor"
        "status status status";
      height: 100%;
      width: 100%;
      background-color: var(--vscode-bg);
      color: var(--vscode-text);
      overflow: hidden;
      overflow-x: hidden;
      transition: grid-template-columns 0.2s ease;
    }

    .main-container.sidebar-hidden {
      grid-template-columns: 50px 0px 1fr;
    }

    .activity-bar-area {
      grid-area: activity;
      border-right: 1px solid var(--vscode-border);
      z-index: 30;
    }

    .sidebar-area {
      grid-area: sidebar;
      background-color: var(--vscode-sidebar-bg);
      overflow: hidden;
      z-index: 20;
    }

    .editor-area {
      grid-area: editor;
      display: flex;
      flex-direction: column;
      background-color: var(--vscode-editor-bg);
      overflow: hidden;
    }

    .code-container {
      flex: 1;
      overflow: auto;
    }

    .status-bar-area {
      grid-area: status;
      z-index: 40;
      padding-bottom: env(safe-area-inset-bottom);
      background-color: var(--vscode-status-bar-bg);
    }

    .sidebar-backdrop {
      display: none;
    }

    /* Ajustes para móviles */
    @media (max-width: 768px) {
      .main-container {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 48px auto;
        grid-template-areas: 
          "editor"
          "activity"
          "status";
      }

      .main-container.sidebar-hidden {
        grid-template-columns: 1fr;
      }

      .activity-bar-area {
        border-right: none;
        border-top: 1px solid var(--vscode-border);
      }

      .sidebar-area {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 70px; /* Por encima de activity bar + status bar */
        width: 250px;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        box-shadow: 2px 0 10px rgba(0,0,0,0.5);
      }

      .sidebar-area.visible {
        transform: translateX(0);
      }

      .sidebar-backdrop {
        display: block;
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 15;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }

      .sidebar-backdrop.active {
        opacity: 1;
        pointer-events: auto;
      }
    }
  `]
})
export class MainLayoutComponent {
  editorState = inject(EditorState);
}

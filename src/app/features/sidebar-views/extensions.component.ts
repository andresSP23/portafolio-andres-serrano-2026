import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-extensions',
    standalone: true,
    imports: [CommonModule],
    template: `
    <aside class="sidebar-view">
      <div class="sidebar-header">
        <span>EXTENSIONES</span>
      </div>
      
      <div class="sidebar-content">
        <div class="extension-item">
          <div class="extension-icon">
            <i class="pi pi-bolt" style="color: #f1c40f"></i>
          </div>
          <div class="extension-details">
            <span class="ext-name">Angular Language Service</span>
            <span class="ext-desc">Soporte rico para plantillas Angular.</span>
            <span class="ext-author">Angular</span>
          </div>
        </div>

        <div class="extension-item">
          <div class="extension-icon">
            <i class="pi pi-code" style="color: #3498db"></i>
          </div>
          <div class="extension-details">
            <span class="ext-name">ESLint</span>
            <span class="ext-desc">Integración de ESLint en VS Code.</span>
            <span class="ext-author">Microsoft</span>
          </div>
        </div>

        <div class="extension-item">
          <div class="extension-icon">
            <i class="pi pi-palette" style="color: #e74c3c"></i>
          </div>
          <div class="extension-details">
            <span class="ext-name">Prettier - Code formatter</span>
            <span class="ext-desc">Formateador de código obstinado.</span>
            <span class="ext-author">Prettier</span>
          </div>
        </div>
      </div>
    </aside>
  `,
    styles: [`
    .sidebar-view {
      background-color: var(--vscode-sidebar-bg);
      height: 100%;
      color: var(--vscode-text);
      font-size: 13px;
    }

    .sidebar-header {
      padding: 10px 20px;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .sidebar-content {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .extension-item {
      display: flex;
      gap: 10px;
      padding: 5px;
      cursor: pointer;
    }

    .extension-item:hover {
      background-color: var(--vscode-hover);
    }

    .extension-icon {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #252526;
      border: 1px solid var(--vscode-border);
      flex-shrink: 0;
    }

    .extension-details {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .ext-name {
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .ext-desc {
      font-size: 11px;
      color: #888;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .ext-author {
      font-size: 10px;
      color: #007acc;
    }
  `]
})
export class ExtensionsComponent { }

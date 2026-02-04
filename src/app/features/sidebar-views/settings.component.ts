import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule],
    template: `
    <aside class="sidebar-view">
      <div class="sidebar-header">
        <span>CONFIGURACIÓN</span>
      </div>
      
      <div class="sidebar-content">
        <div class="settings-group">
          <div class="group-title">Personalización</div>
          <div class="setting-item">
            <span>Tema de color</span>
            <select class="setting-select">
              <option>VS Code Dark+</option>
              <option>Solarized Light</option>
              <option>Monokai</option>
            </select>
          </div>
          <div class="setting-item">
            <span>Fuente del editor</span>
            <input type="text" value="'Cascadia Code', Consolas" class="setting-input">
          </div>
        </div>

        <div class="settings-group">
          <div class="group-title">Editor</div>
          <div class="setting-item">
            <span>Auto-save</span>
            <input type="checkbox" checked>
          </div>
          <div class="setting-item">
            <span>Mini-map</span>
            <input type="checkbox" checked>
          </div>
        </div>

        <div class="settings-group">
          <div class="group-title">Idioma</div>
          <div class="setting-item">
            <span>Interfaz</span>
            <select class="setting-select">
              <option>Español</option>
              <option>English</option>
            </select>
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
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .group-title {
      font-weight: bold;
      color: #007acc;
      margin-bottom: 10px;
      font-size: 12px;
      text-transform: uppercase;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .setting-select, .setting-input {
      background-color: var(--vscode-input-bg, #3c3c3c);
      border: 1px solid var(--vscode-border);
      color: white;
      padding: 2px 5px;
      font-size: 12px;
      outline: none;
    }

    .setting-input {
      width: 120px;
    }

    input[type="checkbox"] {
      cursor: pointer;
    }
  `]
})
export class SettingsComponent { }

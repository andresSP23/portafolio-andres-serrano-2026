import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-source-control',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="sidebar-view">
      <div class="sidebar-header">
        <span>CONTROL DE CÓDIGO FUENTE</span>
      </div>
      
      <div class="sidebar-content">
        @if (!showSuccess()) {
          <div class="source-control-item">
            <div class="item-header">
              <i class="pi pi-check" style="font-size: 1rem"></i>
              <span>CAMBIOS</span>
            </div>
            <div class="changes-list">
              <div class="change-entry">
                <i class="pi pi-file text-blue-400"></i>
                <span class="file-name">proyectos.ts</span>
                <span class="change-type" style="color: #4ec9b0">M</span>
              </div>
              <div class="change-entry">
                <i class="pi pi-file text-orange-400"></i>
                <span class="file-name">habilidades.html</span>
                <span class="change-type" style="color: #ce9178">U</span>
              </div>
            </div>
          </div>

          <div class="status-msg">
            Tu código está al día con la rama principal.
          </div>
          
          <div class="commit-section">
            <input type="text" placeholder="Mensaje de commit..." class="commit-input">
            <button class="commit-btn" (click)="onCommit()">Confirmar y sincronizar</button>
          </div>
        } @else {
          <div class="success-container">
            <div class="success-icon">
              <i class="pi pi-check-circle" style="font-size: 3rem; color: #4ec9b0"></i>
            </div>
            <h3>¡Sincronización Exitosa!</h3>
            <p>Tus cambios han sido confirmados y subidos a GitHub.</p>
            <button class="done-btn" (click)="showSuccess.set(false)">Volver</button>
          </div>
        }
      </div>
    </aside>
  `,
  styles: [`
    .sidebar-view {
      background-color: var(--vscode-sidebar-bg);
      height: 100%;
      color: var(--vscode-text);
      font-size: 13px;
      display: flex;
      flex-direction: column;
    }

    .sidebar-header {
      padding: 10px 20px;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .sidebar-content {
      padding: 10px;
    }

    .item-header {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .changes-list {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .change-entry {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 5px;
    }

    .change-type {
      margin-left: auto;
      font-weight: bold;
      font-size: 11px;
    }

    .status-msg {
      margin-top: 20px;
      padding: 10px;
      color: #888;
      text-align: center;
      border-top: 1px solid var(--vscode-border);
    }

    .commit-section {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .commit-input {
      background-color: var(--vscode-input-bg, #3c3c3c);
      border: 1px solid var(--vscode-border);
      color: white;
      padding: 5px;
      font-size: 12px;
      outline: none;
    }

    .commit-btn {
      background-color: #007acc;
      color: white;
      border: none;
      padding: 6px;
      cursor: pointer;
      font-weight: bold;
    }

    .commit-btn:hover {
      background-color: #0062a3;
    }

    .success-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 20px;
      gap: 15px;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .success-container h3 {
      margin: 0;
      color: #4ec9b0;
    }

    .success-container p {
      color: #888;
      font-size: 12px;
    }

    .done-btn {
      background-color: transparent;
      border: 1px solid #007acc;
      color: #007acc;
      padding: 5px 15px;
      cursor: pointer;
      font-size: 12px;
      margin-top: 10px;
    }

    .done-btn:hover {
      background-color: rgba(0, 122, 204, 0.1);
    }
  `]
})
export class SourceControlComponent {
  showSuccess = signal(false);

  onCommit() {
    this.showSuccess.set(true);
    // Podríamos añadir un timeout para que se quite solo, pero dejar el botón de volver es más VS Code
  }
}

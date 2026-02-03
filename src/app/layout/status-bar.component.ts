import { Component } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  standalone: true,
  template: `
    <footer class="status-bar">
      <div class="left-section">
        <div class="item"><i class="pi pi-code-branch"></i> main</div>
        <div class="item"><i class="pi pi-sync"></i> 0</div>
        <div class="item error"><i class="pi pi-times-circle"></i> 0</div>
        <div class="item warning"><i class="pi pi-exclamation-triangle"></i> 0</div>
      </div>
      
      <div class="right-section hide-mobile">
        <div class="item">Ln 10, Col 4</div>
        <div class="item">UTF-8</div>
        <div class="item">TypeScript</div>
        <div class="item"><i class="pi pi-check"></i> Prettier</div>
      </div>
      <div class="feedback-section">
        <div class="item feedback"><i class="pi pi-bell"></i></div>
      </div>
    </footer>
  `,
  styles: [`
    .status-bar {
      height: 22px;
      background-color: var(--vscode-status-bar-bg);
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      user-select: none;
      cursor: default;
    }

    .left-section, .right-section {
      display: flex;
      height: 100%;
    }

    .item {
      padding: 0 10px;
      display: flex;
      align-items: center;
      gap: 5px;
      height: 100%;
    }

    .item:hover {
      background-color: rgba(255, 255, 255, 0.2);
      cursor: pointer;
    }

    @media (max-width: 600px) {
      .hide-mobile {
        display: none !important;
      }
      
      .status-bar {
        padding-left: 5px;
        padding-right: 5px;
      }

      /* Keep branch, errors, and warnings visible on left */
      .left-section .item:nth-child(n+5) {
        display: none;
      }

      /* Keep language but hide other right items */
      .right-section .item:not(:nth-child(3)) {
        display: none;
      }
      
      .right-section.hide-mobile {
        display: flex !important;
      }
    }
  `]
})
export class StatusBarComponent { }

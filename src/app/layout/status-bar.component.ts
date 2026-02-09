import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="status-bar">
      <div class="left-section">
        <div class="item branch-item" (click)="toggleBranchMenu()" [class.active]="showBranchMenu">
          <i class="pi pi-code-branch branch-icon"></i> 
          {{ currentBranch }}
          
          <!-- Branch Dropdown -->
          <div class="branch-dropdown" *ngIf="showBranchMenu">
            <div class="dropdown-header">Select a ref to checkout</div>
            <div class="branch-list">
              <div *ngFor="let branch of branches" 
                   class="branch-option" 
                   (click)="selectBranch(branch); $event.stopPropagation()">
                <i class="pi pi-code-branch"></i>
                <span>{{ branch }}</span>
                <i class="pi pi-check" *ngIf="currentBranch === branch" style="margin-left: auto; font-size: 10px;"></i>
              </div>
            </div>
          </div>
        </div>
        
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
    
    <!-- Overlay to close dropdown when clicking outside -->
    <div class="overlay" *ngIf="showBranchMenu" (click)="showBranchMenu = false"></div>
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
      position: relative;
      z-index: 1000;
    }

    .left-section, .right-section {
      display: flex;
      height: 100%;
      align-items: center;
    }

    .item {
      padding: 0 10px;
      display: flex;
      align-items: center;
      gap: 5px;
      height: 100%;
      position: relative;
    }

    .item:hover {
      background-color: rgba(255, 255, 255, 0.2);
      cursor: pointer;
    }

    /* Branch Item Specifics */
    .branch-item:hover .branch-icon {
      animation: spin 0.5s ease-in-out;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      50% { transform: rotate(180deg); }
      100% { transform: rotate(360deg); }
    }

    /* Dropdown Styling */
    .branch-dropdown {
      position: absolute;
      bottom: 22px; /* Above status bar */
      left: 0;
      width: 250px;
      background-color: #252526;
      border: 1px solid #454545;
      box-shadow: 0 -4px 10px rgba(0,0,0,0.3);
      color: #cccccc;
      z-index: 1001;
      border-radius: 4px 4px 0 0;
      overflow: hidden;
    }

    .dropdown-header {
      padding: 8px 10px;
      background-color: #333333;
      font-weight: bold;
      border-bottom: 1px solid #454545;
      text-align: center;
    }

    .branch-list {
      max-height: 200px;
      overflow-y: auto;
    }

    .branch-option {
      padding: 8px 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .branch-option:hover {
      background-color: #2a2d2e;
      color: white;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999;
      background: transparent;
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
export class StatusBarComponent {
  currentBranch = 'main';
  showBranchMenu = false;
  branches = ['main', 'develop', 'feat/portfolio-v2', 'fix/responsive-layout'];

  toggleBranchMenu() {
    this.showBranchMenu = !this.showBranchMenu;
  }

  selectBranch(branch: string) {
    this.currentBranch = branch;
    this.showBranchMenu = false;
  }
}

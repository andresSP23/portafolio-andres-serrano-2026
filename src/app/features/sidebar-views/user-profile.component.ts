import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule],
    template: `
    <aside class="sidebar-view">
      <div class="sidebar-header">
        <span>PERFIL DE USUARIO</span>
      </div>
      
      <div class="sidebar-content">
        <div class="profile-card">
          <div class="avatar">
            <i class="pi pi-user" style="font-size: 3rem"></i>
          </div>
          <div class="profile-info">
            <h2>Andrés Serrano</h2>
            <p>Full Stack Developer</p>
          </div>
        </div>

        <div class="stats-section">
          <div class="stat-item">
            <span class="stat-label">Ubicación:</span>
            <span class="stat-value">Colombia</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Experiencia:</span>
            <span class="stat-value">3+ años</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Proyectos:</span>
            <span class="stat-value">15+ realizados</span>
          </div>
        </div>

        <div class="bio">
          Pasión por crear experiencias web únicas y funcionales. Especializado en Angular, Spring Boot y diseño de interfaces modernas.
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
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .profile-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      text-align: center;
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: var(--vscode-hover);
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid var(--vscode-border);
    }

    .profile-info h2 {
      margin: 0;
      font-size: 18px;
    }

    .profile-info p {
      margin: 5px 0 0 0;
      color: #888;
    }

    .stats-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 15px 0;
      border-top: 1px solid var(--vscode-border);
      border-bottom: 1px solid var(--vscode-border);
    }

    .stat-item {
      display: flex;
      justify-content: space-between;
    }

    .stat-label {
      color: #888;
    }

    .bio {
      line-height: 1.5;
      color: #ccc;
      font-style: italic;
    }
  `]
})
export class UserProfileComponent { }

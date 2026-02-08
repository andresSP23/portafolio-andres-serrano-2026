import { Component, inject, computed, ElementRef, ViewChild, EffectRef, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorState } from '../../state/editor.state';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="editor-container" *ngIf="activeFile; else noFile">
      <div class="split-view">
        <!-- Code View -->
        <!-- Vista de Código -->
        @if (codeVisible() || !showPreview()) {
          <div class="code-column">
            <div class="line-numbers">
              @for (line of lines(); track $index) {
                <div class="line-number">{{ $index + 1 }}</div>
              }
            </div>
            <div class="code-area">
              <pre><code [innerHTML]="highlightedContent()"></code></pre>
            </div>
          </div>
        }

        <!-- Vista Previa / Tarjetas (Solo para archivos específicos) -->
        @if (showPreview()) {
          <div class="preview-column">
            <div class="preview-header">
              <span>PREVIEW</span>
              <button class="icon-btn" (click)="toggleCode()" title="Toggle Code View">
                <i class="pi" [class.pi-eye]="!codeVisible()" [class.pi-eye-slash]="codeVisible()"></i>
              </button>
            </div>
            
            <div class="preview-content">
              @if (activeFile()!.id === 'inicio') {
                <div class="portfolio-view home-view">
                  <!-- Hero Section - Layout Horizontal -->
                  <div class="hero-landing">
                    <div class="hero-left">
                      <div class="greeting">
                        <span class="hello-text">Hola<span class="accent-dot">.</span></span>
                      </div>
                      <p class="intro-line">Soy Andres</p>
                      <h1 class="main-title">Desarrollador de Software</h1>
                      
                      <div class="cta-buttons">
                        <a href="https://github.com/andresSP23" target="_blank" class="btn-accent">
                          <i class="pi pi-github"></i>
                          Ver proyectos
                        </a>
                        <a href="assets/cv.pdf" download="Andres_Serrano_CV.pdf" class="btn-outline-light">
                          <i class="pi pi-file-pdf"></i>
                          Mi CV
                        </a>
                        <a href="https://www.linkedin.com/in/andrés-serrano-00b758345" target="_blank" class="btn-linkedin">
                          <i class="pi pi-linkedin"></i>
                          LinkedIn
                        </a>
                      </div>
                    </div>
                    
                    <div class="hero-right">
                      <div class="avatar-container">
                        <!-- Glow background naranja -->
                        <div class="avatar-glow-bg"></div>
                        <!-- Anillos -->
                        <div class="avatar-rings">
                          <div class="ring ring-outer"></div>
                          <div class="ring ring-inner"></div>
                        </div>
                        <!-- Foto -->
                        <div class="avatar-photo">
                          <img src="assets/avatar.jpg" alt="Andres Serrano" class="avatar-img">
                        </div>
                      </div>
                      <span class="availability-badge">
                        <span class="pulse"></span>
                        Disponible para trabajar
                      </span>
                    </div>
                  </div>

                  <!-- Tech Stack Bar -->
                  <div class="tech-bar">
                    @if (parsedData()?.stack) {
                      @for (tech of parsedData().stack; track tech) {
                        <div class="tech-item">
                          <i [class]="getTechIcon(tech) + ' colored'"></i>
                          <span>{{ tech }}</span>
                        </div>
                      }
                    } @else {
                      <div class="tech-item"><i class="devicon-angular-plain colored"></i><span>Angular</span></div>
                      <div class="tech-item"><i class="devicon-java-plain colored"></i><span>Java</span></div>
                      <div class="tech-item"><i class="devicon-typescript-plain colored"></i><span>TypeScript</span></div>
                      <div class="tech-item"><i class="devicon-spring-original colored"></i><span>Spring</span></div>
                      <div class="tech-item"><i class="devicon-postgresql-plain colored"></i><span>PostgreSQL</span></div>
                    }
                  </div>
                </div>
              }

              @if (activeFile()!.id === 'proyectos') {
                <div class="portfolio-view projects-view">
                  <div class="projects-header-centered">
                    <h1 class="projects-title-lg">Proyectos</h1>
                    <div class="title-line-vertical"></div>
                  </div>
                  
                  @if (parsedData()) {
                    <div class="projects-grid-modern">
                      @for (proj of parsedData(); track proj.nombre; let i = $index) {
                        <div class="project-card-modern">
                          <!-- Header: Title & Actions -->
                          <div class="project-header-modern">
                            <h2 class="project-title-modern">
                              {{ proj.nombre }}
                              <span class="project-status-badge">{{ proj.estado }}</span>
                            </h2>
                            <div class="project-actions-modern">
                              @if (proj.demoUrl) {
                                <a [href]="proj.demoUrl" target="_blank" class="btn-primary" style="padding: 8px 16px; font-size: 13px;">
                                  <i class="pi pi-external-link"></i>
                                  Ver Demo
                                </a>
                              }
                              @if (proj.repoUrl) {
                                <a [href]="proj.repoUrl" target="_blank" class="btn-icon-modern" title="View Source">
                                  <i class="pi pi-github"></i>
                                </a>
                              }
                            </div>
                          </div>

                          <!-- Top Section: Desc & Main Image -->
                          <div class="project-top-section">
                            <div class="project-desc-modern ">
                              <p st>{{ proj.descripcionCorta }}</p>
                              
                              <!-- Tech Stack Grid -->
                              <div class="tech-stack-grid">
                                @for (tech of proj.stack; track tech.name) {
                                  <div class="tech-item-modern">
                                    <i [class]="getTechIcon(tech.name)"></i>
                                    <span>{{ tech.name }}</span>
                                  </div>
                                }
                              </div>
                            </div>

                             </div>



                          <!-- Details Grid (Features & Architecture) -->
                          <div class="project-details-grid">
                            <!-- Capabilities -->
                            <div class="details-column">
                              <h3 class="details-title"><i class="pi pi-list"></i> Capacidades</h3>
                              <ul class="capabilities-list">
                                @for (cap of proj.capacidades; track cap) {
                                  <li>{{ cap }}</li>
                                }
                              </ul>
                            </div>

                            <!-- Architecture -->
                            <div class="details-column">
                              <h3 class="details-title"><i class="pi pi-sitemap"></i> Arquitectura</h3>
                              <p class="architecture-text">{{ proj.arquitectura }}</p>
                            </div>
                          </div>

                          <!-- Banner Image -->
                          @if (proj.bannerUrl) {
                            <div class="project-banner-container">
                              <img [src]="proj.bannerUrl" [alt]="proj.nombre" class="project-banner-img">
                            </div>
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
              }

              @if (activeFile()!.id === 'sobre-mi') {
                <div class="portfolio-view about-view-split">
                  <!-- Left Column: Experience List (Navigation) -->
                  <div class="about-left">
                     @if (parsedData().experiencia && parsedData().experiencia.length > 0) {
                      <h3 class="nav-title-sm">Experiencia</h3>
                      <div class="services-list">
                        <!-- Navigation Items -->
                        @for (exp of parsedData().experiencia; track exp.puesto; let i = $index) {
                          <div class="service-row" 
                               [class.active]="activeSection() === 'experience' && activeExperience() === i"
                               (click)="setActiveSection('experience', i)"
                               style="cursor: pointer;">
                            <div class="service-indicator"></div>
                            <span class="service-name">{{ exp.puesto }}</span>
                          </div>
                        }
                      </div>
                     }

                     @if (parsedData().formacion && parsedData().formacion.length > 0) {
                      <h3 class="nav-title-sm" style="margin-top: 30px;">Formación</h3>
                      <div class="services-list">
                        <!-- Navigation Items -->
                        @for (edu of parsedData().formacion; track edu.titulo; let i = $index) {
                          <div class="service-row" 
                               [class.active]="activeSection() === 'education' && activeEducation() === i"
                               (click)="setActiveSection('education', i)"
                               style="cursor: pointer;">
                            <div class="service-indicator"></div>
                            <span class="service-name">{{ edu.titulo }}</span>
                          </div>
                        }
                      </div>
                     }
                  </div>

                  <!-- Right Column: Active Experience Details -->
                  <!-- Right Column: Active Experience/Education Details -->
                  <div class="about-right">
                    @if (activeSection() === 'experience' && parsedData().experiencia && parsedData().experiencia.length > 0) {
                      <!-- Experience Details -->
                      <h1 class="about-title">{{ parsedData().experiencia[activeExperience()].puesto }}</h1>
                      
                      <div class="exp-subtitle-row">
                         <span class="exp-company">{{ parsedData().experiencia[activeExperience()].empresa }}</span>
                         <span class="exp-period">  //  {{ parsedData().experiencia[activeExperience()].periodo }}</span>
                      </div>

                      <p class="about-bio">
                        {{ parsedData().experiencia[activeExperience()].descripcion }}
                      </p>

                      <!-- Stats Row (Dynamic or Static) -->
                      <div class="stats-row">
                        <div class="stat-item">
                          <span class="stat-number">1<span class="orange-plus">+</span></span>
                          <span class="stat-label">Años Exp.</span>
                        </div>
                         <div class="stat-item">
                          <span class="stat-number">3<span class="orange-plus">+</span></span>
                          <span class="stat-label">Proyectos</span>
                        </div>
                         <div class="stat-item">
                          <span class="stat-number">100<span class="orange-plus">%</span></span>
                          <span class="stat-label">Completados</span>
                        </div>
                      </div>
                    }

                    @if (activeSection() === 'education' && parsedData().formacion && parsedData().formacion.length > 0) {
                      <!-- Education Details -->
                      <h1 class="about-title">{{ parsedData().formacion[activeEducation()].titulo }}</h1>
                      
                      <div class="exp-subtitle-row">
                         <span class="exp-company">{{ parsedData().formacion[activeEducation()].institucion }}</span>
                         <span class="exp-period">  //  {{ parsedData().formacion[activeEducation()].anio }}</span>
                      </div>

                      @if (parsedData().formacion[activeEducation()].registro) {
                        <div class="senecyt-badge">
                          <span class="senecyt-label">Registro Senecyt: </span>
                          <span class="senecyt-value">{{ parsedData().formacion[activeEducation()].registro }}</span>
                        </div>
                      }
                    }
                  </div>
                </div>
              }

              @if (activeFile()!.id === 'habilidades' && parsedData()) {
                <div class="portfolio-view skills-view-centered">
                  <div class="projects-header-centered">
                    <h1 class="projects-title-lg">Habilidades Técnicas</h1>
                    <div class="title-line-vertical"></div>
                  </div>

                  <div class="skills-grid">
                    <!-- Frontend -->
                    <div class="skill-category">
                      <h3 class="skill-category-title">
                        <i class="pi pi-desktop"></i> Frontend
                      </h3>
                      <div class="skill-chips">
                        @for (skill of parsedData().frontend; track skill) {
                          <div class="tech-chip">
                            <i [class]="getTechIcon(skill) + ' colored'"></i>
                            <span>{{ skill }}</span>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Backend -->
                    <div class="skill-category">
                      <h3 class="skill-category-title">
                        <i class="pi pi-server"></i> Backend
                      </h3>
                      <div class="skill-chips">
                        @for (skill of parsedData().backend; track skill) {
                          <div class="tech-chip">
                            <i [class]="getTechIcon(skill) + ' colored'"></i>
                            <span>{{ skill }}</span>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Tools -->
                    <div class="skill-category">
                      <h3 class="skill-category-title">
                        <i class="pi pi-wrench"></i> Herramientas
                      </h3>
                      <div class="skill-chips">
                        @for (tool of parsedData().herramientas; track tool) {
                          <div class="tech-chip">
                            <i [class]="getTechIcon(tool) + ' colored'"></i>
                            <span>{{ tool }}</span>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Databases -->
                    <div class="skill-category">
                      <h3 class="skill-category-title">
                        <i class="pi pi-database"></i> Bases de Datos
                      </h3>
                      <div class="skill-chips">
                        @for (db of parsedData().bases_de_datos; track db) {
                          <div class="tech-chip">
                            <i [class]="getTechIcon(db) + ' colored'"></i>
                            <span>{{ db }}</span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }

              @if (activeFile()!.id === 'contacto' && parsedData()) {
                <div class="portfolio-view">
                  <div class="contact-section">
                  <div class="contact-content-wrapper">
                    <!-- Left: Header -->
                    <div class="contact-left">
                      <div class="contact-label-top">
                        <span class="line-deco-horiz"></span> Contacto
                      </div>
                      <h1 class="contact-heading-lg">¿Tienes un proyecto?<br>¡Hablemos!</h1>
                    </div>

                    <!-- Right: Direct Contact Info -->
                    <div class="contact-right">
                      <div class="contact-info-list">
                        <!-- Phone -->
                        <div class="contact-item highlight">
                          <div class="contact-icon-circle"><i class="pi pi-phone"></i></div>
                          <div class="contact-details-text">
                            <span class="contact-label">Teléfono</span>
                            <span class="contact-value">{{ parsedData().telefono }}</span>
                          </div>
                        </div>

                        <!-- Main Email -->
                        <div class="contact-item">
                          <div class="contact-icon-circle"><i class="pi pi-envelope"></i></div>
                          <div class="contact-details-text">
                            <span class="contact-label">Email Principal</span>
                            <span class="contact-value">{{ parsedData().email }}</span>
                          </div>
                        </div>

                        <!-- Provisional Email -->
                        @if (parsedData().emailProvisional) {
                          <div class="contact-item">
                            <div class="contact-icon-circle"><i class="pi pi-envelope"></i></div>
                            <div class="contact-details-text">
                              <span class="contact-label">Email Provisional</span>
                              <span class="contact-value">{{ parsedData().emailProvisional }}</span>
                            </div>
                          </div>
                        }
                      </div>

                      @if (parsedData().preferencia) {
                        <div class="preference-message">
                           <i class="pi pi-heart-fill" style="color: #ff6b35; margin-right: 8px;"></i>
                           {{ parsedData().preferencia }}
                        </div>
                      }
                    </div>
                  </div> <!-- Close content-wrapper -->

                  <!-- Footer -->
                  <footer class="portfolio-footer-dark">
                    <div class="footer-content">
                      <h3 class="footer-name">Andres Serrano</h3>
                      <p class="footer-desc">Designed with love, all rights reserved.</p>
                      <div class="footer-socials">
                        @if (parsedData()?.email) {
                          <a [href]="'mailto:' + parsedData().email" class="social-circle"><i class="pi pi-envelope"></i></a>
                        }
                        <a href="https://github.com/AndresSerran" target="_blank" class="social-circle"><i class="pi pi-github"></i></a>
                        <a href="https://linkedin.com/in/andres-serrano-profile" target="_blank" class="social-circle"><i class="pi pi-linkedin"></i></a>
                      </div>
                    </div>
                  </footer>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
    <ng-template #noFile>
      <div class="empty-state">
        <i class="pi pi-code" style="font-size: 5rem; color: #333;"></i>
        <p>Select a file to view content</p>
      </div>
    </ng-template>
  `,
  styles: [`
    .editor-container {
      height: 100%;
      background-color: var(--vscode-editor-bg);
      font-family: var(--font-sans);
      font-size: 14px;
      line-height: 1.6;
      overflow: hidden;
      letter-spacing: -0.01em;
    }

    .split-view {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .code-column {
      flex: 1;
      display: flex;
      overflow: auto;
      border-right: 1px solid var(--vscode-border);
      min-width: 50%;
    }

    .preview-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: var(--vscode-bg);
      overflow: hidden;
    }

    .preview-header {
      padding: 8px 15px;
      background-color: var(--vscode-activity-bar-bg);
      font-size: 11px;
      font-weight: bold;
      border-bottom: 1px solid var(--vscode-border);
      color: #bbb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .icon-btn {
      background: none;
      border: none;
      color: #bbb;
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 3px;
    }
    .icon-btn:hover {
      background-color: rgba(255,255,255,0.1);
      color: white;
    }

    .preview-content {
      padding: 20px;
      overflow: hidden;
      overflow-y: auto;
      flex: 1;
      width: 100%;
    }

    /* ==========================================
       NUEVO DISEÑO DE PORTAFOLIO MODERNO
       ========================================== */
    
    .portfolio-view {
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 800px;
      margin: 0 auto;
      padding-bottom: 40px;
    }

    /* ==========================================
       LANDING PAGE - INICIO
       ========================================== */
    .home-view {
      gap: 0;
      max-width: 100%;
    }

    .hero-landing {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: 40px 60px;
      background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #141414 100%);
    }

    .hero-left {
      flex: 1;
      max-width: 550px;
    }

    .greeting {
      margin-bottom: 16px;
    }

    .hello-text {
      font-family: var(--font-sans);
      font-size: 56px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.03em;
      line-height: 1;
    }

    .accent-dot {
      color: #ff6b35;
    }

    .intro-line {
      font-family: var(--font-sans);
      font-size: 28px;
      font-weight: 400;
      color: #888;
      margin: 0 0 12px;
      position: relative;
      padding-left: 40px;
    }

    .intro-line::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 2px;
      background: #ff6b35;
    }

    .main-title {
      font-family: var(--font-sans);
      font-size: 42px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 32px;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .cta-buttons {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .btn-accent {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      background: linear-gradient(135deg, #ff6b35 0%, #e85d2a 100%);
      color: white;
      border: none;
      border-radius: 6px;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
    }

    .btn-accent:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(255, 107, 53, 0.4);
      background: linear-gradient(135deg, #ff7a4a 0%, #f06a35 100%);
    }

    .btn-outline-light {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      background: transparent;
      color: #ccc;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 6px;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-outline-light:hover {
      border-color: rgba(255,255,255,0.5);
      background: rgba(255,255,255,0.05);
      color: white;
    }

    .btn-linkedin {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      background: linear-gradient(135deg, #0077b5 0%, #005a8c 100%);
      color: white;
      border: none;
      border-radius: 6px;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 119, 181, 0.3);
    }

    .btn-linkedin:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(0, 119, 181, 0.4);
      background: linear-gradient(135deg, #0088cc 0%, #006699 100%);
    }

    .hero-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    /* Avatar Container con Glow Naranja */
    .avatar-container {
      position: relative;
      width: 340px;
      height: 340px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    /* Glow naranja degradado de fondo */
    .avatar-glow-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba(255, 107, 53, 0.4) 0%,
        rgba(255, 107, 53, 0.2) 30%,
        rgba(255, 60, 30, 0.1) 50%,
        transparent 70%
      );
      filter: blur(20px);
      animation: glow-pulse 4s ease-in-out infinite;
    }

    @keyframes glow-pulse {
      0%, 100% {
        opacity: 0.6;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
    }

    /* Anillos del avatar */
    .avatar-rings {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .ring {
      position: absolute;
      border-radius: 50%;
      border-style: solid;
    }

    .ring-outer {
      width: 100%;
      height: 100%;
      border-width: 2px;
      border-color: rgba(255, 107, 53, 0.3);
      animation: ring-rotate 20s linear infinite;
    }

    .ring-inner {
      width: 85%;
      height: 85%;
      border-width: 3px;
      border-color: transparent;
      border-top-color: rgba(255, 107, 53, 0.7);
      border-right-color: rgba(255, 107, 53, 0.5);
      animation: ring-rotate 10s linear infinite reverse;
    }

    @keyframes ring-rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Foto del avatar */
    .avatar-photo {
      width: 240px;
      height: 240px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid #1a1a1a;
      box-shadow: 
        0 0 60px rgba(255, 107, 53, 0.3),
        0 0 100px rgba(255, 60, 30, 0.15);
      position: relative;
      z-index: 2;
    }

    .avatar-photo .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .availability-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 30px;
      font-size: 13px;
      color: #aaa;
      font-weight: 500;
    }

    .pulse {
      width: 10px;
      height: 10px;
      background: #4caf50;
      border-radius: 50%;
      position: relative;
    }

    .pulse::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: #4caf50;
      border-radius: 50%;
      animation: pulse-dot 2s ease-in-out infinite;
    }

    @keyframes pulse-dot {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(2);
        opacity: 0;
      }
    }

    /* Tech Bar */
    .tech-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;
      padding: 30px 20px;
      background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%);
      border-top: 1px solid rgba(255,255,255,0.05);
    }

    .tech-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      opacity: 1;
      transition: all 0.3s ease;
      cursor: default;
    }

    .tech-item:hover {
      transform: translateY(-3px);
      text-shadow: 0 0 10px rgba(255, 107, 53, 0.4);
    }

    .tech-item i {
      font-size: 24px;
    }

    .tech-item span {
      font-size: 12px;
      color: #888;
      font-weight: 500;
    }

    /* ==========================================
       ABOUT ME - SPLIT VIEW
       ========================================== */
    .about-view-split {
      display: flex;
      flex-direction: row;
      gap: 80px; /* Increased gap */
      align-items: flex-start; /* Align to top instead of center */
      justify-content: center;
      max-width: 1200px; /* Increased max-width */
      margin: 0 auto;
      padding: 60px 20px; /* Increased padding */
      /* Background Gradient from Home */
      background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #141414 100%);
      border-radius: 20px; /* Optional: adds nice containment */
    }

    .about-left {
      flex: 1;
      max-width: 400px;
      position: sticky;
      top: 40px; /* Keep nav visible when scrolling */
      align-self: flex-start;
      height: fit-content;
    }

    .services-list {
      display: flex;
      flex-direction: column;
      gap: 30px;
      position: relative;
    }

    /* Vertical line connecting services */
    .services-list::before {
      content: '';
      position: absolute;
      left: 10px;
      top: 20px;
      bottom: 20px;
      width: 2px;
      background: rgba(255,255,255,0.1);
      z-index: 1;
    }

    .service-row {
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      z-index: 2;
      opacity: 0.5;
      transition: all 0.3s ease;
      cursor: default;
    }

    .service-row.active, 
    .service-row:hover {
      opacity: 1;
    }

    .service-indicator {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #1a1a1a;
      border: 2px solid transparent;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    .service-row.active .service-indicator {
      background: #ff6b35;
      border-color: #ff6b35;
      box-shadow: 0 0 15px rgba(255, 107, 53, 0.5);
    }
    
    .service-row:hover .service-indicator {
        border-color: #ff6b35;
    }

    .service-icon {
      font-size: 24px;
      color: #fff;
    }

    .service-name {
      font-family: var(--font-sans);
      font-size: 18px;
      font-weight: 500;
      color: #fff;
    }

    .about-right {
      flex: 1.2;
    }

    .about-title {
      font-family: var(--font-sans);
      font-size: 48px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 24px;
    }

    .about-bio {
      font-family: var(--font-sans);
      font-size: 16px;
      line-height: 1.8;
      color: #aaa;
      margin-bottom: 40px;
      white-space: pre-line; /* Respect newlines for list formatting */
    }

    .nav-title-sm {
      font-family: var(--font-mono);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #555;
      margin: 0 0 16px 10px;
    }

    .exp-subtitle-row {
      display: flex;
      gap: 10px;
      font-family: var(--font-mono);
      font-size: 15px;
      color: #ff6b35;
      margin-bottom: 24px;
      margin-top: -16px;
    }

    .exp-company {
      font-weight: 600;
    }

    .exp-period {
      opacity: 0.8;
      color: #ccc;
    }

    .stats-row {
      display: flex;
      gap: 40px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .stat-number {
      font-family: var(--font-sans);
      font-size: 36px;
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
    }

    .orange-plus {
      color: #ff6b35;
      margin-left: 2px;
    }

    .stat-label {
      font-size: 13px;
      color: #888;
      max-width: 100px;
      line-height: 1.4;
    }

    .senecyt-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      background: rgba(255, 107, 53, 0.1);
      border: 1px solid rgba(255, 107, 53, 0.3);
      border-radius: 6px;
      margin-top: 20px;
    }

    .senecyt-label {
      font-family: var(--font-mono);
      font-size: 13px;
      color: #ff6b35;
      font-weight: 600;
    }

    .senecyt-value {
      font-family: var(--font-mono);
      font-size: 13px;
      color: #fff;
    }

    /* Restored Content Styles */
    .content-section-restored {
      margin-top: 50px;
    }

    .restored-title {
      font-family: var(--font-sans);
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 24px;
      border-left: 3px solid #ff6b35;
      padding-left: 15px;
    }

    .timeline-minimal {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .timeline-item-minimal {
      position: relative;
      padding-left: 20px;
      border-left: 1px solid rgba(255,255,255,0.1);
    }

    .timeline-marker-orange {
      position: absolute;
      left: -5px;
      top: 6px;
      width: 9px;
      height: 9px;
      background: #ff6b35;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(255, 107, 53, 0.4);
    }

    .timeline-role {
      font-family: var(--font-sans);
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      margin: 0 0 5px;
    }

    .timeline-company {
      display: block;
      font-size: 13px;
      color: #ff6b35;
      margin-bottom: 8px;
    }

    .timeline-desc {
      font-size: 14px;
      line-height: 1.6;
      color: #aaa;
      margin: 0;
    }

    /* ==========================================
       PROJECTS - ALTERNATING LAYOUT
       ========================================== */
    .projects-view {
      padding: 60px 20px;
      max-width: 1200px;
      margin: 0 auto;
      background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #141414 100%);
      border-radius: 20px;
    }

    .projects-header-centered {
      text-align: center;
      margin-bottom: 80px;
      position: relative;
    }

    .projects-title-lg {
      font-family: var(--font-sans);
      font-size: 48px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 16px;
    }

    .title-line-vertical {
      width: 2px;
      height: 40px;
      background: #ff6b35;
      margin: 0 auto;
    }

    .projects-grid-alternating {
      display: flex;
      flex-direction: column;
      gap: 120px;
    }

    .project-row {
      display: flex;
      align-items: center;
      gap: 60px;
    }

    .project-row.reverse {
      flex-direction: row-reverse;
    }

    .project-content-side {
      flex: 1;
    }

    .project-title-lg {
      font-family: var(--font-sans);
      font-size: 32px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 20px;
    }

    .project-tags-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 24px;
    }

    .tech-pill-simple {
      padding: 6px 14px;
      background: rgba(255,255,255,0.08);
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      color: #ccc;
    }

    .project-desc-simple {
      font-family: var(--font-sans);
      font-size: 16px;
      line-height: 1.7;
      color: #aaa;
      margin-bottom: 30px;
      max-width: 90%;
      white-space: pre-line;
    }

    /* Modern Project Grid Styles */
    .projects-grid-modern {
      display: flex;
      flex-direction: column;
      gap: 60px;
    }

    .project-card-modern {
      background: transparent;
      border-radius: 12px;
      padding: 0 0 60px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .project-card-modern:last-child {
      border-bottom: none;
    }

    .project-header-modern {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .project-title-modern {
      font-family: var(--font-sans);
      font-size: 32px;
      font-weight: 700;
      color: #fff;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .project-actions-modern {
      display: flex;
      gap: 12px;
    }

    .btn-icon-modern {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
      color: #ccc;
      transition: all 0.2s;
    }

    .btn-icon-modern:hover {
      background: #ff6b35;
      color: white;
      transform: translateY(-2px);
    }
    
    .project-status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: rgba(255, 107, 53, 0.1);
      border: 1px solid rgba(255, 107, 53, 0.3);
      border-radius: 20px;
      font-size: 12px;
      color: #ff6b35;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .project-top-section {
      display: flex;
      gap: 40px;
      margin-bottom: 30px;
    }

    .project-desc-modern {
      flex: 1;
    }

    .project-desc-modern p {
      font-size: 18px;
      line-height: 1.7;
      color: #dfdfdf;
      margin-bottom: 32px;
      font-weight: 400;
    }

    .tech-stack-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 12px;
    }

    .tech-item-modern {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 30px;
      font-size: 14px;
      color: #eee;
      transition: all 0.3s ease;
    }
    
    .tech-item-modern:hover {
      background: rgba(255, 107, 53, 0.08);
      border-color: rgba(255, 107, 53, 0.3);
      transform: translateY(-2px);
    }
    
    .tech-item-modern i {
      font-size: 18px;
    }

    .project-details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 40px;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding-top: 40px;
    }

    .details-column {
      background: transparent;
      border: none;
      padding: 0;
      transition: all 0.3s ease;
    }

    .details-column:hover {
      transform: translateX(4px);
    }

    .details-title {
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #ff6b35;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
    }

    .capabilities-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .capabilities-list li {
      position: relative;
      padding-left: 22px;
      margin-bottom: 12px;
      font-size: 14px;
      color: #bbb;
      line-height: 1.6;
    }

    .capabilities-list li::before {
      content: '→';
      color: #ff6b35;
      position: absolute;
      left: 0;
      font-weight: bold;
    }

    .architecture-text {
      font-size: 15px;
      color: #ccc;
      line-height: 1.7;
    }

    .project-banner-container {
      margin-top: 40px;
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255,107,53,0.1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      background: #000;
    }

    .project-banner-img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
    }

    .project-card-modern:hover .project-banner-img {
      transform: scale(1.02);
    }

    @media (max-width: 900px) {
      .project-details-grid {
        grid-template-columns: 1fr;
      }
    }

    .terminal-header-deco {
      background: #1a1a1a;
      padding: 10px 14px;
      display: flex;
      gap: 6px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dot.red { background: #ff5f56; }
    .dot.yellow { background: #ffbd2e; }
    .dot.green { background: #27c93f; }



    /* Hero Section - Fallback/Otras vistas */
    .hero-section {
      background: linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 100%);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .avatar-wrapper {
      position: relative;
    }

    .avatar-ring {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      padding: 4px;
      background: linear-gradient(135deg, #ff8c61 0%, #ff6b35 50%, #e85d2a 100%);
      box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3);
    }

    .avatar-ring .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #0d0d0d;
    }

    .status-badge {
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      background: #1a1a1a;
      border: 1px solid rgba(76, 175, 80, 0.5);
      color: #4caf50;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
    }

    .hero-text {
      margin-top: 10px;
    }

    .hero-name {
      font-family: var(--font-sans);
      font-size: 32px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.03em;
    }

    .hero-role {
      font-family: var(--font-sans);
      font-size: 18px;
      color: #ff6b35;
      margin: 8px 0 4px;
      font-weight: 500;
    }

    .hero-location {
      font-size: 14px;
      color: #888;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .hero-bio {
      font-family: var(--font-sans);
      font-size: 15px;
      line-height: 1.7;
      color: #aaa;
      max-width: 500px;
      margin: 10px 0 5px;
    }

    .hero-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 10px;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: linear-gradient(135deg, #ff6b35 0%, #e85d2a 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
      background: linear-gradient(135deg, #ff7a4a 0%, #f06a35 100%);
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      background: transparent;
      color: #ccc;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 8px;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-secondary:hover {
      background: rgba(255,255,255,0.05);
      border-color: rgba(255,255,255,0.3);
      color: white;
    }

    /* Section Cards */
    .section-card {
      background: linear-gradient(160deg, #1a1a1a 0%, #141414 100%);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 28px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }

    .section-icon {
      font-size: 20px;
      color: #ff6b35;
    }

    .section-title {
      font-family: var(--font-sans);
      font-size: 20px;
      font-weight: 600;
      color: #ffffff;
      margin: 0;
    }

    .section-header-main {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 24px;
    }

    .section-icon-lg {
      font-size: 28px;
      color: #ff6b35;
    }

    .page-title {
      font-family: var(--font-sans);
      font-size: 28px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.02em;
    }

    /* Tech Chips */
    .tech-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .tech-chip {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 20px;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 30px;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 500;
      color: #eee;
      transition: all 0.3s ease;
    }

    .tech-chip:hover {
      background: rgba(255, 107, 53, 0.08);
      border-color: rgba(255, 107, 53, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 107, 53, 0.1);
    }

    .tech-chip i {
      font-size: 20px;
    }

    .tech-chip-sm {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 6px;
      font-size: 12px;
      color: #bbb;
    }

    /* Projects */
    .projects-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .project-card-new {
      background: linear-gradient(160deg, #1a1a1a 0%, #0f0f0f 100%);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 28px;
      transition: all 0.3s ease;
    }

    .project-card-new:hover {
      border-color: rgba(255, 107, 53, 0.3);
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    }

    .project-header-new {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .project-name {
      font-family: var(--font-sans);
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      margin: 0;
    }

    .status-pill {
      padding: 5px 14px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-pill.completed {
      background: rgba(76, 175, 80, 0.15);
      color: #4caf50;
      border: 1px solid rgba(76, 175, 80, 0.3);
    }

    .status-pill.in-progress {
      background: rgba(255, 107, 53, 0.15);
      color: #ff6b35;
      border: 1px solid rgba(255, 107, 53, 0.3);
    }

    .project-description {
      font-family: var(--font-sans);
      font-size: 14px;
      line-height: 1.7;
      color: #999;
      margin: 0 0 20px;
      white-space: pre-line;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }

    .project-gallery-new {
      margin: 20px 0;
    }

    .gallery-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .gallery-nav {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .gallery-nav:hover {
      background: rgba(255, 107, 53, 0.2);
      border-color: rgba(255, 107, 53, 0.5);
    }

    .gallery-image {
      flex: 1;
      height: 350px;
      border-radius: 12px;
      overflow: hidden;
      background: #000;
      position: relative;
      cursor: pointer;
    }

    .gallery-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .image-counter {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: rgba(0,0,0,0.7);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      color: #fff;
      font-weight: 600;
    }

    .project-links {
      display: flex;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 8px;
      color: #ccc;
      font-family: var(--font-sans);
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-outline:hover {
      background: rgba(255, 107, 53, 0.1);
      border-color: rgba(255, 107, 53, 0.5);
      color: #ff6b35;
    }

    /* Timeline */
    .timeline {
      position: relative;
      padding-left: 24px;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 6px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background: linear-gradient(180deg, #ff6b35 0%, #e85d2a 100%);
      border-radius: 2px;
    }

    .timeline-item {
      position: relative;
      padding-bottom: 24px;
    }

    .timeline-item:last-child {
      padding-bottom: 0;
    }

    .timeline-marker {
      position: absolute;
      left: -24px;
      top: 6px;
      width: 14px;
      height: 14px;
      background: #0d0d0d;
      border: 3px solid #ff6b35;
      border-radius: 50%;
    }

    .timeline-content {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.04);
      border-radius: 10px;
      padding: 18px;
    }

    .timeline-title {
      font-family: var(--font-sans);
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      margin: 0 0 6px;
    }

    .timeline-subtitle {
      font-size: 14px;
      color: #888;
      margin: 0 0 8px;
    }

    .timeline-date {
      display: inline-block;
      padding: 4px 10px;
      background: rgba(255, 107, 53, 0.1);
      border-radius: 4px;
      font-size: 12px;
      color: #ff6b35;
      font-weight: 500;
    }

    .timeline-description {
      font-size: 13px;
      line-height: 1.6;
      color: #999;
      margin: 12px 0 0;
      white-space: pre-line;
    }

    /* Interests */
    .interests-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .interest-tag {
      padding: 8px 16px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      font-size: 13px;
      color: #ccc;
      transition: all 0.2s ease;
    }

    .interest-tag:hover {
      background: rgba(255, 107, 53, 0.1);
      border-color: rgba(255, 107, 53, 0.3);
      color: #ff6b35;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 40px;
      margin-top: 20px;
    }

    .skill-category {
      background: transparent;
      border: none;
      padding: 0;
      transition: all 0.3s ease;
    }

    .skill-category-title {
      font-family: var(--font-sans);
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 24px;
      display: flex;
      align-items: center;
      gap: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .skill-category-title i {
      color: #ff6b35;
      font-size: 20px;
    }

    .skill-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    /* Contact Section */
    .contact-section {
      text-align: left; /* Override previous center */
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 20px 40px;
    }

    .contact-content-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 60px;
      margin-bottom: 60px;
      align-items: flex-start;
      padding-top: 40px;
    }

    .contact-left {
      flex: 1;
    }

    .contact-label-top {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: #ff6b35;
      margin-bottom: 20px;
      font-weight: 500;
    }

    .line-deco-horiz {
      width: 40px;
      height: 2px;
      background: #ff6b35;
    }

    .contact-heading-lg {
      font-family: var(--font-sans);
      font-size: 56px;
      font-weight: 800;
      color: #fff;
      line-height: 1.1;
    }

    .contact-right {
      flex: 1;
      padding-top: 20px;
    }

    .contact-info-list {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 10px;
      transition: all 0.3s ease;
      border-radius: 12px;
    }

    .contact-item:hover {
      background: rgba(255,255,255,0.02);
      transform: translateX(10px);
    }

    .contact-item.highlight {
      background: rgba(255, 107, 53, 0.05);
      border: 1px solid rgba(255, 107, 53, 0.1);
    }

    .contact-icon-circle {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: rgba(255, 107, 53, 0.1);
      border: 1px solid rgba(255, 107, 53, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ff6b35;
      font-size: 22px;
      flex-shrink: 0;
    }

    .contact-details-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .contact-label {
      font-family: var(--font-sans);
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #888;
      font-weight: 600;
    }

    .contact-value {
      font-family: var(--font-sans);
      font-size: 20px;
      color: #fff;
      font-weight: 700;
    }

    .preference-message {
      margin-top: 48px;
      padding: 24px;
      background: rgba(255,255,255,0.02);
      border-radius: 16px;
      border: 1px dashed rgba(255, 107, 53, 0.3);
      color: #ddd;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      backdrop-filter: blur(10px);
    }

    /* Footer */
    .portfolio-footer-dark {
      background: #000;
      margin: 0 -20px -40px; /* Bleed out if needed, or adjust */
      padding: 40px 20px;
      text-align: center;
      border-top: 1px solid rgba(255,255,255,0.05);
    }

    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .footer-name {
      font-family: var(--font-sans);
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      margin: 0;
    }

    .footer-desc {
      font-size: 13px;
      color: #666;
      margin: 0;
    }

    .footer-socials {
      display: flex;
      gap: 12px;
      margin-top: 10px;
    }

    .social-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-circle:hover {
      background: #ff6b35;
      color: #fff;
      transform: translateY(-3px);
    }

    /* Legacy styles overrides or removals */
    .contact-hero {
       display: none; 
    }

    .contact-icon {
      font-size: 48px;
      color: #ff6b35;
      margin-bottom: 16px;
    }

    .contact-title {
      font-family: var(--font-sans);
      font-size: 32px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 12px;
    }

    .contact-subtitle {
      font-size: 16px;
      color: #888;
      margin: 0;
    }

    .contact-cards {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .contact-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 24px 32px;
      background: linear-gradient(160deg, #1a1a1a 0%, #141414 100%);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 14px;
      text-decoration: none;
      transition: all 0.3s ease;
      min-width: 180px;
    }

    .contact-card:hover {
      border-color: rgba(255, 107, 53, 0.4);
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(255, 107, 53, 0.15);
    }

    .contact-card i {
      font-size: 28px;
      color: #ff6b35;
    }

    .contact-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .contact-value {
      font-size: 14px;
      color: #fff;
      font-weight: 500;
    }

    .contact-footer-msg {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 20px;
      background: rgba(255, 107, 53, 0.05);
      border: 1px solid rgba(255, 107, 53, 0.1);
      border-radius: 12px;
    }

    .contact-footer-msg i {
      color: #ff6b35;
    }

    .contact-footer-msg p {
      margin: 0;
      font-size: 14px;
      color: #888;
      font-style: italic;
    }

    /* Estilos legados que aún pueden usarse */
    .profile-view {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 100%;
      overflow-x: hidden;
    }

    .hero-card {
      display: flex;
      align-items: center;
      background: linear-gradient(145deg, #252526 0%, #1e1e1e 100%);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 32px;
      gap: 28px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .hero-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2);
    }

    .avatar-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #007acc 0%, #005a9e 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      border: 2px solid var(--vscode-border);
      overflow: hidden;
      flex-shrink: 0;
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .code-snippet-section {
      flex: 1;
      overflow: hidden;
    }

    .mini-code {
      background: transparent;
      font-family: var(--font-mono);
      font-size: 14px;
      line-height: 1.6;
      white-space: pre-wrap;
      word-break: break-all;
    }

    .info-card {
      background: linear-gradient(145deg, #2a2a2b 0%, #252526 100%);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      padding: 28px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }

    .info-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
      border-color: rgba(86, 156, 214, 0.3);
    }

    .role-title {
      color: #6bb3f0;
      font-family: var(--font-sans);
      font-size: 26px;
      margin-bottom: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      letter-spacing: -0.02em;
      line-height: 1.3;
    }

    .card-icon {
      color: #4ec9b0;
      font-size: 20px;
      margin-right: 10px;
    }

    .bio-text {
      color: #d4d4d4;
      font-family: var(--font-sans);
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 100%;
      font-size: 15px;
      font-weight: 400;
      letter-spacing: 0.01em;
      opacity: 0.9;
    }

    .social-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .social-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 2px;
      border: 1px solid #3e3e42;
      background-color: #2d2d2d;
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 400;
      cursor: pointer;
      color: #cccccc;
      justify-content: center;
      min-width: 100px;
      text-decoration: none;
      transition: background-color 0.2s;
    }
    
    .social-btn:hover {
      background-color: #383838;
      color: #ffffff;
      border-color: #505050;
    }
    
    .project-card {
      background: linear-gradient(145deg, #232324 0%, #1e1e1e 100%);
      padding: 26px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.06);
      margin-bottom: 20px;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.35);
      border-color: rgba(78, 201, 176, 0.4);
    }

    .project-title {
       margin: 0; 
       font-family: var(--font-sans);
       font-size: 22px; 
       color: #ffffff;
       font-weight: 700;
       letter-spacing: -0.02em;
       line-height: 1.3;
    }

    .project-desc {
       margin: 0; 
       font-family: var(--font-sans);
       line-height: 1.7; 
       white-space: pre-line; 
       color: #c5c5c5;
       font-size: 14px;
       font-weight: 400;
       opacity: 0.95;
    }

    .projects-grid {
      display: flex;
      flex-direction: column; 
      gap: 20px;
      width: 100%;
    }

    .project-header {
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      margin-bottom: 15px; 
      flex-wrap: wrap; 
      gap: 10px;
    }

    .project-body {
      margin-bottom: 20px;
    }

    .status {
      display: inline-block;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .status.finished { background-color: rgba(76, 175, 80, 0.15); color: #4caf50; border: 1px solid rgba(76, 175, 80, 0.3); }
    .status.in-progress { background-color: rgba(33, 150, 243, 0.15); color: #2196f3; border: 1px solid rgba(33, 150, 243, 0.3); }
    
    .project-stack {
      margin-bottom: 20px;
      border-top: 1px solid rgba(255,255,255,0.05); 
      padding-top: 15px;
    }

    .section-label {
      font-size: 11px; 
      color: #858585; 
      margin-bottom: 10px; 
      display: block; 
      text-transform: uppercase; 
      letter-spacing: 1px; 
      font-weight: 600;
    }

    .project-gallery {
      margin-bottom: 20px;
    }
    
    .project-actions {
      margin-top: 15px; 
      border-top: 1px solid rgba(255,255,255,0.05); 
      padding-top: 15px; 
      display: flex; 
      gap: 12px; 
      justify-content: flex-start;
    }

    .action-btn {
      min-width: auto; 
      padding: 6px 16px; 
      font-size: 13px;
    }
    
    .project-tags { 
      display: flex; 
      gap: 15px; 
      flex-wrap: wrap; 
      margin-top: 10px; 
    }

    .tech-tag {
      display: inline-flex; 
      align-items: center; 
      gap: 6px; 
      padding: 4px 10px;
      border-radius: 3px;
      font-size: 13px;
    }

    .edu-item {
      padding: 22px;
      background: linear-gradient(145deg, #232324 0%, #1e1e1e 100%);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 10px;
      margin-bottom: 14px;
      transition: all 0.25s ease;
      box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    }

    .edu-item:hover {
      border-color: rgba(78, 201, 176, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    }

    .skills-section {
      margin-top: 15px;
    }

    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .contact-item {
      display: flex;
      gap: 12px;
      align-items: baseline;
      font-size: 14px;
      flex-wrap: wrap;
    }

    .contact-item .label {
      font-weight: 500; 
      color: #569cd6; 
      min-width: 80px; 
      margin-right: 0;
      flex-shrink: 0;
      text-align: right;
    }

    .contact-item .value {
      color: #ce9178; 
      word-break: break-word;
      flex: 1;
    }

    .highlight-title {
      color: #5fd3b9;
      font-family: var(--font-sans);
      font-weight: 600;
      font-size: 16px;
      letter-spacing: -0.01em;
    }

    .date-val {
      color: #b5cea8;
    }
    
    .description-item {
      align-items: flex-start;
      margin-top: 5px;
    }

    .description-text {
      margin: 0; 
      line-height: 1.6; 
      flex: 1; 
      white-space: pre-line;
      color: #cccccc;
    }
    
    .punctuation {
      color: #d4d4d4; /* Gray for : , { } */
      margin-right: 5px;
    }

    .keyword {
        color: #569cd6; /* Blue for const, new, etc */
    }

    .line-numbers {
      padding: 10px 15px 10px 5px;
      text-align: right;
      color: #858585;
      background-color: var(--vscode-editor-bg);
      border-right: 1px solid #333;
      user-select: none;
      min-width: 50px;
    }

    .code-area {
      padding: 10px 0 10px 20px;
      color: var(--vscode-text);
      flex: 1;
    }

    .empty-state {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #666;
    }

    pre {
      margin: 0;
      font-family: inherit;
      white-space: pre-wrap;
      word-break: break-all;
    }

    /* Media Queries para Previsualización */
    @media (max-width: 768px) {
      .split-view {
        flex-direction: column;
      }

      .code-column {
        min-width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--vscode-border);
        flex: 1;
      }

      .preview-column {
        flex: 1;
      }

      .preview-content {
        padding: 10px;
        width: 100%;
        overflow-x: hidden;
      }

      .hero-card {
        flex-direction: column;
        padding: 20px;
        text-align: center;
        gap: 20px;
      }

      .avatar-circle {
        width: 100px;
        height: 100px;
      }

      .info-card {
        padding: 20px;
      }

      .role-title {
        font-size: 20px;
        justify-content: center;
      }

      .contact-item .label {
        width: 100%;
        margin-bottom: 2px;
      }

      .contact-item {
        flex-direction: column;
        gap: 2px;
      }

      .social-actions {
        justify-content: center;
      }

      .social-btn {
        flex: 1;
        min-width: 120px;
      }
    }

    @media (max-width: 480px) {
      .mini-code {
        font-size: 12px;
      }
      
      .role-title {
        font-size: 18px;
      }

      .bio-text {
        font-size: 14px;
      }
    }

    .lightbox-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.85);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      backdrop-filter: blur(5px);
      animation: fadeIn 0.2s ease;
    }

    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      border-radius: 8px;
      overflow: hidden;
      background: var(--vscode-bg);
      border: 1px solid var(--vscode-border);
    }

    .full-img {
      display: block;
      width: 100%;
      height: auto;
      max-height: 85vh;
      object-fit: contain;
    }

    .close-btn {
      position: absolute;
      top: 15px; right: 15px;
      background: rgba(0,0,0,0.5);
      color: white;
      border: none;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 1001;
      transition: background 0.2s;
    }

    .close-btn:hover {
      background: rgba(255,0,0,0.6);
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }

    /* Carousel Styles */
    .carousel-container {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
    }

    .carousel-slide {
      flex: 1;
      height: 450px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--vscode-border);
      position: relative;
      cursor: pointer;
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .carousel-img {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }

    .carousel-control {
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--vscode-border);
      color: white;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
      z-index: 5;
    }

    .carousel-control:hover {
      background: var(--vscode-accent);
      border-color: var(--vscode-accent);
    }

    .carousel-counter {
      position: absolute;
      bottom: 15px;
      right: 15px;
      background: rgba(0,0,0,0.6);
      padding: 4px 12px;
      border-radius: 15px;
      font-size: 13px;
      color: white;
      font-weight: bold;
      pointer-events: none;
    }

    /* Lightbox Styles */
    .lightbox-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.9);
      z-index: 2000;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      backdrop-filter: blur(8px);
    }

    .lightbox-content {
      position: relative;
      max-width: 100%;
      max-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .full-img {
      max-width: 95vw;
      max-height: 95vh;
      object-fit: contain;
      box-shadow: 0 0 30px rgba(0,0,0,0.8);
      border-radius: 4px;
    }

    .close-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #e74c3c;
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 2001;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }

    @media (max-width: 1024px) {
      .carousel-slide {
        height: 350px;
      }
    }

    @media (max-width: 768px) {
      .carousel-container {
        gap: 5px;
      }
      .carousel-slide {
        height: 300px;
      }
      .carousel-control {
        position: absolute;
        bottom: 15px;
        background: rgba(0,0,0,0.6);
        width: 36px;
        height: 36px;
      }
      .carousel-control.prev { left: 10px; }
      .carousel-control.next { left: 56px; } /* Al lado del prev para no tapar el centro */
      
      .carousel-counter {
        bottom: 10px;
        right: 10px;
        font-size: 11px;
      }

      .full-img {
        max-width: 100vw;
        max-height: 80vh;
      }
      
      .close-btn {
        top: 10px;
        right: 10px;
        width: 34px;
        height: 34px;
      }
    }

    @media (max-width: 480px) {
      .carousel-slide {
        height: 220px;
      }
      .project-card {
        padding: 12px;
      }
    }

    .gallery-item:hover {
      transform: scale(1.02);
      border-color: #007acc !important;
    }

    /* ==========================================
       RESPONSIVE - LANDING PAGE
       ========================================== */
    /* ==========================================
       RESPONSIVE - LANDING PAGE
       ========================================== */
    @media (max-width: 1024px) {
      .hero-landing {
        padding: 30px 40px;
      }

      .hello-text {
        font-size: 48px;
      }

      .main-title {
        font-size: 36px;
      }

      .avatar-container {
        width: 300px;
        height: 300px;
      }

      .avatar-rings {
        width: 100%;
        height: 100%;
      }

      .avatar-photo {
        width: 200px;
        height: 200px;
      }
    }

    @media (max-width: 768px) {
      .hero-landing {
        flex-direction: column;
        text-align: center;
        padding: 30px 20px;
        min-height: auto;
        gap: 40px;
      }

      .hero-left {
        max-width: 100%;
        order: 2;
      }

      .hero-right {
        order: 1;
      }

      .intro-line {
        padding-left: 0;
        justify-content: center;
      }

      .intro-line::before {
        display: none;
      }

      .hello-text {
        font-size: 42px;
      }

      .main-title {
        font-size: 28px;
      }

      .cta-buttons {
        justify-content: center;
      }

      .avatar-container {
        width: 240px;
        height: 240px;
      }

      .avatar-rings {
        width: 100%;
        height: 100%;
      }

      .avatar-photo {
        width: 160px;
        height: 160px;
      }

      .tech-bar {
        gap: 20px;
        flex-wrap: wrap;
        padding: 20px;
      }

      .tech-item {
        flex: 0 0 calc(33% - 15px);
      }
    }

    @media (max-width: 480px) {
      .hello-text {
        font-size: 36px;
      }

      .intro-line {
        font-size: 20px;
      }

      .main-title {
        font-size: 24px;
      }

      .cta-buttons {
        flex-direction: column;
        width: 100%;
      }

      .btn-accent,
      .btn-outline-light,
      .btn-linkedin {
        width: 100%;
        justify-content: center;
      }

      .avatar-container {
        width: 200px;
        height: 200px;
      }

      .avatar-rings {
        width: 100%;
        height: 100%;
      }

      .avatar-photo {
        width: 130px;
        height: 130px;
      }

      /* Sobre Mí Responsive */
      .about-view-split {
        flex-direction: column;
        gap: 40px;
        padding: 20px;
      }

      .about-right {
        order: 1;
        text-align: center;
      }

      .about-left {
        order: 2;
        width: 100%;
        max-width: 100%;
      }

      .about-title {
        font-size: 32px;
      }

      .about-bio {
        font-size: 14px;
        margin-bottom: 30px;
      }

      .stats-row {
        justify-content: center;
        gap: 20px;
      }

      .stat-number {
        font-size: 28px;
        justify-content: center;
      }

      .services-list {
        align-items: center; /* Center items on mobile */
      }
      
      .services-list::before {
        left: 50%;
        transform: translateX(-50%);
        display: none; /* Hide line on mobile usually looks better or center it */
      }

      .service-row {
        width: 100%;
        justify-content: center; /* Center content */
        max-width: 300px;
        margin: 0 auto;
      }

      .availability-badge {
        font-size: 11px;
        padding: 8px 14px;
      }

      /* Proyectos Responsive */
      .projects-grid-alternating {
        gap: 80px;
      }
      
      .project-row,
      .project-row.reverse {
        flex-direction: column-reverse; /* Image on top usually looks better, but let's try Content bottom */
        gap: 30px;
      }

      .project-image-side, 
      .project-content-side {
        width: 100%;
      }

      .projects-title-lg {
        font-size: 36px;
      }

      .project-title-lg {
        font-size: 24px;
      }
      
      .project-img-container {
        height: 200px;
      }

      /* Contact Responsive */
      .contact-content-wrapper {
        flex-direction: column;
        gap: 40px;
      }
      
      .contact-left, .contact-right {
        width: 100%;
        text-align: center;
      }

      .contact-label-top, 
      .contact-heading-lg {
        justify-content: center;
        text-align: center;
      }
      
      .contact-heading-lg {
        font-size: 36px;
      }

      .btn-submit-mobile {
        display: none; /* Only if we wanted separate button */
      }
      
      .btn-submit-orange {
        align-self: center; /* Center button on mobile */
        width: 100%;
      }

      .contact-form-minimal {
        gap: 20px;
      }

      .tech-item {
        flex: 0 0 calc(50% - 15px);
      }

      .tech-item i {
        font-size: 20px;
      }

      .tech-item span {
        font-size: 10px;
      }
    }

    /* ==========================================
       RESPONSIVE - NUEVO DISEÑO PORTAFOLIO
       ========================================== */
    @media (max-width: 768px) {
      .split-view {
        flex-direction: column;
      }

      .code-column {
        display: none;
      }

      .preview-column {
        flex: 1;
        width: 100%;
      }

      .preview-content {
        padding: 16px;
      }

      .portfolio-view {
        gap: 16px;
      }

      .hero-section {
        padding: 28px 20px;
      }

      .avatar-ring {
        width: 110px;
        height: 110px;
      }

      .hero-name {
        font-size: 26px;
      }

      .hero-role {
        font-size: 16px;
      }

      .hero-bio {
        font-size: 14px;
      }

      .hero-actions {
        flex-direction: column;
        width: 100%;
      }

      .btn-primary,
      .btn-secondary {
        width: 100%;
        justify-content: center;
      }

      .section-card {
        padding: 20px;
      }

      .section-header-main {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .page-title {
        font-size: 22px;
      }

      .tech-chip {
        padding: 8px 12px;
        font-size: 12px;
      }

      .project-card-new {
        padding: 20px;
      }

      .project-name {
        font-size: 18px;
      }

      .gallery-image {
        height: 200px;
      }

      .gallery-nav {
        width: 32px;
        height: 32px;
      }

      .timeline {
        padding-left: 20px;
      }

      .timeline-marker {
        left: -20px;
        width: 12px;
        height: 12px;
      }

      .timeline-content {
        padding: 14px;
      }

      .skills-grid {
        grid-template-columns: 1fr;
      }

      .contact-hero {
        padding: 30px 20px;
      }

      .contact-title {
        font-size: 24px;
      }

      .contact-cards {
        flex-direction: column;
      }

      .contact-card {
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .hero-name {
        font-size: 22px;
      }

      .avatar-ring {
        width: 90px;
        height: 90px;
      }

      .status-badge {
        font-size: 10px;
        padding: 3px 10px;
      }

      .tech-chip {
        padding: 6px 10px;
        font-size: 11px;
      }

      .tech-chip i {
        font-size: 14px;
      }

      .project-name {
        font-size: 16px;
      }

      .gallery-image {
        height: 160px;
      }

      .timeline-title {
        font-size: 14px;
      }
    }
  `]
})
export class CodeEditorComponent {
  window = window;
  editorState = inject(EditorState);


  sanitizer = inject(DomSanitizer);

  activeFile = this.editorState.activeFile;

  codeVisible = signal(true);

  // State for About Me section
  activeSection = signal<'experience' | 'education'>('experience');
  activeExperience = signal(0);
  activeEducation = signal(0);


  constructor() {
    effect(() => {
      const file = this.activeFile();
      if (file && (file.id === 'inicio' || file.id === 'proyectos' || file.id === 'sobre-mi' || file.id === 'habilidades' || file.id === 'contacto')) {
        this.codeVisible.set(false);
      } else {
        this.codeVisible.set(true);
      }
    }, { allowSignalWrites: true });
  }

  setActiveSection(section: 'experience' | 'education', index: number) {
    this.activeSection.set(section);
    if (section === 'experience') {
      this.activeExperience.set(index);
    } else {
      this.activeEducation.set(index);
    }
  }

  content = computed(() => this.activeFile()?.content || '');

  lines = computed(() => {
    return this.content().split('\n');
  });

  getTechStyle(tech: string): string {
    const t = tech.toLowerCase();
    // Frontend - Azul
    if (t.includes('angular') || t.includes('typescript') || t.includes('javascript') || t.includes('html') || t.includes('css') || t.includes('scss') || t.includes('react') || t.includes('vue')) {
      return 'border: 1px solid #569cd6; color: #569cd6; background: rgba(86, 156, 214, 0.1); padding: 4px 8px; border-radius: 4px; font-size: 12px;';
    }
    // Backend - Naranja
    else if (t.includes('spring') || t.includes('java') || t.includes('node') || t.includes('express') || t.includes('python') || t.includes('php') || t.includes('c#')) {
      return 'border: 1px solid #ce9178; color: #ce9178; background: rgba(206, 145, 120, 0.1); padding: 4px 8px; border-radius: 4px; font-size: 12px;';
    }
    // Herramientas/DB - Teal
    else {
      return 'border: 1px solid #4ec9b0; color: #4ec9b0; background: rgba(78, 201, 176, 0.1); padding: 4px 8px; border-radius: 4px; font-size: 12px;';
    }
  }

  getTechIcon(tech: string): string {
    const t = tech.toLowerCase();
    const icons: { [key: string]: string } = {
      'angular': 'devicon-angularjs-plain colored',
      'typescript': 'devicon-typescript-plain colored',
      'javascript': 'devicon-javascript-plain colored',
      'html': 'devicon-html5-plain colored',
      'css': 'devicon-css3-plain colored',
      'scss': 'devicon-sass-original colored',
      'react': 'devicon-react-original colored',
      'vue': 'devicon-vuejs-plain colored',
      'java': 'devicon-java-plain colored',
      'spring': 'devicon-spring-plain colored',
      'spring boot': 'devicon-spring-plain colored',
      'node': 'devicon-nodejs-plain colored',
      'express': 'devicon-express-original colored',
      'python': 'devicon-python-plain colored',
      'php': 'devicon-php-plain colored',
      'c#': 'devicon-csharp-plain colored',
      'postgresql': 'devicon-postgresql-plain colored',
      'mysql': 'devicon-mysql-plain colored',
      'mongodb': 'devicon-mongodb-plain colored',
      'git': 'devicon-git-plain colored',
      'docker': 'devicon-docker-plain colored',
    };

    for (const key in icons) {
      if (t.includes(key)) {
        return icons[key];
      }
    }
    return 'pi pi-code'; // Fallback icon
  }

  showPreview = computed(() => {
    const file = this.activeFile();
    return file && (file.id === 'inicio' || file.id === 'proyectos' || file.id === 'sobre-mi' || file.id === 'habilidades' || file.id === 'contacto');
  });

  toggleCode() {
    this.codeVisible.update(v => !v);
  }

  highlightedContent = computed(() => {
    const file = this.activeFile();
    if (!file || !file.content) return '';
    return this.highlight(file.content, file.language);
  });

  // Análisis dinámico de datos para las vistas previas (Re-agregado para compatibilidad con la plantilla)
  parsedData = computed(() => {
    const file = this.activeFile();
    if (!file || !file.content) return null;

    try {
      if (file.id === 'inicio') {
        return this.parseInicioTs(file.content);
      }
      if (file.id === 'sobre-mi') {
        const cleanJson = file.content.replace(/,\s*([\]}])/g, '$1');
        return JSON.parse(cleanJson);
      }
      if (file.id === 'proyectos') {
        return this.parseProyectosTs(file.content);
      }
      if (file.id === 'habilidades') {
        return this.parseHabilidadesYml(file.content);
      }
      if (file.id === 'contacto') {
        return this.parseContactoMd(file.content);
      }
    } catch (e) {
      console.warn('Error parsing preview data', e);
      return null;
    }
    return null;
  });

  private parseInicioTs(content: string) {
    const extract = (key: string) => {
      const match = content.match(new RegExp(`${key}:\\s*'([^']*)'`));
      return match ? match[1] : '';
    };

    return {
      nombre: extract('nombre'),
      titulo: extract('titulo'),
      ubicacion: extract('ubicacion'),
      bio: extract('bio'),
      stack: content.match(/stack:\s*\[([\s\S]*?)\]/)?.[1]
        .split(',')
        .map(s => s.trim().replace(/'/g, ''))
        .filter(s => s) || []
    };
  }

  private parseProyectosTs(content: string) {
    const projects: any[] = [];

    // Simplificamos la extracción buscando el bloque de objetos
    // Noten que 'imagenes' ya no está en la regex
    const objectRegex = /{\s*nombre:\s*'([^']*)'[\s\S]*?descripcionCorta:\s*'([^']*)'[\s\S]*?stack:\s*\[([\s\S]*?)\]\s*,\s*capacidades:\s*\[([\s\S]*?)\]\s*,\s*arquitectura:\s*'([^']*)'[\s\S]*?tags:\s*\[([^\]]*?)\][\s\S]*?estado:\s*'([^']*)'[\s\S]*?demoUrl:\s*'([^']*)'[\s\S]*?repoUrl:\s*'([^']*)'(?:\s*,\s*bannerUrl:\s*'([^']*)')?\s*}/g;

    let match;
    while ((match = objectRegex.exec(content)) !== null) {
      // Helper para limpiar arrays de strings simples
      const cleanStringArray = (str: string) => str.split('\n')
        .map(s => s.trim().replace(/^['"]|['"]$/g, '').replace(/,$/, '').trim())
        .filter(s => s && s !== '[' && s !== ']');

      // Helper para limpiar el stack que es un array de objetos
      const cleanStack = (str: string) => {
        const items = [];
        const itemRegex = /{ name: '([^']*)', icon: '([^']*)' }/g;
        let itemMatch;
        while ((itemMatch = itemRegex.exec(str)) !== null) {
          items.push({ name: itemMatch[1], icon: itemMatch[2] });
        }
        return items;
      };

      projects.push({
        nombre: match[1],
        descripcionCorta: match[2],
        stack: cleanStack(match[3]),
        capacidades: cleanStringArray(match[4]),
        arquitectura: match[5],
        tags: cleanStringArray(match[6]),
        estado: match[7],
        demoUrl: match[8],
        repoUrl: match[9],
        bannerUrl: match[10] || null
      });
    }

    return projects;
  }

  private parseHabilidadesYml(content: string) {
    const lines = content.split('\n');
    const skills: any = {};
    let currentCategory = '';

    lines.forEach(line => {
      const categoryMatch = line.match(/^(\w+):/);
      if (categoryMatch) {
        currentCategory = categoryMatch[1];
        skills[currentCategory] = [];
      } else if (currentCategory && line.trim().startsWith('-')) {
        skills[currentCategory].push(line.trim().substring(2).trim());
      }
    });
    return skills;
  }

  private parseContactoMd(content: string) {
    const extract = (key: string) => {
      const regex = new RegExp(`- \\*\\*${key}:\\*\\*\\s*(.*)`);
      const match = content.match(regex);
      return match ? match[1].trim() : '';
    };

    return {
      email: extract('Email'),
      emailProvisional: extract('Email Provisional'),
      telefono: extract('Telefono'),
      preferencia: content.split('\n\n').pop()?.replace(/\n/g, '').trim() || ''
    };
  }


  // Resaltado de sintaxis robusto (simulando VS Code)
  private highlight(code: string, lang?: string): SafeHtml {
    if (!code) return '';

    const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (lang === 'typescript' || lang === 'json' || lang === 'javascript') {
      let html = '';
      const tokenRegex = /((?:\/\/.*)|(?:\/\*[\s\S]*?\*\/))|((?:'[^']*')|(?:"[^"]*")|(?:`[\s\S]*?`))|(\b\d+\b)|(\b(?:export|const|let|var|function|class|interface|return|true|false|null|import|from|public|private|protected|type|implements|extends|this|new|void|any|string|number|boolean)\b)/g;

      let lastIndex = 0;
      let match;

      while ((match = tokenRegex.exec(code)) !== null) {
        html += escape(code.slice(lastIndex, match.index));

        const [fullMatch, comment, string, number, keyword] = match;

        if (comment) {
          html += `<span style="color: #6a9955">${escape(comment)}</span>`;
        } else if (string) {
          html += `<span style="color: #ce9178">${escape(string)}</span>`;
        } else if (number) {
          html += `<span style="color: #b5cea8">${escape(number)}</span>`;
        } else if (keyword) {
          html += `<span style="color: #569cd6">${escape(keyword)}</span>`;
        }

        lastIndex = tokenRegex.lastIndex;
      }
      html += escape(code.slice(lastIndex));
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    if (lang === 'markdown') {
      let html = escape(code);
      html = html
        .replace(/^#\s(.*)$/gm, '<span style="color: #569cd6; font-weight: bold;"># $1</span>')
        .replace(/(\*\*(.*?)\*\*)/g, '<span style="color: #ce9178; font-weight: bold;">$1</span>')
        .replace(/(`[^`]+`)/g, '<span style="color: #ce9178;">$1</span>');
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    if (lang === 'yaml') {
      const lines = code.split('\n');
      const processedLines = lines.map(line => {
        const parts = /^(\s*)([\w-]+)(:)(.*)$/.exec(line);
        if (parts) {
          const [_, indent, key, colon, val] = parts;
          return `${indent}<span style="color: #9cdcfe">${escape(key)}</span>${colon}<span style="color: #ce9178">${escape(val)}</span>`;
        }
        return escape(line);
      });
      return this.sanitizer.bypassSecurityTrustHtml(processedLines.join('\n'));
    }

    return this.sanitizer.bypassSecurityTrustHtml(escape(code));
  }

}

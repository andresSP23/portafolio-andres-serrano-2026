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
                <div class="profile-view">
                  <!-- Tarjeta Principal: Avatar + Código -->
                  <div class="hero-card">
                    <div class="avatar-section">
                       <!-- User Avatar Image -->
                       <div class="avatar-circle">
                         <img src="assets/avatar.jpg" alt="Andres Serrano" class="avatar-img">
                       </div>
                    </div>
                    <div class="code-snippet-section">
                      <pre class="mini-code">
<span style="color: #569cd6">const</span> <span style="color: #4ec9b0">desarrollador</span> = {{ '{' }}
  <span style="color: #9cdcfe">nombre</span>: <span style="color: #ce9178">'Andres Serrano'</span>,
  <span style="color: #9cdcfe">titulo</span>: <span style="color: #ce9178">'Desarrollador de Software'</span>,
  <span style="color: #9cdcfe">ubicacion</span>: <span style="color: #ce9178">'Ecuador'</span>,
  <span style="color: #9cdcfe">disponible</span>: <span style="color: #569cd6">true</span>
{{ '}' }}</pre>
                    </div>
                  </div>

                  <!-- Tarjeta de Información: Biografía + Botones -->
                  <div class="info-card">
                    <h2 class="role-title">Desarrollador de Software</h2>
                    <p class="bio-text">
                      Soy un Desarrollador de Software apasionado por la tecnología y la creación de soluciones eficientes. Me encanta enfrentar nuevos desafíos, aprender constantemente y aportar ideas innovadoras.
                    </p>
                    
                    <div class="social-actions" style="margin-bottom: 25px;">
                      <a href="https://github.com/andresSP23" target="_blank" class="social-btn">
                        <i class="pi pi-github"></i> GitHub
                      </a>
                      <a href="https://www.linkedin.com/in/andrés-serrano-00b758345" target="_blank" class="social-btn">
                        <i class="pi pi-linkedin"></i> LinkedIn
                      </a>
                        <a href="assets/cv.pdf" download="Andres_Serrano_CV.pdf" class="social-btn">
                        <i class="pi pi-file-pdf"></i>Descargar CV
                      </a>
                    </div>

                    <!-- Stack Tecnológico -->
                     <h3 class="role-title" style="font-size: 18px; margin-top: 10px;">Stack Principal</h3>
                     <div class="project-tags huge-tags">
                        @if (parsedData()?.stack) {
                            @for (tech of parsedData().stack; track tech) {
                                <span [style]="getTechStyle(tech)" style="display: inline-flex; align-items: center; gap: 5px;">
                                  <i [class]="getTechIcon(tech)"></i>
                                  {{ tech }}
                                </span>
                            }
                        } @else {
                             <!-- Fallback por si falla el parseo o antes de sincronizar -->
                             <span>Angular</span><span>Java</span><span>TypeScript</span><span>Spring Boot</span><span>PostgreSQL</span>
                        }
                     </div>
                  </div>
                </div>
              }

              @if (activeFile()!.id === 'proyectos' && parsedData()) {
                <div class="profile-view">
                  <div class="info-card">
                    <h2 class="role-title" style="margin-bottom: 20px;">
                      <i class="pi pi-folder card-icon"></i>Proyectos
                    </h2>
                    <div class="projects-grid" style="display: flex; flex-direction: column; gap: 20px;">
                      @for (proj of parsedData(); track proj.nombre) {
                        <div class="project-card" style="padding: 15px; background: rgba(255,255,255,0.03); border-radius: 5px; border: none;">
                           <div class="project-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                               <h3 class="project-title" style="margin: 0; font-size: 20px; color: #4ec9b0; font-weight: 600;">
                                 {{ proj.nombre }}
                               </h3>
                               <div class="status" [class.finished]="proj.estado === 'Completado'" [class.in-progress]="proj.estado === 'En Progreso'" style="font-size: 11px; padding: 4px 8px; font-weight: bold; border-radius: 4px;">{{ proj.estado }}</div>
                           </div>

                           <div class="project-body" style="margin-bottom: 20px;">
                             <p class="value" style="margin: 0; line-height: 1.6; white-space: pre-line; color: #cccccc; font-size: 15px;">{{ proj.descripcion }}</p>
                           </div>
                              
                           <div class="project-stack" style="margin-bottom: 20px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px;">
                              <span style="font-size: 12px; color: #666; margin-bottom: 8px; display: block; text-transform: uppercase; letter-spacing: 0.5px; font-weight: bold;">Tecnologías</span>
                              <div class="project-tags huge-tags" style="display: inline-flex; flex-wrap: wrap; gap: 8px;">
                                 @for (tag of proj.tags; track tag) {
                                  <span [style]="getTechStyle(tag)" style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px;">
                                     <i [class]="getTechIcon(tag)" style="font-size: 14px;"></i>
                                     {{ tag }}
                                   </span>
                                 }
                              </div>
                           </div>

                           <!-- Carrusel de Imágenes del Proyecto -->
                           @if (proj.imagenes && proj.imagenes.length > 0) {
                             <div class="project-gallery" style="margin-bottom: 20px;">
                               <div class="carousel-container">
                                 <button class="carousel-control prev" (click)="prevImage(proj.nombre, proj.imagenes.length)">
                                   <i class="pi pi-chevron-left"></i>
                                 </button>

                                 <div class="carousel-slide" (click)="selectedImage.set(proj.imagenes[getCarouselIndex(proj.nombre)])">
                                   <img [src]="proj.imagenes[getCarouselIndex(proj.nombre)]" alt="Project Screenshot" class="carousel-img">
                                   <div class="carousel-counter">
                                     {{ getCarouselIndex(proj.nombre) + 1 }} / {{ proj.imagenes.length }}
                                   </div>
                                 </div>

                                 <button class="carousel-control next" (click)="nextImage(proj.nombre, proj.imagenes.length)">
                                   <i class="pi pi-chevron-right"></i>
                                 </button>
                               </div>
                             </div>
                           }

                           <!-- Botones de Acción -->
                           @if (proj.demoUrl || proj.repoUrl) {
                             <div class="project-actions" style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px; display: flex; gap: 10px; justify-content: flex-start;">
                               @if (proj.demoUrl) {
                                 <a [href]="proj.demoUrl" target="_blank" class="social-btn" style="min-width: auto; padding: 6px 16px; font-size: 13px;">
                                   <i class="pi pi-external-link"></i> Ver Demo
                                 </a>
                               }
                               @if (proj.repoUrl) {
                                 <a [href]="proj.repoUrl" target="_blank" class="social-btn" style="min-width: auto; padding: 6px 16px; font-size: 13px;">
                                   <i class="pi pi-github"></i> Repositorio
                                 </a>
                               }
                             </div>
                           }

                        </div>
                      }
                    </div>
                  </div>
                </div>
              }

              @if (activeFile()!.id === 'sobre-mi' && parsedData()) {
                <div class="profile-view">
                  <!-- Tarjeta de Educación -->
                  <div class="info-card">
                    <h2 class="role-title" style="margin-bottom: 20px;">
                     Formación Académica
                    </h2>
                    <div class="education-list">
                      @for (edu of parsedData().formacion; track edu.titulo) {
                        <div class="edu-item" style="padding: 15px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                           <div class="contact-list" style="gap: 5px;">
                              <div class="contact-item">
                                <span class="label">titulo:</span>
                                <span class="value" style="color: #ce9178; font-weight: bold;">{{ edu.titulo }}</span>
                              </div>
                              <div class="contact-item">
                                <span class="label">institucion:</span>
                                <span class="value" style="color: #ce9178;">{{ edu.institucion }}</span>
                              </div>
                              <div class="contact-item">
                                <span class="label">anio:</span>
                                <span class="value" style="color: #b5cea8;">{{ edu.anio }}</span>
                              </div>
                           </div>
                        </div>
                      }
                    </div>
                  </div>

                  <!-- Tarjeta de Experiencia -->
                  <div class="info-card">
                    <h2 class="role-title" style="margin-bottom: 20px;">
                      Experiencia Laboral
                    </h2>
                    <div class="education-list">
                      @for (exp of parsedData().experiencia; track exp.puesto) {
                        <div class="edu-item" style="padding: 15px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                           <div class="contact-list" style="gap: 5px;">
                              <div class="contact-item">
                                <span class="label">puesto:</span>
                                <span class="value" style="color: #ce9178; font-weight: bold;">{{ exp.puesto }}</span>
                              </div>
                              <div class="contact-item">
                                <span class="label">empresa:</span>
                                <span class="value" style="color: #ce9178;">{{ exp.empresa }}</span>
                              </div>
                              <div class="contact-item">
                                <span class="label">periodo:</span>
                                <span class="value" style="color: #ce9178;">{{ exp.periodo }}</span>
                              </div>
                              <div class="contact-item" style="align-items: flex-start;">
                                <span class="label">descripcion:</span>
                                <p class="value" style="margin: 0; line-height: 1.5; flex: 1; white-space: pre-line;">{{ exp.descripcion }}</p>
                              </div>
                           </div>
                        </div>
                      }
                    </div>
                  </div>

                  <!-- Tarjeta de Intereses -->
                  <div class="info-card">
                    <h2 class="role-title" style="margin-bottom: 20px;">
                    Intereses
                    </h2>
                     <div class="education-list" style="display: flex; flex-wrap: wrap; align-items: center; gap: 5px; padding-left: 10px;">
                       @for (int of parsedData().intereses; track int; let last = $last) {
                         <span class="value" style="color: #ce9178;">{{ int }}</span>@if(!last){<span style="color: #666; margin-right: 5px;">,</span>}
                       }
                     </div>
                  </div>
                </div>
              }

              @if (activeFile()!.id === 'habilidades' && parsedData()) {
                <div class="profile-view">
                  <div class="info-card">
                    <h2 class="role-title" style="margin-bottom: 20px;">
                      <i class="pi pi-bolt card-icon"></i>Habilidades Técnicas
                    </h2>
                    
                    <div class="skills-section">
                       <div class="edu-item" style="padding: 15px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                          <div style="margin-bottom: 10px;">
                              <span class="label" style="font-size: 16px;">frontend:</span>
                          </div>
                          <div class="project-tags huge-tags" style="padding-left: 15px;">
                            @for (skill of parsedData().frontend; track skill) {
                              <span style="border: 1px solid #569cd6; color: #569cd6; background: rgba(86, 156, 214, 0.1); padding: 4px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px;">
                                <i [class]="getTechIcon(skill)"></i>
                                {{ skill }}
                              </span>
                            }
                          </div>
                       </div>
                    </div>

                    <div class="skills-section" style="margin-top: 15px;">
                       <div class="edu-item" style="padding: 15px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                          <div style="margin-bottom: 10px;">
                              <span class="label" style="font-size: 16px;">backend:</span>
                          </div>
                          <div class="project-tags huge-tags" style="padding-left: 15px;">
                            @for (skill of parsedData().backend; track skill) {
                              <span style="border: 1px solid #ce9178; color: #ce9178; background: rgba(206, 145, 120, 0.1); padding: 4px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px;">
                                <i [class]="getTechIcon(skill)"></i>
                                {{ skill }}
                              </span>
                            }
                          </div>
                       </div>
                    </div>

                    <div class="skills-section" style="margin-top: 15px;">
                       <div class="edu-item" style="padding: 15px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                          <div style="margin-bottom: 10px;">
                              <span class="label" style="font-size: 16px;">herramientas:</span>
                          </div>
                          <div class="project-tags huge-tags" style="padding-left: 15px;">
                            @for (tool of parsedData().herramientas; track tool) {
                              <span style="border: 1px solid #4ec9b0; color: #4ec9b0; background: rgba(78, 201, 176, 0.1); padding: 4px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px;">
                                <i [class]="getTechIcon(tool)"></i>
                                {{ tool }}
                              </span>
                            }
                          </div>
                       </div>
                    </div>

                    <div class="skills-section" style="margin-top: 15px;">
                       <div class="edu-item" style="padding: 15px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                          <div style="margin-bottom: 10px;">
                              <span class="label" style="font-size: 16px;">bases_de_datos:</span>
                          </div>
                          <div class="project-tags huge-tags" style="padding-left: 15px;">
                            @for (tool of parsedData().bases_de_datos; track tool) {
                              <span style="border: 1px solid #4ec9b0; color: #4ec9b0; background: rgba(78, 201, 176, 0.1); padding: 4px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px;">
                                <i [class]="getTechIcon(tool)"></i>
                                {{ tool }}
                              </span>
                            }
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              }

              @if (activeFile()!.id === 'contacto' && parsedData()) {
                <div class="profile-view">
                  <div class="info-card">
                    <h2 class="role-title" style="margin-bottom: 20px;">
                      <i class="pi pi-envelope card-icon"></i>Contacto
                    </h2>
                    
                    <div class="contact-list" style="gap: 15px;">
                       <div class="contact-item">
                          <span class="label">email:</span>
                          <span class="value" style="color: #ce9178; font-weight: bold;">{{ parsedData().email }}</span>
                       </div>
                       @if (parsedData().telefono) {
                         <div class="contact-item">
                            <span class="label">telefono:</span>
                            <span class="value" style="color: #b5cea8;">{{ parsedData().telefono }}</span>
                         </div>
                       }
                     </div>

                    <div class="contact-footer" style="margin-top: 30px; font-style: italic; color: var(--vscode-accent);">
                      {{ parsedData().footer }}
                    </div>
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
      font-family: var(--font-mono);
      font-size: 14px;
      line-height: 1.5;
      overflow: hidden;
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

    /* Estilos para el Diseño del Perfil */
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
      background-color: var(--vscode-editor-bg);
      border: 1px solid var(--vscode-border);
      border-radius: 4px;
      padding: 30px;
      gap: 30px;
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
      background-color: var(--vscode-sidebar-bg);
      border: 1px solid var(--vscode-border);
      border-radius: 4px;
      padding: 30px;
    }

    .role-title {
      color: #4ec9b0;
      font-size: 24px;
      margin-bottom: 8px;
      font-weight: 600;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .card-icon {
      color: #4ec9b0;
      font-size: 20px;
      margin-right: 10px;
    }

    .bio-text {
      color: #ce9178;
      line-height: 1.6;
      margin-bottom: 25px;
      max-width: 100%;
      font-size: 15px;
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
    }
    
    .project-card {
      background-color: #252526;
      padding: 24px;
      border-radius: 8px;
      border: 1px solid #3e3e42;
      margin-bottom: 24px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }

    .project-title {
       margin: 0; 
       font-size: 22px; 
       color: #ffffff; /* High contrast white */
       font-weight: 700;
       letter-spacing: -0.5px;
    }

    .project-desc {
       margin: 0; 
       line-height: 1.6; 
       white-space: pre-line; 
       color: #d4d4d4; /* Light gray for better readability */
       font-size: 15px;
    }

    .projects-grid {
      display: flex;
      flex-direction: column; 
      gap: 20px;
      width: 100%;
    }

    .status {
      display: inline-block;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 4px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .status.finished { background-color: rgba(76, 175, 80, 0.2); color: #4caf50; border: 1px solid rgba(76, 175, 80, 0.3); }
    .status.in-progress { background-color: rgba(33, 150, 243, 0.2); color: #2196f3; border: 1px solid rgba(33, 150, 243, 0.3); }
    
    .project-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
    
    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .contact-item {
      display: flex;
      gap: 10px;
      align-items: baseline;
      font-size: 15px;
      flex-wrap: wrap;
    }

    .contact-item .label {
      font-weight: 400; 
      color: #9cdcfe; 
      width: auto; 
      margin-right: 0;
      flex-shrink: 0;
    }

    .contact-item .value {
      color: #ce9178; 
      word-break: break-all;
      flex: 1;
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
  `]
})
export class CodeEditorComponent {
  window = window;
  editorState = inject(EditorState);
  selectedImage = signal<string | null>(null);

  // Carousel State
  carouselIndices = signal<Record<string, number>>({});

  getCarouselIndex(projectId: string): number {
    return this.carouselIndices()[projectId] || 0;
  }

  nextImage(projectId: string, total: number) {
    this.carouselIndices.update(indices => ({
      ...indices,
      [projectId]: (this.getCarouselIndex(projectId) + 1) % total
    }));
  }

  prevImage(projectId: string, total: number) {
    this.carouselIndices.update(indices => ({
      ...indices,
      [projectId]: (this.getCarouselIndex(projectId) - 1 + total) % total
    }));
  }

  sanitizer = inject(DomSanitizer);

  activeFile = this.editorState.activeFile;

  codeVisible = signal(true);

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
      'angular': 'devicon-angularjs-plain',
      'typescript': 'devicon-typescript-plain',
      'javascript': 'devicon-javascript-plain',
      'html': 'devicon-html5-plain',
      'css': 'devicon-css3-plain',
      'scss': 'devicon-sass-original',
      'react': 'devicon-react-original',
      'vue': 'devicon-vuejs-plain',
      'java': 'devicon-java-plain',
      'spring': 'devicon-spring-plain',
      'spring boot': 'devicon-spring-plain',
      'node': 'devicon-nodejs-plain',
      'express': 'devicon-express-original',
      'python': 'devicon-python-plain',
      'php': 'devicon-php-plain',
      'c#': 'devicon-csharp-plain',
      'postgresql': 'devicon-postgresql-plain',
      'mysql': 'devicon-mysql-plain',
      'mongodb': 'devicon-mongodb-plain',
      'git': 'devicon-git-plain',
      'docker': 'devicon-docker-plain',
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
    const projects = [];
    // Regex mejorado para capturar demoUrl, repoUrl e imagenes opcionales
    const projectRegex = /{\s*nombre:\s*'([^']*)',\s*descripcion:\s*[`'"]([\s\S]*?)[`'"],\s*tags:\s*\[([^\]]*)\],\s*estado:\s*'([^']*)'(?:\s*,\s*demoUrl:\s*'([^']*)')?(?:\s*,\s*repoUrl:\s*'([^']*)')?(?:\s*,\s*imagenes:\s*\[([^\]]*)\])?\s*}/g;

    let match;
    while ((match = projectRegex.exec(content)) !== null) {
      projects.push({
        nombre: match[1],
        descripcion: match[2].trim(),
        tags: match[3].split(',').map(t => t.trim().replace(/'/g, '')).filter(t => t),
        estado: match[4],
        demoUrl: match[5] || '',
        repoUrl: match[6] || '',
        imagenes: match[7] ? match[7].split(',').map(i => i.trim().replace(/'/g, '')).filter(i => i) : []
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
      telefono: extract('Telefono'),

      footer: content.match(/¡Hablemos de código!/)?.[0] || ''
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

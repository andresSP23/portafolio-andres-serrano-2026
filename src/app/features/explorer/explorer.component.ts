import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorState } from '../../state/editor.state';
import { FileNode } from '../../core/models/file-system.model';

@Component({
  selector: 'app-explorer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="explorer">
      <div class="explorer-header">
        <span>EXPLORADOR</span>
        <i class="pi pi-ellipsis-h"></i>
      </div>
      
      <div class="file-tree">
        <!-- Carpeta Raíz del Proyecto -->
        <div class="folder-header" (click)="toggleRoot()">
           <i class="pi" [ngClass]="isRootOpen ? 'pi-angle-down' : 'pi-angle-right'"></i>
           <span class="folder-name">{{ rootNode.name }}</span>
        </div>

        @if (isRootOpen) {
          <div class="file-list">
            @for (node of rootNode.children; track node.id) {
              <div 
                class="file-item" 
                [class.active]="editorState.activeFileId() === node.id"
                (click)="onFileClick(node)">
                
                <i class="pi" [ngClass]="getFileIcon(node)"></i>
                <span class="file-name">{{ node.name }}</span>
              </div>
            }
          </div>
        }
      </div>
    </aside>
  `,
  styles: [`
    .explorer {
      background-color: var(--vscode-sidebar-bg);
      height: 100%;
      color: var(--vscode-text);
      font-size: 13px;
      user-select: none;
    }

    .explorer-header {
      padding: 10px 20px;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .folder-header {
      padding: 4px 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: bold;
    }

    .folder-header:hover {
      background-color: var(--vscode-hover);
    }

    .file-item {
      padding: 3px 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #cccccc;
    }

    .file-item:hover {
      background-color: var(--vscode-hover);
    }

    .file-item.active {
      background-color: var(--vscode-selection);
      color: white;
    }

    .file-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `]
})
export class ExplorerComponent {
  editorState = inject(EditorState);

  // Estado local del explorador
  isRootOpen = true;

  get rootNode() {
    return this.editorState.files()[0];
  }

  toggleRoot() {
    this.isRootOpen = !this.isRootOpen;
  }

  onFileClick(file: FileNode) {
    this.editorState.openFile(file);

    // En móviles, cerramos el sidebar después de seleccionar un archivo
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      this.editorState.setSidebarVisibility(false);
    }
  }

  getFileIcon(file: FileNode): string {
    switch (file.language) {
      case 'typescript': return 'pi-code text-blue-500'; // Azul TS
      case 'html': return 'pi-code text-orange-500'; // Naranja HTML
      case 'css': return 'pi-palette text-blue-300'; // Azul claro CSS
      case 'json': return 'pi-sliders-h text-yellow-400'; // Amarillo JSON
      case 'markdown': return 'pi-info-circle text-blue-200'; // Azul claro MD
      case 'image': return 'pi-image text-purple-400';
      case 'yaml': return 'pi-file text-red-400'; // Rojo YAML
      default: return 'pi-file';
    }
  }
}

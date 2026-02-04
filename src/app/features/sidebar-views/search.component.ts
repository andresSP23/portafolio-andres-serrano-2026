import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorState } from '../../state/editor.state';
import { FileNode } from '../../core/models/file-system.model';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule],
    template: `
    <aside class="search-view">
      <div class="search-header">
        <span>BUSCAR</span>
      </div>
      
      <div class="search-input-container">
        <input 
          type="text" 
          placeholder="Buscar archivos por nombre o extensión..." 
          (input)="onSearchInput($event)"
          [value]="editorState.searchQuery()"
          class="search-input">
      </div>

      <div class="search-results">
        @if (editorState.searchQuery()) {
          <div class="results-header">
            {{ editorState.filteredFiles().length }} resultados encontrados
          </div>
          
          <div class="file-list">
            @for (file of editorState.filteredFiles(); track file.id) {
              <div 
                class="file-item" 
                (click)="onFileClick(file)">
                <i class="pi" [ngClass]="getFileIcon(file)"></i>
                <div class="file-info">
                  <span class="file-name">{{ file.name }}</span>
                  <span class="file-path">{{ file.id }}</span>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="search-placeholder">
            Escribe algo para buscar en el portafolio...
          </div>
        }
      </div>
    </aside>
  `,
    styles: [`
    .search-view {
      background-color: var(--vscode-sidebar-bg);
      height: 100%;
      color: var(--vscode-text);
      font-size: 13px;
      display: flex;
      flex-direction: column;
    }

    .search-header {
      padding: 10px 20px;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .search-input-container {
      padding: 0 10px 10px 10px;
    }

    .search-input {
      width: 100%;
      background-color: var(--vscode-input-bg, #3c3c3c);
      border: 1px solid var(--vscode-border);
      color: white;
      padding: 4px 8px;
      outline: none;
      font-size: 13px;
    }

    .search-input:focus {
      border-color: #007acc;
    }

    .search-results {
      flex: 1;
      overflow-y: auto;
    }

    .results-header {
      padding: 5px 20px;
      font-size: 11px;
      color: #888;
    }

    .search-placeholder {
      padding: 20px;
      color: #888;
      text-align: center;
      font-style: italic;
    }

    .file-item {
      padding: 5px 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .file-item:hover {
      background-color: var(--vscode-hover);
    }

    .file-info {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .file-name {
      font-weight: 500;
    }

    .file-path {
      font-size: 11px;
      color: #888;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `]
})
export class SearchComponent {
    editorState = inject(EditorState);

    onSearchInput(event: Event) {
        const query = (event.target as HTMLInputElement).value;
        this.editorState.setSearchQuery(query);
    }

    onFileClick(file: FileNode) {
        this.editorState.openFile(file);
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            this.editorState.setSidebarVisibility(false);
        }
    }

    getFileIcon(file: FileNode): string {
        switch (file.language) {
            case 'typescript': return 'pi-code text-blue-500';
            case 'html': return 'pi-code text-orange-500';
            case 'css': return 'pi-palette text-blue-300';
            case 'json': return 'pi-sliders-h text-yellow-400';
            case 'markdown': return 'pi-info-circle text-blue-200';
            case 'image': return 'pi-image text-purple-400';
            case 'yaml': return 'pi-file text-red-400';
            default: return 'pi-file';
        }
    }
}

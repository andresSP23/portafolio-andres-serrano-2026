import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorState } from '../../state/editor.state';
import { FileNode } from '../../core/models/file-system.model';

@Component({
    selector: 'app-editor-tabs',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="tabs-container">
      @for (file of editorState.openFiles(); track file.id) {
        <div 
          class="tab" 
          [class.active]="editorState.activeFileId() === file.id"
          (click)="activate(file.id)"
          (auxclick)="close(file.id, $event)">
          
          <i class="pi file-icon" [ngClass]="getFileIcon(file)"></i>
          <span class="tab-name">{{ file.name }}</span>
          <i class="pi pi-times close-icon" (click)="close(file.id, $event)"></i>
        </div>
      }
    </div>
  `,
    styles: [`
    .tabs-container {
      display: flex;
      background-color: var(--vscode-bg);
      overflow-x: auto;
      height: 35px;
    }
    
    .tab {
      display: flex;
      align-items: center;
      padding: 0 10px;
      min-width: 120px;
      max-width: 200px;
      height: 100%;
      background-color: var(--vscode-tab-inactive);
      color: #969696;
      cursor: pointer;
      border-right: 1px solid var(--vscode-border);
      font-size: 13px;
      user-select: none;
    }
    
    .tab:hover {
      background-color: var(--vscode-bg);
      color: var(--vscode-text);
    }
    
    .tab.active {
      background-color: var(--vscode-text); 
      background-color: var(--vscode-editor-bg);
      border-top: 1px solid var(--vscode-accent);
      color: white;
    }

    .file-icon {
      margin-right: 6px;
      font-size: 0.9rem;
    }

    .tab-name {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 5px;
    }

    .close-icon {
      font-size: 0.8rem;
      opacity: 0;
      border-radius: 4px;
      padding: 2px;
    }

    .tab:hover .close-icon, .tab.active .close-icon {
      opacity: 1;
    }

    .close-icon:hover {
      background-color: #4b4b4b;
    }
  `]
})
export class EditorTabsComponent {
    editorState = inject(EditorState);

    activate(id: string) {
        this.editorState.setActive(id);
    }

    close(id: string, event: Event) {
        this.editorState.closeFile(id, event);
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

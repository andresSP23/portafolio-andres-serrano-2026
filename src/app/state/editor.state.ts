import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { FileNode } from '../core/models/file-system.model';
import { FILES } from '../core/data/file-system.data';

@Injectable({
    providedIn: 'root'
})
export class EditorState {
    // Señales de Estado
    readonly files = signal<FileNode[]>(FILES);
    readonly openFiles: WritableSignal<FileNode[]> = signal([]);
    readonly activeFileId: WritableSignal<string | null> = signal(null);
    readonly isSidebarVisible = signal(true);
    readonly activeSidebarTab = signal<'explorer' | 'search' | 'source-control' | 'user' | 'settings' | 'extensions'>('explorer');
    readonly searchQuery = signal('');

    // Selectores Computados
    readonly activeFile = computed(() => {
        const id = this.activeFileId();
        return this.openFiles().find(f => f.id === id) || null;
    });

    readonly allFiles = computed(() => {
        const flatten = (nodes: FileNode[]): FileNode[] => {
            return nodes.reduce((acc, node) => {
                acc.push(node);
                if (node.children) {
                    acc.push(...flatten(node.children));
                }
                return acc;
            }, [] as FileNode[]);
        };
        return flatten(this.files()).filter(f => f.type === 'file');
    });

    readonly filteredFiles = computed(() => {
        const query = this.searchQuery().toLowerCase().trim();
        if (!query) return [];
        return this.allFiles().filter(f =>
            f.name.toLowerCase().includes(query) ||
            (f.language && f.language.toLowerCase().includes(query))
        );
    });

    constructor() {
        // Abrir README por defecto
        const readme = this.findFile('readme');
        if (readme) {
            this.openFile(readme);
        }

        // En móviles, cerramos el sidebar por defecto
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            this.isSidebarVisible.set(false);
        }
    }

    // Acciones
    toggleSidebar() {
        this.isSidebarVisible.update(v => !v);
    }

    setSidebarVisibility(visible: boolean) {
        this.isSidebarVisible.set(visible);
    }

    setActiveSidebarTab(tab: 'explorer' | 'search' | 'source-control' | 'user' | 'settings' | 'extensions') {
        if (this.activeSidebarTab() === tab && this.isSidebarVisible()) {
            this.isSidebarVisible.set(false);
        } else {
            this.activeSidebarTab.set(tab);
            this.isSidebarVisible.set(true);
        }
    }

    setSearchQuery(query: string) {
        this.searchQuery.set(query);
    }

    // Acciones
    openFile(file: FileNode) {
        if (file.type === 'folder') return; // No abrir carpetas como pestañas

        this.openFiles.update(files => {
            if (!files.find(f => f.id === file.id)) {
                return [...files, file];
            }
            return files;
        });
        this.activeFileId.set(file.id);
    }

    closeFile(fileId: string, event?: Event) {
        if (event) {
            event.stopPropagation();
        }

        this.openFiles.update(files => files.filter(f => f.id !== fileId));

        // Si cerramos el archivo activo, cambiamos al último disponible
        if (this.activeFileId() === fileId) {
            const remaining = this.openFiles();
            this.activeFileId.set(remaining.length ? remaining[remaining.length - 1].id : null);
        }
    }

    setActive(fileId: string) {
        this.activeFileId.set(fileId);
    }

    // Ayudante para encontrar archivos profundos (recursión simple por ahora ya que la profundidad es baja)
    private findFile(id: string): FileNode | undefined {
        // Función para aplanar la estructura
        const flatten = (nodes: FileNode[]): FileNode[] => {
            return nodes.reduce((acc, node) => {
                acc.push(node);
                if (node.children) {
                    acc.push(...flatten(node.children));
                }
                return acc;
            }, [] as FileNode[]);
        };

        return flatten(this.files()).find(f => f.id === id);
    }
}

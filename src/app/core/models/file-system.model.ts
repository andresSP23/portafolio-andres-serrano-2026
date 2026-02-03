export type FileType = 'typescript' | 'html' | 'css' | 'json' | 'markdown' | 'image' | 'yaml';

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  language?: FileType;
  content?: string;
  children?: FileNode[];
  isOpen?: boolean;
}

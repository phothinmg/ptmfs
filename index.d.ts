declare module "ptmfs" {
  export function clear(folderPath: string): Promise<void>;
  export function ensureDir(folderPath: string): Promise<void>;
  export function ensureDirSync(folderPath: string): void;
  export function existsFilePath(filePath: string): boolean;
  export function writeFile(filePath: string, content: string): Promise<void>;
  export function writeFileSync(filePath: string, content: string): void;
  export function isFile(filePath: string): boolean;
  export function getFilesFromDir(folderPath: string): Promise<string[]>;
  export function getFilesFromDirSync(folderPath: string): string[];
  export function getFilesFromDirSyncWithExt(
    folderPath: string,
    exts: string | string[]
  ): string[];
  export function getStringFromFile(filePath: string): Promise<string>;
  export function getStringFromFileSync(filePath: string): string;
  export function remove(filePath: string): Promise<void>;
  export function removeSync(filePath: string): void;
}

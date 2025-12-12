declare module "ptm:fs" {
  function clear(folderPath: string): Promise<void>;
  function ensureDir(folderPath: string): Promise<void>;
  function ensureDirSync(folderPath: string): void;
  function existsFilePath(filePath: string): boolean;
  function writeFile(filePath: string, content: string): Promise<void>;
  function writeFileSync(filePath: string, content: string): void;
  function isFile(filePath: string): boolean;
  function getFilesFromDir(folderPath: string): Promise<string[]>;
  function getFilesFromDirSync(folderPath: string): string[];
  function getFilesFromDirSyncWithExt(
    folderPath: string,
    exts: string | string[]
  ): string[];
}

declare module "ptmfs" {
  export * from "ptm:fs";
}

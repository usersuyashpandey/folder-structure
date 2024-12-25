export interface IFolder {
  type: "folder";
  name: string;
  children: (IFolder | IFile)[];
}

export interface IFile {
  type: "file";
  name: string;
}

export interface FolderStructureProps {
  data: {
    Documents: string[];
    Desktop: string[];
    Downloads: {
      Drivers: string[];
      Applications: string[];
      "chromedriver.dmg": string[];
    };
  };
}

export type FileSystemItem = IFolder | IFile;

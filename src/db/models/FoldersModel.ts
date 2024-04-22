export interface FoldersModelI {
    folderId: number;
    parentFolderId: number | null;
    name: string;
    nodeType: string;
    createdAt: Date;
    updatedAt: Date;
}


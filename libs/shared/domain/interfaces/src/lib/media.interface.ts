export enum IMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
}

export enum IMediaStorageType {
  LOCAL = 'local',
  AZURE = 'azure',
}

export interface IMediaMetadata {
  // Common metadata
  size: number; // in bytes
  mimeType: string;
  uploadDate: Date;

  // Image-specific metadata (if applicable)
  dimensions?: {
    width: number;
    height: number;
  };
  format?: string; // e.g., JPEG, PNG

  // Video-specific metadata (if applicable)
  duration?: number; // in seconds
  resolution?: {
    width: number;
    height: number;
  };

  // Document-specific metadata (if applicable)
  pageCount?: number;
  author?: string;
  title?: string;
}

export interface IMedia {
  id: string;
  name: string;
  originalName: string;
  type: IMediaType;
  storageType: IMediaStorageType;
  metadata: IMediaMetadata;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

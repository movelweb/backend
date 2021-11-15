import { Image } from 'src/entities/image.entity';
import { CreateImage } from './images';

interface IImageService {
  getImage: (imageId: string) => Promise<Image>;
  getImages: (homeId: string) => Promise<Image[]>;
  create: (homeId: string, data: CreateImage) => Promise<Image>;
  update: (id: string, file: string) => Promise<Image>;
  delete: (imageId: string) => void;
  deleteAll: (homeId: string) => void;
}

export type { IImageService };

import { Home } from 'src/entities/home.entity';
import CreateHomeDTO from '../dto/create.dto';
import UpdateHomeDTO from '../dto/update.dto';

interface IHomesService {
  create: (data: CreateHomeDTO) => Promise<Home>;
  update: (id: string, data: UpdateHomeDTO) => Promise<Home>;
}

export type { IHomesService };

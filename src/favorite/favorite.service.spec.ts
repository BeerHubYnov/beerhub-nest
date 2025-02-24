import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from './favorite.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteService, PrismaService],
    }).compile();

    service = module.get<FavoriteService>(FavoriteService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all favorites', async () => {
    const favorites = [{ name: 'Test Favorite' }];
    prisma.favorite.findMany = jest.fn().mockReturnValue(favorites);
    expect(await service.findAll()).toEqual(favorites);
  });
});

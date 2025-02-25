import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from './favorite.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

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

  describe('create', () => {
    it('should create a favorite', async () => {
      const createFavoriteDto: CreateFavoriteDto = {
        id_User: uuidv4(),
        id_Bar: uuidv4(),
      };
      const createdFavorite = { id: uuidv4(), ...createFavoriteDto };

      jest.spyOn(prisma.favorite, 'create').mockResolvedValue(createdFavorite);

      expect(await service.create(createFavoriteDto)).toEqual(createdFavorite);
      expect(prisma.favorite.create).toHaveBeenCalledWith({
        data: createFavoriteDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of favorites', async () => {
      const favorites = [{ id: uuidv4(), id_User: uuidv4(), id_Bar: uuidv4() }];

      jest.spyOn(prisma.favorite, 'findMany').mockResolvedValue(favorites);

      expect(await service.findAll()).toEqual(favorites);
      expect(prisma.favorite.findMany).toHaveBeenCalledWith({
        include: {
          User: true,
          Bar: true,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single favorite by id', async () => {
      const favorite = { id: uuidv4(), id_User: uuidv4(), id_Bar: uuidv4() };

      jest.spyOn(prisma.favorite, 'findUnique').mockResolvedValue(favorite);

      expect(await service.findOne(favorite.id as UUID)).toEqual(favorite);
      expect(prisma.favorite.findUnique).toHaveBeenCalledWith({
        where: { id: favorite.id },
        include: {
          User: true,
          Bar: true,
        },
      });
    });
  });

  describe('remove', () => {
    it('should remove a favorite', async () => {
      const favoriteId = uuidv4();
      const removedFavorite = {
        id: favoriteId,
        id_User: uuidv4(),
        id_Bar: uuidv4(),
      };

      jest.spyOn(prisma.favorite, 'delete').mockResolvedValue(removedFavorite);

      expect(await service.remove(favoriteId as UUID)).toEqual(removedFavorite);
      expect(prisma.favorite.delete).toHaveBeenCalledWith({
        where: { id: favoriteId },
      });
    });
  });

  describe('findByUser', () => {
    it('should return an array of favorites by user id', async () => {
      const userId = uuidv4();
      const favorites = [{ id: uuidv4(), id_User: userId, id_Bar: uuidv4() }];

      jest.spyOn(prisma.favorite, 'findMany').mockResolvedValue(favorites);

      expect(await service.findByUser(userId as UUID)).toEqual(favorites);
      expect(prisma.favorite.findMany).toHaveBeenCalledWith({
        where: { id_User: userId },
        include: {
          User: true,
          Bar: true,
        },
      });
    });
  });

  describe('findByBar', () => {
    it('should return an array of favorites by bar id', async () => {
      const barId = uuidv4();
      const favorites = [{ id: uuidv4(), id_User: uuidv4(), id_Bar: barId }];

      jest.spyOn(prisma.favorite, 'findMany').mockResolvedValue(favorites);

      expect(await service.findByBar(barId as UUID)).toEqual(favorites);
      expect(prisma.favorite.findMany).toHaveBeenCalledWith({
        where: { id_Bar: barId },
        include: {
          User: true,
          Bar: true,
        },
      });
    });
  });
});

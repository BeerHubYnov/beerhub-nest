import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    const users = [
      { id: '233aad60-87d7-4b8f-b363-db47b6ed942c', username: 'testuser' },
    ];
    (prismaService.user.findMany as jest.Mock).mockResolvedValue(users);
    const result = await service.findAll();
    expect(result).toEqual(users);
    expect(prismaService.user.findMany).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const user = {
      id: '233aad60-87d7-4b8f-b363-db47b6ed942c',
      username: 'testuser',
    };
    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(user);
    const result = await service.findOne(
      '233aad60-87d7-4b8f-b363-db47b6ed942c' as UUID,
    );
    expect(result).toEqual(user);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: '233aad60-87d7-4b8f-b363-db47b6ed942c' },
      include: { Role: true },
    });
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = {
      email: 'updated@example.com',
      username: 'updateduser',
    };
    const user = { id: '233aad60-87d7-4b8f-b363-db47b6ed942c', ...dto };
    (prismaService.user.update as jest.Mock).mockResolvedValue(user);
    const result = await service.update(
      '233aad60-87d7-4b8f-b363-db47b6ed942c' as UUID,
      dto,
    );
    expect(result).toEqual(user);
    expect(prismaService.user.update).toHaveBeenCalledWith({
      where: { id: '233aad60-87d7-4b8f-b363-db47b6ed942c' },
      data: dto,
      include: { Role: true },
    });
  });

  it('should remove a user', async () => {
    const user = {
      id: '233aad60-87d7-4b8f-b363-db47b6ed942c',
      username: 'testuser',
    };
    (prismaService.user.delete as jest.Mock).mockResolvedValue(user);
    const result = await service.remove('233aad60-87d7-4b8f-b363-db47b6ed942c');
    expect(result).toEqual(user);
    expect(prismaService.user.delete).toHaveBeenCalledWith({
      where: { id: '233aad60-87d7-4b8f-b363-db47b6ed942c' },
    });
  });
});

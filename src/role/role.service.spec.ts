import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('RoleService', () => {
  let service: RoleService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService, PrismaService],
    }).compile();

    service = module.get<RoleService>(RoleService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all roles', async () => {
    const roles = [{ name: 'Test Role' }];
    prisma.role.findMany = jest.fn().mockReturnValue(roles);
    expect(await service.findAll()).toEqual(roles);
  });
});

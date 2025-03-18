import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UUID } from 'crypto';

describe('RoleService', () => {
  let service: RoleService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: PrismaService,
          useValue: {
            role: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a role', async () => {
    const createRoleDto: CreateRoleDto = { name: 'Test Role' };
    const createdRole = { id: 'role-id', ...createRoleDto };

    (prisma.role.create as jest.Mock).mockResolvedValue(createdRole);

    const result = await service.create(createRoleDto);
    expect(result).toEqual(createdRole);
    expect(prisma.role.create).toHaveBeenCalledWith({
      data: createRoleDto,
    });
  });

  it('should find all roles', async () => {
    const roles = [{ id: 'role-id', name: 'Test Role' }];
    (prisma.role.findMany as jest.Mock).mockResolvedValue(roles);

    const result = await service.findAll();
    expect(result).toEqual(roles);
    expect(prisma.role.findMany).toHaveBeenCalled();
  });

  it('should find one role by id', async () => {
    const role = { id: 'role-id', name: 'Test Role' };
    (prisma.role.findUnique as jest.Mock).mockResolvedValue(role);

    const result = await service.findOne('role-id' as UUID);
    expect(result).toEqual(role);
    expect(prisma.role.findUnique).toHaveBeenCalledWith({
      where: { id: 'role-id' },
    });
  });

  it('should find a role by name', async () => {
    const role = { id: 'role-id', name: 'Test Role' };
    (prisma.role.findFirst as jest.Mock).mockResolvedValue(role);

    const result = await service.findByName('Test Role');
    expect(result).toEqual(role);
    expect(prisma.role.findFirst).toHaveBeenCalledWith({
      where: {
        name: {
          contains: 'Test Role',
          mode: 'insensitive',
        },
      },
    });
  });

  it('should update a role', async () => {
    const updateRoleDto: UpdateRoleDto = { name: 'Updated Role' };
    const updatedRole = { id: 'role-id', ...updateRoleDto };

    (prisma.role.update as jest.Mock).mockResolvedValue(updatedRole);

    const result = await service.update('role-id' as UUID, updateRoleDto);
    expect(result).toEqual(updatedRole);
    expect(prisma.role.update).toHaveBeenCalledWith({
      where: { id: 'role-id' },
      data: updateRoleDto,
    });
  });

  it('should remove a role', async () => {
    const removedRole = { id: 'role-id', name: 'Test Role' };

    (prisma.role.delete as jest.Mock).mockResolvedValue(removedRole);

    const result = await service.remove('role-id' as UUID);
    expect(result).toEqual(removedRole);
    expect(prisma.role.delete).toHaveBeenCalledWith({
      where: { id: 'role-id' },
    });
  });
});

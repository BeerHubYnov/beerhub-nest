import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UUID } from 'crypto';

describe('RoleController', () => {
  let controller: RoleController;
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByName: jest.fn(),
            update: jest.fn(),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a role', async () => {
      const createRoleDto: CreateRoleDto = { name: 'Test Role' };
      const createdRole = { id: 'role-id', ...createRoleDto };

      jest.spyOn(service, 'create').mockResolvedValue(createdRole);

      expect(await controller.create(createRoleDto)).toBe(createdRole);
    });
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const roles = [{ id: 'role-id', name: 'Test Role' }];

      jest.spyOn(service, 'findAll').mockResolvedValue(roles);

      expect(await controller.findAll()).toBe(roles);
    });
  });

  describe('findOne', () => {
    it('should return a single role by id', async () => {
      const role = { id: 'role-id', name: 'Test Role' };

      jest.spyOn(service, 'findOne').mockResolvedValue(role);

      expect(await controller.findOne('role-id' as UUID)).toBe(role);
    });
  });

  describe('findByName', () => {
    it('should return a role by name', async () => {
      const role = { id: 'role-id', name: 'Test Role' };

      jest.spyOn(service, 'findByName').mockResolvedValue(role);

      expect(await controller.findByName('Test Role')).toBe(role);
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      const updateRoleDto: UpdateRoleDto = { name: 'Updated Role' };
      const updatedRole = { id: 'role-id', name: 'Updated Role' };

      jest.spyOn(service, 'update').mockResolvedValue(updatedRole);

      expect(await controller.update('role-id' as UUID, updateRoleDto)).toBe(
        updatedRole,
      );
    });

    it('should call update with the correct arguments', async () => {
      const updateRoleDto: UpdateRoleDto = { name: 'Updated Role' };
      const roleId: UUID = 'role-id' as UUID;
      const updatedRole = { id: roleId, name: 'Updated Role' };

      jest.spyOn(service, 'update').mockResolvedValue(updatedRole);

      await controller.update(roleId, updateRoleDto);

      expect(service.update).toHaveBeenCalledWith(roleId, updateRoleDto);
    });
  });

  describe('remove', () => {
    it('should remove a role', async () => {
      const removedRole = { id: 'role-id', name: 'Test Role' };

      jest.spyOn(service, 'remove').mockResolvedValue(removedRole);

      expect(await controller.remove('role-id' as UUID)).toBe(removedRole);
    });

    it('should call remove with the correct arguments', async () => {
      const roleId: UUID = 'role-id' as UUID;
      const removedRole = { id: roleId, name: 'Test Role' };

      jest.spyOn(service, 'remove').mockResolvedValue(removedRole);

      await controller.remove(roleId);

      expect(service.remove).toHaveBeenCalledWith(roleId);
    });
});
});

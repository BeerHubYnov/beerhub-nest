import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all users', async () => {
    await controller.findAll();
    expect(userService.findAll).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const id = '233aad60-87d7-4b8f-b363-db47b6ed942c' as UUID;
    await controller.findOne(id);
    expect(userService.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a user', async () => {
    const id = '233aad60-87d7-4b8f-b363-db47b6ed942c' as UUID;
    const dto: UpdateUserDto = {
      email: 'updated@example.com',
      username: 'updateduser',
    };
    await controller.update(id, dto);
    expect(userService.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove a user', async () => {
    const id = '233aad60-87d7-4b8f-b363-db47b6ed942c' as UUID;
    await controller.remove(id);
    expect(userService.remove).toHaveBeenCalledWith(id);
  });
});

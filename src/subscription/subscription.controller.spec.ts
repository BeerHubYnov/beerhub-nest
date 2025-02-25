import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { UUID } from 'crypto';

describe('SubscriptionController', () => {
  let controller: SubscriptionController;
  let service: SubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [
        {
          provide: SubscriptionService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SubscriptionController>(SubscriptionController);
    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a subscription', async () => {
      const createSubscriptionDto: CreateSubscriptionDto = {
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: true,
      };
      const result = {
        subscription: createSubscriptionDto,
        message: "Vous êtes désormais inscrit à l'événement.",
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createSubscriptionDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of subscriptions', async () => {
      const result = [
        { id_User: 'user-id-1', id_Evevent: 'event-id-1', isSubscribe: true },
        { id_User: 'user-id-2', id_Evevent: 'event-id-2', isSubscribe: false },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single subscription', async () => {
      const result = {
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: true,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(
        await controller.findOne('user-id' as UUID, 'event-id' as UUID),
      ).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a subscription', async () => {
      const updateSubscriptionDto: UpdateSubscriptionDto = {
        isSubscribe: false,
      };
      const result = {
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: false,
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(
        await controller.update(
          'user-id' as UUID,
          'event-id' as UUID,
          updateSubscriptionDto,
        ),
      ).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a subscription', async () => {
      const result = {
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: true,
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(
        await controller.remove('user-id' as UUID, 'event-id' as UUID),
      ).toBe(result);
    });
  });
});

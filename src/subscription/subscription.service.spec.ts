import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from './subscription.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { UUID } from 'crypto';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: PrismaService,
          useValue: {
            subscription: {
              findUnique: jest.fn(),
              update: jest.fn().mockResolvedValue({}),
              create: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new subscription if it does not exist', async () => {
      const createSubscriptionDto: CreateSubscriptionDto = {
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: true,
      };

      (prismaService.subscription.findUnique as jest.Mock).mockResolvedValue(
        null,
      );
      (prismaService.subscription.create as jest.Mock).mockResolvedValue({
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: true,
      });

      const result = await service.create(createSubscriptionDto);
      expect(result.subscription.isSubscribe).toBe(true);
      expect(result.message).toBe("Vous êtes désormais inscrit à l'événement.");
    });

    it('should update the subscription if it already exists', async () => {
      const createSubscriptionDto: CreateSubscriptionDto = {
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: true,
      };

      (prismaService.subscription.findUnique as jest.Mock).mockResolvedValue({
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: false,
      });

      (prismaService.subscription.update as jest.Mock).mockResolvedValue({
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: true,
      });

      const result = await service.create(createSubscriptionDto);
      expect(result.subscription.isSubscribe).toBe(true);
      expect(result.message).toBe("Vous êtes désormais inscrit à l'événement.");
    });
  });

  describe('findAll', () => {
    it('should return all subscriptions', async () => {
      const subscriptions = [
        { id_User: 'user-id-1', id_Evevent: 'event-id-1', isSubscribe: true },
        { id_User: 'user-id-2', id_Evevent: 'event-id-2', isSubscribe: false },
      ];

      (prismaService.subscription.findMany as jest.Mock).mockResolvedValue(
        subscriptions,
      );

      const result = await service.findAll();
      expect(result).toEqual(subscriptions);
      expect(prismaService.subscription.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single subscription', async () => {
      const subscription = {
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: true,
      };

      (prismaService.subscription.findUnique as jest.Mock).mockResolvedValue(
        subscription,
      );

      const result = await service.findOne(
        'user-id' as UUID,
        'event-id' as UUID,
      );
      expect(result).toEqual(subscription);
      expect(prismaService.subscription.findUnique).toHaveBeenCalledWith({
        where: {
          id_Evevent_id_User: { id_Evevent: 'event-id', id_User: 'user-id' },
        },
      });
    });
  });

  describe('update', () => {
    it('should update a subscription', async () => {
      const updateSubscriptionDto: UpdateSubscriptionDto = {
        isSubscribe: false,
      };
      const updatedSubscription = {
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: false,
      };

      (prismaService.subscription.update as jest.Mock).mockResolvedValue(
        updatedSubscription,
      );

      const result = await service.update(
        'user-id' as UUID,
        'event-id' as UUID,
        updateSubscriptionDto,
      );
      expect(result).toEqual(updatedSubscription);
      expect(prismaService.subscription.update).toHaveBeenCalledWith({
        where: {
          id_Evevent_id_User: { id_Evevent: 'event-id', id_User: 'user-id' },
        },
        data: updateSubscriptionDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a subscription', async () => {
      const removedSubscription = {
        id_User: 'user-id',
        id_Evevent: 'event-id',
        isSubscribe: true,
      };

      (prismaService.subscription.delete as jest.Mock).mockResolvedValue(
        removedSubscription,
      );

      const result = await service.remove(
        'user-id' as UUID,
        'event-id' as UUID,
      );
      expect(result).toEqual(removedSubscription);
      expect(prismaService.subscription.delete).toHaveBeenCalledWith({
        where: {
          id_Evevent_id_User: { id_Evevent: 'event-id', id_User: 'user-id' },
        },
      });
    });
  });
});

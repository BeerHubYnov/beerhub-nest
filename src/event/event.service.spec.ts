import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('EventService', () => {
  let service: EventService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService, PrismaService],
    }).compile();

    service = module.get<EventService>(EventService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all events', async () => {
    const events = [{ name: 'Test Event' }];
    prisma.event.findMany = jest.fn().mockReturnValue(events);
    expect(await service.findAll()).toEqual(events);
  });
});

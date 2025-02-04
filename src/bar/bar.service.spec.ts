import { Test, TestingModule } from '@nestjs/testing';
import { BarService } from './bar.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('BarService', () => {
  let service: BarService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BarService, PrismaService],
    }).compile();

    service = module.get<BarService>(BarService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a bar', async () => {
    const createBarDto = {
      name: 'Test Bar',
      description: 'A test bar',
      happyHoure: '5-7 PM',
      localisationX: 123.45,
      localisationY: 67.89,
      id_User: 'user-uuid',
    };
    prisma.bar.create = jest.fn().mockReturnValue(createBarDto);
    expect(await service.create(createBarDto)).toEqual(createBarDto);
  });

  it('should find all bars', async () => {
    const bars = [{ name: 'Test Bar' }];
    prisma.bar.findMany = jest.fn().mockReturnValue(bars);
    expect(await service.findAll()).toEqual(bars);
  });

  it('should find one bar by name', async () => {
    const bar = { name: 'Test Bar' };
    prisma.bar.findFirst = jest.fn().mockReturnValue(bar);
    expect(await service.findOneByName('Test')).toEqual(bar);
  });
});

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

  // it('should find one bar by id', async () => {
  //   const bar = { name: 'Test Bar' };
  //   prisma.bar.findUnique = jest.fn().mockReturnValue(bar);
  //   expect(await service.findOne('some-uuid')).toEqual(bar);
  // });

  it('should find one bar by name', async () => {
    const bar = { name: 'Test Bar' };
    prisma.bar.findFirst = jest.fn().mockReturnValue(bar);
    expect(await service.findOneByName('Test')).toEqual(bar);
  });

  // it('should update a bar', async () => {
  //   const updateBarDto = { name: 'Updated Bar' };
  //   prisma.bar.update = jest.fn().mockReturnValue(updateBarDto);
  //   expect(await service.update('some-uuid', updateBarDto)).toEqual(updateBarDto);
  // });

  // it('should remove a bar', async () => {
  //   const bar = { name: 'Test Bar' };
  //   prisma.bar.delete = jest.fn().mockReturnValue(bar);
  //   expect(await service.remove('some-uuid')).toEqual(bar);
  // });
});

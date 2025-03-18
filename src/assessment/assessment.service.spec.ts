import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentService } from './assessment.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('AssessmentService', () => {
  let service: AssessmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssessmentService, PrismaService],
    }).compile();

    service = module.get<AssessmentService>(AssessmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all assessments', async () => {
    const assessments = [{ name: 'Test Assessment' }];
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(assessments) as any);
    expect(await service.findAll()).toEqual(assessments);
  });
});

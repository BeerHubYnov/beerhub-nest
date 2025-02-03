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

  // it('should create an assessment', async () => {
  //   const createAssessmentDto = { name: 'Test Assessment' };
  //   jest.spyOn(service, 'create').mockImplementation(async () => ({
  //     id: 'assessment-id',
  //     note: 5,
  //     comment: 'Test Comment',
  //     id_User: 'user-id',
  //     id_Bar: 'bar-id',
  //     User: { id: 'user-id', name: 'Test User' },
  //     Bar: { id: 'bar-id', name: 'Test Bar' },
  //     ...createAssessmentDto,
  //   }));
  //   expect(await service.create(createAssessmentDto)).toEqual(
  //     createAssessmentDto,
  //   );
  // });

  it('should find all assessments', async () => {
    const assessments = [{ name: 'Test Assessment' }];
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(assessments) as any);
    expect(await service.findAll()).toEqual(assessments);
  });

  // it('should find one assessment by id', async () => {
  //   const assessment = { name: 'Test Assessment' };
  //   jest.spyOn(service, 'findOne').mockImplementation(async () => assessment);
  //   expect(await service.findOne('some-id')).toEqual(assessment);
  // });

  // it('should update an assessment', async () => {
  //   const updateAssessmentDto = { name: 'Updated Assessment' };
  //   jest.spyOn(service, 'update').mockImplementation(async () => updateAssessmentDto);
  //   expect(await service.update('some-id', updateAssessmentDto)).toEqual(updateAssessmentDto);
  // });

  // it('should remove an assessment', async () => {
  //   const assessment = { name: 'Test Assessment' };
  //   jest.spyOn(service, 'remove').mockImplementation(async () => assessment);
  //   expect(await service.remove('some-id')).toEqual(assessment);
  // });
});

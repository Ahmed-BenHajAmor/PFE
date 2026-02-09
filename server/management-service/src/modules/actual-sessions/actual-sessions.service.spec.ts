import { Test, TestingModule } from '@nestjs/testing';
import { ActualSessionsService } from './actual-sessions.service';

describe('ActualSessionsService', () => {
  let service: ActualSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActualSessionsService],
    }).compile();

    service = module.get<ActualSessionsService>(ActualSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

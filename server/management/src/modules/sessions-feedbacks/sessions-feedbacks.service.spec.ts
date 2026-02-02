import { Test, TestingModule } from '@nestjs/testing';
import { SessionsFeedbacksService } from './sessions-feedbacks.service';

describe('SessionsFeedbacksService', () => {
  let service: SessionsFeedbacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionsFeedbacksService],
    }).compile();

    service = module.get<SessionsFeedbacksService>(SessionsFeedbacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

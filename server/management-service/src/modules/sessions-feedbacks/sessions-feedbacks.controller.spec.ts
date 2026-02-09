import { Test, TestingModule } from '@nestjs/testing';
import { SessionsFeedbacksController } from './sessions-feedbacks.controller';

describe('SessionsFeedbacksController', () => {
  let controller: SessionsFeedbacksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsFeedbacksController],
    }).compile();

    controller = module.get<SessionsFeedbacksController>(SessionsFeedbacksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

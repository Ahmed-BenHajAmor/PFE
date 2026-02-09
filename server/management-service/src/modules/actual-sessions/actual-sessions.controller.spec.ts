import { Test, TestingModule } from '@nestjs/testing';
import { ActualSessionsController } from './actual-sessions.controller';

describe('ActualSessionsController', () => {
  let controller: ActualSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActualSessionsController],
    }).compile();

    controller = module.get<ActualSessionsController>(ActualSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

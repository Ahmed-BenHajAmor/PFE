import { Test, TestingModule } from '@nestjs/testing';
import { InputedSessionsController } from './inputed-sessions.controller';

describe('InputedSessionsController', () => {
  let controller: InputedSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InputedSessionsController],
    }).compile();

    controller = module.get<InputedSessionsController>(InputedSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

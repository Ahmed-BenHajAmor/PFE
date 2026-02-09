import { Test, TestingModule } from '@nestjs/testing';
import { InputedSessionsService } from './inputed-sessions.service';

describe('InputedSessionsService', () => {
  let service: InputedSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InputedSessionsService],
    }).compile();

    service = module.get<InputedSessionsService>(InputedSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

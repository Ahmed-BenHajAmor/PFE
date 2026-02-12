import { Test, TestingModule } from '@nestjs/testing';
import { ManagementProxyService } from './management.proxy.service';

describe('ManagementProxyService', () => {
  let service: ManagementProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagementProxyService],
    }).compile();

    service = module.get<ManagementProxyService>(ManagementProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

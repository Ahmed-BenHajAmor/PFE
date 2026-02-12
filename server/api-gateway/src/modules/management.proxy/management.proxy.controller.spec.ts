import { Test, TestingModule } from '@nestjs/testing';
import { ManagementProxyController } from './management.proxy.controller';

describe('ManagementProxyController', () => {
  let controller: ManagementProxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagementProxyController],
    }).compile();

    controller = module.get<ManagementProxyController>(ManagementProxyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

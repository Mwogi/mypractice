import { NursingModule } from './nursing.module';

describe('NursingModule', () => {
  let nursingModule: NursingModule;

  beforeEach(() => {
    nursingModule = new NursingModule();
  });

  it('should create an instance', () => {
    expect(nursingModule).toBeTruthy();
  });
});

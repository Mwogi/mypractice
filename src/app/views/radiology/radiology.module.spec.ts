import { RadiologyModule } from './radiology.module';

describe('RadiologyModule', () => {
  let radiologyModule: RadiologyModule;

  beforeEach(() => {
    radiologyModule = new RadiologyModule();
  });

  it('should create an instance', () => {
    expect(radiologyModule).toBeTruthy();
  });
});

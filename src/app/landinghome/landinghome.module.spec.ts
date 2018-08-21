import { LandinghomeModule } from './landinghome.module';

describe('LandinghomeModule', () => {
  let landinghomeModule: LandinghomeModule;

  beforeEach(() => {
    landinghomeModule = new LandinghomeModule();
  });

  it('should create an instance', () => {
    expect(landinghomeModule).toBeTruthy();
  });
});

import { AppviewsModule } from './appviews.module';

describe('AppviewsModule', () => {
  let appviewsModule: AppviewsModule;

  beforeEach(() => {
    appviewsModule = new AppviewsModule();
  });

  it('should create an instance', () => {
    expect(appviewsModule).toBeTruthy();
  });
});

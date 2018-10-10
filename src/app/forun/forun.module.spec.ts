import { ForunModule } from './forun.module';

describe('ForunModule', () => {
  let forunModule: ForunModule;

  beforeEach(() => {
    forunModule = new ForunModule();
  });

  it('should create an instance', () => {
    expect(forunModule).toBeTruthy();
  });
});

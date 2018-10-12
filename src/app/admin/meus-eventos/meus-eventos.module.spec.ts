import { MeusEventosModule } from './meus-eventos.module';

describe('MeusEventosModule', () => {
  let meusEventosModule: MeusEventosModule;

  beforeEach(() => {
    meusEventosModule = new MeusEventosModule();
  });

  it('should create an instance', () => {
    expect(meusEventosModule).toBeTruthy();
  });
});

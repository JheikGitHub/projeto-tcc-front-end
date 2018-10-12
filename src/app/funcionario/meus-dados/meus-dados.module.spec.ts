import { MeusDadosModule } from './meus-dados.module';

describe('MeusDadosModule', () => {
  let meusDadosModule: MeusDadosModule;

  beforeEach(() => {
    meusDadosModule = new MeusDadosModule();
  });

  it('should create an instance', () => {
    expect(meusDadosModule).toBeTruthy();
  });
});

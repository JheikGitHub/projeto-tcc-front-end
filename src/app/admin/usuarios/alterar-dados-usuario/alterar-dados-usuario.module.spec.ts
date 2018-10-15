import { AlterarDadosUsuarioModule } from './alterar-dados-usuario.module';

describe('AlterarDadosUsuarioModule', () => {
  let alterarDadosUsuarioModule: AlterarDadosUsuarioModule;

  beforeEach(() => {
    alterarDadosUsuarioModule = new AlterarDadosUsuarioModule();
  });

  it('should create an instance', () => {
    expect(alterarDadosUsuarioModule).toBeTruthy();
  });
});

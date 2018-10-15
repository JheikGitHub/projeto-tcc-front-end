import { CriarNovoUsuarioModule } from './criar-novo-usuario.module';

describe('CriarNovoUsuarioModule', () => {
  let criarNovoUsuarioModule: CriarNovoUsuarioModule;

  beforeEach(() => {
    criarNovoUsuarioModule = new CriarNovoUsuarioModule();
  });

  it('should create an instance', () => {
    expect(criarNovoUsuarioModule).toBeTruthy();
  });
});

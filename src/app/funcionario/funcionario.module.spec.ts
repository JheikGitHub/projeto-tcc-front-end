import { FuncionarioModule } from './funcionario.module';

describe('FuncionarioModule', () => {
  let funcionarioModule: FuncionarioModule;

  beforeEach(() => {
    funcionarioModule = new FuncionarioModule();
  });

  it('should create an instance', () => {
    expect(funcionarioModule).toBeTruthy();
  });
});

import { ValidacaoCertificadoModule } from './validacao-certificado.module';

describe('ValidacaoCertificadoModule', () => {
  let validacaoCertificadoModule: ValidacaoCertificadoModule;

  beforeEach(() => {
    validacaoCertificadoModule = new ValidacaoCertificadoModule();
  });

  it('should create an instance', () => {
    expect(validacaoCertificadoModule).toBeTruthy();
  });
});

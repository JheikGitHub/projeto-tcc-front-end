import { TestBed, inject } from '@angular/core/testing';

import { ValidacaoCertificadoService } from './validacao-certificado.service';

describe('ValidacaoCertificadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidacaoCertificadoService]
    });
  });

  it('should be created', inject([ValidacaoCertificadoService], (service: ValidacaoCertificadoService) => {
    expect(service).toBeTruthy();
  }));
});

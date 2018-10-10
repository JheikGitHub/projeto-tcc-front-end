import { ParticipanteModule } from './participante.module';

describe('ParticipanteModule', () => {
  let participanteModule: ParticipanteModule;

  beforeEach(() => {
    participanteModule = new ParticipanteModule();
  });

  it('should create an instance', () => {
    expect(participanteModule).toBeTruthy();
  });
});

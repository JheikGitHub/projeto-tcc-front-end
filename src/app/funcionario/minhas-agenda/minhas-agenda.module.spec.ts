import { MinhasAgendaModule } from './minhas-agenda.module';

describe('MinhasAgendaModule', () => {
  let minhasAgendaModule: MinhasAgendaModule;

  beforeEach(() => {
    minhasAgendaModule = new MinhasAgendaModule();
  });

  it('should create an instance', () => {
    expect(minhasAgendaModule).toBeTruthy();
  });
});

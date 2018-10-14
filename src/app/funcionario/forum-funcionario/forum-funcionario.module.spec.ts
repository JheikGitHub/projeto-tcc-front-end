import { ForumFuncionarioModule } from './forum-funcionario.module';

describe('ForumFuncionarioModule', () => {
  let forumFuncionarioModule: ForumFuncionarioModule;

  beforeEach(() => {
    forumFuncionarioModule = new ForumFuncionarioModule();
  });

  it('should create an instance', () => {
    expect(forumFuncionarioModule).toBeTruthy();
  });
});

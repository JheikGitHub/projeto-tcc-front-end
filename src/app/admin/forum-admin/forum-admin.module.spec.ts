import { ForumAdminModule } from './forum-admin.module';

describe('ForumAdminModule', () => {
  let forumAdminModule: ForumAdminModule;

  beforeEach(() => {
    forumAdminModule = new ForumAdminModule();
  });

  it('should create an instance', () => {
    expect(forumAdminModule).toBeTruthy();
  });
});

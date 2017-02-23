import { Angular2WebappPage } from './app.po';

describe('angular2-webapp App', function() {
  let page: Angular2WebappPage;

  beforeEach(() => {
    page = new Angular2WebappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

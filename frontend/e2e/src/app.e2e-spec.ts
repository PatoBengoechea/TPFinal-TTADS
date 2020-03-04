import { AppPage } from "./app.po";
import {
  browser,
  logging,
  element,
  by,
  ElementFinder,
  ElementArrayFinder
} from "protractor";

import { promise } from "selenium-webdriver";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  /*   it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('frontend app is running!');
  }); */

  it("should display Search page", () => {
    page.navigateTo();
    browser.findElement(by.partialLinkText("Search")).click();
    expect(browser.getCurrentUrl()).toEqual(
      "http://localhost:4200/search-movies"
    );
  });

  it("should display Now-Playing movies page", () => {
    page.navigateTo();
    element
      .all(by.css(".nav-link active"))
      .get(1)
      .click();
    expect(browser.getCurrentUrl()).toEqual(
      "http://localhost:4200/now-playing"
    );
  });

  it("should display Popular movies page", () => {
    page.navigateTo();
    element
      .all(by.css(".nav-link active"))
      .get(2)
      .click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/popular");
  });

  it("should display popular-movies", () => {
    browser.findElement(by.partialLinkText("Popular")).click();
    element.all(by.id("voto")).then(function(items) {
      items.forEach(elem => {
        expect(Number(elem.getText())).toBeGreaterThan(7);
      });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});

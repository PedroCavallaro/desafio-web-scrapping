import puppeteer, { Page, PuppeteerNode } from 'puppeteer';

class Bot {
  private pup: PuppeteerNode;

  constructor() {
    this.pup = puppeteer;
  }
  async launch(): Promise<Page> {
    const browser = await this.pup.launch({ headless: true });
    const page = await browser.newPage();

    return page;
  }
}
export { Bot };

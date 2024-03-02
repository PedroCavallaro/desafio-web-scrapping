import puppeteer, { Page, PuppeteerNode } from 'puppeteer';
import { IBot } from './IBot';

class Bot implements IBot {
  private pup: PuppeteerNode;

  constructor() {
    this.pup = puppeteer;
  }
  async launch(): Promise<Page> {
    const browser = await this.pup.launch({
      headless: true,

      executablePath:
        process.env.CONTAINER == 'true'
          ? process.env.CONTAINER
          : this.pup.executablePath(),
    });
    const page = browser.newPage();

    return page;
  }
}
export { Bot };

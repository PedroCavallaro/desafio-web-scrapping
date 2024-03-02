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
      // slowMo: 25,
      // args: ['--start-maximized', '--no-sandbox'],
      // executablePath: '/opt/google/chrome/google-chrome',
    });
    const page = browser.newPage();

    return page;
  }
}
export { Bot };

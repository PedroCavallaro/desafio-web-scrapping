import { Page } from 'puppeteer';

export interface IBot {
  launch(): Promise<Page>;
}

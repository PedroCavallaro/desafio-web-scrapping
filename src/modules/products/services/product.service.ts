import * as cheerio from 'cheerio';
import { Page } from 'puppeteer';
import { HTMLSelectors } from 'src/@core/contants/selectors';
import { IBot } from 'src/modules/bot/model/IBot';

export class ProductService {
  private readonly bot: IBot;
  private readonly URL: string;
  private readonly selectors: typeof HTMLSelectors;
  constructor(bot: IBot) {
    this.bot = bot;
    this.URL = 'https://world.openfoodfacts.org/product/';
    this.selectors = HTMLSelectors;
  }

  async getProductsByScore() {}
  async getProductById(id: string) {
    const page = await this.bot.launch();

    await page.goto(`${this.URL}${id}`);

    const product = await this.getProductInfo(page);

    return 'oia';
  }

  async getProductInfo(page: Page) {
    const name = await page.waitForSelector(this.selectors.name);
    const attributes = await page.waitForSelector(this.selectors.attributes);
    const ingredients = await page.waitForSelector(this.selectors.ingredients);
    const quantity = await page.waitForSelector(this.selectors.quantity);
    cheerio.load(name as any);

    const brands = await page.waitForSelector("[itemprop='brand']");
    const ingredientsAnalisys = await page.waitForSelector(
      'panel_ingredients_analysis_content',
    );
  }
}

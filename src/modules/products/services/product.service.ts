import { load } from 'cheerio';
import { Page } from 'puppeteer';
import { HTMLSelectors } from 'src/@core/contants/selectors';
import { IBot } from 'src/modules/bot/model/IBot';

export class ProductService {
  private readonly bot: IBot;
  private readonly URL: string;
  private readonly selectors: typeof HTMLSelectors;

  constructor(bot: IBot) {
    this.bot = bot;
    this.URL = 'https://br.openfoodfacts.org/';
    this.selectors = HTMLSelectors;
  }

  async getProductsByScore() {}
  async getProductById(id: string) {
    console.log(`Iniciando scrapping para o produto de id: ${id}`);
    const page = await this.bot.launch();

    await page.goto(`${this.URL}/produto/${id}`);

    const product = await this.getProductInfo(page);
    console.log(product);
    return 'oia';
  }

  async getProductInfo(page: Page) {
    const html = await page.evaluate(() => document.documentElement.innerHTML);

    const $ = load(html);
    const initialNutritionData = {};
    const [
      title,
      quantity,
      nova,
      nutrition,
      servingSize,
      havePalmOil,
      isVegan,
      isVegetarian,
      mappedNutritionData,
      nutritionValues,
    ] = [
      $(this.selectors.name).text(),
      $(this.selectors.quantity).text(),
      $(this.selectors.nova).text().trim(),
      $(this.selectors.nutrition).text().trim(),
      $(this.selectors.servingSize)
        .text()
        .trim()
        .replace(/Como vendidopor porção \(/g, '')
        .slice(0, 3),
      $(this.selectors.havePalmOil).text().trim(),
      $(this.selectors.isVegan).text().trim(),
      $(this.selectors.isVegetarian).text().trim(),
      [...$(this.selectors.data)].map((e) => {
        return {
          ...initialNutritionData,
          [$(e).children('td:nth-child(1)').text().trim()]: {
            per100g: $(e).children('td:nth-child(2)').text().trim(),
            perServing: $(e).children('td:nth-child(3)').text().trim(),
          },
        };
      }),
      [...$(this.selectors.nutritionValues)].map((e) => {
        return [
          $(e).children('img').attr('src'),
          $(e).children('h4').text().trim(),
        ];
      }),
    ];

    console.log(title);
    console.log(quantity);
    console.log(nova);
    console.log(servingSize);
    console.log(havePalmOil);
    console.log(isVegan);
    console.log(isVegetarian);
    console.log(nutrition);
    console.log(mappedNutritionData);
    console.log(nutritionValues);
  }
}

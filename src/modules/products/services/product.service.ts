import { load } from 'cheerio';
import { Page } from 'puppeteer';
import { HTMLSelectors } from 'src/@core/contants/selectors';
import { DataParser } from 'src/@core/parser/DataParser';
import { IBot } from 'src/modules/bot/model/IBot';

export class ProductService {
  private readonly bot: IBot;
  private readonly URL: string;
  private readonly selectors: typeof HTMLSelectors;
  private readonly dataParser: DataParser;

  constructor(bot: IBot, parser: DataParser) {
    this.bot = bot;
    this.URL = 'https://br.openfoodfacts.org/';
    this.selectors = HTMLSelectors;
    this.dataParser = parser;
  }

  async getProductsByScore() {}
  async getProductById(id: string) {
    console.log(`Iniciando scrapping para o produto de id: ${id}`);
    const page = await this.bot.launch();

    await page.goto(`${this.URL}/produto/${id}`);

    const product = await this.getProductInfo(page);

    return product;
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
        console.log($(e).children('img').attr('src'));
        return [
          $(e).children('img').attr('src'),
          $(e).children('h4').text().trim(),
        ];
      }),
    ];
    return this.getValuesFromSelector($);
    // console.log(title);
    // console.log(quantity);
    // console.log(nova);
    // console.log(servingSize);
    // console.log(havePalmOil);
    // console.log(isVegan);
    // console.log(isVegetarian);
    // console.log(nutrition);
    // console.log(mappedNutritionData);
    // console.log(nutritionValues);
  }
  getValuesFromSelector($: cheerio.Root) {
    const nutritionTitle = $(this.selectors.nutrition).text().trim();
    const nutritionValues = [...$(this.selectors.nutritionValues)];
    const nutritionTable = [...$(this.selectors.data)];

    const data = this.dataParser.formatNutritionTableData(nutritionTable, $);

    console.log(data);

    return {
      title: $(this.selectors.name).text(),
      quantity: $(this.selectors.quantity).text(),
      nova: this.dataParser.formatClassificationScore(
        'nova',
        $(this.selectors.nova).text().trim(),
      ),
      nutrition: this.dataParser.formatClassificationScore(
        'nutri',
        nutritionTitle,
        nutritionValues,
        $,
      ),
      data: Object.fromEntries(data),
    };
  }
}

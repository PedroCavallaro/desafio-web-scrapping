// @ts-ignore wihtout ts-ignore, it will error on docker build
import { load, CheerioAPI } from 'cheerio';
import { Page } from 'puppeteer';
import { productAttributes } from 'src/helpers/contants/selectors';
import { FilterProductsDTO } from 'src/helpers/dtos/FilterProductsDTO';
import { IBot } from 'src/steps/bot/model/IBot';
import { Filter } from 'src/steps/filter/Filter';
import { ProductDataParser } from 'src/steps/parser/ProductDataParser';
import { Product } from '../model/Product';
import { Result } from 'src/helpers/result/Result';

export class ScrapperService {
  private readonly URL: string;
  private readonly selectors: typeof productAttributes;
  private readonly dataParser: ProductDataParser;
  private readonly filter: Filter;
  private page: Page;

  constructor(bot: IBot, parser: ProductDataParser, filter: Filter) {
    this.URL = 'https://br.openfoodfacts.org/';
    this.selectors = productAttributes;
    this.dataParser = parser;
    this.filter = filter;
    bot.launch().then((page) => (this.page = page));
  }

  async getProductsByScore({ nova, nutrition }: FilterProductsDTO) {
    console.log(
      `Filtrando produtos por Nova:${nova} e Nutri-Score:${nutrition}`,
    );
    await this.page.goto(this.URL, {
      waitUntil: 'domcontentloaded',
    });
    const html = await this.page.evaluate(
      () => document.documentElement.innerHTML,
    );

    const $ = load(html);

    const filter = [...$(this.selectors.card)]
      .filter((e) => {
        return this.filter.filterByNovaAndNutri(nova, nutrition, e, $);
      }, $)
      .map((e) => this.dataParser.mapProductCardArray($, e));

    return Result.ok(filter);
  }

  async getProductById(id: string) {
    console.log(`Iniciando scrapping para o produto de id: ${id}`);

    await this.page.goto(`${this.URL}/produto/${id}`, {
      waitUntil: 'domcontentloaded',
    });

    const result = await this.getProductFromPage();

    if (result.error) return Result.fail(result.error);

    const product = await this.getProductFromPage();
    const { title, nutri, nova, quantity, servingSize, data, ingredients } =
      product.getValue() as Product;

    return Result.ok(
      new Product(
        undefined,
        title,
        nova,
        nutri,
        quantity,
        servingSize,
        ingredients,
        data,
      ),
    );
  }

  async getProductFromPage() {
    const html = await this.page.evaluate(
      () => document.documentElement.innerHTML,
    );

    const $ = load(html);
    const error = $(this.selectors.error).text();

    if (error) return Result.fail(error);

    return Result.ok(this.getFormatedValuesFromSelectors($));
  }
  getFormatedValuesFromSelectors($: CheerioAPI) {
    const nutritionTitle = $(this.selectors.nutrition).text().trim();
    const nutritionValues = [...$(this.selectors.nutritionValues)];
    const nutritionTable = [...$(this.selectors.data)];

    const data = this.dataParser.formatNutritionTableData(nutritionTable, $);

    const ingredients = this.dataParser.formatIngredientsAnalysis(
      [...$(this.selectors.analisys)],
      $(this.selectors.ingredients).text(),
      $,
    );

    return {
      title: $(this.selectors.title).text(),
      quantity: $(this.selectors.quantity).text(),
      nova: this.dataParser.formatClassificationScore(
        'nova',
        $(this.selectors.nova).text().trim(),
      ),
      nutri: this.dataParser.formatClassificationScore(
        'nutri',
        nutritionTitle,
        nutritionValues,
        $,
      ),
      servingSize: this.dataParser.formatServingSize(
        $(this.selectors.servingSize).text(),
      ),
      data: Object.fromEntries(data),
      ingredients,
    };
  }
}

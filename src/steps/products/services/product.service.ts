// @ts-ignore wihtout ts-ignore, it will error on docker build
import { load, CheerioAPI } from 'cheerio';
import { Page } from 'puppeteer';
import { productAttributes } from 'src/@core/contants/selectors';
import { FilterProductsDTO } from 'src/@core/dtos/FilterProductsDTO';
import { Filter } from 'src/@core/filter/Filter';
import { DataParser } from 'src/@core/parser/DataParser';
import { IBot } from 'src/modules/bot/model/IBot';

export class ProductService {
  private readonly URL: string;
  private readonly selectors: typeof productAttributes;
  private readonly dataParser: DataParser;
  private readonly filter: Filter;
  private page: Page;

  constructor(bot: IBot, parser: DataParser, filter: Filter) {
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
    await this.page.goto(this.URL);
    const html = await this.page.evaluate(
      () => document.documentElement.innerHTML,
    );

    const $ = load(html);

    const filter = [...$(this.selectors.card)]
      .filter((e) => {
        return this.filter.filterByNovaAndNutri(nova, nutrition, e, $);
      }, $)
      .map((e) => this.dataParser.mapProductCardArray($, e));

    return filter;
  }

  async getProductById(id: string) {
    console.log(`Iniciando scrapping para o produto de id: ${id}`);

    await this.page.goto(`${this.URL}/produto/${id}`, {
      waitUntil: 'domcontentloaded',
    });

    const product = await this.getProduct();

    return product;
  }

  async getProduct() {
    const html = await this.page.evaluate(
      () => document.documentElement.innerHTML,
    );

    const $ = load(html);

    return this.getFormatedValuesFromSelectors($);
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
      nutrition: this.dataParser.formatClassificationScore(
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
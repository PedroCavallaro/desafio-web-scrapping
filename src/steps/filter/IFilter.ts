import cheerio from 'cheerio';

export interface IFilter {
  filterByNovaAndNutri(
    desiredNova: string,
    desiredNutri: string,
    element: cheerio.Element,
    $: cheerio.CheerioAPI,
  ): boolean;
}

import cheerio from 'cheerio';

export interface Filter {
  filterByNovaAndNutri(
    desiredNova: string,
    desiredNutri: string,
    element: cheerio.Element,
    $: cheerio.Root,
  ): boolean;
}

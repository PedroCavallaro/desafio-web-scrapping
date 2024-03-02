// @ts-ignore wihtout ts-ignore, it will error on docker build
import { AnyNode, CheerioAPI } from 'cheerio';

export class Filter {
  filterByNovaAndNutri(
    desiredNova: string,
    desiredNutri: string,
    element: AnyNode,
    $: CheerioAPI,
  ) {
    const nutriTitle = $(element)
      .find('.list_product_sc > .list_product_icons:nth-child(1)')
      .attr('title');
    const novaTitle = $(element)
      .find('.list_product_sc > .list_product_icons:nth-child(2)')
      .attr('title');

    const novaScore = novaTitle[5].toUpperCase();
    const nutriScore = nutriTitle[12].toUpperCase();

    return (
      desiredNova.toUpperCase() === novaScore &&
      desiredNutri.toUpperCase() == nutriScore
    );
  }
}

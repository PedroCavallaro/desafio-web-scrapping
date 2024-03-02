<h1>Desafio Pedro Cavallaro</h1>
<h2>Arquitetura</h2>
<p>Para esse desafio, optei por uma arquitetura baseada em serviços, visto que ficaria mais adequado para lidar com as requisições. Também trabalhei bastante com desacoplamento e inversão de depência</p>

<ul>
  <li>Para o desacoplamento, nas classes de servico nao é utilizado nenhum método do framework, a integração entre o núcleo do sistema vai ocorre dentro dos módulos
  </li>
  <li>Já para a inversão de depêndencia, as classes de serviço recebem interfaces, ao invés de implementações, assim fica mais fácil dar manuntenção, e se necessário fazer mudanças, elas não impactariam no código 
  </li>
</ul>

<h1>Código<h1>
<h2>Classes</h2>
<ul>
  <li>Bot: Possui a finalidade de iniciar o puppeter, para ser utilizado</li>
  <li>FilterService: Essa classe acaba implementando um só método que seria justamente a comparação dos parâmetros nova e nutri, com as classificações do produtos </li>
  <li>ProductDataParserService: Todos os métodos dessa classe tem a finalidade de tratar e retornar os dados recebido pelo scrapping
     <h3>1. formatIngredients(ingredientes: string): string[]</h3>
  <p>Este método formata uma string contendo ingredientes em um array de strings limpo.</p>
  <h3>Passos:</h3>
  <ol>
    <li>Verifica se o argumento <code>ingredientes</code> possui um valor.</li>
    <li>Se sim:</li>
      <ul>
        <li>Substitui caracteres especiais como <code><, :, ;, e ,</code> por vírgulas usando uma expressão regular.</li>
        <li>Divide a string em um array usando caracteres de nova linha (<code>\n</code>) como delimitadores.</li>
        <li>Filtra os elementos vazios após aparar os espaços em branco.</li>
        <li>Mapeia os elementos remanescentes, aparando os espaços em branco novamente.</li>
      </ul>
    <li>Se <code>ingredientes</code> estiver vazio ou sem valor, retorna a string "Dado não encontrado".</li>
  </ol>
  <h3>2. mapProductCardArray($: cheerio.Root, e: cheerio.Element): Product</h3>
  <p>Este método mapeia um elemento de cartão de produto de um objeto Cheerio para um objeto <code>Product</code>.</p>
  <h3>Passos:</h3>
  <ol>
    <li>Extrai o ID do produto, nome e informações nutricionais do elemento e seus filhos.</li>
    <li>Usa <code>mapAttributes</code> para obter títulos com base em códigos de classificação de mapas separados.</li>
    <li>Cria um novo objeto <code>Product</code> com os dados extraídos.</li>
  </ol>
  <h3>3. getKeyByValue<T>(objeto: T, valor: string): string | undefined</h3>
  <p>Este método encontra a chave de um objeto onde o valor corresponde a uma string dada.</p>
  <h3>Passos:</h3>
  <ol>
    <li>Itera pelas chaves do objeto e verifica se o valor correspondente coincide com o argumento <code>valor</code> fornecido.</li>
    <li>Se uma correspondência for encontrada, a chave é retornada.</li>
    <li>Caso contrário, <code>undefined</code> é retornado.</li>
  </ol>
  <h3>4. formatServingSize(dirtyString: string): string | string[]</h3>
  <p>Este método formata uma string contendo informações sobre o tamanho da porção.</p>
  <h3>Passos:</h3>
  <ol>
    <li>Remove os espaços em branco da string <code>dirtyString</code>.</li>
    <li>Remove o texto desnecessário usando expressões regulares.</li>
    <li>Verifica se o último caractere é "g".</li>
    <ul>
      <li>Se não for, retorna um array vazio usando <code>this.hasValue(null)</code>.</li>
      <li>Caso contrário, retorna a string do tamanho da porção limpa.</li>
    </ul>
  </ol>
  <h3>5. formatIngredientsAnalysis(analisys: cheerio.Element[], ingredientes: string, $: cheerio.CheerioAPI): Analysis</h3>
  <p>Este método analisa os ingredientes com base nos elementos e na string de ingredientes fornecidos.</p>
  <h3>Passos:</h3>
  <ol>
    <li>Cria um objeto <code>Analysis</code> com propriedades baseadas em classes de elementos e na lista de ingredientes formatada.</li>
    <li>Usa <code>ingredientsAnalysisMap</code> para determinar propriedades como presença de óleo de palma, adequação para veganos/vegetarianos.</li>
  </ol>
     <h3>6. formatClassificationScore(tipo: 'nova' | 'nutri', título?: string, valores?: cheerio.Element[], $?: cheerio.CheerioAPI): ClassificationScore</h3>
  <p>Este método formata as pontuações de classificação (nova ou nutri) com base no título e nos valores opcionais.</p>
  <h3>Passos:</h3>
  <ol>
    <li>Verifica o argumento <code>tipo</code>:</li>
    <ul>
      <li>Se <code>tipo</code> for "nova":</li>
        <ul>
          <li>Usa <code>mapAttributes</code> para obter o título da pontuação de <code>novaScoreMapByText</code> com base no <code>título</code> fornecido.</li>
        </ul>
      <li>Caso contrário:</li>
        <ul>
          <li>Usa <code>mapAttributes</code> para obter o título da pontuação de <code>nutriScoreMapByText</code> com base no <code>título</code> fornecido.</li>
          <li>Para o tipo "nutri", chama <code>parseNutritionValues</code> para processar qualquer elemento <code>valores</code> fornecido.</li>
        </ul>
    </ul>
  </ol>
    <h3>1. parseNutritionValues(values: cheerio.Element[], $: cheerio.CheerioAPI): NutritionValue[][]</h3>
  <p>Este método analisa as informações nutricionais de um array de elementos Cheerio e retorna um array de arrays, onde cada array interno contém o nível de nutrição e o valor de texto correspondente.</p>
  <h3>Passos:</h3>
  <ol>
    <li>Itera pelo array <code>values</code>:</li>
    <ul>
      <li>Para cada elemento (<code>e</code>):</li>
        <ul>
          <li>Extrai a origem da imagem (<code>src</code>) do elemento filho <code>img</code>.</li>
          <li>Cria um array interno para cada elemento, contendo:</li>
            <ul>
              <li>O nível de nutrição obtido usando <code>this.mapAttributes</code>.</li>
              <li>O conteúdo de texto aparado do elemento filho <code>h4</code> (provavelmente o valor nutricional, como "5g").</li>
            </ul>
        </ul>
    </ul>
  </ol>
  <h3>2. mapAttributes<T>(map: T, attribute: keyof T): T[attribute]</h3>
  <p>Este método genérico recupera um valor de atributo específico de um mapa fornecido.</p>
  <h3>Passos:</h3>
  <ol>
    <li>Recebe dois argumentos:</li>
      <ul>
        <li><code>map</code>: Um objeto que representa o mapa contendo o atributo desejado.</li>
        <li><code>attribute</code>: Uma chave que representa o atributo específico a ser recuperado.</li>
      </ul>
    <li>Retorna o valor associado à chave <code>attribute</code> especificada no objeto <code>map</code>.</li>
  </ol>
  <h3>3. hasValue(value: string | Array<string>): string | Array<string> | '?'</h3>
  <p>Este método verifica se um determinado valor representa uma string vazia ou um array vazio.</p>
  <h3>Passos:</h3>
  <ol>
    <li>Recebe um argumento <code>value</code> que pode ser uma string ou um array de strings.</li>
    <li>Verifica se o <code>value</code> é:</li>
      <ul>
        <li>Falso (null, undefined, string vazia ou array vazio)</li>
        <ul>
          <li>Se sim, retorna a string <code>?</code> para indicar um valor ausente.</li>
        </ul>
        <li>Verdadeiro</li>
        <ul>
          <li>Se não, retorna o <code>value</code> original.</li>
        </ul>
      </ul>
  </ol>
    <h3>4. formatNutritionTableData(values: cheerio.Element[], $: cheerio.CheerioAPI): Map<string, Nutrition></h3>
<p>Este método analisa um array de elementos Cheerio que representam dados nutricionais em formato de tabela e retorna um Map de informações nutricionais.</p>
<h3>Passos:</h3>
<ol>
  <li>Cria um <code>Map</code> vazio chamado <code>mappedData</code> para armazenar as informações analisadas.</li>
  <li>Itera pelo array <code>values</code>:</li>
    <ul>
      <li>Para cada elemento (<code>e</code>):</li>
        <ul>
          <li>Extrai valores de células específicas da tabela (elementos TD):</li>
            <ul>
              <li><code>item</code>: Conteúdo de texto do primeiro elemento filho <code>td</code> (provavelmente o nome do item nutricional).</li>
              <li><code>per100g</code>: Conteúdo de texto do segundo elemento filho <code>td</code> (possivelmente valor nutricional por 100g).</li>
              <li><code>perServing</code>: Conteúdo de texto do terceiro elemento filho <code>td</code> (potencialmente valor nutricional por porção).</li>
            </ul>
          <li>Cria um objeto (<code>Nutrition</code>) com os valores extraídos:</li>
            <ul>
              <li><code>per100g</code>: Usa <code>this.hasValue</code> para verificar se há conteúdo vazio e substitui por <code>?</code> se necessário.</li>
              <li><code>perServing</code>: Igual a <code>per100g</code>.</li>
            </ul>
          <li>Adiciona o objeto <code>Nutrition</code> criado ao <code>mappedData</code> com o nome <code>item</code> extraído como chave.</li>
        </ul>
    </ul>
  <li>Retorna o <code>mappedData</code>.</li>
</ol>
  </li>
</ul>

<h2>Desafios</h2>
<ul>
  <li>Performance: quando começei a testar o código, percebi que estava levando cerca de 12 segundos para uma resposta, e que boa parte desse tempo era para o puppeter abrir. Para resolver isso decidi fazer um cache da mesma página, e aplicar a configuração  { waitUntil: 'domcontentloaded'}, desta forma o tempo da primeira requisição fica em torno de 5 segundos, e das próximas entre 1 a 2 segundos</li>
</ul>

<h2>Error handling<h2>
<p>Para lidar melhor com erros e repostas, utilizei a classe Result, com os metodos ok e fail</p>

<h1>Desafio Pedro Cavallaro</h1>
<h1>Arquitetura</h1>


<p>Para esse desafio, optei por uma arquitetura baseada em serviços, visto que ficaria mais adequado para lidar com as requisições. Também trabalhei bastante com desacoplamento e inversão de depência</p>

<ul>
  <li>Para o desacoplamento, nas classes de servico nao é utilizado nenhum método do framework, a integração entre o núcleo do sistema vai ocorre dentro dos módulos
  </li>
  <li>Já para a inversão de depêndencia, as classes de serviço recebem interfaces, ao invés de implementações, assim fica mais fácil dar manuntenção, e se necessário fazer mudanças, elas não impactariam no código 
  </li>
</ul>

<h1>Como rodar</h1>
<p>Configurei esse comando para instalar as dependências e rodas o projeto</p>
```
npm run prod
````

<h1>Requisições</h1>
<p>Utilizar a url sempre com aspas duplas</p>
<h5>Um produto</h5>

```
curl --location "http://localhost:3000/products/3046920010603"
```
<h5>Filtro</h5>

```
 curl --location "http://localhost:3000/products?nutrition=A&nova=1"
```


<h1>Desafios</h1>
<ul>
  <li>Performance: quando começei a testar o código, percebi que estava levando cerca de 12 segundos para uma resposta, e que boa parte desse tempo era para o puppeter abrir. Para resolver isso decidi fazer um cache da mesma página, e aplicar a configuração  { waitUntil: 'domcontentloaded'}, desta forma o tempo da primeira requisição fica em torno de 5 segundos, e das próximas entre 1 a 2 segundos</li>
</ul>

<h1>Error handling</h1>
<p>Para lidar melhor com erros e repostas, utilizei a classe Result, com os metodos ok e fail</p>

<h1>Código<h1>
<h1>Serviços</h1>
<ul>
  <li><h3>Bot: Possui a finalidade de iniciar o puppeter, para ser utilizado</h3></li>
  <h4>1.launch</h4>
   <ol>
    <li><strong>Inicia o Navegador:</strong></li>
      <ul>
        <li>Utiliza a propriedade <code>pup</code> (presumidamente instanciada previamente) para iniciar um novo navegador usando o método <code>launch</code>.</li>
        <li>Define a opção <code>headless: true</code> para executar o navegador sem interface visual.</li>
      </ul>
    <li><strong>Cria Nova Página:</strong></li>
      <ul>
        <li>Uma vez o navegador iniciado, usa o método <code>newPage</code> para criar uma nova página dentro dele.</li>
      </ul>
    <li><strong>Retorna a Página:</strong></li>
      <ul>
        <li>Retorna a instância da <code>page</code> recém-criada, que será utilizada para interações futuras.</li>
      </ul>
  </ol>
  <br/>
  <li><h3>FilterService: Essa classe acaba implementando um só método que seria justamente a comparação dos parâmetros nova e nutri, com as classificações do produtos</h3> </li>
    <ul>
    <h4>1. filterByNovaAndNutri</h4>
    <li><strong>nutriTitle:</strong></li>
      <ul>
        <li>Seleciona o primeiro elemento filho <code>(list_product_icons)</code> dentro do elemento filho direto <code>(list_product_sc)</code> do elemento fornecido <code>(element)</code>.</li>
        <li>Procura um elemento que provavelmente contém o título da classificação nutricional (ex.: "NUTRI-SCORE A").</li>
        <li>Recupera o valor do atributo <code>title</code> desse elemento.</li>
      </ul>
    <li><strong>novaTitle:</strong></li>
      <ul>
        <li>Repete o processo anterior, mas seleciona o segundo elemento filho <code>(list_product_icons)</code> dentro de <code>list_product_sc</code>.</li>
        <li>Procura um elemento que provavelmente contém o título da classificação Nova (ex.: "NOVA 3").</li>
        <li>Recupera o valor do atributo <code>title</code> desse elemento.</li>
      </ul>
  </ul>
  <h4>Extração de Pontuações:</h4>
  <ul>
    <li><strong>novaScore:</strong></li>
      <ul>
        <li>Extrai o sexto caractere da string <code>novaTitle</code> e o converte para maiúsculo.</li>
        <li>O sexto caractere costuma representar a pontuação Nova (ex.: "3" de "NOVA 3").</li>
      </ul>
    <li><strong>nutriScore:</strong></li>
      <ul>
        <li>Extrai o décimo terceiro caractere da string <code>nutriTitle</code> e o converte para maiúsculo.</li>
        <li>O décimo terceiro caractere costuma representar a pontuação Nutri-Score (ex.: "A" de "NUTRI-SCORE A").</li>
      </ul>
  </ul>
  <h4>Comparação e Retorno:</h4>
  <p>Compara duas expressões booleanas:</p>
  <ul>
    <li><strong>Primeira:</strong></li>
      <ul>
        <li>Verifica se a pontuação Nova desejada (em maiúsculo) é igual à pontuação Nova extraída (em maiúsculo).</li>
      </ul>
    <li><strong>Segunda:</strong></li>
      <ul>
        <li>Verifica se a pontuação Nutri desejada (em maiúsculo) é igual à pontuação Nutri extraída (em maiúsculo).</li>
      </ul>
  </ul>
  <p>Retorna:</p>
  <ul>
    <li><strong>true</strong> se ambas as comparações forem verdadeiras (as pontuações encontradas correspondem às desejadas).</li>
    <li><strong>false</strong> se qualquer das comparações for falsa (as pontuações encontradas não correspondem às desejadas).</li>
  </ul>

  
  <li><h3>ProductDataParserService: Todos os métodos dessa classe tem a finalidade de tratar e retornar os dados recebido pelo scrapping</h3>
     <h4>1. formatIngredients(ingredientes: string): string[]</h4>
  <p>Este método formata uma string contendo ingredientes em um array de strings limpo.</p>
  <h4>Passos:</h4>
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
  <h4>2. mapProductCardArray($: cheerio.Root, e: cheerio.Element): Product</h4>
  <p>Este método mapeia um elemento de cartão de produto de um objeto Cheerio para um objeto <code>Product</code>.</p>
  <h4>Passos:</h4>
  <ol>
    <li>Extrai o ID do produto, nome e informações nutricionais do elemento e seus filhos.</li>
    <li>Usa <code>mapAttributes</code> para obter títulos com base em códigos de classificação de mapas separados.</li>
    <li>Cria um novo objeto <code>Product</code> com os dados extraídos.</li>
  </ol>
  <h4>3. getKeyByValue<T>(objeto: T, valor: string): string | undefined</h4>
  <p>Este método encontra a chave de um objeto onde o valor corresponde a uma string dada.</p>
  <h4>Passos:</h4>
  <ol>
    <li>Itera pelas chaves do objeto e verifica se o valor correspondente coincide com o argumento <code>valor</code> fornecido.</li>
    <li>Se uma correspondência for encontrada, a chave é retornada.</li>
    <li>Caso contrário, <code>undefined</code> é retornado.</li>
  </ol>
  <h4>4. formatServingSize(dirtyString: string): string | string[]</h4>
  <p>Este método formata uma string contendo informações sobre o tamanho da porção.</p>
  <h4>Passos:</h4>
  <ol>
    <li>Remove os espaços em branco da string <code>dirtyString</code>.</li>
    <li>Remove o texto desnecessário usando expressões regulares.</li>
    <li>Verifica se o último caractere é "g".</li>
    <ul>
      <li>Se não for, retorna um array vazio usando <code>this.hasValue(null)</code>.</li>
      <li>Caso contrário, retorna a string do tamanho da porção limpa.</li>
    </ul>
  </ol>
  <h4>5. formatIngredientsAnalysis(analisys: cheerio.Element[], ingredientes: string, $: cheerio.CheerioAPI): Analysis</h4>
  <p>Este método analisa os ingredientes com base nos elementos e na string de ingredientes fornecidos.</p>
  <h4>Passos:</h4>
  <ol>
    <li>Cria um objeto <code>Analysis</code> com propriedades baseadas em classes de elementos e na lista de ingredientes formatada.</li>
    <li>Usa <code>ingredientsAnalysisMap</code> para determinar propriedades como presença de óleo de palma, adequação para veganos/vegetarianos.</li>
  </ol>
     <h4>6. formatClassificationScore(tipo: 'nova' | 'nutri', título?: string, valores?: cheerio.Element[], $?: cheerio.CheerioAPI): ClassificationScore</h4>
  <p>Este método formata as pontuações de classificação (nova ou nutri) com base no título e nos valores opcionais.</p>
  <h4>Passos:</h4>
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
    <h4>1. parseNutritionValues(values: cheerio.Element[], $: cheerio.CheerioAPI): NutritionValue[][]</h4>
  <p>Este método analisa as informações nutricionais de um array de elementos Cheerio e retorna um array de arrays, onde cada array interno contém o nível de nutrição e o valor de texto correspondente.</p>
  <h4>Passos:</h4>
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
  <h4>2. mapAttributes<T>(map: T, attribute: keyof T): T[attribute]</h4>
  <p>Este método genérico recupera um valor de atributo específico de um mapa fornecido.</p>
  <h4>Passos:</h4>
  <ol>
    <li>Recebe dois argumentos:</li>
      <ul>
        <li><code>map</code>: Um objeto que representa o mapa contendo o atributo desejado.</li>
        <li><code>attribute</code>: Uma chave que representa o atributo específico a ser recuperado.</li>
      </ul>
    <li>Retorna o valor associado à chave <code>attribute</code> especificada no objeto <code>map</code>.</li>
  </ol>
  <h4>3. hasValue(value: string | Array<string>): string | Array<string> | '?'</h4>
  <p>Este método verifica se um determinado valor representa uma string vazia ou um array vazio.</p>
  <h4>Passos:</h4>
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
    <h4>4. formatNutritionTableData(values: cheerio.Element[], $: cheerio.CheerioAPI): Map<string, Nutrition></h4>
<p>Este método analisa um array de elementos Cheerio que representam dados nutricionais em formato de tabela e retorna um Map de informações nutricionais.</p>
<h4>Passos:</h4>
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
      <li><h3>ScrapperService: É por meio desta classe, que o navegador será acessado e os daods coletados e tratados, utilizando as classes descritas acima</h3> 
         <h4>1. `getProductsByScore` (Obter Produtos por Pontuação):</h4>
            <ul>
              <li>Filtra produtos com base nas classificações Nova e Nutri-Score.</li>
              <li><strong>Registra as classificações desejadas no console.</strong></li>
              <li><strong>Navega para a URL base (this.URL).</strong></li>
              <li><strong>Carrega o HTML da página e cria um objeto Cheerio para manipulá-lo.</strong></li>
              <li>Filtra elementos correspondentes aos cards de produto (this.selectors.card).</li>
              <li>Utiliza o método <code>filterByNovaAndNutri</code> (não explicado aqui) para verificar se cada card atende às classificações desejadas.</li>
              <li>Mapeia os cards filtrados para um array de objetos de produto, utilizando o método <code>mapProductCardArray</code> (não explicado aqui).</li>
              <li><strong>Retorna o resultado filtrado como um objeto Result.ok.</strong></li>
            </ul>
            <h4>2. `getProductById` (Obter Produto por ID):</h4>
            <ul>
              <li>Recupera dados de um produto específico pelo seu ID.</li>
              <li><strong>Registra o ID do produto no console.</strong></li>
              <li><strong>Navega para a URL do produto, concatenando o ID à URL base (<span class="math-inline">\{this\.URL\}/produto/</span>{id}).</strong></li>
              <li><strong>Chama o método <code>getProductFromPage</code> para extrair os dados do produto.</strong></li>
              <li>Em caso de erro, retorna um objeto <code>Result.fail</code> com a mensagem de erro.</li>
              <li>Caso haja sucesso, extrai os dados do produto da página e cria um novo objeto <code>Product</code> com os valores recuperados.</li>
              <li><strong>Retorna o objeto <code>Product</code> encapsulado em um objeto <code>Result.ok</code>.</strong></li>
            </ul>
            <h4>3. `getProductFromPage` (Obter Produto da Página):</h4>
            <ul>
              <li>Extrai dados do produto da página atual.</li>
              <li><strong>Carrega o HTML da página e cria um objeto Cheerio para manipulá-lo.</strong></li>
              <li>Verifica se existe um elemento de erro (this.selectors.error) e retorna um objeto <code>Result.fail</code> com a mensagem de erro, se encontrado.</li>
              <li>Caso não haja erro, chama o método <code>getFormatedValuesFromSelectors</code> para extrair e formatar os dados do produto.</li>
              <li><strong>Retorna um objeto <code>Result.ok</code> contendo os dados do produto formatados.</strong></li>
            </ul>  
            <h4>4. `getFormatedValuesFromSelectors` (Obter Valores Formatados dos Seletores):</h4>
              <ul>
                <li>Extrai e formata os dados do produto a partir de seletores CSS.</li>
                <li>Extrai o texto dos elementos correspondentes ao título nutricional (this.selectors.nutrition) e aos valores nutricionais (this.selectors.nutritionValues).</li>
                <li>Recupera uma lista de elementos da tabela nutricional (this.selectors.data).</li>
                <li>Utiliza o método <code>dataParser.formatNutritionTableData</code> (não explicado aqui) para formatar os dados da tabela nutricional.</li>
                <li>Utiliza o método <code>dataParser.formatIngredientsAnalysis</code> (não explicado aqui) para formatar a análise de ingredientes.</li>
                <li>Extrai valores específicos usando seletores individuais:</li>
                  <ul>
                    <li>Título (this.selectors.title)</li>
                    <li>Quantidade (this.selectors.quantity)</li>
                    <li>Classificação Nova (this.selectors.nova) - formatada usando <code>dataParser.formatClassificationScore</code> (não explicado aqui)</li>
                    <li>Classificação Nutri-Score (nutriTitle, nutritionValues) - formatada usando <code>dataParser.formatClassificationScore</code> (não explicado aqui)</li>
                    <li>Tamanho da porção (this.selectors.servingSize) - formatado usando <code>dataParser.formatServingSize</code> (não explicado aqui)</li>
                  </ul>
                <li>Converte os dados da tabela nutricional em um objeto usando <code>Object.fromEntries</code>.</li>
                <li><strong>Retorna um objeto contendo todos os dados do produto extraídos e formatados.</strong></li>
              </ul>
      </li>
</ul>



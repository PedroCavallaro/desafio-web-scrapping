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

<h1>Desafios</h1>
<ul>
  <li>Performance: quando começei a testar o código, percebi que estava levando cerca de 12 segundos para uma resposta, e que boa parte desse tempo era para o puppeter abrir. Para resolver isso decidi fazer um cache da mesma página, e aplicar a configuração  { waitUntil: 'domcontentloaded'}, desta forma o tempo da primeira requisição fica em torno de 5 segundos, e das próximas entre 1 a 2 segundos</li>
  
</ul>

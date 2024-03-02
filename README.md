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

# Project Challenge | Liqi

Desenvolvedor Back end Pleno

OBS: Alternar entre as branchs desafio-1 e desafio-2

## Desafio 1 (Opção 2)

- Criar testes unitários.
- Criar uma aplicação com uma API REST.
  ○ Desenvolva uma aplicação backend que consuma uma API de
  cotação de moedas (https://www.exchangerate-api.com/) para
  realizar a conversão entre diferentes moedas. O usuário deve poder
  especificar a quantia, a moeda de origem e a moeda de destino. A
  aplicação deve calcular o valor convertido com base na cotação
  atual.

Nota: Para uma aplicação simples e pequena como essa, fazer todas essas abstrações é meio desnecessário, mas estou fazendo para fins de demonstração do meu conhecimento

### Instalação

- Requisitos: Node (estou usando a versão 20.12.0, mas qualquer uma deve pegar)

1. Rode `npm install` para instalar as dependências
2. Pegar uma key para a API https://www.exchangerate-api.com/
3. Crie um arquivo `.env` de acordo com o `.example.env`
4. `npm run start` para rodar a aplicação
5. `npm run test` para rodar os testes unitários
6. Acesse a documentação da API na rota: `/api-docs` (Ex.: http://localhost:3333/api-docs)

## Desafio 2

(Acrescentar as etapas do desafio 1, faça em branchs separadas)

- Teste Serverless Syncrono:

  - Criar uma função Lambda que será acionada pela Api Gateway no
    método POST por meio do endpoint: createUser. O mesmo body
    que for recebido deverá ser retornado como sucesso para a
    ApiGateway. Fica a critério do candidato os dados que serão
    enviados.

- Teste Serverless Assyncrono:
  - Criar uma função Lambda que será acionada pelo SQS.
  - Após ser acionada, a lambda deverá enviar os mesmos dados para
    um eventBridge.

### Instalação

- Requisitos:
  - Node
  - aws-cli (com algum usuário logado com permissão para as operações que seram realizadas)
  - aws-sam

1. Rode `npm install` para instalar as dependências
2. Rode `sam build; sam deploy` para buildar e realizar o deploy dos recursos e funções lambdas na sua conta AWS.

### Execução

- Teste Serverless Syncrono:
  Basta realizar uma requisição POST na rota `/createUser` criada após o deploy (utilizar URL disponbilizada pelo ApiGateway, a requisição pode ser feita por ele, inclusive). Enviar o `body` que desejar, o mesmo será retornado na resposta, como pedido.

- Teste Serverless Assyncrono:
  1. No próprio console AWS, você pode ir na Fila criada como recurso pelo AWS-SAM (liqi-challenge-02-sqs) e enviar um teste com o corpo desejado
  2. No CloudWatch - Grupo de Logs, podemos checar que a Lambda SQSEventsListener foi chamada, lá também terá os consoles logs da chamada para o EventBridger
  3. Para verificar os eventos enviados pelo EventBridger, opcionalmente, é possível criar uma regra para o barramento de eventos, que filtra eventos com o `source` utilizado na lambda (`{ "source": ["sqs.to.lambda.to.eventbridge"] }`), mapeando o destino para o Grupo de logs do CloudWatch

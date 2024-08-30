# Shopper API - Teste Técnico

Este projeto implementa uma API que gerencia leituras de consumo de água e gás através de processamento de imagens, utilizando uma integração com a API do Google Gemini. Ele foi desenvolvido como parte de um teste técnico para desenvolvimento web.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o JavaScript no lado do servidor.
- **TypeScript**: Superconjunto do JavaScript que adiciona tipos estáticos.
- **Express**: Framework web para Node.js.
- **Jest**: Framework de testes para JavaScript.
- **Docker**: Ferramenta para criar e gerenciar containers.
- **Axios**: Cliente HTTP baseado em promessas para realizar requisições à API externa (Google Gemini).

## Pré-requisitos

- **Node.js** e **npm** instalados.
- **Docker** e **Docker Compose** instalados.
- Chave de API da **Google Gemini** para a integração (crie um arquivo `.env`).

## Endpoints

1.  `POST /upload`
  - Recebe uma imagem base64, processa a imagem utilizando a API Google Gemini e retorna o valor da leitura (água ou gás).
  - Request Body:
    ```bash
    {
    "image": "base64",
    "customer_code": "string",
    "measure_datetime": "datetime",
    "measure_type": "WATER" ou "GAS"
    }
    ```
  - Response (`200 OK`):
    ```bash
    {
    "image_url": "string",
    "measure_value": 123,
    "measure_uuid": "string"
    }
    ```
  - Erros:
    - `400 INVALID_DATA`: Dados fornecidos inválidos.
    - `500 Erro ao processar a imagem.`

2. `PATCH /confirm`
  - Confirma ou corrige o valor lido anteriormente.
  - Request Body:
    ```bash
    {
    "measure_uuid": "string",
    "confirmed_value": 120
    }
    ```
  - Response (`200 OK`):
    ```bash
    {
    "success": true
    }
    ```
  - Erros:
    - `400 INVALID_DATA`: Dados fornecidos inválidos.
    - `404 MEASURE_NOT_FOUND`: Leitura não encontrada.
    - `409 CONFIRMATION_DUPLICATE`: Leitura já confirmada.

3. `GET /:customer_code/list`
  - Lista todas as leituras feitas para um cliente. Pode filtrar por tipo de medição (`WATER` ou `GAS`).
  - Query Params:
    - `measure_type`: (opcional) Filtra por tipo de medição.
  - Response (`200 OK`):
    ```bash
    {
    "customer_code": "string",
    "measures": [
      {
        "measure_uuid": "string",
        "measure_datetime": "datetime",
        "measure_type": "string",
        "confirmed": boolean,
        "image_url": "string"
      }
    ]
    }
    ```
  - Erros:
    - `400 INVALID_TYPE` : Tipo de medição não permitida.
    - `404 MEASURES_NOT_FOUND` : Nenhuma leitura encontrada.


## Testes
Para garantir que a API esteja funcionando corretamente, há testes unitários implementados com `jest` e `supertest`.
  - `POST /upload`: Testa se a imagem é processada corretamente e retorna os valores esperados.
  - `PATCH /confirm`: Testa a confirmação da leitura, verificando se os valores são atualizados corretamente.
  - `GET /:customer_code/list`: Testa se as leituras para o cliente são retornadas corretamente, incluindo filtros de tipo de medição

---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

### Endpoints

#### Obter todas as informações dos jogadores
```javascript
GET /player
```


**Códigos de status:**

- 200: Sucesso ✅
- 404: Não encontrado 🚫

#### Obter informações de um jogador específico

```javascript
GET /player/{id}
```



**Parâmetros:**

- `id` (int): ID do jogador

**Códigos de status:**

- 200: Sucesso
- 404: Não encontrado

#### Adicionar um novo jogador
```javascript
POST /player
```



**Cabeçalho:**
```javascript
- `Content-Type: application/json`
```

**Corpo da solicitação (JSON):**

```json
{
  "nome": "Nome do jogador",
  "data_nascimento": "Data de nascimento do jogador",
  "nacionalidade": "Nacionalidade do jogador",
  "posicao": "Posição do jogador",
  "altura": 1.80,
  "peso": 75.5,
  "contrato_atual": "Contrato atual do jogador",
  "salario_atual": 5000.00
}
```

**Códigos de status**:

- 201: Jogador adicionado com sucesso 👍

```javascript
PUT /player/{id}
```

Parâmetros:

```javascript
id (int): ID do jogador a ser atualizado
Cabeçalho:

Content-Type: application/json
Corpo da solicitação (JSON):
```

```json
{
  "nome": "Novo nome do jogador",
  "data_nascimento": "Nova data de nascimento do jogador",
  "nacionalidade": "Nova nacionalidade do jogador",
  "posicao": "Nova posição do jogador",
  "altura": 1.85,
  "peso": 78.0,
  "contrato_atual": "Novo contrato atual do jogador",
  "salario_atual": 5500.00
}
```
**Códigos de status:**

200: Informações do jogador atualizadas com sucesso ✅⚽

404: Não encontrado 🚫⚽

### Remove um jogador.

```javascript
DELETE /player/{id}
```

Parâmetros:

```javascript
id (int): ID do jogador a ser removido
```

**Códigos de status:**

200: Jogador removido com sucesso ✅⚽

404: Não encontrado 🚫⚽


### Retorna informações de performance de um jogador.

```javascript
GET /performance/{id}
```


Parâmetros:


id (int): ID do jogador

**Códigos de status**:

200: Sucesso ✅⚽
404: Não encontrado 🚫⚽



### Adicionar informações de performance para um jogador

```javascript
POST /performance
```

Cabeçalho:

```javascript
Content-Type: application/json
```
Corpo da solicitação (JSON):


```json
{
  "id_jogador": 123,
  "gols_marcados": 10,
  "assistencias": 5,
  "jogos_disputados": 20,
  "minutos_jogados": 1800,
  "chutes_a_gol": 30,
  "passes_completos": 500,
  "defesas": 15,
  "cartoes_amarelos": 2,
  "cartoes_vermelhos": 1
}
```

### Atualizar informações de performance de um jogador

**Código de status**:

201: Informações de performance adicionadas com sucesso


```javascript
PUT /performance/{id}
```



Parâmetros:

```javascript
id (int): ID do jogador
```

Cabeçalho:

```javascript
Content-Type: application/json

Corpo da solicitação (JSON):
```

```json
{
  "gols_marcados": 15,
  "assistencias": 8,
  "jogos_disputados": 25,
  "minutos_jogados": 2200,
  "chutes_a_gol": 40,
  "passes_completos": 600,
  "defesas": 20,
  "cartoes_amarelos": 3,
  "cartoes_vermelhos": 2
}

```

## Remove informações de performance de um jogador.

**Códigos de status**:

200: Informações de performance do jogador atualizadas com sucesso

404: Não encontrado

DELETE /performance/{id}


Parâmetros:

id (int): ID do jogador


Códigos de status:

200: Informações de performance do jogador removidas com sucesso
404: Não Encontrado

```javascript
GET /lesoes/{id}
```


Parâmetros:

id (int): ID do jogador

**Códigos de status**:

200: Sucesso
404: Não encontrado

### Obtém informações de transferências de um jogador.

```javascript
GET /transferencias/{id}
```


Parâmetros:

id (int): ID do jogador


**Códigos de status**:

200: Sucesso
404: Não encontrado


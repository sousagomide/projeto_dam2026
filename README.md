# Trabalho Prático em Grupo — DAM + Projeto de Interface de Aplicativos

**Instituto Federal Goiano — Campus Trindade**
Técnico em Informática Integrado ao Ensino Médio

Disciplinas: *Desenvolvimento de Aplicativos Móveis* + *Projeto de Interface de Aplicativos*
Professor: Prof. Dr. Adson Silva Rocha

| | |
|---|---|
| **Grupos** | 4 a 5 alunos |
| **Prazo** | 30 dias |
| **Valor** | 10,0 pontos |

---

## 1. Objetivo

Desenvolver, em grupo, uma **aplicação web completa** para cadastro de informações, com:

- interface em **React**;
- API em **Node.js com Express**;
- dados armazenados em **PostgreSQL**.

A aplicação deve permitir as quatro operações básicas de um cadastro (**CRUD**):

| Operação | Significado |
|---|---|
| **C**reate | cadastrar |
| **R**ead | listar / consultar |
| **U**pdate | editar |
| **D**elete | excluir |

O trabalho reúne os conteúdos da disciplina — componentes, JSX, props, estilos, renderização condicional, listas, eventos e os hooks `useState` e `useEffect` — agora integrados a um banco de dados real.

## 2. Tema

Cada grupo deve escolher **um** dos temas abaixo. **Dois grupos não podem escolher o mesmo tema**, por isso a escolha deve ser informada ao professor na primeira semana.

| Tema | Sugestão de campos da tabela |
|---|---|
| Biblioteca da turma | título, autor, ano de publicação, disponível (sim/não) |
| Lista de tarefas | descrição, responsável, data limite, concluída (sim/não) |
| Catálogo de filmes ou séries | título, gênero, ano, nota (0 a 10) |
| Cardápio da cantina | nome do produto, categoria, preço, quantidade em estoque |
| Agenda de contatos | nome, telefone, e-mail, data de aniversário |
| Cadastro de pets | nome, espécie, idade, nome do tutor |
| Tema próprio | proposto pelo grupo e aprovado pelo professor |

## 3. Tecnologias obrigatórias

- **Front-end:** React (projeto criado com **Vite**). A estilização pode ser feita com CSS comum ou com **Tailwind CSS**.
- **Back-end:** Node.js com **Express**, usando a biblioteca **`pg`** para acessar o banco e **`cors`** para permitir o acesso do front-end.
- **Banco de dados:** **PostgreSQL** (pode ser administrado pelo pgAdmin ou pelo terminal `psql`).

## 4. Requisitos do banco de dados

- Criar um banco de dados para o projeto e uma **tabela principal com, no mínimo, 5 colunas**, sendo uma delas a chave primária `id` do tipo `SERIAL`.
- Usar **pelo menos dois tipos de dados diferentes** (por exemplo: `VARCHAR`, `INTEGER`, `NUMERIC`, `DATE` ou `BOOLEAN`).
- Entregar um arquivo **`banco.sql`** com o comando `CREATE TABLE` e **pelo menos 5 comandos `INSERT`** com dados de exemplo.

Exemplo para o tema “Biblioteca da turma”:

```sql
CREATE TABLE livros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  ano INTEGER,
  disponivel BOOLEAN DEFAULT true
);

INSERT INTO livros (titulo, autor, ano) VALUES ('Dom Casmurro', 'Machado de Assis', 1899);
```

## 5. Requisitos do back-end (API)

A API deve estar em uma pasta **`backend`** e oferecer as rotas abaixo (troque `itens` pelo nome da tabela do seu tema, por exemplo `livros`):

| Método | Rota | O que faz | Comando SQL |
|---|---|---|---|
| `GET` | `/itens` | Lista todos os registros | `SELECT` |
| `GET` | `/itens/:id` | Busca um registro pelo id | `SELECT ... WHERE id = $1` |
| `POST` | `/itens` | Cadastra um novo registro | `INSERT` |
| `PUT` | `/itens/:id` | Altera um registro existente | `UPDATE` |
| `DELETE` | `/itens/:id` | Exclui um registro | `DELETE` |

Além disso:

- Os dados de conexão com o banco devem ficar em um **arquivo separado** (por exemplo, `db.js`).
- As consultas devem usar **parâmetros** (`$1`, `$2`, ...) em vez de juntar textos com `+`, o que evita erros e falhas de segurança (**SQL Injection**).
- A API deve responder em formato **JSON**.

Exemplo de conexão (`db.js`):

```js
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres', password: 'sua_senha',
  host: 'localhost', port: 5432, database: 'biblioteca'
});
module.exports = pool;
```

Exemplo de duas rotas (`index.js`):

```js
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/livros', async (req, res) => {
  const resultado = await pool.query('SELECT * FROM livros ORDER BY id');
  res.json(resultado.rows);
});

app.post('/livros', async (req, res) => {
  const { titulo, autor, ano } = req.body;
  const resultado = await pool.query(
    'INSERT INTO livros (titulo, autor, ano) VALUES ($1, $2, $3) RETURNING *',
    [titulo, autor, ano]
  );
  res.status(201).json(resultado.rows[0]);
});

app.listen(3000, () => console.log('API rodando na porta 3000'));
```

## 6. Requisitos do front-end (React)

O front-end deve estar em uma pasta **`frontend`** e atender a **todos** os itens abaixo:

- **Componentes:** dividir a interface em, no mínimo, **3 componentes além do `App`** (sugestão: `Cabecalho`, `Formulario`, `Lista` e `Item`), cada um em seu próprio arquivo dentro de `src/components`.
- **Props:** passar dados e funções do componente pai para os filhos por meio de props (por exemplo, passar a lista de registros para o componente `Lista`).
- **`useState`:** guardar em estado a lista de registros e os valores dos campos do formulário (inputs controlados com `value` e `onChange`).
- **`useEffect`:** carregar a lista de registros da API quando a página for aberta.
- **Listas:** exibir os registros com `map()`, usando o `id` do banco como `key`.
- **Renderização condicional:** exibir a mensagem “Nenhum registro cadastrado” quando a lista estiver vazia e mudar o texto do botão de “Cadastrar” para “Salvar alterações” quando estiver editando.
- **Eventos:** usar `onClick`, `onChange` e `onSubmit` nos botões, campos e formulário.
- **CRUD completo pela interface:** cadastrar, listar, editar (ao clicar em “Editar”, os dados do registro devem aparecer no formulário) e excluir (**pedir confirmação** antes de excluir).
- **Validação simples:** não permitir o envio do formulário com campos obrigatórios vazios.

Exemplo de carregamento dos dados com `useEffect`:

```jsx
const [livros, setLivros] = useState([]);

useEffect(() => {
  fetch('http://localhost:3000/livros')
    .then((resposta) => resposta.json())
    .then((dados) => setLivros(dados));
}, []);
```

## 7. Estrutura de pastas esperada

```
Trabalho_DAM_NomeDoTema/
├── backend/
│   ├── package.json
│   ├── db.js
│   └── index.js
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       └── components/
├── banco.sql
└── integrantes.txt
```

## 8. Cronograma sugerido

| Semana | Atividades |
|---|---|
| 1ª semana | Formar o grupo, escolher o tema, definir os campos da tabela, criar o banco e o arquivo `banco.sql`, criar os projetos `backend` e `frontend`. |
| 2ª semana | Desenvolver a API com as 5 rotas e testá-las pelo navegador ou por uma ferramenta como Thunder Client, Insomnia ou Postman. |
| 3ª semana | Criar os componentes React, a listagem (`useEffect` + `fetch`) e o formulário de cadastro. |
| 4ª semana | Implementar edição e exclusão, fazer a estilização, testar tudo, organizar os arquivos e enviar o trabalho. |

Recomenda-se dividir as tarefas entre os integrantes (banco de dados, API, componentes, estilização e testes), **mas todos devem compreender o funcionamento do projeto como um todo**.

## 9. Forma de entrega

- **Apenas um integrante** do grupo deve enviar o trabalho, pelo ambiente virtual da disciplina, até a data de entrega.
- Enviar **um único arquivo compactado (`.zip`)** com o nome `Trabalho_DAM_NomeDoTema.zip`.
- **Não incluir as pastas `node_modules`** (nem do backend nem do frontend). Elas são recriadas com o comando `npm install`.
- Incluir na raiz do arquivo compactado um arquivo **`integrantes.txt`** com o nome completo de todos os integrantes do grupo, um por linha.
- Incluir também o arquivo **`banco.sql`** e as pastas **`backend`** e **`frontend`**, conforme a estrutura da seção 7.

## 10. Critérios de correção

| Critério | O que será avaliado | Pontos |
|---|---|---|
| **Funcionamento** | A API e o front-end executam sem erros após `npm install`. Cadastrar (1,0), listar (1,0), editar (1,0) e excluir (1,0) funcionam pela interface, com os dados gravados no PostgreSQL. | 5,0 |
| **Completeza** | Todos os requisitos das seções 4, 5 e 6 foram atendidos: tabela e `banco.sql`, as 5 rotas, componentes, props, `useState`, `useEffect`, listas com `key`, renderização condicional, eventos e validação. | 3,0 |
| **Organização** | Estrutura de pastas da seção 7, componentes em arquivos separados, nomes claros de variáveis e funções, código indentado, entrega sem `node_modules` e com o `integrantes.txt`. | 1,0 |
| **Interface** | Layout organizado e fácil de usar, com campos identificados, botões claros e mensagens ao usuário. | 1,0 |
| **Total** | | **10,0** |

### Observações sobre a correção

- Um projeto que **não executa** recebe **nota zero** no critério *Funcionamento*. Os demais critérios serão avaliados pela leitura do código.
- Uma operação que só funciona **parcialmente** (por exemplo, edição que não grava no banco) recebe **metade** da pontuação daquela operação.
- Envio com a pasta `node_modules`: **desconto de 0,5 ponto**.
- Somente os alunos listados no `integrantes.txt` receberão a nota do trabalho.
- Trabalhos entregues **após o prazo não serão aceitos**, salvo nos casos previstos no regulamento da instituição.
- Trabalhos **copiados**, total ou parcialmente, de outros grupos receberão **nota zero** para todos os envolvidos.
- O professor poderá pedir que **qualquer integrante explique** uma parte do código. Se o aluno não souber explicar, sua nota individual poderá ser reduzida.

## 11. Dicas

- Criem o banco e testem as rotas da API **antes** de começar o front-end. Assim fica mais fácil descobrir onde está um erro.
- Mantenham o terminal da API aberto enquanto usam o front-end: os erros do back-end aparecem nele, e os do front-end aparecem no console do navegador (tecla **F12**).
- Antes de enviar, apaguem as pastas `node_modules`, descompactem o `.zip` em outra pasta e confiram se está tudo lá.

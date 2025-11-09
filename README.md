# 🛸 Portal Dimensional Rick and Morty

## 📋 Sobre o Projeto

Este projeto é uma aplicação web front-end que consome a API pública do Rick and Morty para exibir informações sobre os personagens da série. Desenvolvido com HTML, CSS e JavaScript puro, sem frameworks, como parte de um desafio acadêmico.

## 🎯 Objetivos do Projeto

- Consumir dados em tempo real de uma API REST
- Criar elementos HTML dinamicamente com JavaScript
- Manipular o DOM para exibir informações de forma interativa
- Implementar filtros e busca de personagens
- Criar uma interface responsiva e atraente

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da página
- **CSS3**: Estilização e responsividade
- **JavaScript (ES6+)**: Lógica, consumo da API e manipulação do DOM
- **Rick and Morty API**: Fonte de dados dos personagens

## 🔧 Funcionalidades

### Principais
- ✅ Listagem dinâmica de personagens com cards
- ✅ Busca por nome do personagem
- ✅ Filtro por status (Vivo, Morto, Desconhecido)
- ✅ Paginação de resultados
- ✅ Estatísticas em tempo real
- ✅ Sistema de favoritos
- ✅ Design responsivo

### Técnicas Implementadas
- **Fetch API**: Requisições HTTP assíncronas
- **Async/Await**: Programação assíncrona moderna
- **DOM Manipulation**: createElement, appendChild, innerHTML
- **Event Listeners**: Interatividade com o usuário
- **CSS Grid & Flexbox**: Layout responsivo

## 🌐 API Utilizada

**Rick and Morty API**
- URL Base: `https://rickandmortyapi.com/api/character`
- Documentação: https://rickandmortyapi.com/documentation
- Gratuita e sem necessidade de autenticação
- Limite: Sem restrições

### Endpoints Utilizados
```javascript
GET /api/character              // Lista todos os personagens
GET /api/character?page=1       // Paginação
GET /api/character?name=rick    // Busca por nome
GET /api/character?status=alive // Filtro por status
```

## 💻 Como Executar

1. **Clone ou baixe o repositório**
```bash
git clone [url-do-repositorio]
cd frontend-desenho-animado
```

2. **Abra o arquivo index.html em um navegador**
   - Opção 1: Duplo clique no arquivo `index.html`
   - Opção 2: Use um servidor local (Live Server no VS Code)
   - Opção 3: Abra diretamente pelo navegador (Arquivo → Abrir)

3. **Não requer instalação de dependências!**
   - Projeto usa apenas HTML, CSS e JavaScript vanilla

## 📱 Responsividade

O projeto é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- 🖥️ Desktop (1920px+)
- 💻 Laptop (1024px - 1919px)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (até 767px)

## 🎨 Paleta de Cores

- Primary: `#667eea` (Roxo)
- Secondary: `#764ba2` (Roxo escuro)
- Accent: `#97ce4c` (Verde limão)
- Background: Gradiente roxo
- Cards: Branco `#ffffff`

## 📝 Código JavaScript - Principais Funções

### fetchCharacters()
Busca os personagens na API usando fetch e trata os dados recebidos.

### createCards()
Cria dinamicamente os cards HTML para cada personagem usando:
- `document.createElement()`
- `element.appendChild()`
- `element.innerHTML`

### updateStats()
Atualiza as estatísticas (total de personagens, vivos, mortos).

### toggleFavorite()
Permite marcar/desmarcar personagens favoritos.

## 🎓 Conceitos Aplicados

### 1. API e Consumo de Dados
- Requisições HTTP com Fetch API
- Tratamento de promises com async/await
- Manipulação de JSON

### 2. DOM Manipulation
- Criação dinâmica de elementos
- Inserção no DOM
- Event handling

### 3. JavaScript Moderno
- Arrow functions
- Template literals
- Destructuring
- Array methods (filter, forEach, map)

## 🔍 Exemplo de Uso do Fetch

```javascript
async function fetchCharacters(page = 1) {
    const response = await fetch(`${API_URL}?page=${page}`);
    const data = await response.json();
    createCards(data.results);
}
```

## 📊 Estrutura dos Dados da API

```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive",
  "species": "Human",
  "gender": "Male",
  "origin": {
    "name": "Earth (C-137)"
  },
  "location": {
    "name": "Citadel of Ricks"
  },
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
}
```

## 🎯 Diferencial do Projeto

1. **Interface Intuitiva**: Design moderno inspirado no tema do desenho
2. **Performance**: Carregamento rápido e eficiente
3. **Interatividade**: Múltiplas formas de interação (busca, filtros, favoritos)
4. **Código Limpo**: Bem comentado e organizado
5. **Responsivo**: Funciona em todos os dispositivos

## 📚 Referências

- [MDN - Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- [Rick and Morty API Docs](https://rickandmortyapi.com/documentation)
- [MDN - createElement](https://developer.mozilla.org/pt-BR/docs/Web/API/Document/createElement)
- [MDN - appendChild](https://developer.mozilla.org/pt-BR/docs/Web/API/Node/appendChild)

## 👨‍💻 Autor

Projeto desenvolvido para a disciplina de Front-End Development
**Ano**: 2025

## 📄 Licença

Este projeto é para fins educacionais.

---

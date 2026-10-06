# 💰 Simulador de Investimentos em React

Projeto desenvolvido para a **Prática em Aula 03 / Aula 09 — Simulador de Investimentos em React**.

O objetivo da aplicação é simular a evolução ano a ano de investimentos a partir de valores fornecidos pelo usuário (investimento inicial, aporte anual, retorno anual esperado e duração em anos), exibindo uma tabela reativa com o valor acumulado, rendimento anual, total de juros acumulados e capital investido.

---

## 🎯 Objetivos de Aprendizagem
- **Componentização e composição com JSX**: divisão clara da interface em componentes reutilizáveis e envio de dados via `props`.
- **Inputs controlados e useState**: manipulação de eventos e atualização imutável do estado.
- **Elevação de Estado (Lifting State Up)**: centralização do estado no componente raiz (`App.jsx`) para compartilhamento síncrono entre o formulário (`UserInput.jsx`) e a tabela (`Results.jsx`).
- **Renderização condicional**: exibição de mensagens de orientação caso a duração informada seja inferior a 1 ano.
- **Formatação de moedas**: uso da API nativa `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })`.
- **Organização modular**: separação limpa de responsabilidades entre `components/`, `util/`, `assets/`.

---

## 🚀 Tecnologias Utilizadas
- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- Vanilla CSS estilizado conforme o protótipo do [Figma](https://www.figma.com/design/os8WUnafzQimTc5pvmu2T0/React-Investment-Calculator-%E2%80%94-UI-para-aula?node-id=0-1&t=l7Sbjf6I8eVDiobV-1)

---

## 📁 Estrutura do Projeto

```
investment-calculator/
├── public/
│   └── investment-calculator-logo.png
├── src/
│   ├── assets/
│   │   └── investment-calculator-logo.png
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── UserInput.jsx
│   │   └── Results.jsx
│   ├── util/
│   │   └── investment.js
│   ├── App.jsx
│   ├── index.css
│   └── index.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 💻 Como Executar o Projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:5173`.

3. **Gerar a compilação de produção:**
   ```bash
   npm run build
   ```

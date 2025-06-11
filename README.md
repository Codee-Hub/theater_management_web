# 🎭 Gestão de Teatro Web

Este projeto, **"gestao_teatro_web"**, é uma aplicação web para o gerenciamento de eventos de um teatro. Ele oferece interfaces distintas para **clientes** e **organizadores**, permitindo uma solução completa para a gestão do teatro.

---

## 🔍 Visão Geral do Projeto

A aplicação facilita todo o ciclo de gerenciamento de eventos, tanto da perspectiva da administração do teatro quanto de seus clientes.  
Os organizadores podem **criar e gerenciar eventos**, enquanto os clientes podem **navegar, comprar ingressos** e **visualizar seus próximos eventos**.  
O sistema suporta diferentes **papéis de usuário**, garantindo que as funcionalidades sejam acessíveis aos usuários apropriados.

---

## 🚀 Funcionalidades Principais

### 🔐 Autenticação de Usuário
- Sistema seguro de **login** e **cadastro** para clientes.

### 🛂 Controle de Acesso Baseado em Função
- Diferencia entre **usuários comuns (Clientes)** e **administradores (Organizadores)**.
- Direcionamento para os respectivos **painéis** após o login.

---

### 🎨 Telas da Aplicação

**Tela de Login**
![Tela de Login](https://github.com/Codee-Hub/theater_management_web/blob/main/imgs/tela_de_login.jpg)

**Tela de Cadastro**
![Tela de Cadastro](https://github.com/Codee-Hub/theater_management_web/blob/main/imgs/tela_de_cadastro.jpg)

**Tela de Eventos**
![Tela de Eventos](https://github.com/Codee-Hub/theater_management_web/blob/main/imgs/pagina_de_teatros.jpg)

**Tela de Compra**
![Tela de Compra](https://github.com/Codee-Hub/theater_management_web/blob/main/imgs/pagina_de_compra.jpg)

**Tela do Administrador**
![Tela do Administrador](https://github.com/Codee-Hub/theater_management_web/blob/main/imgs/tela_do_administrador.jpg)

---


### 👤 Painel do Cliente

- **🎫 Meus Eventos**: Lista de todos os ingressos comprados.
- **🔎 Buscar Eventos**: Lista completa de eventos disponíveis.
- **🛒 Compra de Ingressos**: Modal para seleção de tipo de ingresso, poltrona e método de pagamento.
- **📄 Visão Detalhada do Evento**: Informações detalhadas dos ingressos, como:
  - 📅 Data do evento
  - ⏱️ Duração
  - 💺 Número da poltrona
  - 💰 Preço

---

### 🧑‍💼 Painel do Organizador

- **🆕 Criação de Eventos**: Inclusão de nome, data, duração, preço base e sala.
- **📋 Listagem de Eventos**: Visualização de todos os eventos disponíveis.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias web padrões.


### 🖥️ Frontend

- **HTML5**: Utilizado para a **estruturação** das páginas web, como a página de login, cadastro, e os painéis de cliente e organizador.
- **CSS3**: Empregado para a **estilização** de todos os componentes da aplicação, definindo layouts, cores e fontes para uma interface de usuário coesa.
- **JavaScript**: Usado para toda a **lógica do lado do cliente**, incluindo a manipulação do DOM, interações de formulário e comunicação assíncrona com o backend, sem a necessidade de frameworks externos.



### 🔗 Comunicação com a API

- **Fetch API**: A comunicação com o servidor backend é realizada através de **requisições HTTP** utilizando a Fetch API nativa do navegador para buscar e enviar dados em formato JSON.


---

## 🧭 Como Começar

Para rodar este projeto:

1. Garanta que o **servidor backend** esteja rodando em `http://localhost:8080` com os endpoints acima implementados.
2. Abra o arquivo `index.html` no seu navegador para iniciar a aplicação.

A partir da página de login, você pode:

- Fazer **login como cliente ou organizador**.
- Acessar a página de **cadastro** para criar uma nova conta de cliente.

# Projeto de Simulados Online

## Descrição do Projeto

O Projeto de Simulados Online é uma plataforma web moderna projetada para permitir que usuários criem, compartilhem e realizem simulados de provas e exames. Utilizando tecnologias de ponta como Next.js, TypeScript, e PostgreSQL, o sistema oferece uma experiência robusta e escalável para estudantes e educadores.

## Características Principais

- Criação e gerenciamento de simulados personalizados
- Sistema de autenticação e autorização de usuários
- Busca de simulados públicos
- Planos de assinatura (gratuito e premium)
- API RESTful documentada com Swagger

## Tecnologias Utilizadas

- Next.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT para autenticação
- Swagger para documentação da API

## Progresso Atual

Até o momento, foram implementadas as seguintes funcionalidades:

1. Configuração inicial do projeto com Next.js e TypeScript
2. Configuração do Prisma ORM com PostgreSQL
3. Implementação das rotas de autenticação (registro e login)
4. Criação do middleware de autenticação
5. Implementação da rota de criação de quizzes
6. Adição da funcionalidade de busca de simulados públicos
7. Implementação da rota para adicionar questões a um quiz existente
8. Criação da rota para atualização de metadados do quiz
9. Documentação da API com Swagger

## Próximas Etapas Planejadas

1. Implementar o frontend da aplicação utilizando React e Tailwind CSS
2. Criar um dashboard para os usuários gerenciarem seus simulados
3. Implementar o sistema de planos de assinatura (integração com Stripe)
4. Adicionar funcionalidade de realização de simulados com temporizador
5. Implementar sistema de análise de desempenho para os usuários
6. Criar modo competitivo para simulados
7. Adicionar sistema de conquistas e gamificação
8. Implementar funcionalidades de compartilhamento social
9. Desenvolver uma versão mobile da aplicação

## Como Começar

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Configure as variáveis de ambiente no arquivo `.env`
4. Execute as migrações do banco de dados com `npx prisma migrate dev`
5. Inicie o servidor de desenvolvimento com `npm run dev`

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

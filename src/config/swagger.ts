import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Simulados Online",
      version: "1.0.0",
      description: "Documentação da API do sistema de Simulados Online",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor de desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/docs/*.ts", "./src/app/api/**/*.ts"], // Inclui tanto os arquivos de documentação quanto os arquivos de rota
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

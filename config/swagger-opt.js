module.exports = {
  options: {
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "Simpel Proper",
        version: "1.0.0",
        description: "Simpel Proper's API Documentation",
        contact: {
          name: "IT Development Group",
          email: "dev@bankbsi.co.id",
        },
        license: {
          name: "2022 © PT Bank Syariah Indonesia",
        },
      },
      servers: [
        {
          description: "local server",
          url: "http://127.0.0.1:3001",
        },
        {
          description: "dev server",
          url: "http://10.0.117.100:3001",
        },
        {
          description: "prod server",
          url: "http://10.0.16.226:3001",
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
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./documentation/*.js"],
  },
};

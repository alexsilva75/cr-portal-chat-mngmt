type translateObjectType = {
  [key: string]: string;
};

const translateMailErrors: translateObjectType = {
  "The email has already been taken.": "E-mail já utilizado por outra conta.",
  "These credentials do not match our records.":
    "Usuário e/ou senha incorretos",
};

export default {
  baseURL: "https://hm.portalcrtelecom.com.br",

  translate: {
    apiErrors: {
      register: {
        email: translateMailErrors,
      },
    },
  },
};

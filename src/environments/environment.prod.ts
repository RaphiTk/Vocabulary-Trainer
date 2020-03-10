export const environment = {
  production: true,
  auth: {
    CLIENT_ID: "pYn9igA2s1PMicmuGE5jnPyxE8RuCWhx",
    CLIENT_DOMAIN: "vocabulary-trainer.eu.auth0.com", // e.g., 'you.auth0.com'
    REDIRECT: "https://www.vocabulary-trainer.tk?callback",
    LOGOUT_URL: "https://www.vocabulary-trainer.tk/logout"
  },
  vocabulary_server: {
    URL: "https://www.vocabulary-trainer.tk/vocabulary-trainer/v1/actions",
  }
};

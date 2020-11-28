import { version } from '../../package.json';

export const environment = {
  version: version,
  production: true,
  auth: {
    CLIENT_ID: "pYn9igA2s1PMicmuGE5jnPyxE8RuCWhx",
    CLIENT_DOMAIN: "vocabulary-trainer.eu.auth0.com", // e.g., 'you.auth0.com'
    REDIRECT: "https://www.vocabulary-trainer.ml?callback",
    LOGOUT_URL: "https://www.vocabulary-trainer.ml/logout"
  },
  vocabulary_server: {
    URL: "https://www.vocabulary-trainer.ml/vocabulary-trainer/v1/actions",
  }
};

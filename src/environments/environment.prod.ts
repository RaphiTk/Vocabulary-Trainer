import { version } from '../../package.json';

export const environment = {
  version: version,
  production: true,
  auth: {
    LOGIN: "pYn9igA2s1PMicmuGE5jnPyxE8RuCWhx",
    REGISTER: "vocabulary-trainer.eu.auth0.com",
  },
  vocabulary_server: {
    URL: "https://www.vocabulary-trainer.ml/vocabulary-trainer/v1/actions",
  }
};

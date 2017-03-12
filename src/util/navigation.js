import { hashHistory as history } from 'react-router';

export const goArticlePage = (articleId = 0) => {
  history.push(`/article/${articleId}`);
};

export const goHomePage = () => {
  history.push(`/home`);
};

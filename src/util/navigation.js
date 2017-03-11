import { hashHistory } from 'react-router';

export const goArticlePage = (articleId = 0) => {
  hashHistory.push(`/article/${articleId}`);
};

export const goHomePage = () => {
  hashHistory.push(`/home`);
};

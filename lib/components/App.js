import React from 'react';
import axios from 'axios';

import ArticleList from 'Components/ArticleList';

import DataApi from 'DataApi';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { initialData } = props;
    this.state = {
      articles: initialData.articles,
      authors: initialData.authors,
    };
  }

  async componentDidMount() {
    const response = await axios.get('/data');
    const api = new DataApi(response.data);

    this.setState({
      articles: api.getArticles(),
      authors: api.getAuthors(),
    });
  }

  articleActions = {
    lookupAuthor: authorId => this.state.authors[authorId],
  };

  render() {
    return (
      <ArticleList
        articles={this.state.articles}
        articleActions={this.articleActions}
      />
    );
  }
}

export default App;
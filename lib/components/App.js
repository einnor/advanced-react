import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import ArticleList from 'Components/ArticleList';
import SearchBar from 'Components/SearchBar';

class App extends React.Component {
  static childContextTypes = {
    store: PropTypes.object,
  }

  constructor(props) {
    super(props);

    const { store } = props;
    this.state = store.getState();
  }

  getChildContext = () => {
    return { store: this.props.store };
  }

  setSearchTerm = (searchTerm) => {
    this.setState({ searchTerm });
  };

  render() {
    let { articles, searchTerm } = this.state;
    if (searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchTerm)
          || value.body.match(searchTerm);
      });
    }

    return (
      <div>
        <SearchBar doSearch={this.setSearchTerm} />
        <ArticleList
          articles={articles}
        />
      </div>
    );
  }
}

export default App;
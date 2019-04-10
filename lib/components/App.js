import React from 'react';
import PropTypes from 'prop-types';
import ArticleList from 'Components/ArticleList';

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

  render() {
    return (
      <ArticleList
        articles={this.state.articles}
      />
    );
  }
}

export default App;
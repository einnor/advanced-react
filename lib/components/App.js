import React from 'react';

import ArticleList from 'Components/ArticleList';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { store } = props;
    this.state = store.getState();
  }

  render() {
    return (
      <ArticleList
        articles={this.state.articles}
        store={this.props.store}
      />
    );
  }
}

export default App;
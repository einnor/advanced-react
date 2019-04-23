import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import ArticleList from 'Components/ArticleList';
import SearchBar from 'Components/SearchBar';
import Timestamp from 'Components/Timestamp';

class App extends React.Component {
  static childContextTypes = {
    store: PropTypes.object,
  }

  constructor(props) {
    super(props);

    const { store } = props;
    this.state = store.getState();
  }

  componentDidMount() {
    this.subcriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subcriptionId);
  }

  onStoreChange = () => {
    this.setState(this.props.store.getState());
  }

  getChildContext = () => {
    return { store: this.props.store };
  }

  render() {
    const { store } = this.props;
    let { articles, searchTerm } = this.state;
    if (searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchTerm)
          || value.body.match(searchTerm);
      });
    }

    return (
      <div>
        <Timestamp />
        <SearchBar doSearch={store.setSearchTerm} />
        <ArticleList
          articles={articles}
        />
      </div>
    );
  }
}

export default App;
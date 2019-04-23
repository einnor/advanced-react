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
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  onStoreChange = () => {
    this.setState(this.props.store.getState());
  }

  getChildContext = () => {
    return { store: this.props.store };
  }

  render() {
    let { articles, searchTerm } = this.state;
    const searchRE = new RegExp(searchTerm, 'i');
    if (searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchRE)
          || value.body.match(searchRE);
      });
    }

    return (
      <div>
        <Timestamp />
        <SearchBar />
        <ArticleList
          articles={articles}
        />
      </div>
    );
  }
}

export default App;
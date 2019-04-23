import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps) => (Component) => {
  return class extends React.PureComponent {
    static displayName = `${Component.name}Container`;
    static contextTypes = {
      store: PropTypes.object,
    };

    onStoreChange = () => {
      this.forceUpdate();
    }

    componentDidMount() {
      this.subcriptionId = this.context.store.subscribe(this.onStoreChange);
    }

    componentWillUnmount() {
      this.context.store.unsubscribe(this.subcriptionId);
    }

    render() {
      const { store } = this.context;
      return <Component {...this.props} {...extraProps(store, this.props)} store={store} />;
    }
  };
};

export default storeProvider;

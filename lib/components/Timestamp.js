import React from 'react';
import storeProvider from 'Components/storeProvider';

class Timestamp extends React.PureComponent {
  static timeDisplay = timestamp => timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  shouldComponentUpdate(nextProps) {
    return (
      this.timeDisplay(this.props.timestamp) !== this.timeDisplay(nextProps.timestamp)
    );
  }

  render() {
    return (
      <div>
        {this.timestampDisplay}
      </div>
    );
  }
}

function extraProps(store) {
  return { timestampDisplay: Timestamp.timeDisplay(store.getState().timestamp) };
}

export default storeProvider(extraProps)(Timestamp);

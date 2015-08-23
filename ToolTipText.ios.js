'use strict';

var React = require('react-native');
var {
  Text,
  requireNativeComponent,
} = React;

var ViewClass = React.createClass({

  _onChange: function(event: Event) {
    this.props.onChange && this.props.onChange(event);
  },

  render: function() {
    //don't pass onChange to text.
    var { onChange, ...other } = this.props;
    return (
      <RCTToolTipText onChange={this._onChange}>
        <Text {...other } />
      </RCTToolTipText>
    );
  }
});

var RCTToolTipText = requireNativeComponent('RCTToolTipText', null);

module.exports = ViewClass;

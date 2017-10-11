'use strict';

var {
  requireNativeComponent,
  TouchableHighlight,
  View,
  NativeModules,
  findNodeHandle,
} = require('react-native');
var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var ToolTipMenu = NativeModules.ToolTipMenu;
var RCTToolTipText = requireNativeComponent('RCTToolTipText', null);

var propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  })),
  arrowDirection: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  longPress: PropTypes.bool,
  ...TouchableHighlight.propTypes,
};

var ViewClass = createReactClass({
  getDefaultProps: function() {
    return {
      arrowDirection: 'down',
    };
  },

  showMenu: function() {
    ToolTipMenu.show(findNodeHandle(this.refs.toolTipText), this.getOptionTexts(), this.props.arrowDirection);
  },
  hideMenu: function() {
    ToolTipMenu.hide();
  },
  
  getOptionTexts: function() {
    return this.props.actions.map((option) => option.text);
  },

  // Assuming there is no actions with the same text
  getCallback: function(optionText) {
    var selectedOption = this.props.actions.find((option) => option.text === optionText);

    if (selectedOption) {
      return selectedOption.onPress;
    }

    return null;
  },

  getTouchableHighlightProps: function() {
    var props = {};

    Object.keys(TouchableHighlight.propTypes).forEach((key) => props[key] = this.props[key]);

    if (this.props.longPress) {
      props.onLongPress = this.showMenu;
    } else {
      props.onPress = this.showMenu;
    }

    return props;
  },

  handleToolTipTextChange: function(event) {
    var callback = this.getCallback(event.nativeEvent.text);

    if (callback) {
      callback(event);
    }
  },

  render: function() {
    return (
      <RCTToolTipText ref='toolTipText' onChange={this.handleToolTipTextChange}>
        <TouchableHighlight
          {...this.getTouchableHighlightProps()}
        >
          <View>
            {this.props.children}
          </View>
        </TouchableHighlight>
      </RCTToolTipText>
    );
  },
});

ViewClass.propTypes = propTypes;

module.exports = ViewClass;

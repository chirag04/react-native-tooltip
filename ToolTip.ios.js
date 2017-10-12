'use strict';

const {
  requireNativeComponent,
  TouchableHighlight,
  View,
  NativeModules,
  findNodeHandle,
} = require('react-native');
const PropTypes = require('prop-types');
const React = require('react');
const ToolTipMenu = NativeModules.ToolTipMenu;
const RCTToolTipText = requireNativeComponent('RCTToolTipText', null);

const propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  })),
  arrowDirection: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  longPress: PropTypes.bool,
  ...TouchableHighlight.propTypes,
};

class ViewClass extends React.Component {
  static defaultProps = {
    arrowDirection: 'down'
  };

  showMenu = () => {
    ToolTipMenu.show(findNodeHandle(this.refs.toolTipText), this.getOptionTexts(), this.props.arrowDirection);
  };

  hideMenu = () => {
    ToolTipMenu.hide();
  };

  getOptionTexts = () => {
    return this.props.actions.map((option) => option.text);
  };

  // Assuming there is no actions with the same text
  getCallback = (optionText) => {
    var selectedOption = this.props.actions.find((option) => option.text === optionText);

    if (selectedOption) {
      return selectedOption.onPress;
    }

    return null;
  };

  getTouchableHighlightProps = () => {
    var props = {};

    Object.keys(TouchableHighlight.propTypes).forEach((key) => props[key] = this.props[key]);

    if (this.props.longPress) {
      props.onLongPress = this.showMenu;
    } else {
      props.onPress = this.showMenu;
    }

    return props;
  };

  handleToolTipTextChange = (event) => {
    var callback = this.getCallback(event.nativeEvent.text);

    if (callback) {
      callback(event);
    }
  };

  render() {
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
  }
}

ViewClass.propTypes = propTypes;

module.exports = ViewClass;

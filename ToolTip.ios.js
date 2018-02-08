'use strict';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  requireNativeComponent,
  TouchableHighlight,
  View,
  NativeModules,
  findNodeHandle,
} from 'react-native';

const ToolTipMenu = NativeModules.ToolTipMenu;
const RCTToolTipText = requireNativeComponent('RCTToolTipText', null);

export default class ToolTip extends PureComponent {
    static propTypes = {
        actions: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            onPress: PropTypes.func
        })),
        arrowDirection: PropTypes.oneOf(['up', 'down', 'left', 'right']),
        longPress: PropTypes.bool,
        onHide: PropTypes.func,
        onShow: PropTypes.func,
        ...TouchableHighlight.propTypes
    };

    static defaultProps = {
        arrowDirection: 'down',
        onHide: () => true,
        onShow: () => true
    };

    showMenu = () => {
        ToolTipMenu.show(findNodeHandle(this.refs.toolTipText), this.getOptionTexts(), this.props.arrowDirection);
        this.props.onShow();
    };

    hideMenu = () => {
        ToolTipMenu.hide();
        this.props.onHide();
    };

    getOptionTexts = () => {
        return this.props.actions.map((option) => option.text);
    };

    // Assuming there is no actions with the same text
    getCallback = (optionText) => {
        const selectedOption = this.props.actions.find((option) => option.text === optionText);

        if (selectedOption) {
            return selectedOption.onPress;
        }

        return null;
    };

    getTouchableHighlightProps = () => {
        const props = {};

        Object.keys(TouchableHighlight.propTypes).forEach((key) => props[key] = this.props[key]);

        if (this.props.longPress) {
            props.onLongPress = this.showMenu;
        } else {
            props.onPress = this.showMenu;
        }

        return props;
    };

    handleToolTipTextChange = (event) => {
        const callback = this.getCallback(event.nativeEvent.text);
        if (callback) {
            callback(event);
        }
    };

    handleBlurToolTip = () => {
        this.hideMenu();
    };

    render() {
        return (
            <RCTToolTipText ref='toolTipText' onChange={this.handleToolTipTextChange} onBlur={this.handleBlurToolTip}>
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

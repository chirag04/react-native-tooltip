# react-native-tooltip

A react-native component from displaying tooltip. Uses UIMenuController.

### Add it to your project

1. Run `npm install react-native-tooltip --save`
2. Open your project in XCode, right click on `Libraries` and click `Add
   Files to "Your Project Name"` [(Screenshot)](http://url.brentvatne.ca/jQp8) then [(Screenshot)](http://url.brentvatne.ca/1gqUD).
3. Add `libRNToolTipMenu.a` to `Build Phases -> Link Binary With Libraries`
   [(Screenshot)](http://url.brentvatne.ca/17Xfe).
4. Whenever you want to use it within React code now you can: `var ToolTipText = require('react-native-tooltip');`


## Example
```javascript
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  PixelRatio,
  Text,
  AlertIOS,
  View,
} = React;

var ToolTipText = require('react-native-tooltip');

var tooltip = React.createClass({

  handleActionSelected: function(command) {
    AlertIOS.alert(command + ' has been selected.');
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.textinputContainer}>
          <ToolTipText
            actions={[
              {text: 'x', command: 'x_command'},
              {text: 'z', command: 'z_command'}
            ]}
            onActionSelected={this.handleActionSelected}
            longPress={true}
            underlayColor={'transparent'}
            ref={'input'}
            style={styles.textinput}
          >
            <Text>
              {'chirag'}
            </Text>
          </ToolTipText>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textinputContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    width: 60,
    marginVertical: 2,
    marginHorizontal: 2,
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 5,
    borderColor: '#c7c7cc',
    padding: 2,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('tooltip', () => tooltip);
```

## Here is how it looks:
![Demo gif](https://github.com/chirag04/react-native-tooltip/blob/master/screenshot.png)

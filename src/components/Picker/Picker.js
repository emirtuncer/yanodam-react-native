import React, { useState, Component, useContext, Children } from "react";
import PropTypes from "prop-types";

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Switch,
  TouchableOpacity,
  Platform,
} from "react-native";

export default class CustomPicker extends Component {
  static propTypes = {
    containerStyle: PropTypes.style,
    style: PropTypes.style,
    autoFocus: PropTypes.bool,
    editbale: PropTypes.bool,
    textColor: PropTypes.string,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
  };

  render() {
    if (Platform.OS === "ios") {
      return (
        <View
          style={[CustomTextInputStyle.mainBlock, this.props.containerStyle]}
        >
          <View style={CustomTextInputStyle.textboxBlock}>
            <TextInput
              textColor={Colors.brandText}
              style={[CustomTextInputStyle.textInput, this.props.style]}
              labelFontSize={12}
              autoCapitalize={false}
              editable={this.props.editable}
              value={this.props.value}
              onChangeText={this.props.onChangeText}
              placeholder={this.props.placeHolder}
              placeholderTextColor={Colors.placeHolderText}
              autoFocus={this.props.autoFocus}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={[this.props.containerStyle, CustomTextInputStyle.mainBlock]}
        >
          <TextField
            textColor={Colors.brandText}
            style={[CustomTextInputStyle.textInputAndroid, this.props.style]}
            labelFontSize={12}
            value={this.props.value}
            editable={this.props.editable}
            activeLineWidth={1}
            autoCapitalize={false}
            labelTextStyle={{ fontFamily: "Roboto-Regular" }}
            tintColor={Colors.brandSecondaryText}
            onChangeText={this.props.onChangeText}
            renderAccessory={this.renderIcon.bind(this)}
            label={this.props.placeHolder}
            placeholderTextColor={Colors.placeHolderText}
            autoFocus={this.props.autoFocus}
          />
        </View>
      );
    }
  }
}

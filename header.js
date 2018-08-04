import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';


export default class Header extends Component<Props> {
  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.props.onToggleAllComplete}>
          <Text style={styles.toogleIcon}>{String.fromCharCode(10003)}</Text>
        </TouchableOpacity>
        <TextInput
          value={this.props.value}
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.onAddItem}
          placeholder="What Needs to be done?"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  toogleIcon: {
    fontSize: 30,
    color: '#CCC'
  },
  input: {
    flex: 1,
    marginLeft: 16,
    height: 50
  }
});

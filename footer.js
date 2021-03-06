import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';


export default class Footer extends Component<Props> {
  render() {
    const { filter } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filter, filter === 'all' && styles.selected]} onPress={() => this.props.onFilter('all')}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === 'active' && styles.selected]} onPress={() => this.props.onFilter('active')}>
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === 'completed' && styles.selected]} onPress={() => this.props.onFilter('completed')}>
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'grey'
  },
  filters: {
    flexDirection: "row"
  },
  filter: {
    marginRight: 5,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  selected: {
    borderColor: "rgba(175, 47, 47, .2)"
  }
});

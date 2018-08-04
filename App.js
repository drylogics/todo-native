import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ListView, Keyboard, ScrollView} from 'react-native';

import Header from './header';
import Footer from './footer';
import Row from './row';

const filterItems = (items, filterType) => {
  return items.filter((item) => {
    if(filterType === 'completed') return item.complete;
    if(filterType === 'active') return !item.complete;
    return true;
  });
}
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      filter: 'all',
      allComplete: false,
      value: "",
      items: [],
      dataSource: ds.cloneWithRows([])
    }
    this.setSource = this.setSource.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this)
    this.handleToggleComplete = this.handleToggleComplete.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleFilter = this.handleFilter.bind(this)

  
  }
  handleAddItem() {
    if(!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.setSource(newItems, filterItems(newItems, this.state.filter), {value: ''});
  }
  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map((item) => {
      if(item.key !== key) return item;
      return {
        ...item,
        complete
      }
    });
    this.setSource(newItems, filterItems(newItems, this.state.filter))
  }
  handleFilter(filterType) {
    this.setSource(this.state.items, filterItems(this.state.items, filterType), {filter: filterType})
  }
  handleToggleAllComplete() {
    const complete = !this.state.allComplete
    const newItems = this.state.items.map((item) => ({
      ...item,
      complete
    }));
    console.table(newItems);
    this.setSource(newItems, filterItems(newItems, this.state.filter), {allComplete: complete});
  }
  handleRemoveItem(key){
    const newItems = this.state.items.filter((item) => {
      return item.key !== key;
    });
    this.setSource(newItems, filterItems(newItems, this.state.filter));
  }
  setSource(items, itemsDatasource, otherState = {}) {
    this.setState(previousState => ({
      ...previousState,
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState
    }));
  }
  render() {
    return (
      <View style={styles.container}>
        <Header 
          value = {this.state.value}
          onAddItem = {this.handleAddItem}
          onChange={(value) => this.setState({ value })}
          onToggleAllComplete = {this.handleToggleAllComplete}
        />
        <ScrollView style={styles.context}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow = {({key, ...value}) => {
              return (
                <Row
                  key={key}
                  onComplete={(complete) => this.handleToggleComplete(key, complete)}
                  onRemove={ () => this.handleRemoveItem(key) }
                  {...value}
                />
              );
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} styles={styles.separator} />
            }}

          />
        </ScrollView>
        <Footer onFilter={this.handleFilter} filter={this.state.filter}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: '#F5FCFF',
        paddingTop: 30
      },
      android: {
        backgroundColor: '#F5FCFF',
      },
    })
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5"
  }
});

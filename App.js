import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Todo from "./Todo";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    }
    this.onItemUpdate = this.onItemUpdate.bind(this);
  }
  componentDidMount() {
    fetch('http://192.168.0.16:1337/todo')
      .then((response) => response.json())
      .then((todos) => {
        this.setState({todos})
      });
  }
  onItemUpdate(item, callback = () => {}) {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === item.id) {
          return Object.assign({}, todo, {
            title: item.title,
            done: item.done
          });
        } else {
          return todo;
        }
      })
    }), callback);
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.todos}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <Todo item={item} onItemUpdate={this.onItemUpdate} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
});

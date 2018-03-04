import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import Todo from "./Todo";
import NewTodo from "./NewTodo";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
    this.onItemUpdate = this.onItemUpdate.bind(this);
    this.onItemRemove = this.onItemRemove.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
  }
  componentDidMount() {
    fetch('http://192.168.0.16:1337/todo')
      .then((response) => response.json())
      .then((todos) => todos.sort((todoA,todoB) => new Date(todoB.createdAt) - new Date(todoA.createdAt)))
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
  onItemRemove(item, callback = () => {}) {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== item.id)
    }), callback);
  }
  onItemAdd(item, callback = () => {}) {
    this.setState((prevState) => ({
      todos: [item, ...prevState.todos]
    }), callback);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.add}>
          <NewTodo style={styles.add} onItemAdd={this.onItemAdd} />
        </View>
        <View style={styles.list}>
          <FlatList
            style={styles.list}
            data={this.state.todos}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Todo item={item} onItemUpdate={this.onItemUpdate} onItemRemove={this.onItemRemove} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24
  },
  list: {
    flex: 1
  },
  add: {
    flex: 0,
    height: 50
  }
});

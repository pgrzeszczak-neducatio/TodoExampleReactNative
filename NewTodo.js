import React from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';

export default class NewTodo extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ''
    };
    this.onAddPress = this.onAddPress.bind(this);
  }
  onAddPress() {
    if (!this.state.title) {
      return;
    }
    fetch(`http://192.168.0.16:1337/todo`, {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then((response) => response.json())
      .then((todo) => {
        this.setState({
          title: ''
        });
        this.props.onItemAdd(todo);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} value={this.state.title} onChangeText={(title) => this.setState({title})}/>
        <View style={styles.button}>
          <Button style={styles.button} title="Add" onPress={this.onAddPress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    fontSize: 30,
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    flex: 0,
    width: 100
  }
});

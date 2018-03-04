import React from "react";
import {View, Text, Switch, StyleSheet} from "react-native";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.onDoneChange = this.onDoneChange.bind(this);
  }
  onDoneChange(isDone) {
    const oldValue = this.props.item.done;
    this.props.onItemUpdate({
      id: this.props.item.id,
      title: this.props.item.title,
      done: isDone
    }, () => {
      fetch(`http://192.168.0.16:1337/todo/${this.props.item.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          done: isDone
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then((response) => {
          if (!response.ok) {
            this.props.onItemUpdate({
              id: this.props.item.id,
              title: this.props.item.title,
              done: oldValue
            });
          }
        });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Switch style={styles.done} value={this.props.item.done} onValueChange={this.onDoneChange} />
        <Text style={styles.title}>{this.props.item.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    alignItems: "center",
    flexDirection: "row"
  },
  done: {
    paddingLeft: 10
  },
  title: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 30
  }
});
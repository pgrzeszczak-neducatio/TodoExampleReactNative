import React from "react";
import {View, Text, Switch, StyleSheet, TextInput, TouchableHighlight} from "react-native";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      title: this.props.item.title
    };
    this.onDoneChange = this.onDoneChange.bind(this);
    this.onTitlePress = this.onTitlePress.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onDoneChange(isDone) {
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
        .then(() => {});
    });
  }

  onTitleChange() {
    const title = this.state.title;
    this.props.onItemUpdate({
      id: this.props.item.id,
      title: title,
      done: this.props.item.done
    }, () => {
      this.setState({
        editing: false
      });
      fetch(`http://192.168.0.16:1337/todo/${this.props.item.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: title
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then(() => {});
    });
  }

  onTitlePress() {
    this.setState({
      editing: true
    });
  }

  render() {
    let titleElement = (
      <TouchableHighlight onPress={this.onTitlePress}>
        <Text style={styles.title}>{this.props.item.title}</Text>
      </TouchableHighlight>
    );
    if (this.state.editing) {
      titleElement = (
        <TextInput
          style={[styles.title, styles.editable]}
          value={this.state.title}
          autoFocus={true}
          onChangeText={(title) => this.setState({title})}
          onBlur={this.onTitleChange}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Switch style={styles.done} value={this.props.item.done} onValueChange={this.onDoneChange}/>
        {titleElement}
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
  },
  editable: {
    paddingBottom: 10
  }
});
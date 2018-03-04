import React from "react";
import {View, Text, Switch, StyleSheet, TextInput, TouchableOpacity} from "react-native";

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
    this.onRemovePress = this.onRemovePress.bind(this);
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

  onRemovePress() {
    this.props.onItemRemove(this.props.item, () => {
      fetch(`http://192.168.0.16:1337/todo/${this.props.item.id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then(() => {});
    });
  }

  render() {
    let titleElement = (
      <TouchableOpacity style={styles.titleContainer} onPress={this.onTitlePress}>
        <Text style={styles.title}>{this.props.item.title}</Text>
      </TouchableOpacity>
    );
    if (this.state.editing) {
      titleElement = (
        <View style={styles.titleContainer}>
          <TextInput
            style={styles.title}
            value={this.state.title}
            autoFocus={true}
            onChangeText={(title) => this.setState({title})}
            onBlur={this.onTitleChange}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Switch style={styles.done} value={this.props.item.done} onValueChange={this.onDoneChange}/>
        {titleElement}
        <TouchableOpacity style={styles.removeContainer} onPress={this.onRemovePress}>
          <Text style={styles.remove}>X</Text>
        </TouchableOpacity>
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
    flex: 0,
    paddingLeft: 10,
    marginBottom: 5
  },
  title: {
    fontSize: 30
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 10
  },
  remove: {
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 30,
    color: 'red'
  },
  removeContainer: {
    flex: 0
  }
});
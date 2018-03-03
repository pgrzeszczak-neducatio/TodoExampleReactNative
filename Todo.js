import React from "react";
import {View, Text, Switch, StyleSheet} from "react-native";

export default class Todo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Switch style={styles.done} value={this.props.item.done} />
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
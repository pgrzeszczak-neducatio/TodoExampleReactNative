import React from "react";
import {View, Text, Switch, StyleSheet} from "react-native";

export default class Todo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Switch value={this.props.item.done} />
        <Text style={styles.title}>{this.props.item.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    flexDirection: "row"
  },
  title: {
    flex: 1,
    paddingLeft: 25,
    fontSize: 30
  }
});
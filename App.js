import React from "react";
import { NavigatorIOS } from "react-native";
import Master from "./Master.js";

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Master,
          title: "Photo List"
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

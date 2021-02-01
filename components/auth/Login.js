import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import firebase from "firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    this.onSignUp = this.onSignIn.bind(this);
  }

  onSignIn() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={{ flex: 1, padding: 100 }}>
        <TextInput
          placeholder='email'
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder='password'
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Button onPress={() => this.onSignIn()} title='Sign In' />
      </View>
    );
  }
}

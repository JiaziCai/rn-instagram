import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as firebase from "firebase";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import Add from "./components/main/Add";

const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyBrdGuOrUhk8YVQdHdO7zyJisd-hUVouAM",
  authDomain: "rn-instagram-d88fb.firebaseapp.com",
  projectId: "rn-instagram-d88fb",
  storageBucket: "rn-instagram-d88fb.appspot.com",
  messagingSenderId: "458338545836",
  appId: "1:458338545836:web:58182c0aeaca9d2c11af09",
  measurementId: "G-0R329Y5CKY",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Main from "./components/Main";
import Save from "./components/main/Save";

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ loggedIn: false, loaded: true });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loaded, loggedIn } = this.state;
    if (!loaded) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen
              name='Landing'
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Register'
              component={Register}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen
              name='Landing'
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Add'
              component={Add}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name='Save'
              component={Save}
              navigation={this.props.navigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

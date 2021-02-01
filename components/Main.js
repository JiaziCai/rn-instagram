import React, { Component } from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
  clearData,
} from "../redux/actions/index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import firebase from "firebase";
import Feed from "./main/Feed";
import Profile from "./main/Profile";
import Search from "./main/Search";

const Empty = () => {
  return null;
};

const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {
  componentDidMount() {
    this.props.clearData();
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.fetchUserFollowing();
  }
  render() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return <View></View>;
    }
    return (
      <Tab.Navigator initialRouteName='Feed' labeled={false}>
        <Tab.Screen
          name='Feed'
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Search'
          component={Search}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='magnify' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
          name='AddContainer'
          component={Empty}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='plus' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Profile}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Profile", {
                uid: firebase.auth().currentUser.uid,
              });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name='account-circle'
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { fetchUser, fetchUserPosts, fetchUserFollowing, clearData },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);

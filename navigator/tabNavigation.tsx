import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Favourite from "../screens/Favourite";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Users"
        component={Home}
        options={{ headerShown: false, tabBarIcon: () => null }}
      />
      <Tab.Screen
        name="Favourite Users"
        component={Favourite}
        options={{ headerShown: false, tabBarIcon: () => null }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

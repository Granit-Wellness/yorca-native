import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import Drugs from "../screens/Drugs";
import Resources from "../screens/Resources";
import Blog from "../screens/Blog";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Drugs";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Drugs"
        component={Drugs}
        options={{
          title: "Drugs",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
      />
      <BottomTab.Screen
        name="Blog"
        component={Blog}
        options={{
          title: "Blog",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-quote" />
          )
        }}
      />
      <BottomTab.Screen
        name="Resources"
        component={Resources}
        options={{
          title: "Resources",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-information-circle" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name || INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Drugs":
      return "Find a drug!";
    case "Blog":
      return "Blog";
    case "Resources":
      return "Treatment Centers Near You";
  }

  return null;
}

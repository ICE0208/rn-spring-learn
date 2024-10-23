import { Drawer } from "expo-router/drawer";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="tab2"
        options={{
          title: "Tab2",
          drawerIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="toggle"
        options={{
          title: "Toggle",
          drawerIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="skeleton-ui"
        options={{
          title: "Skeleton UI",
          drawerIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="skeleton-list"
        options={{
          title: "Skeleton List",
          drawerIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Drawer>
  );
}

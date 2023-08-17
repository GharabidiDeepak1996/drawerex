// React Navigation Drawer with Sectioned Menu Options & Footer
// https://aboutreact.com/navigation-drawer-sidebar-menu-with-sectioned-menu-options-footer/

import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

const CustomSidebarMenu = (props) => {
  const { state, descriptors, navigation } = props;
  const [viewIsVisible,setViewIsVisible] = useState(false)
  let lastGroupName = "";
  let newGroup = true;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route) => {
          const { drawerLabel, activeTintColor, groupName } =
            descriptors[route.key].options;


          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;

          return (
            <>
              {newGroup ? (
                <View style={styles.sectionContainer}>
                  <Text key={groupName} style={{ marginLeft: 16 }}>
                    {groupName}
                  </Text>
                  <AntDesign name="caretdown" size={24} color="black" onPress={(e)=>{
                                console.log("dfs",e,state.index,state.routes.findIndex((e) => {e.name === route.name}))

                    setViewIsVisible(true)}} />
                  {/* <View style={styles.sectionLine} /> */}
                </View>
              ) : null}
             
             {viewIsVisible &&  <DrawerItem
                key={route.key}
                label={({ color }) => (
                  <Text style={{ color }}>{drawerLabel}</Text>
                )}
                focused={
                  state.index ===
                  state.routes.findIndex((e) => e.name === route.name)
                }
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />}
             
            </>
          );
        })}
      </DrawerContentScrollView>
      <Text style={{ fontSize: 16, textAlign: "center", color: "grey" }}>
        www.aboutreact.com
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor:"yellow"
  },
  sectionLine: {
    backgroundColor: "red",
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 20,
  },
});

export default CustomSidebarMenu;

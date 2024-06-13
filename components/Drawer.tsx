// App.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Button, Text, StyleSheet } from "react-native";
import HomePage from "../app/HomePage"; // Ensure this is the correct path to your HomePage component
import { DrawerNavigationProp, RootStackParamList } from "../types/types"; // Import the types

const Drawer = createDrawerNavigator<RootStackParamList>();

// Dummy Settings screen
const SettingsScreen: React.FC<{ navigation: DrawerNavigationProp }> = ({ navigation }) => (
  <View style={styles.centered}>
    <Text>Settings Screen</Text>
  </View>
);

const Logout: React.FC<{ navigation: DrawerNavigationProp }> = ({ navigation }) => {
  const handleLogout = () => {
    // Handle the logout logic, e.g., clearing auth tokens, navigating to login screen
    console.log("User logged out");
    // For now, we just navigate to Home
    navigation.navigate("Home");
  };

  return (
    <View style={styles.centered}>
      <Text>Are you sure you want to logout?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const DrawerContent: React.FC<{ navigation: DrawerNavigationProp }> = ({ navigation }) => {
  return (
    <View style={styles.drawerContent}>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
      <Button title="Logout" onPress={() => navigation.navigate("Logout")} />
    </View>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
});

export default App;

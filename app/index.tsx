import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to{"\n"}
        <Text style={styles.highlightText}>To Do List App</Text>
      </Text>
      <Image source="https://cdn-icons-png.flaticon.com/128/4978/4978346.png" style={{ width: 200, height: 200, marginTop: 50 }} />
      <View style={{ display: "flex", flexDirection: "row", marginTop: 50, justifyContent: "space-evenly" }}>
        <Link style={styles.button} href="/login">
          Login
        </Link>
        <Link style={styles.button} href="/register">
          Register
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    alignItems: "center",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    lineHeight: 30,
  },
  highlightText: {
    fontSize: 24,
    color: "#FFD700",
  },
  button: {
    marginHorizontal: 10,
    borderRadius: 100,
    backgroundColor: "rgb(13, 106, 196)",
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});

export default Home;

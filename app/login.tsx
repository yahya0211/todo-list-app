import api from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import HomePage from "./HomePage";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginPress = async () => {
    try {
      const login = await api.post("auth/login", { username, password });
      console.log(login);

      if (username.trim() === "" || password.trim() === "") {
        Alert.alert("Error", "Please enter both username and password");
        return;
      }

      if (username === username && password === password) {
        setIsLoggedIn(true);
        Alert.alert("Success", "Logged in successfully");
      } else {
        Alert.alert("Error", "Invalid username or password");
      }

      const res = await AsyncStorage.setItem("token", login.data?.accessToken);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <HomePage />
      ) : (
        <>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source="https://cdn-icons-png.flaticon.com/128/7856/7856126.png" style={{ width: 100, height: 100, margin: 30 }} />
          </View>
          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />
          <Button title="Login" onPress={handleLoginPress} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 20,
    textAlign: "center",
    color: "#4caf50",
  },
});

export default LoginForm;

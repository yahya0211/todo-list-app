import api from "@/api";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";

const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegisterPress = async () => {
    try {
      if (username.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "" || name.trim() === "") {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert("Error", "Please enter a valid email");
        return;
      }

      const register = await api.post("auth/register", { name, username, email, password });

      Alert.alert("Success", "Registered successfully");

      router.push("/login");

      return register;
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source="https://cdn-icons-png.flaticon.com/128/4662/4662810.png" style={{ width: 100, height: 100, margin: 30 }} />
      </View>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry autoCapitalize="none" />
      <Button title="Register" onPress={handleRegisterPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
});

export default RegisterForm;

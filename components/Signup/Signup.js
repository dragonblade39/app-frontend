import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Login from "../Login/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });

  const handleLogin = async () => {
    try {
      const url = "https://vibeconnect-backend.onrender.com/User-Data/create";
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        console.log("User created successfully");
        navigation.navigate("Verification", { username: formData.username });
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../../assests/background.jpeg")} // replace with your image path
      style={styles.backgroundImage}
      blurRadius={5}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username}
          onChangeText={(text) => handleInputChange("username", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <Button title="Sign Up" onPress={handleLogin} />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text>Already have an account?</Text>
          <Text style={{ color: "blue" }} onPress={goToLogin}>
            &nbsp; Login Here
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Signup;

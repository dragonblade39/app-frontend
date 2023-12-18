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

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    axios
      .post(
        "https://vibeconnect-backend.onrender.com/User-Data/login",
        formData
      )
      .then((res) => {
        console.log(res.status);
        navigation.navigate("Home", { username: formData.username });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const goToSignup = () => {
    navigation.navigate("Signup");
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <ImageBackground
      source={require("../../assests/background.jpeg")} // replace with your image path
      style={styles.backgroundImage}
      blurRadius={5}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username}
          onChangeText={(text) => handleInputChange("username", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <Button title="Login" onPress={handleLogin} />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 15 }}>Don't have an account?</Text>
          <Text style={{ color: "blue", fontSize: 15 }} onPress={goToSignup}>
            &nbsp; Sign Up here
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

export default Login;

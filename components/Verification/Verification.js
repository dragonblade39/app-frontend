import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios";
function Verification({ route, navigation }) {
  const [Otp, setOtp] = useState(["", "", "", "", "", ""]);
  const refs = useRef([]);
  const username = route.params?.username;

  const handleChange = (index, value) => {
    const newOtp = [...Otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field
    if (index < refs.current.length - 1 && value !== "") {
      refs.current[index + 1].focus();
    }
  };

  const handleVerify = async (event) => {
    const otp = Otp.join("");

    if (otp.length < Otp.length) {
      Alert.alert("Error", "Please enter all OTP digits.");
      return;
    }

    event.preventDefault();
    const dataResponse = await axios.post(
      "https://vibeconnect-backend.onrender.com/User-Data/data",
      { username }
    );

    try {
      const obj = { username, otp, email: dataResponse.data.email };
      const url =
        "https://vibeconnect-backend.onrender.com/User-Data/verifyOTP";

      const verificationResponse = await axios.post(url, obj);

      if (verificationResponse.status === 200) {
        console.log("Account Created Successfully");
        navigation.navigate("Home", { username });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err.message);
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../assests/background.jpeg")} // replace with your image path
      style={styles.backgroundImage}
      blurRadius={5}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Verification</Text>
        <Text style={{ color: "red" }}>
          Enter te OTP sent to your registered gmail
        </Text>
        <Text>{""}</Text>
        <View style={styles.otpContainer}>
          {Otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(input) => (refs.current[index] = input)}
              style={styles.otpInput}
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleChange(index, value)}
              keyboardType="numeric"
            />
          ))}
        </View>
        <Button title="Verify OTP" onPress={handleVerify} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    color: "black",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    color: "white",
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    marginHorizontal: 5,
    fontSize: 18,
    color: "white",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Verification;

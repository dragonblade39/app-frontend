import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home({ route }) {
  const navigation = useNavigation();
  const username = route.params?.username;

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          navigation.navigate("Login");
        }}
        title="Logout"
        style={{ margin: 20 }}
      />

      <Text>{username}</Text>
    </View>
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

export default Home;

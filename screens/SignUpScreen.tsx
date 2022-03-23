import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "@react-native-elements/base";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";

const SignUpScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible((isVisible) => !isVisible);
  };
  return (
    <View style={styles.container}>
      <Text>sign up screen</Text>
      <Input
        placeholder="name"
        containerStyle={styles.inputContainer}
        onChangeText={setName}
        style={{ color: "white" }}
        rightIcon={<AntDesign name="user" color="gray" size={25} />}
      />
      <Input
        placeholder="email"
        containerStyle={styles.inputContainer}
        keyboardType="email-address"
        onChangeText={setEmail}
        style={{ color: "white" }}
        rightIcon={<Feather name="mail" color="gray" size={25} />}
      />
      <Input
        placeholder="password"
        onChangeText={setEmail}
        style={{ color: "white" }}
        containerStyle={styles.inputContainer}
        secureTextEntry={!passwordVisible}
        rightIcon={
          <Ionicons
            name={passwordVisible ? "eye-off-outline" : "eye-outline"}
            color="gray"
            size={25}
            onPress={handlePasswordVisibility}
          />
        }
      />

      <Button
        title="create account"
        buttonStyle={{ backgroundColor: "#F35046" }}
        // titleStyle={{ color: "black" }}
      />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginVertical: 5,
  },
});

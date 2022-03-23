import React, { useState } from "react";
import { Button, Icon, Input } from "@react-native-elements/base";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const handlePasswordVisibility = (): void => {
    setPasswordVisible((isVisible) => !isVisible);
  };

  const signUp = () => {
    navigation.navigate("SignUpScreen");
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>{email}</Text>
      <Input
        placeholder="email"
        containerStyle={styles.inputContainer}
        keyboardType="email-address"
        onChangeText={setEmail}
        style={{ color: "white" }}
        rightIcon={<AntDesign name="user" color="gray" size={25} />}
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
        title="sign in"
        buttonStyle={{ backgroundColor: "#F35046" }}
        // titleStyle={{ color: "black" }}
      />

      <Button
        title="you dont have an account ? Sign Up"
        buttonStyle={{ backgroundColor: "transparent" }}
        titleStyle={{ color: "red" }}
        containerStyle={{ marginVertical: 10 }}
        onPress={signUp}
      />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginVertical: 5,
  },
  signUpText: {
    color: "gray",
    fontSize: 15,
  },
});

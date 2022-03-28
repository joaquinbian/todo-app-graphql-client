import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Button, Input } from "@react-native-elements/base";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const SIGN_UP = gql`
  mutation signUp($email: String!, $name: String!, $password: String!) {
    signUp(input: { email: $email, name: $name, password: $password }) {
      code
      success
      message
      user {
        user {
          name
          email
        }
        token
      }
    }
  }
`;

interface Props
  extends NativeStackScreenProps<RootStackParamList, "SignUpScreen"> {}

const SignUpScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [signUp, { loading, data, error }] = useMutation(SIGN_UP, {
    variables: {
      email,
      name,
      password,
    },
    onCompleted: async (data) => {
      // console.log({ data }, "data en el onCompleted");
      if (data.signUp.code >= 400) return;
      await SecureStore.setItemAsync("token", data.signUp.user.token);
      // navigation.navigate("Home");
    },
  });

  console.log({ data, error: error });

  const handlePasswordVisibility = () => {
    setPasswordVisible((isVisible) => !isVisible);
  };

  const onSubmit = () => {
    signUp();
  };

  // //any --> mal
  // const onComplete = async (data: any) => {
  //   await SecureStore.setItemAsync("token", data.signUp.user.token);
  // };
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
        loading={loading}
        onPress={onSubmit}
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

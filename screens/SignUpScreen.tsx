import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Button, Input } from "@react-native-elements/base";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useUser } from "../hooks/useUser";
import { StackScreenProps } from "@react-navigation/stack";
import {
  SignInSignUpResponse,
  SignUpVars,
} from "../inrterfaces/graphql-Interfaces/signIn-signUpInterfaces";

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
          id
          avatar
        }
        token
      }
    }
  }
`;

interface Props extends StackScreenProps<RootStackParamList, "SignUpScreen"> {}

const SignUpScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const { login } = useUser();
  const [signUp, { loading, data, error }] = useMutation<
    { signUp: SignInSignUpResponse },
    SignUpVars
  >(SIGN_UP, {
    variables: { email, password, name },
    onCompleted: async (data) => {
      // console.log({ data }, "data en el onCompleted");
      if (data.signUp.code >= 400) return;
      await login(data.signUp.user.user, data.signUp.user.token);
      navigation.navigate("Home");
      // await login(data.signUp.user.user, data.signUp.user.token);
    },
  });

  console.log({ data, error: error });

  const handlePasswordVisibility = () => {
    setPasswordVisible((isVisible) => !isVisible);
  };

  const onSubmit = () => {
    console.log({ email, name, password });

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
        onChangeText={setPassword}
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

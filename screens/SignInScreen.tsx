import React, { useState } from "react";
import { Button, Icon, Input } from "@react-native-elements/base";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "../types";
import { useUser } from "../hooks/useUser";
import { User } from "../inrterfaces/userInterface";
import {
  SignInSignUpResponse,
  SignInVars,
} from "../inrterfaces/graphql-Interfaces/signIn-signUpInterfaces";

const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      success
      code
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

interface Props
  extends NativeStackScreenProps<RootStackParamList, "SignInScreen"> {}

const SignInScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const { login, user } = useUser();
  const [signIn, { data, loading, error }] = useMutation<
    { signIn: SignInSignUpResponse },
    SignInVars
  >(SIGN_IN, {
    variables: { email, password },
    onCompleted: async (data) => {
      console.log({ data }, "data en onCOmpleted signIN");
      if (data.signIn.code >= 400) return;

      await login(data.signIn.user.user, data.signIn.user.token);
    },
  });

  console.log({ user }, "en signin");

  const handlePasswordVisibility = (): void => {
    setPasswordVisible((isVisible) => !isVisible);
  };

  const onSubmit = () => {
    // console.log({ email, password }, "EN SUGNIN");
    signIn();
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
        loading={loading}
        title="sign in"
        buttonStyle={{ backgroundColor: "#F35046" }}
        // titleStyle={{ color: "black" }}
        onPress={onSubmit}
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

import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { RootStackParamList, RootTabScreenProps } from "../types";
import Checkbox from "../components/Checkbox";
import TodoItem from "../components/TodoItem";
import { ToDo } from "../inrterfaces/todoInterface";
import { gql, useQuery } from "@apollo/client";
import { TaskList } from "../inrterfaces/taskListInterface";
import {
  GetTaskListByIdData,
  GetTaskListByIdVars,
} from "../inrterfaces/graphql-Interfaces/getTaskListByIdInterface";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const GET_TODOLIST = gql`
  query getTaskListById($id: ID!) {
    getTaskListById(id: $id) {
      id
      title
      createdAt
      progress
      toDos {
        id
        content
        isCompleted
      }
    }
  }
`;

interface Props
  extends NativeStackScreenProps<RootStackParamList, "TodoScreen"> {}

export default function TodoScreen({ navigation, route }: Props) {
  const [title, setTitle] = useState<string>("");
  const [todos, setTodos] = useState<ToDo[]>([
    { id: 1, content: "Buy milk", isCompleted: false, taskList: null },
    { id: 2, content: "Buy brad", isCompleted: false, taskList: null },
    { id: 3, content: "Buy pizza", isCompleted: false, taskList: null },
    { id: 4, content: "Buy cereals", isCompleted: false, taskList: null },
  ]);
  const { data, error, loading } = useQuery<
    GetTaskListByIdData,
    GetTaskListByIdVars
  >(GET_TODOLIST, {
    variables: { id: route.params.id },
  });

  const createItem = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index + 1, 0, {
      content: "",
      id: Date.now(),
      isCompleted: false,
      taskList: null,
    });
    setTodos(newTodos);
  };

  const deleteItem = (id: number) => {
    setTodos((list) => list.filter((item) => item.id !== id));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      // keyboardVerticalOffset={-500}
      enabled
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* <Text style={styles.title}>Tab One</Text> */}
        <TextInput
          style={styles.title}
          onChangeText={setTitle}
          placeholder="todo list title..."
          placeholderTextColor="rgba(255, 255, 255, .3)"
        />
        <FlatList
          data={todos}
          renderItem={({ item, index }) => (
            <TodoItem
              createItem={() => createItem(index)}
              deleteItem={(id) => deleteItem(id)}
              todo={item}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    // backgroundColor: "red",
    margin: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

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
import { RootTabScreenProps } from "../types";
import Checkbox from "../components/Checkbox";
import TodoItem from "../components/TodoItem";
import { Todo } from "../inrterfaces/todoInterface";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [title, setTitle] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, content: "Buy milk", isCompleted: false },
    { id: 2, content: "Buy brad", isCompleted: false },
    { id: 3, content: "Buy pizza", isCompleted: false },
    { id: 4, content: "Buy cereals", isCompleted: false },
  ]);

  const createItem = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index + 1, 0, {
      content: "",
      id: Date.now(),
      isCompleted: false,
    });
    setTodos(newTodos);
  };

  const deleteItem = (id: number) => {
    console.log({ id });

    setTodos((list) => list.filter((item) => item.id !== id));
  };

  console.log({ title });

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

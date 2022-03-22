import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
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
    setTodos((list) => list.filter((item) => item.id !== id));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 130 : 140}
      enabled
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <FlatList
          data={todos}
          renderItem={({ item, index }) => (
            <TodoItem
              createItem={() => createItem(index)}
              deleteItem={deleteItem}
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
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

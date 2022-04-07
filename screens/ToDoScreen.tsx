import { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { gql, useMutation, useQuery } from "@apollo/client";
import { TaskList } from "../inrterfaces/taskListInterface";
import {
  GetTaskListByIdData,
  GetTaskListByIdVars,
} from "../inrterfaces/graphql-Interfaces/getTaskListByIdInterface";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useApplyHeaderWorkaround from "../hooks/useApplyHeaderWorkaround";
import { useHeaderHeight } from "@react-navigation/elements";
import { StackScreenProps } from "@react-navigation/stack";

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

const CREATE_TODO = gql`
  mutation createToDo($taskListId: ID!, $content: String!) {
    createToDo(content: $content, taskListId: $taskListId) {
      toDo {
        id
        content
        isCompleted
        taskList {
          id
          progress
          toDos {
            id
            content
            isCompleted
          }
        }
      }
    }
  }
`;

interface Props extends StackScreenProps<RootStackParamList, "TodoScreen"> {}

export default function TodoScreen({ navigation, route }: Props) {
  const [title, setTitle] = useState<string | undefined>("");
  const [todos, setTodos] = useState<ToDo[]>([]);
  const { data, error, loading } = useQuery<
    GetTaskListByIdData,
    GetTaskListByIdVars
  >(GET_TODOLIST, {
    variables: { id: route.params.id },
  });

  const [
    createTodo,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(CREATE_TODO, {
    variables: { content: "", taskListId: route.params.id },
    onCompleted: (data) => {
      // console.log(data);
      console.log("me ejecuto on completed del todo screen... puede ser rari");
    },
  });

  useApplyHeaderWorkaround(navigation.setOptions);
  const createItem = (index: number) => {
    // const newTodos = [...todos];
    // newTodos.splice(index + 1, 0, {
    //   content: "",
    //   id: Date.now(),
    //   isCompleted: false,
    //   taskList: null,
    // });
    // setTodos(newTodos);
    console.log("me ejecuto createItem");

    createTodo();
  };

  const deleteItem = (id: number) => {
    setTodos((list) => list?.filter((item) => item.id !== id));
  };
  useEffect(() => {
    setTodos(data?.getTaskListById?.toDos!);
    setTitle(data?.getTaskListById.title);
  }, [data]);

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={24} />
        <Text>loading toDos...</Text>
      </View>
    );
  }

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
          value={title}
          defaultValue={data?.getTaskListById.title!}
          onChangeText={setTitle}
          placeholder="todo list title..."
          // placeholderTextColor="rgba(255, 255, 255, .3)"
          placeholderTextColor="red"
        />
        {!todos?.length ? (
          <Text style={{ textAlign: "center", color: "white" }}>
            no todos to show...
          </Text>
        ) : (
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
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    width: "100%",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 12,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

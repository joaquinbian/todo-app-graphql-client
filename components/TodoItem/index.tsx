import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { ToDo } from "../../inrterfaces/todoInterface";
import Checkbox from "../Checkbox";
import { client } from "../../apollo";

interface TodoItemProps {
  todo: ToDo;
  createItem: () => void;
  deleteItem: (id: number) => void;
}

const UPDATE_TODO = gql`
  mutation updateToDo($id: ID!, $content: String, $isCompleted: Boolean) {
    updateToDo(id: $id, content: $content, isCompleted: $isCompleted) {
      toDo {
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

const TodoItem = ({ todo, createItem, deleteItem }: TodoItemProps) => {
  const input = useRef(null);
  const [isSelected, setIsSelected] = useState<boolean>(todo.isCompleted);
  const [todoContent, setTodoContent] = useState<string>(todo.content);

  const [updateToDo, { data, loading, error }] = useMutation(UPDATE_TODO, {
    variables: { id: todo.id, isCompleted: isSelected, content: todoContent },
    onCompleted: (data) => {
      console.log("me ejecuto onCompleted", todo.content);

      // console.log(data);
    },
  });

  const handleUpdateToDo = () => {
    console.log("me ejecuto update todo");

    updateToDo();
  };

  const handleCheckBox = (): void => {
    setIsSelected((selected) => !selected);
  };

  const onSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    console.log({ target: e });
  };

  useEffect(() => {
    if (!todo) {
      return;
    }

    setIsSelected(todo.isCompleted);
    setTodoContent(todo.content);
  }, [todo]);

  // useEffect(() => {
  //   updateToDo();
  // }, [todoContent, isSelected]);

  useEffect(() => {
    if (input.current) {
      input?.current?.focus();
    }
  }, [input]);

  const handleCreateNewItem = () => {
    if (todoContent.length === 0) return;
    createItem();
  };

  const handleDeleteTodo = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (todoContent.length > 0) return;
    if (todoContent.length === 0 && e.nativeEvent.key === "Backspace") {
      deleteItem(todo.id);
    }
  };

  useEffect(() => {
    return () => {
      console.log("me desmonto", todo.id);
    };
  }, []);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Checkbox
        isChecked={isSelected}
        onPress={() => {
          handleCheckBox();
          handleUpdateToDo();
        }}
      />
      <TextInput
        ref={input}
        style={{
          flex: 1,
          fontSize: 17,
          color: "#fff",
        }}
        // multiline
        value={todoContent}
        onChangeText={setTodoContent}
        //se ejecuta cuando el boton de submit(enter) se presiona
        onEndEditing={() => console.log("me ejecuto on end editing ")}
        onSubmitEditing={handleCreateNewItem}
        onKeyPress={handleDeleteTodo}
        //se pierde el focus de donde estabamos cuando ejecutamos el onSubmit
        blurOnSubmit
      />
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({});

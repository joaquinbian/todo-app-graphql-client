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

interface TodoItemProps {
  todo: ToDo;
  createItem: () => void;
  deleteItem: (id: number) => void;
}

const TodoItem = ({ todo, createItem, deleteItem }: TodoItemProps) => {
  const input = useRef(null);
  const [isSelected, setIsSelected] = useState<boolean>(todo.isCompleted);
  const [todoContent, setTodoContent] = useState<string>(todo.content);
  const handleCheckBox = (): void => {
    setIsSelected((selected) => !selected);
  };

  const onSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    // console.warn("pija");
    console.log({ target: e });
  };

  useEffect(() => {
    if (!todo) {
      return;
    }

    setIsSelected(todo.isCompleted);
    setTodoContent(todo.content);
  }, [todo]);

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
      <Checkbox isChecked={isSelected} onPress={handleCheckBox} />
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

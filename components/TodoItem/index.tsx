import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { Todo } from "../../inrterfaces/todoInterface";
import Checkbox from "../Checkbox";

interface TodoItemProps {
  todo: Todo;
  createItem: () => void;
}

const TodoItem = ({ todo, createItem }: TodoItemProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(todo.isCompleted);
  const [todoContent, setTodoContent] = useState<string>(todo.content);
  const handleCheckBox = (): void => {
    setIsSelected((selected) => !selected);
  };

  const onSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    console.warn("pija");
    console.log({ target: e });
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Checkbox isChecked={isSelected} onPress={handleCheckBox} />
      <TextInput
        style={{
          flex: 1,
          fontSize: 17,
          color: "#fff",
        }}
        multiline
        value={todoContent}
        onChangeText={setTodoContent}
        //se ejecuta cuando el boton de submit(enter) se presiona
        onSubmitEditing={createItem}
      />
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({});

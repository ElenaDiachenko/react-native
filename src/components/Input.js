import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";


export const Input = ({
//   onInputChange,
//   value,
  placeholder,
  setIsFocused,
  isFocused,
  secureTextEntry,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);


  // const handleOnFocus = () => {
  //   setIsFocused(true);
  //   setIsInputFocused(true);
  // };

  const handleOnBlur = () => {
    setIsFocused(false);
    setIsInputFocused(false);
  };
  return (
    <TextInput
      style={{
        ...styles.input,
        backgroundColor: isInputFocused ? "#ffffff" : "#F6F6F6",
        borderColor: isInputFocused ? "#FF6C00" : "#E8E8E8",
        color: "#212121",
      }}
    //   onChangeText={onInputChange}
    //   value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      isFocused={()=>setIsFocused(true)}
    //   onBlur={handleOnBlur}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
    color: "#BDBDBD",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    padding: 16,
    marginBottom: 16,
  },
});

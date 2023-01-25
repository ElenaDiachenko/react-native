import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";


export const Input = ({
  onChangeText,
  value,
  placeholder,
  keyboardType,
 setIsKeyboard,
  secureTextEntry= false,
}) => {
  const [isFocused, setIsFocused] = useState(false);


  const handleOnFocus = () => {
    setIsKeyboard && setIsKeyboard(true);
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsKeyboard && setIsKeyboard(false);
    setIsFocused(false);
  };
  
  return (
    <TextInput
      style={{
        ...styles.input,
        backgroundColor: isFocused ? "#ffffff" : "#F6F6F6",
        borderColor: isFocused ? "#FF6C00" : "#E8E8E8",
        
      }}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#BDBDBD"
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
    color: "#212121",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
});

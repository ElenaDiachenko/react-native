import { StyleSheet, View, Text } from 'react-native';

export const CommentsScreen = () => {
  return (
      <View style={styles.container}>
          <Text>
            CommentsScreen
          </Text>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    },
});


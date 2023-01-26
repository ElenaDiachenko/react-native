import { StyleSheet, View, Text } from 'react-native';

const CreatePostsScreen = () => {
    return (
      <View style={styles.container}>
          <Text>
            CreatePostsScreen
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

export default CreatePostsScreen
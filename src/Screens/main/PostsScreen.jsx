import { StyleSheet, View, Text } from 'react-native';

const PostsScreen = () => {
    return (
      <View style={styles.container}>
          <Text>
            PostsScreen
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

export default PostsScreen
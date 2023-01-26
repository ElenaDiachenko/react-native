import { StyleSheet, View, Text } from 'react-native';

const ProfileScreen = () => {
   return (
      <View style={styles.container}>
          <Text>
            ProfileScreen
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

export default ProfileScreen
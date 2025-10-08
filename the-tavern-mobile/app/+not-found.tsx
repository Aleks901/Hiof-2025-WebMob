import { Link } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';

export default function NotFoundScreen() {
  return (      
    <View style={styles.container}>
      <Text> Something went terribly wrong! :D</Text>
      <Text> 404: Page does not exist </Text>
      <Link href="/(drawer)">Go to home screen</Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

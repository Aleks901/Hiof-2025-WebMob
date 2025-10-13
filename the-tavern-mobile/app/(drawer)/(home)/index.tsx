import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import ChatroomCard from '@/components/chatroomCard';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to The Tavern!</Text>
      <Text>Pick a table!</Text>

      <View style={styles.cardsContainer}>
        <ChatroomCard
          id="1"
          name="The Tavern"
          description="The main chatroom for adventurers!"
          image={require('../../../assets/placeholder.png')}
        />
        <ChatroomCard
          id="2"
          name="Call of Duty"
          description="For the FPS lovers"
          image={require('../../../assets/placeholder.png')}
        />
      </View>

      <Link href={'/(chat)/10'}>
        Go to Test Chatroom
      </Link>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

});

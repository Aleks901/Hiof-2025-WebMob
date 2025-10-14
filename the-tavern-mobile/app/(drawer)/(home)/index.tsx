import { View, Text, StyleSheet } from 'react-native';
import ChatroomList from '@/components/tavern-chat/chatroom-list';

const chatrooms = [
  {
    id: "1",
    name: "The Tavern",
    description: "The main chatroom for adventurers!",
    image: require('../../../assets/tavern.jpg'),
  },
  {
    id: "2",
    name: "Call of Duty",
    description: "For the FPS lovers",
    image: require('../../../assets/mw2.png'),
  },
  {
    id: "3",
    name: "Among Us",
    description: "For the social deduction fans",
    image: require('../../../assets/sus.jpg'),
  },
  {
    id: "4",
    name: "Minecraft",
    description: "For the building and crafting fans",
    image: require('../../../assets/mc.png'),
  },
  {
    id: "5",
    name: "Fortnite",
    description: "For the battle royale fans",
    image: require('../../../assets/trashgame.jpg'),
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to The Tavern!</Text>
      <Text>Pick a table!</Text>

      <ChatroomList chatrooms={chatrooms} />

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

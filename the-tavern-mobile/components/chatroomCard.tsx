import { View, Text, StyleSheet, Image } from 'react-native';
import BasicButton from './basic-button';
import { Link } from 'expo-router';

type Props = {
    id: string;
    name: string;
    description: string;
    image: any;
}

export default function ChatroomCard({ id, name, description, image }: Props) {

    return (
        <Link href={`/chat/${id}`} asChild>
            <BasicButton>
                <View style={styles.card}>
                    <Image source={image} style={styles.image} /> 
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </BasicButton>
        </Link>
    );
}


const styles = StyleSheet.create({
  card: {
    width: '45%',
    aspectRatio: 0.8,         //Making sure theres square proportions
    margin: 8,
    borderWidth: 1,
    borderColor: '#1affff',
    backgroundColor: 'rgba(5, 5, 20, 0.85)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1affff',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    overflow: 'hidden',
  },

  image: {
    width: '75%',
    height: '90%',
    borderRadius: 10,
    marginBottom: 6,            // A fair amount of random construction(fixed values) to highlight the idea rather than perfection for now, and avoiding colliding all the elements with other showcases for mobile.
    borderWidth: 1,
    borderColor: '#ff00ff',
    shadowColor: '#ff00ff',
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },

  name: {
    fontWeight: '600',
    color: '#ff33cc',
    fontSize: 10,
    textShadowColor: '#ff33cc',
    textShadowRadius: 4,
  },


  description: {
    color: '#00ffff',
    borderColor: '#ff00ff',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: 'rgba(10, 10, 25, 0.8)',
    paddingVertical: 3,
    textShadowColor: '#00ffff',
    textShadowRadius: 6,
    fontSize: 9,
    lineHeight: 14,
    textAlign: 'center',
  },
});




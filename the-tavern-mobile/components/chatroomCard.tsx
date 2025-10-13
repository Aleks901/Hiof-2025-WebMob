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
      <View>
        <Link href={`/(chat)/${id}`} asChild>
            <BasicButton>
                <View style={styles.card}>
                    <Image source={image} style={styles.image} /> 
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </BasicButton>
        </Link>
      </View>
    );
}


const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 200,
        borderWidth: 1,
        borderColor: '#ff00ff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 12,
        backgroundColor: '#0a0a0f',
    },

    image: {
        width: '100%',
        height: '70%',
        borderBottomWidth: 1,
        borderBottomColor: '#ff00ff',
    },

    name: {
        fontWeight: '600',
        color: '#ff33cc',
        fontSize: 12,
        textAlign: 'center',
        marginVertical: 4,
    },

    description: {
        color: '#00ffff',
        fontSize: 10,
        textAlign: 'center',
        padding: 4,
    },

});
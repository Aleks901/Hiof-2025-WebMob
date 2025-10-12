import { View, Text, StyleSheet } from 'react-native';
import BasicButton from './basic-button';

export function BasicForm({children, title, onSubmit}: {children: React.ReactNode; title: string; onSubmit: () => void}) {
  return (
    <View style={styles.container}>
        
      <Text style={styles.title}>{title}</Text>

      {children}

      <BasicButton onPress={onSubmit} style={styles.button}> 
        <Text>Submit</Text>
      </BasicButton>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        borderRadius: 4,
    },
});
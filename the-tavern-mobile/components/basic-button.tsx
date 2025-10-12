import { Pressable, View } from 'react-native';


export default function BasicButton({ 
  children, 
  onPress, 
  style 
}:{
    children: React.ReactNode, 
    onPress: () => void, 
    style?: object
  }) {

  return (
    <Pressable onPress={onPress}>
        <View style={style}>
            {children}
        </View>
    </Pressable>
    );
  };
import { Text, View } from "react-native";
import { Link } from 'expo-router'
import '../global.css'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className='text-blue-500 text-2xl'>Edit app/index.tsx to edit this screen.</Text>
      <Link href='/(tabs)/Home'>Link to Unboarding</Link>
    </View>
  );
}

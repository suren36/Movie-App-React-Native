import { Text, View } from "react-native";
import Link from "expo-router/link";


export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
   
    
      <Text className="text-5xl font-bold text-dark-200">Welcome!</Text>
      <Link href="/onboarding">Onboarding</Link>
      <Link href="/movie/a">Avenger</Link>
      
    </View>
  );
}



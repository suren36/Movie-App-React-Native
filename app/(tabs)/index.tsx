import { Text, View, Image, ScrollView, TextInput } from "react-native";
import Link from "expo-router/link";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { SearchBar } from "react-native-screens";
import SearchBars from "@/components/SearchBar";

import{useRouter} from "expo-router";



export default function Index() {

const router = useRouter();


  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full  z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image
          source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        ></Image>

<SearchBars onPress={()=>router.push("/search")}
placeholder = "Search For a movie"  />

      </ScrollView>
    </View>
  );
}

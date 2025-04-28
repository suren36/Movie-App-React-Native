import { Text, View, Image, ScrollView, TextInput, ActivityIndicator } from "react-native";
import Link from "expo-router/link";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { SearchBar } from "react-native-screens";
import SearchBars from "@/components/SearchBar";

import{useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";



export default function Index() {

const router = useRouter();
const{
   data : movies , loading : moviesLoading , error : moviesError}= useFetch(()=> fetchMovies({
  query : ''
})) 



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


{
moviesLoading ? (
  <ActivityIndicator
  size="large"
  color="#0000ff"
  className="mt-10 self-center" />
) :

moviesError ? (
  <Text className="text-white text-center mt-10">
    {moviesError.message}
  </Text> 
):(
<View>
<SearchBars onPress={()=>router.push("/search")}
placeholder = "Search For a movie"  />
<>


<View>






</View>


<Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text></>


</View>


) }
     

      </ScrollView>
    </View>
  );
}

import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Link from "expo-router/link";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { SearchBar } from "react-native-screens";
import SearchBars from "@/components/SearchBar";

import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

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

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text className="text-white text-center mt-10">
            {moviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <View>
            <SearchBars
              onPress={() => router.push("/search")}
              placeholder="Search For a movie"
              value=""
              onChangeText={(text: string) => {}}
            />
            {trendingMovies && (
              <View className="mt-5 ">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Trending Movies
                </Text>
              </View>
            )}
  
  
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false} 
            ItemSeparatorComponent={()=> < View  className="w-4"/>}
            className="mb-4 mt-3"
             data={trendingMovies}
            //@ts-ignore
              renderItem={({ item,index }) =>(
                <TrendingCard movie={item} index={index}/>
              )}
              keyExtractor={(item) => item.movie_id.toString()}

      
           

       />

       
                 <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>


            <FlatList
              data={movies}
              //@ts-ignore
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

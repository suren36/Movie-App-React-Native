import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import MovieCard from "@/components/MovieCard";

const Search = () => {
  const router = useRouter();

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
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        className="flex-1 px-5"
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          paddingRight: 5,
          marginBottom: 10,
          marginVertical: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={

          <View className="flex-row items-center justify-between mt-20 mb-5">
            <Image source={icons.logo} className="w-12 h-10" />
            <Text className="text-lg text-white font-bold">Search</Text>
          </View>

        }
      /> 



      
    </View>
  );
};

export default Search;

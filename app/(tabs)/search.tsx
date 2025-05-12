import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import MovieCard from "@/components/MovieCard";
import SearchBars from "@/components/SearchBar"; // Make sure this matches your component name
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useState<string>("");

const { data: movies, loading, error, fetchData: loadMovies, reset } = useFetch(() => fetchMovies({ query: searchQuery }), false);

useEffect(()=>{

const timeoutId = setTimeout(async()=>{
  if(searchQuery.trim()){
    await loadMovies();

    if(movies?.length > 0 && movies?.[0]){
      await updateSearchCount(searchQuery, movies[0]);
    }
  } else { 
    reset();
  }
}, 500);
return () => 
  clearTimeout(timeoutId);
},[searchQuery])
useEffect(() => {
  if (searchQuery.trim() && movies?.length > 0) {
    updateSearchCount(searchQuery.trim().toLowerCase(), movies[0]);
  }
}, [movies]);

  // Handle text change
  const handleTextChange = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        className="flex-1 px-5"
        data={movies || []}
        keyExtractor={(item) =>
item.id.toString()        }
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={
          movies?.length > 0
            ? {
                justifyContent: "flex-start",
                gap: 16,
                paddingRight: 5,
                marginBottom: 10,
                marginVertical: 10,
              }
            : undefined
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="flex-row items-center justify-between mt-20 mb-5">
              <Image source={icons.logo} className="w-12 h-10 m-auto" />
            </View>
            <View className="my-5">
              <SearchBars
                placeholder="Search Movies ..."
                value={searchQuery}
                onChangeText={(text:string)=> setSearchQuery(text)}
                // No need for onPress handler with live search
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10"
              />
            )}

            {error && (
              <Text className="text-white text-center mt-10">
                {error.message || "An error occurred while searching"}
              </Text>
            )}

            {/* Show "Type to search" when query is empty */}
            {!loading && !error && !searchQuery.trim() && (
              <Text className="text-white text-center mt-10">
                Type to search for movies
              </Text>
            )}

            {/* Show results count when we have results */}
            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold mt-5 mb-3">
                  Search Results for "{searchQuery}" ({movies.length})
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && searchQuery.trim() ? (
            <Text className="text-white text-center mt-10">No Movies Found for "{searchQuery}"</Text>
          ) : null
        }
      />
    </View>
  );
};

export default Search;

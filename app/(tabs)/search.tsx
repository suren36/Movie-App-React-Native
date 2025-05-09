import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import MovieCard from "@/components/MovieCard";
import SearchBars from "@/components/SearchBar"; // Make sure this matches your component name

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  
  // Use the useFetch hook with the debouncedQuery
  const {
    data: movies,
    loading,
    error,
    fetchData
  } = useFetch(
    () =>
      fetchMovies({
        query: debouncedQuery.trim(),
      }),
    !!debouncedQuery.trim() // Only fetch if there's a non-empty query
  );
  
  // Debounce the search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery.length >= 2) { // Only search if at least 2 characters
        setDebouncedQuery(trimmedQuery);
      } else if (trimmedQuery.length === 0) {
        setDebouncedQuery("");
      }
    }, 500); // 500ms delay after typing stops

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Trigger fetch when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchData();
    }
  }, [debouncedQuery]);

  // Handle text change
  const handleTextChange = (text: string) => {
    setSearchQuery(text);
    console.log("Typing:", text);
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
        keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={movies?.length > 0 ? {
          justifyContent: "flex-start",
          gap: 16,
          paddingRight: 5,
          marginBottom: 10,
          marginVertical: 10,
        } : undefined}
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
                onChangeText={handleTextChange}
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
            
            {/* Show "No results" when query exists but no results */}
            {!loading && !error && debouncedQuery.trim() && (!movies || movies.length === 0) && (
              <Text className="text-white text-center mt-10">
                No movies found for "{debouncedQuery}"
              </Text>
            )}
            
            {/* Show results count when we have results */}
            {!loading && !error && debouncedQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold mt-5 mb-3">
                Search Results for "{debouncedQuery}" ({movies.length})
              </Text>
            )}
          </>
        }
      />
    </View>
  );
};

export default Search;
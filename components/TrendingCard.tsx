import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <>
      <Link href={`/movies/${movie_id}`} asChild>
        <TouchableOpacity className="w-32 relative pl-5">

          <Image
            source={{ uri: poster_url }}
            className="w-32 h-40 rounded-lg mb-2"
            resizeMode="cover"
          />

          <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
            <MaskedView
              maskElement={
                <View className="bg-transparent justify-center items-center">
                  <Text className="font-bold text-white text-2xl">
                    {index + 1}
                  </Text>
                </View>
              }
            >
              <View className="w-8 h-8 bg-yellow-400 rounded-full" />
            </MaskedView>
          </View>
          <Text className="text-white text-lg font-semibold" numberOfLines={2}>
            {title}
          </Text>
        </TouchableOpacity>
      </Link>
    </>
  );
};

export default TrendingCard;

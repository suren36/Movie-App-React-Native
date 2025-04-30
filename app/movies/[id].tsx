import { View, Text } from 'react-native'
import React from 'react'

const MovieDetails = ({  id,
  title,
  poster_path,
  vote_average,
  release_date,}:Movie) => {



  return (



    <View>


      <Text>


<Text className='text-2xl text-white font-bold mt-5 mb-3'>
{title}

</Text>

      </Text>


    </View>
  )
}

export default MovieDetails
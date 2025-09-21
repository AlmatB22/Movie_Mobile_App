import React from 'react'
import {TouchableOpacity, View, Image, Text } from 'react-native'
import { Link } from 'expo-router';

function TrendingCard({ movie: {movie_id, title, poster_url}, index} : TrendingCardProps) {
    return (
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity className=' w-36 realtive'> 
                <Image 
                    className={'w-32 h-48 rounded-lg'}
                    source={{
                        uri: (poster_url.slice(poster_url.length - 4) !== 'null') ? poster_url 
                        : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    resizeMode='cover'
                />
                <View className="absolute bottom-5 right-1 px-2 py-1 rounded-md">
                    <Text className="text-white text-4xl font-bold">{index + 1}</Text>
                </View>
                <Text className='color-white mt-5 w-full' numberOfLines={1}>{title}</Text>
            </TouchableOpacity>
        </Link>
    )
}

export default TrendingCard;
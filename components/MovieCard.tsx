import { Link } from 'expo-router';
import React from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native';

import { icons } from '@/constants/icons';


function MovieCard({ id, title, poster_path, vote_average, release_date }: Movie) {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[30%]'>
                <Image 
                    source={{
                        uri: poster_path 
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className='w-full h-52 rounded-lg'
                    resizeMode='cover'
                />
                <Text className='text-sm text-white' numberOfLines={1}>{title}</Text>
                <View className='flex-row items-start justify-start gap-x-2 p-0'>
                    <Image source={icons.star} className='size-4 m-0'/>
                    <Text className='text-white text-xs font-bold uppercase m-0'>{Math.round(vote_average/2)}</Text>
                </View>
                <View className='flex-row justify-between items-center mt-1'>
                    <Text className='text-light-300 text-xs font-medium uppercase'>{release_date?.split('-')[0]}</Text>
                    <Text className='text-light-300 text-xs font-medium uppercase'>Movie</Text>
                </View>
                
                
            </TouchableOpacity>
        </Link>
    )
};

export default MovieCard;
import React, {useEffect} from 'react';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, Image } from 'react-native';
import { icons } from '@/constants/icons';

interface MovieInfoProps {
    label: string,
    value?: string | number | null
}
const MovieInfo = ({label, value} : MovieInfoProps) => {
    return (
        <View className='flex-col items-start justify-center mt-5'>
            <Text className='text-light-200 text-sm font-normal'>
                {label}
            </Text>
            <Text className='text-light-100 items-start font-normal mt-2 text-sm'>
                {value || 'N/A'}
            </Text>
        </View>
    )
}

function MovieDetails() { 
    const { id } = useLocalSearchParams();

    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))

    useEffect(() => {
        console.log(movie);
    })

    return (
        <View className='bg-primary flex-1'>
            <ScrollView contentContainerStyle={{paddingBottom: 80}}>
                <View>
                    <Image source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}} className='w-full h-[550px]' resizeMode='stretch'/>
                </View>
                <View className='flex-col items-start justify-center mt-5 px-5'>
                    <Text className='text-white'>{movie?.title}</Text>
                    <View className='flex-row'>
                        <Text className='text-light-200 text-sm'>{movie?.release_date.split('-')[0]}</Text>
                        <Text className='text-light-200 text-sm'> {movie?.runtime}m</Text>
                    </View>
                    <View className='flex-row bg-dark-100 items-center px-2 py-1 rounded-md gap-x-2 mt-2'>
                        <Image source={icons.star} className='size-4'/>
                        <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
                        <Text className='text-light-200 text-sm'>({movie?.vote_count} votes)</Text>
                    </View>

                    <MovieInfo label='Overview' value={movie?.overview} />
                    <MovieInfo label='Genres' value={movie?.genres.map((g) => g.name).join(' - ') || 'N/A'} />

                    <View className='flex-row items-start justify-between w-1/2'>
                        <MovieInfo label='Budget' value={`$${movie?.budget! / 1000000 || 'N/A'} million`}/>
                        <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue! / 1000000) || 'N/A'} million`} />
                    </View>

                    <MovieInfo label='Production Companies' value={movie?.production_companies.map((c) => c.name).join(' - ') || "N/A"}/>
                </View>
                
            </ScrollView>
        </View>
    )
}

export default MovieDetails;    
import { FlatList,} from 'react-native';
import React, { useState, useEffect } from 'react' 
import {Text, View, Image, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native';

import PageHeader from '@/components/PageHeader';
import MovieCard from '@/components/MovieCard';

import { images } from '@/constants/images';

import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';

function Search() {

    const [searchQuery, setSearchQuery] = useState('');
    const {data: movies, loading, error, refetch: loadMovies, reset } = useFetch(
        () => fetchMovies({
            query: searchQuery
        }),
        false
    );

    useEffect( () => {
        const timeoutId = setTimeout( async () => {
            if (searchQuery.trim()) {
                await loadMovies();      
            }
            else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery])

    useEffect(() => {
        if (movies && movies?.length > 0) {
            console.log('kek')
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies]);

    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className='w-full absolute'/>
    
            {error && !loading && (
            <View className="flex-1 justify-center items-center px-4">
                <Text className="text-red-500 text-lg text-center">
                Failed to load movies. Please try again later.
                </Text>
            </View>
            )}
            
            <FlatList 
                className='px-5'
                data={movies}
                renderItem={({ item }) => <MovieCard {...item } />}
                numColumns={3}
                columnWrapperStyle={{
                    gap: 20,
                    justifyContent: 'flex-start',
                    paddingRight: 5,
                    marginBottom: 10
                }}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                ListHeaderComponent={
                    <View>
                        <PageHeader
                            search={true}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        {searchQuery.trim() && <Text className="text-lg text-white font-bold mt-3 mb-3">
                            Search Results for <Text className="text-accent">{searchQuery}</Text>
                        </Text>}

                        {loading && (!movies || movies.length === 0) && (
                            <View className="mt-5 items-center">
                            <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        )}
                    </View>
                }

                ListEmptyComponent={
                    <View className='mt-10 px-5'>
                        <Text className='text-center text-gray-500'>{searchQuery.trim() ? 'No Movis found' : "Search for a movie"}</Text>
                    </View>
                }
            /> 
        </View>
    )
}

export default Search;
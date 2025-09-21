import React from 'react';
import { useRouter } from 'expo-router';
import {Text, View, Image, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';

import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import PageHeader from '@/components/PageHeader';

import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';

import { getTrendingMovies } from '@/services/appwrite';
import TrendingCard from '@/components/TrendingCard';

function Home() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: '',
    })
  );

  return (
  <View className="flex-1 bg-primary">
    <Image source={images.bg} className="w-full absolute" />

    <FlatList
      data={movies}
      className="flex-1 px-5"
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <MovieCard {...item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: 'flex-start',
        gap: 20,
        paddingRight: 5,
        marginBottom: 10,
      }}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
      ListHeaderComponent={
        <View>
          <PageHeader searchQuery={''} />
          {trendingMovies && (
            <View className="mt-5">
              <Text className="text-white text-lg mb-3 font-bold">Trending Movies</Text>
              <FlatList 
                data={trendingMovies} 
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index}/>
                )}
                keyExtractor={(item) => item.movie_id!}
                ItemSeparatorComponent={() => (
                  <View className='w-6'></View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
          <Text className="text-lg text-white mt-3 mb-3 font-bold">Latest Movies</Text>
        </View>
      }
      ListEmptyComponent={
        moviesLoading ? (
          <View className="mt-10 items-center">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : moviesError ? (
          <Text className="text-red-500 text-center mt-10">
            Failed to load movies
          </Text>
        ) : null
      }
    />
  </View>

  );
}


export default Home;
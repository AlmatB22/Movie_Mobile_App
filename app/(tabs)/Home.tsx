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

function Home() {
  const router = useRouter();

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

      {/* Loading state */}
      {moviesLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* Error state */}
      {moviesError && !moviesLoading && (
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-red-500 text-lg text-center">
            Failed to load movies. Please try again later.
          </Text>
        </View>
      )}

      {/* Movies list */}
      {!moviesLoading && !moviesError && (
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
            <>
              <PageHeader searchQuery = {''}/>
              <Text className="text-lg text-white mt-3 mb-3">Latest Movies</Text>
            </>
        }
        />
      )}
    </View>
  );
}


export default Home;
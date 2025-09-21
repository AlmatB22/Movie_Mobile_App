import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';

import { icons } from '@/constants/icons';

interface Props {
    placeholder: string,
    onPress?: () => void;
    value: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ placeholder, onPress, value, setValue = () => {}} : Props) {
    return (
        <View className='flex-row items-center bg-dark-200 px-5 py-4 rounded-full'>
            <Image source={icons.search} className='size-7' resizeMode='contain' />
            <TextInput 
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={(text: string) => setValue(text)}
                className='flex-1 ml-3 text-white text-xl'
                placeholderTextColor='#a8b5db'
            />
        </View>
    )
}

export default SearchBar;
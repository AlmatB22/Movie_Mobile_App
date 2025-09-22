import React from 'react-native';
import {Text, View, Image} from 'react-native';
import { icons } from '@/constants/icons';

function Saved() {
    return (
        <View className='bg-primary flex-1'>
            <View className='flex-col items-center justify-center flex-1 gap-5'>
                <Image source={icons.save} className='size-14' tintColor='#FFF' />
                <Text className='text-gray-500 text-base '>Saved</Text>
            </View>
        </View>
    )
}

export default Saved;
import React from 'react-native';
import {Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native';

import { icons } from '@/constants/icons';

function Profile() {
    return (
                <View className='bg-primary flex-1'>
                    <View className='flex-col items-center justify-center flex-1 gap-5'>
                        <Image source={icons.person} className='size-14' tintColor='#FFF' />
                        <Text className='text-gray-500 text-base '>Profile</Text>
                    </View>
                    
                </View>
    )
}

export default Profile;
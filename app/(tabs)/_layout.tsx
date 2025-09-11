import { Tabs } from 'expo-router';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { ImageBackground } from 'react-native';
import { Image, Text, View } from 'react-native';

const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {
        return (
            <View className='justify-center items-center mt-5'>
                <ImageBackground 
                    source={images.highlight}
                    className="flex-row min-w-[112px] min-h-16 h-min justify-center items-center overflow-hidden rounded-full"
                >
                    <Image source={icon} className='size-6' tintColor='#151312'
                    />
                    <Text className='ml-1 text-xl'>{title}</Text>
                </ImageBackground>
            </View>
        )
    }
    else {
        return (
            <View className="justify-center items-center rounded-full mt-5">
                <Image source={icon} tintColor='#A8B5DB' className='size-7'/>
            </View>
        )
    }
}

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: 55,
                    justifyContent: "center",
                    alignItems: 'center',
                    paddingHorizontal: 50,
                },
                tabBarStyle: {
                    backgroundColor: '#0f0D23',
                    borderRadius: 50,
                    height: 55,
                    marginBottom: 36,
                    marginHorizontal: 12,
                    overflow: 'hidden',
                    position: 'absolute',
                    borderWidth: 1,
                    borderColor: '#0f0D23',
                    alignItems: 'center',
                    justifyContent: 'center'
                    
                }

            }}
        >
            <Tabs.Screen 
                name='Home'
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon 
                            focused={focused}
                            icon={icons.home}
                            title="Home"
                        />
                    )
                }}

            />
            <Tabs.Screen 
                name='Search'
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon 
                            focused={focused}
                            icon={icons.search}
                            title="Search"
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name='Saved'
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon 
                            focused={focused}
                            icon={icons.save}
                            title="Saved"
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name='Profile'
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon 
                            focused={focused}
                            icon={icons.person}
                            title="Profile"
                        />
                    )
                }}
            />
        </Tabs>
    )
}
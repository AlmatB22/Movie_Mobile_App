    import React from 'react'
    import { View, Image, Text} from 'react-native'
    import { useRouter } from 'expo-router';

    import SearchBar from './SearchBar';

    import { icons } from '@/constants/icons';

    interface Props {
        search?: boolean; 
        searchText?: string; 
        searchQuery: string;
        setSearchQuery?: React.Dispatch<React.SetStateAction<string>>
    }

    export default function PageHeader({ search=false, searchText='SEARCH TERM', searchQuery, setSearchQuery } : Props ) {
        const router = useRouter();
        return ( 
            <>
                <Image source={icons.logo} className="mx-auto mt-20 mb-5 w-16 h-14" />
                <SearchBar
                    onPress={() => router.push('/Search')}
                    placeholder="Search for a movie"
                    value={searchQuery}
                    setValue={setSearchQuery}
                />

                
            </>
        )
    }
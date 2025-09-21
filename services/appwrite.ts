import {Client, Databases, Query} from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;
const ENDPOINT_URL = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;

const client = new Client().setEndpoint(ENDPOINT_URL!).setProject(PROJECT_ID!);

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {

    try {
        // call api with finding the query
        console.log('MOVIE');
        console.log(movie);
        const result = await database.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("searchTerm", query)]
        );

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        }
        else {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                'unique()',
                {
                    searchTerm: query,
                    movie_id: movie.id.toString() ,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    title: movie.title,
                    count: 1
                }
        )
        }

    } catch (err) {
        //write something when there is an error
        console.log(err);
        throw err;
    }


    // check if the query text already exists in the appwrite
    // if exists -> increase the number of count
    // else create a new record and set a count to 1
}

export const getTrendingMovies = async() : Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.limit(5),
                Query.orderDesc('count')
            ]
        );
        return result.documents as unknown as TrendingMovie[];
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

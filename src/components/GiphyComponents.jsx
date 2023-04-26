import { useContext } from "react"
import {Grid,SearchBar,SearchContext } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'


export const GiphyComponents = ({width,handleGifClick}) => {
    const { searchKey } = useContext(SearchContext)
    
    const gf = new GiphyFetch(process.env.REACT_APP_giphyApiKey);
    const fetchWithSearch=(offset)=>gf.search(searchKey,{offset,limit:10, sameSite: "None", secure: true});
    const fetchTrending=(offset)=>gf.trending({offset,limit:10, sameSite: "None", secure: true});
    
    return (
        <>
            <SearchBar />
            <Grid   columns={3} width={width} fetchGifs={searchKey?fetchWithSearch:fetchTrending} options={{limit:10}} onGifClick={handleGifClick} noLink={true} key={searchKey}  noResultMessage={"There is nothing."} />
            
        </>
    )
}
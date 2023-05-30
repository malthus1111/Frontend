import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import axios from "axios";


const Search = ({ name }) => {

    const [search, setSearch] = useState('');

    const handleClickSearch = () => {
        console.log(search);

        axios({
            method: 'get',
            url: process.env.REACT_APP_BASE_URL + 'citation/search?name=' + search,
            responseType: "json"
        }).then((response) => {
            name(response.data.citations)
            console.log(response.data.citations)
        });

    }
    return (
        <>
            <FormControl className="search"
                sx={{
                    width: { lg: '60ch', xl: '80ch' },
                }}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-search" color="secondary">Rechercher dans mes citations</InputLabel>
                <OutlinedInput onChange={(e) => {
                    setSearch(e.target.value)
                }}
                    color="secondary"
                    sx={{ borderRadius: 3, margin: 0 }}
                    id="outlined-adornment-search"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="click to search"
                                onClick={handleClickSearch}
                                edge="end"
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>}
                    label="Rechercher dans mes citations"
                />
            </FormControl>

        </>

    );

}

export default Search;
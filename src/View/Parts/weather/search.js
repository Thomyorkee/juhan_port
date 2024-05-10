import React from "react";
import 'View/css/scroll.css';
import * as IconHi from "react-icons/hi2";

const Search = ({ SearchText, setSearchText }) => {
    const inputValue = (event) => {
        setSearchText(event.currentTarget.value);
    }

    return (
        <React.Fragment>
            <div className="search">
                <IconHi.HiMagnifyingGlass />
                <input type="text" onChange={inputValue} value={SearchText} />
            </div>
        </React.Fragment>
    )
}

export default Search;
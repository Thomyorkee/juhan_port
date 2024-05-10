import React from "react";
import city from 'api/city';
import 'View/css/scroll.css';
import classNames from "classnames";

const SearchList = ({ SearchText, setSelected, setSearchText }) => {
    const filterResult = (item) => {
        let isGuExists = false;
        let isDongExists = false;
        if (new RegExp(SearchText, 'i').test(item.name) === true) isGuExists = true;
        if (item.items.filter(sub => sub.name.match(SearchText)).length > 0) isDongExists = true;
        return { gu: isGuExists, dong: isDongExists };
    }

    const onSelect = (element) => {
        setSelected(element);
        setSearchText("");
    }

    return (
        <div className={classNames("searchList", { searched: SearchText && SearchText !== " " })}>
            {(SearchText !== "" && SearchText !== undefined) && city[0].list.map((item, index) => {
                const status = filterResult(item);
                {
                    return (status.gu && !status.dong) ? (
                        <div key={index} className='item'>
                            {item.name}
                            {item.items.map((element, index) => (
                                <div key={index} onClick={() => onSelect(element)}> - {element.name}</div>
                            ))}
                        </div>
                    ) : (!status.gu && status.dong) || (status.gu && status.dong) ? (
                        <div key={index} className='item'>
                            {item.name}
                            {item.items.filter(e => e.name.match(SearchText)).map((element, index) => (
                                <div key={index} onClick={() => onSelect(element)}> - {element.name}</div>
                            ))}
                        </div>
                    ) : !status.gu && !status.dong && (
                        undefined
                    )
                }
            })
            }
        </div >
    )
}

export default SearchList;
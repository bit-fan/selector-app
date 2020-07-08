import React, { useState, useEffect } from 'react';

// default debounce time set to 1 second, could also be component property
const DEBOUNCE_TIME_IN_MS = 1000;

const SelctOptionPanel = ({ isShow, countryList, maxNumOption, isAdmin, setCountry }) => {
  const [filteredCountryList, setFilteredCountryList] = useState(countryList.slice(maxNumOption));
  const [searchText, setSearchText] = useState('');
  const [hasMore, setHasMore] = useState(countryList.length > maxNumOption ? countryList.length - maxNumOption : 0);
  const [maxNumShow, setMaxNumShow] = useState(maxNumOption);

  const onChangeText = e => {
    const value = e.target.value;
    setSearchText(value);
  }

  const updateList = () => {
    const newList = searchText ? countryList.filter(country => {
      return country.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    }) : countryList.map(a => a); // if no filter text, use original list

    setFilteredCountryList(newList.slice(0, maxNumShow));
    
    if (maxNumShow < newList.length) {
      // not showing all, set has more
      setHasMore(newList.length - maxNumOption);
    } else {
      // already show more
      setHasMore(0);
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      updateList();
    }, DEBOUNCE_TIME_IN_MS);

    return () => {
      clearTimeout(timer);
    }
    // changing search text will do debounce search
  }, [searchText]);


  useEffect(() => {
    updateList();
    // changing 'hasmore status will update immediately
  }, [maxNumShow]);

  return isShow ? <div className='select-panel'>
    <div className='select-filter-wrapper'>
      <div className='search-icon'>{'\uD83D\uDD0D'}</div>
      <input placeholder='Search...' onChange={e => onChangeText(e)} />
    </div>
    {filteredCountryList.length > 0 && filteredCountryList.map(country => {
      return <div className='select-option' key={country} onClick={() => setCountry(country)}>{country}</div>
    })}
    {filteredCountryList.length === 0 && <div className='select-option select-not-found'>
      <label>"{searchText}" not found</label>
      {isAdmin && <button className='select-add' onClick={() => setCountry(searchText)}>add & select</button>}
    </div>}
    {hasMore !== 0 && <div className='select-has-more' onClick={() => { setMaxNumShow(countryList.length); }}>... {hasMore} more</div>}
  </div> : [];
}

export default SelctOptionPanel;
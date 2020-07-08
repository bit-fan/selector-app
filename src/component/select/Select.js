import React, { useState } from 'react';

import SelectOptionPanel from './SelectOptionPanel';

import './select.scss';

const Select = ({ countryList, maxNumOption, isAdmin, callback }) => {
  const [country, setCountry] = useState('');
  const [isShowPanel, setIsShowPanel] = useState(false);
  return <>
    <div className='select-wrapper'>
      <div className='select-text' onClick={() => setIsShowPanel(!isShowPanel)}>{country ? country : 'select a country'}</div>
      <div className='select-arrow' onClick={() => setIsShowPanel(!isShowPanel)}>{'\u25BC'}</div>
      <SelectOptionPanel isShow={isShowPanel} countryList={countryList} maxNumOption={maxNumOption} isAdmin={isAdmin} setCountry={val => { setCountry(val); callback(val); }} />
    </div>
  </>
}

export default Select;
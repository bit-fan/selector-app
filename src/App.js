import React from 'react';
import Select from './component/select/Select';
import './App.scss';

function App() {
  const countryList = ['Singapore', 'USA', 'Australia', 'India', 'Thailand', 'Vietnam'];
  const selectCountry = (which, val) => {
    console.log(`country selected for ${which} is ${val}.`);
  }

  // maxNumOption is the default options displayed in panel
  // isAdmin control the 'add & select' function
  return (
    <div className="App">
      <div className='select-box'>
        <div>With admin right</div>
        <Select countryList={countryList} maxNumOption={3} isAdmin={true} callback={val => selectCountry('admin', val)} />
      </div>

      <div className='select-box'>
        <div>Without admin right</div>
        <Select countryList={countryList} maxNumOption={3} isAdmin={false} callback={val => selectCountry('non-admin', val)} />
      </div>
    </div>
  );
}

export default App;

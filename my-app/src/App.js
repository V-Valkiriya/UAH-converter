import { useState, useEffect } from 'react';
import './App.css';

function App(props) {
  const [data, setData] = useState();
  const [result, setResult] = useState();

  const getResource = async(url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
}

   const bankData = async () => {
    const res = await getResource("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json");
    setData(data => res.map(useData)); 
   } 

   useEffect(() => {
    bankData();
})

   const useData = (arr) => {
    return {
       cc: arr.cc,
       rate: arr.rate
    }
   }

  const calcCourse = (country) => {
    let found = data.filter(elem => elem.cc === country);
    let symbol = 
    found[0].cc === 'USD' ? ' $' :
    found[0].cc === 'EUR' ? ' €' :
    found[0].cc === 'CHF' ? ' ₣' :
    found[0].cc === 'PLN' ? ' zł' : null;
    setResult(result => (Math.round(props.counter / found[0].rate) + symbol));
  }

  const reset = () => {
    setResult(result => result = null);
  }


  return (
   <>
   <div className="container">
      <div className="header">Amount in UAH: {props.counter}</div>
        <div className="screen">{result}</div>
        <div className="btns">
          <button onClick={() => calcCourse('USD')}>USD</button>
          <button onClick={() => calcCourse('EUR')}>EUR</button>
          <button onClick={() => calcCourse('CHF')}>CHF</button>
          <button onClick={() => calcCourse('PLN')}>PLN</button>
          <button onClick={() => reset()}>RES</button>
          </div>
     </div>
   </>
  );
}

export default App;

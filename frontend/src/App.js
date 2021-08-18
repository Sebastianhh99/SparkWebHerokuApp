import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ApiLookup } from './lookup';
import {options} from './store/options'
import { Line } from 'react-chartjs-2';
import React, { useState } from 'react';

const optionsChart = {
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
};

function App() {
  
  const [data,setData]= useState(null)
  const [optionSymbol,setOptionSymbol] = useState(null)
  const [optionDate,setOptionDate] = useState(null)

  const optionsDate = [
    {function:"TIME_SERIES_INTRADAY",name:"Intra-dia"},
    {function:"TIME_SERIES_DAILY",name:"Diario"},
    {function:"TIME_SERIES_WEEKLY",name:"Semanal"},
    {function:"TIME_SERIES_MONTHLY",name:"Mensual"}
  ]


  const callback = (response,status)=>{
    if(status===200){
      const set=response[Object.keys(response)[0]]
      const labels = ['1. open','2. high','3. low','4. close']
      const dates = Object.keys(set)
      var datasets = []
      labels.forEach(element=>{
        var data = []
        dates.forEach(date=>{
          data.push(set[date][element])
        })
        const r= Math.floor(Math.random() * 255) +1
        const g= Math.floor(Math.random() * 255) +1
        const b= Math.floor(Math.random() * 255) +1
        datasets.push({
          label: element,
          data: data,
          fill: false,
          backgroundColor: `rgb(${r},${g},${b})`,
          borderColor: `rgb(${r},${g},${b},0.2)`,
        })
      })
      setData({
        labels:dates,
        datasets:datasets
      })
    }else{
      console.log('error')
    }
  }

  const handleChangeSymbol=(event,value)=>{
    event.preventDefault()
    if(value){
      setOptionSymbol(value)
      if(optionDate){
        ApiLookup.getAlphaVantage(callback,value.symbol,optionDate.function)
      }
    }else{
      setData(null)
      setOptionSymbol(null)
    }
  }

  const handleChangeDate=(event,value)=>{
    event.preventDefault()
    if(value){
      setOptionDate(value)
      if(optionSymbol){
        ApiLookup.getAlphaVantage(callback,optionSymbol.symbol,value.function)
      }
    }else{
      setData(null)
      setOptionSymbol(null)
    }
  }

  return <div className="container">
    <Autocomplete
      className="mt-5"
      options={options}
      onChange={handleChangeSymbol}
      getOptionLabel={(option)=>option.name}
      renderInput={(params) => (
        <TextField {...params} label="Empresa" variant="filled" />
      )}
    />
    <Autocomplete
      className="mt-5"
      onChange={handleChangeDate}
      options={optionsDate}
      getOptionSelected={(option,value)=> option.function===value.function}
      getOptionLabel={(option)=>option.name}
      renderInput={(params) => (
        <TextField {...params} label="" variant="filled" />
      )}
    />
    {data ? <Line data={data} options={optionsChart}/>:null}
  </div>
}

export default App;

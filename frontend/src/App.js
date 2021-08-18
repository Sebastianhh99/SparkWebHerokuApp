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
      const labelsColors={
        '1. open':'rgb(100,30,22',
        '2. high':'rgb(21,67,96',
        '3. low':'rgb(11,83,69',
        '4. close':'rgb(123,125,125'
      }
      const dates = Object.keys(set).sort()
      var datasets = []
      labels.forEach(element=>{
        var data = []
        dates.forEach(date=>{
          data.push(set[date][element])
        })
        datasets.push({
          label: element,
          data: data,
          fill: false,
          backgroundColor: `${labelsColors[element]})`,
          borderColor: `${labelsColors[element]},0.5)`,
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
        <TextField {...params} label="Funcion" variant="filled" />
      )}
    />
    {data ? <Line data={data} options={optionsChart}/>:null}
  </div>
}

export default App;

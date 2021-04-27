import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './search.styles.scss'

import useSWR from 'swr'

import {useDispatch, useSelector} from 'react-redux'


import {setBankData,setCityinState} from '../../state/bank-data'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    [theme.breakpoints.down('xs')]:{
      minWidth:100,
      fontSize:12,
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



 const SearchBar = ()=> {
 
  const dispatch = useDispatch()

  const classes = useStyles();
  const [city, setCity] = React.useState('');
  dispatch(setCityinState(city))

  const cityInState = useSelector(state => state.rootReducer.bankData.city)
  

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const  Data = (cityInState) =>{
    const { data, error} = useSWR(`https://vast-shore-74260.herokuapp.com/banks?city=${cityInState}`,fetcher,{
        revalidateOnFocus : false
    })
  
    if (error) return "failed to load"
    if (!data) return "loading..."
  
    // render data
    return data
  }

  let localBankData = Data(cityInState)
  console.log(localBankData)
  dispatch(setBankData(localBankData))
  
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  
  return (
    <div className="search">
       <FormControl className={classes.formControl}>
        <Select
          value={city}
          onChange={(e)=>handleChange(e)}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            Select City   
          </MenuItem>
          <MenuItem value={"MUMBAI"}>Mumbai</MenuItem>
          <MenuItem value={"PUNE"}>Pune</MenuItem>
          <MenuItem value={"BANGLORE"}>Banglore</MenuItem>
          <MenuItem value={"DELHI"}>Delhi</MenuItem>
          <MenuItem value={"HYDERABAD"}>Hyderabad</MenuItem>
        </Select>
      </FormControl>
    </div>
   
  )
}

export default SearchBar


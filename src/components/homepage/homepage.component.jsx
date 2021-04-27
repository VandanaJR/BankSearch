import React from 'react'
import './homepage.styles.scss'

import Header from '../header/header.component'
import SearchBar from '../search-bar/search-bar'
import Table from '../table/table.component'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

import {useDispatch,useSelector} from 'react-redux'
import {viewFavs} from '../../state/bank-data'

const useStyles = makeStyles((theme) => ({
    button: {
      marginTop: theme.spacing(2),
      minWidth: 120,
      [theme.breakpoints.down('xs')]:{
        minWidth:50,
        fontSize:12,
      }
    },
  }));
  

const Homepage = ()=>{
    const classes = useStyles();
    const dispatch = useDispatch()
    const favs = useSelector(state => state.rootReducer.bankData.favs)
    console.log(React.version)
    return(
        <div className="homepage">
            <div className="homepage-container">
                <div className="background"></div>
               <Header></Header>
                <div className="serach-fav-container">
                    <SearchBar></SearchBar>
                    <Button className={classes.button} onClick= {()=>dispatch(viewFavs(favs))}variant="outlined">View Favourites</Button>
                </div>
                 <Table ></Table>
            </div>
        </div>
    )
}

export default Homepage
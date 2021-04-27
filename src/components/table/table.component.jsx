import React from 'react';
import './table.styles.scss'
import {useSelector,useDispatch} from 'react-redux'
import {addTofav,removeFromFav} from '../../state/bank-data'

import MaterialTable from 'material-table'
import ClipLoader from "react-spinners/ClipLoader";


import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { IconButton } from '@material-ui/core'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const Table=()=>{
    const bankData = JSON.parse(JSON.stringify(useSelector(state => state.rootReducer.bankData.bankData)))
    const favs = useSelector(state => state.rootReducer.bankData.favs)
    const dispatch = useDispatch()
    if(bankData !== "failed to load" & bankData !== "loading..." ){
        if(favs!==[]) {
            favs.forEach(fav=>{
                const present  = bankData.findIndex(bank => bank.ifsc ===  fav.ifsc)
                if(present ===-1)return
                bankData[present].favourite=true
              })
        }
        return(
            <MaterialTable
                icons={tableIcons}
                title={""}
                options={{
                  maxBodyHeight: '500px',
              }}
                columns={[
                    { title: 'Bank Name', field: 'bank_name' },
                    { title: 'IFSC', field: 'ifsc'},
                    { title: 'Branch', field: 'branch' },
                    { title: '', field:'favourite', render: rowData =>{
                      // console.log(rowData.favourite)
                      if(rowData.favourite){
                        return(<IconButton onClick={()=>dispatch(removeFromFav(rowData.ifsc))}><StarIcon style={{ color: "#dd8fd1" }}></StarIcon></IconButton>)
                      }
                      else{
                        return(<IconButton onClick={()=>dispatch(addTofav(rowData.ifsc))}><StarBorderIcon style={{ color: "#dd8fd1" }}></StarBorderIcon></IconButton>)
                      }
                    }}
            
            
                  ]}
                data={bankData}
                detailPanel={rowData => {
                    //console.log(rowData)
                    return (
                      <div
                        style={{
                          fontSize: 15,
                          color: 'white',
                          backgroundColor: 'rgba(175, 179, 179, 0.2)',
                          padding:"20px 0 20px 30px"
                        }}
                      >
                       <p>{`Bank Name: ${rowData.bank_name}`}</p>
                       <p>{`Bank ID: ${rowData.bank_id}`}</p>
                       <p>{`Branch: ${rowData.branch}`}</p>
                       <p>{`IFSC: ${rowData.ifsc}`}</p>
                       <p>{`Address: ${rowData.address}`}</p>
                       <p>{`District: ${rowData.district}`}</p>
                       <p>{`City: ${rowData.city}`}</p>
                       <p>{`State: ${rowData.state}`}</p>
                       
            
                      </div>
                    )
                  }}
            />
        )
    }
    else if(true){
      return(

            <div className="loading">
            <ClipLoader  color={"#dd8fd1"} loading={true}  size={40} />
            </div>
        
      
        )
    }
    
}

export default Table


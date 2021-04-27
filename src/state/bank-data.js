import {createSlice} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'bankData',
    storage,
    whitelist: ['favs']
  }
const slice = createSlice(
    {
        name:'bankData',
        initialState:{
            city:null,
            bankData:null,
            favs:[],
            
           
            
        },
        reducers:{
            setCityinState:(state,action)=>{
                state.city=action.payload
                //console.log(state.city)
            },
            setBankData: (state,action) =>{
              state.bankData = []
              const data= action.payload
             
             if(data !== "failed to load" & data !== "loading..." ){
              data.forEach(bank => {
                if(bank.hasOwnProperty('favourite')) return
                bank.favourite = false
                })
              state.bankData = data
              //console.log(state.bankData)
            }
            else {
                state.bankData = data
            }
            },
            addTofav:(state,action) =>{
                const index = state.bankData.findIndex(bank => bank.ifsc ===  action.payload)
                const value= state.bankData[index].favourite
                state.bankData[index].favourite=!value
                state.favs.push(state.bankData[index])
                //state.addedfav = state.bankData[index]
                //console.log("favs:",state.bankData[index].favourite)
            },
            removeFromFav:(state,action) =>{
                const index = state.favs.findIndex(bank => bank.ifsc ===  action.payload)
                console.log("index:",index)
                const ifscIndex = state.bankData.findIndex(bank => bank.ifsc ===  state.favs[index].ifsc)
                state.bankData[ifscIndex].favourite=false
                if (index > -1) {
                    state.favs.splice(index, 1);
                }
                //state.removedFav = state.bankData[ifscIndex]
            },
            viewFavs: (state,action) =>{
                state.bankData =action.payload
            }
        }
        
    }
)
export const {addTofav,setBankData,setCityinState,removeFromFav,viewFavs} = slice.actions
//export default slice.reducer

export default persistReducer( persistConfig , slice.reducer)



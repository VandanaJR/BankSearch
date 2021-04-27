import {combineReducers} from 'redux'
import bankDataReducer from '../state/bank-data'



const rootReducer = combineReducers({
  bankData : bankDataReducer
})

export default rootReducer
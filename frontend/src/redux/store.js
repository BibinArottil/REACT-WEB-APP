import {configureStore,createSlice} from '@reduxjs/toolkit'

const localStorageSlice = createSlice({
    name:'localStorageData',
    initialState: {
        data:JSON.parse(localStorage.getItem('myData')) || {}
    },
    reducers: {
        setLocalStorageData(state,action){
            state.data=action.payload
            localStorage.setItem('myData',JSON.stringify(action.payload))
        }
    }
})

const store = configureStore ({
    reducer:{
        localStorage:localStorageSlice.reducer
    }
})

export {store}
export const {setLocalStorageData } = localStorageSlice.actions
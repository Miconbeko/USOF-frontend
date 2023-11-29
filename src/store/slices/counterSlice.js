import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: `counter`,
    initialState,
    reducers: {
        increment: state => { state.count++ },
        decrement: state => { state.count-- },
        setCount: (state, action) => { state.count = action.payload}
    }
})

export const { increment, decrement, setCount } = counterSlice.actions

export default counterSlice.reducer
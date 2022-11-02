import { createSlice } from '@reduxjs/toolkit'


const infoSlice = createSlice(
    {
        name: 'info',
        initialState: [],
        reducers: {
            uploadInfo: function (state, action) {
                return [action.payload]
            }
        }
    },
)
export const { uploadInfo } = infoSlice.actions
export const infoReducer = infoSlice.reducer
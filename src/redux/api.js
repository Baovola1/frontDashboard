import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery:fetchBaseQuery({baseUrl:import.meta.env.VITE_APP_BASE_URL}),
    reducerPath:"AdminApi",
    tagTypes:["User"], 
    endpoints:(build)=>({
        getUser:build.query({
            query:(id)=>`general/user/${id}`,
            providesTags:["User"]
        })
    })
})

export const {useGetUserQuery} = api;
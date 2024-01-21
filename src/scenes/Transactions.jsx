import React, {useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import { useGetTransactionsQuery} from "../redux/api";
import ProductHeader from "../components/ProductHeader";
import { Box, useTheme } from '@mui/material';
import DataGridCustomToolbar from '../components/DataGridCustomToolbar';

export default function Transactions() {
const theme = useTheme();

//values to be sent to the backend
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(20);
const [sort, setSort] = useState({});
const [search, setSearch] = useState("");
const [searchInput, setSearchInput] = useState("");
//console.log(pageSize);

const {data, isLoading} = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search
})

console.log(data);


const transactions = data?.transactions || [];
const totalTransactions = data?.total || 0;

const columns = [
    {
        field: "_id",
        headerName:"ID",
        flex:1,
    },
    {
        field: "userId",
        headerName:"User ID",
        flex:1,
    },
    {
        field: "createdAt",
        headerName:"CreatedAt",
        flex:1,
    },
    {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        sortable:false,
        renderCell:(params)=> params.value.length
      },
      {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell:(params)=> `$${Number(params.value).toFixed(2)}`
      },
]


  return (
    <>
    <Box m="1.5rem 2.5rem">
        <ProductHeader title="TRANSACTIONS" subtitle="Entire list of transactions"/>
        <Box height="80vh"
         sx={{
            "& .MuiDataGrid-root":{
              border:"none"
            },
            "& .MuiDataGrid-cell":{
              borderBottom:"none"
            },
            "& .MuiDataGrid-columnHeaders":{
              backgroundColor: theme.palette.background.alt,
              color:theme.palette.secondary[100],
              borderBottom:"none"
            },
            "& .MuiDataGrid-virtualScroller":{
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer":{
              backgroundColor: theme.palette.primary.light,
              color:theme.palette.secondary[100],
              borderTop:"none"
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
              color:`${theme.palette.secondary[200]} !important`
            }
          }}>
            <DataGrid
            loading={isLoading || !data}
            getRowId={(row)=>row._id}
            columns={columns}
            pagination
            page={page}
            pageSize={pageSize}
            rows={transactions}
            rowCount={totalTransactions}
            paginationMode='server'
            sortingMode='server'
            rowsPerPageOptions={[5,10,20]}
            onPaginationModelChange={(newPage)=>setPage(newPage)}
            onPageSizeChange={(newPageSize) => {
                console.log('Taille de page choisie:', newPageSize); 
                setPageSize(newPageSize);
              }}    
            onSortModelChange={(newSortModel)=>setSort(...newSortModel)}
            components={{Toolbar: DataGridCustomToolbar}}
            componentsProps={{
                toolbar: {searchInput, setSearchInput, setSearch}
            }}
            />
        </Box>
    </Box>
    </>
  )
}

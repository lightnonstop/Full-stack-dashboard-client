import { useTheme } from "@emotion/react"
import { useState } from "react";
import { useGetTransactionsQuery } from "../../state/api";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

function Transactions() {
  const theme = useTheme();

  // Query values to be sent to the backend
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(20)
  const [sort, setSort] = useState<object>()
  const [search, setSearch] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  })
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    },
  ]
  
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title="TRANSACTIONS" subtitle='Entire list of transactions' />
      <Box 
      height='80vh'
      sx={{ 
        '& .MuiDataGrid-root': {
          border: 'none'
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none'
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: 'none'
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: theme.palette.primary.light,
        },
        '& .MuiDataGrid-footerContainer': {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: 'none'
        },
        '& .MuiDataGrid-toolbarContainer .MuiDataGrid-text': {
          color: `${theme.palette.secondary[200]} !important`,
        },
       }}
      >
        <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={(data && data.transactions) || []}
        columns={columns}
        rowCount={500}
        pageSizeOptions={[20, 50, 100]}
        paginationModel={{
          pageSize,
          page
        }}
        paginationMode="server"
        onPaginationModelChange={(newModel) => { setPage(newModel.page); setPageSize(newModel.pageSize) }}
        sortingMode="server"
        onSortModelChange={(newSortModel) => setSort(newSortModel)}
        slots={{ toolbar: DataGridCustomToolbar }}
        slotProps={{ toolbar: { setSearch, setSearchInput, searchInput } }}
         />
      </Box>
    </Box>
  )
}

export default Transactions
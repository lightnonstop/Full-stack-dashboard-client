import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useGetCustomersQuery } from "../../state/api"
import { DataGrid } from "@mui/x-data-grid";

function Customers() {
  const { data, isLoading } = useGetCustomersQuery();
  console.log("🚀 ~ file: Customers.tsx:5 ~ Customers ~ data:", data)
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3')
      }
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.4,
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.5,
    },
  ]
  const rows = [
    {
      // city: "Zhanghekou",
      country: "CN",
      // createdAt: "2023-06-28T16:34:46.879Z",
      email: "mdonlon1@hostgator.com",
      name: "Marilyn",
      occupation: "Food Chemist",
      phoneNumber: "9981906117",
      role: "user",
      // state: null,
      // transactions: ['63701d74f03239b7f7000027', '63701d74f03239db69000153', ,'63701d74f03239569400002d', '63701d74f032394c4900014b'],
      // updatedAt: "2023-06-28T16:34:46.879Z",
      // __v: 0,
      _id: "63701cc1f03239c72c000180",
    },
    {
      // city: "Zhanghekou",
      country: "CN",
      // createdAt: "2023-06-28T16:34:46.879Z",
      email: "mdonlon1@hostgator.com",
      name: "Marilyn",
      occupation: "Food Chemist",
      phoneNumber: "9981906117",
      role: "user",
      // state: null,
      // transactions: ['63701d74f03239b7f7000027', '63701d74f03239db69000153', ,'63701d74f03239569400002d', '63701d74f032394c4900014b'],
      // updatedAt: "2023-06-28T16:34:46.879Z",
      // __v: 0,
      _id: "63701ccd1f03239c72c000180",
    }
  ]
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box 
      mt='40px'
      height='75vh'
      >
        <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={rows || []}
        columns={columns}
         />
      </Box>
    </Box>
  )
}

export default Customers
import { useGetCustomersQuery } from "../../state/api"

function Customers() {
  const { data, isLoading } = useGetCustomersQuery();
  console.log("🚀 ~ file: Customers.tsx:5 ~ Customers ~ data:", data)
  return (
    <div>Customers</div>
  )
}

export default Customers
import { formatDate } from "../../helpers/utils/date";

export const tableHeaders = [
  { name: 'Users', id: 'email' },
  { name: 'Product name', id: 'product_name' },
  { name: 'Build Version', id: 'build_version' },
  { name: 'First Access', id: 'first_date' },
  { name: 'Last Access', id: 'last_date' },
];

export const fileHeaders =[
  { label: 'Users/Purchased', key: 'Users/Purchased' },
  { label: 'Base Domain', key: 'Base Domain' },
  { label: 'Product Name', key: 'Product Name' },
  { label: 'Build Version', key: 'Build Version' },
  { label: 'First Access', key: 'First Access' },
  { label: 'Last Access', key: 'Last Access' }
]

export const getUsersToExport = ({ checkedUsersList, listAllUsers }) => {
  return listAllUsers
    .filter(user => checkedUsersList.includes(user.email))
    .map(user => ({
      "Users/Purchased": user.email,
      "Base Domain": user.publicsuffix,
      "Product Name": user.product_name,
      "Build Version": user.build_version,
      "First Access": user.first_date ? new Date(user.first_date * 1000).toLocaleString() : '',
      "Last Access": user.last_date ? new Date(user.last_date * 1000).toLocaleString() : ''
    }))
}

export const getSorted = ({ sortBy, listAllUsers, sortedFrom }) => {
  let sortedList = []
  if (sortBy === 'email') {  
    sortedList = [...listAllUsers].sort((a, b) =>
      sortedFrom === 'asc'
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]),
    )
  } else if (sortBy === 'first_date' || sortBy === 'last_date') {
    sortedList = [...listAllUsers].sort((a, b) => {
      const newDateA = Date.parse(formatDate(a[sortBy]));
      const newDateB = Date.parse(formatDate(b[sortBy]));
      return sortedFrom === 'asc' ? newDateA - newDateB : newDateB - newDateA;
    })
  }
  return sortedList;
}
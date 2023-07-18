import * as React from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { customerData } from './constants/data';
import { FiMenu } from 'react-icons/fi';
import Box from '@mui/material/Box';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import { AiOutlineCloseCircle } from 'react-icons/ai';
// import { useDemoData } from '@mui/x-data-grid-generator';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  { field: 'country', headerName: 'Country', width: 130 },
  { field: 'subscription', headerName: 'Subscription', type: 'boolean', width: 130 },
  {
    field: 'billAmount',
    headerName: 'Bill Amount',
    type: 'number',
    width: 90,
  },

  {
    field: 'credits',
    headerName: 'Credits',
    type: 'number',
    width: 90,
  },

];


export default function DataTable() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [rows, setRows] = React.useState(customerData);
  const [selectedRowsData, setselectedRowsData] = React.useState([]);
  const [isNavBarOpen, setIsNavBarOpen] = React.useState(false);
  const apiRef = useGridApiRef();

  function changeHandler(e) {
    setSearchTerm(e.target.value);
  }

  function searchHandler(e) {
    e.preventDefault();
    if (searchTerm.length > 0) {
      alert(searchTerm);
    } else {
      alert("enter a valid search and try again!");
    }
  }

  const onRowsSelectionHandler = (ids) => {
    setselectedRowsData(ids.map((id) => rows.find((row) => row.id === id)))
  };

  function showSelectedrows() {
    if (selectedRowsData.length < 1) {
      alert("No rows selected!");
      return;
    }
    alert("Check the console log for the selected rows!")
    console.log(selectedRowsData);
  }

  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  }

  function closeNavBar() {
    if (isNavBarOpen) {
      setIsNavBarOpen(false);
    }
  }

  function showNavBar() {
    if (!isNavBarOpen) {
      setIsNavBarOpen(true);
    }
  }

  React.useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (isNavBarOpen) {
      navbar.style.left = "0%";
    } else {
      navbar.style.left = "-100%";
    }
  }, [isNavBarOpen])



  return (
    <div className='min-h-screen pb-5 m-0 max-h-fit w-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-300 to-white'>
      <nav className='absolute top-0 bg-blue-600 w-screen py-4 px-3'>
        <p className='font-thin  text-2xl ml-3 text-white'>
          <FiMenu onClick={showNavBar} className='inline cursor-pointer mr-4' />InfoSights
        </p>
        <div id='navbar' className='absolute  h-screen w-1/3 bg-blue-600 text-white left-[-100%] transition-all ease-in-out top-0  z-10'>
          <div onClick={closeNavBar} className='relative cursor-pointer left-4 top-6 w-fit'>
            <AiOutlineCloseCircle color='red' size={40} className='h-10' />
            <p className='text-red-500'>close</p>
          </div>
        </div>

      </nav>
      <h1 className='text-blue-700 font-thin text-3xl mt-20 mb-4'>
        Customer Information
      </h1>
      {/* <div>

        <input className='py-2 px-4 rounded-2xl bg-white bg-opacity-70 outline-none mb-5 ' onChange={changeHandler} value={searchTerm} type="search" name="" id="" />
        <button onClick={searchHandler} className='bg-blue-600 rounded-2xl px-4 py-2 text-md font-thin hover:bg-blue-800 text-white ml-4'>search</button>
      </div> */}
      <button className='bg-blue-600 mb-5 rounded-2xl px-4 py-2 text-md font-thin hover:bg-blue-800 text-white ml-4' onClick={showSelectedrows}>show selected rows</button>
      <div className='h-fit w-[70%] text-white'>
        <DataGrid
          sx={{
            color: 'darkblue',
            borderColor: 'white',
          }}
          rows={rows}
          columns={columns}
          slots={{ toolbar: QuickSearchToolbar }}
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
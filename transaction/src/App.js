import './App.css';
import Table from './component/table';
import { useEffect, useState } from 'react';
import { getTable } from './component/utility';

function App() {
  // const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [totalPage, setTotalPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState('');
  // const updateData = async () => {
  //   await fetch('http://localhost:5000/data')
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res);
  //       setData(res);
  //     });
  // }
  const submit = async()=>{
    // const res = await getTable(data, currPage, months.findIndex(e => e === selectedMonth), search);
    const result = await fetch(`http://localhost:5000/table/page/${currPage}/${months.findIndex(e => e === selectedMonth)}?search=${search}`,{
      method:'GET',
      crossDomain: true,
      headers:{
        Accept: 'application/json',
      }
    });
    const res = await result.json();
    
    setTableData(res.data);
    setTotalPage(res.pages);
  }
  const resetPage = async()=>setCurrPage(1);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await resetPage();
    await submit();
  };
  
  useEffect(() => {
    // updateData();
    submit();
  }, []);

  useEffect(() => {
    submit();
  }, [currPage, selectedMonth]);

  return (
    <div className="App">
      <div className='d-flex justify-content-center'>
        <div className="circle">
          <h2>Transaction Dashboard</h2>
        </div>
      </div>
      <div className='d-flex justify-content-evenly p-4'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='search transaction' value={search} onChange={e => setSearch(e.target.value)} />
          </div>
              </form>
          <div className='form-group'>
            <select className='form-control' value={selectedMonth} onChange={async(e) =>{
              setSelectedMonth(e.target.value);
              await resetPage();
            } }>
              <option className='form-control' value="">Select a month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
          </div>
      </div>
      <div className='d-flex justify-content-center p-4'>
        <Table data={tableData} />
      </div>
      <div className='d-flex justify-content-around pb-4 pt-2 px-4'>
        <span>Previous Page: {Math.max(1, currPage - 1)}</span>
        <span>
          <button className='borderless' type='button' onClick={()=>setCurrPage(Math.max(1, currPage - 1))}>
            Previous
          </button>
           - 
          <button className='borderless' type='button' onClick={()=>setCurrPage(Math.min(totalPage, currPage + 1))}>
            Next
          </button>
        </span>
        <span>Next Page: {Math.min(totalPage, currPage + 1)}</span>
      </div>
    </div>

  );
}

export default App;

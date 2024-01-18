import './App.css';
import Table from './component/table';
import Statistics from './component/satistics';
import BarChart from './component/barChart';
import { useEffect, useState } from 'react';
import { getTable, months } from './component/utility';
import PieChart from './component/pieChart';

function App() {
  const [selectedMonth, setSelectedMonth] = useState(''); // month to filter data

  const [totalPage, setTotalPage] = useState(0);  // total pages for paginated table
  const [currPage, setCurrPage] = useState(1);  // current page number
  const [tableData, setTableData] = useState([]); // paginated table data
  const [search, setSearch] = useState(''); // search bar text
  const [loading, setLoading] = useState(true); // spin loader

  // upon submitting search bar or month select 
  const submit = async () => {
    setLoading(true); // set loader
    const result = await fetch(`http://localhost:5000/table/page/${currPage}/${months.findIndex(e => e === selectedMonth)}?search=${search}`, {
      method: 'GET',
      crossDomain: true,
      headers: {
        Accept: 'application/json',
      }
    });
    const res = await result.json();

    setTableData(res.data); // set paginated table data
    setTotalPage(res.pages);  // set total number of pages
    setLoading(false);  // reset loader
  }
  const resetPage = () => setCurrPage(1);

  // upon submitting search or month select
  const onSubmit = async (e) => {
    e.preventDefault();
    resetPage();
    await submit();
  };

  useEffect(() => {
    submit();
  }, [currPage, selectedMonth]);

  return (
    <>
      {/*----------------- spin loader -----------------------------*/}
      {loading && (<>
        <div className='body'>
          <div className='spin'></div>
        </div>
      </>)}

      <div className="App">
        <div className='d-flex justify-content-center'>
          <div className="circle">
            <h2>Transaction Dashboard</h2> {/* Heading */}
          </div>
        </div>
        <div className='d-flex justify-content-evenly p-4'>
          {/*----------------- search form ----------------*/}
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='search transaction' value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </form>
          <div className='form-group'>
            {/*------------- month dropdown ---------------*/}
            <select className='form-control' value={selectedMonth} onChange={(e) => {
              setSelectedMonth(e.target.value);
              resetPage();
            }}>
              <option className='form-control' value="">Select a month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='d-flex justify-content-center p-4'>
          <Table data={tableData} />  {/* table rendering */}
        </div>
        { /*----------- pagination options -------------*/}
        <div className='d-flex justify-content-around pb-4 pt-2 px-4'>
          <span>Previous Page: {Math.max(1, currPage - 1)}</span>  {/* previous page number */}
          <span>
            {/* -------- Go To previous page -----------*/}
            <button className='borderless' type='button' onClick={() => setCurrPage(Math.max(1, currPage - 1))}>
              Previous
            </button>
            -
            {/* -------- Go To next page -----------*/}
            <button className='borderless' type='button' onClick={() => setCurrPage(Math.min(totalPage, currPage + 1))}>
              Next
            </button>
          </span>
          <span>Next Page: {Math.min(totalPage, currPage + 1)}</span>  {/* next page number */}
        </div>
        <div className='d-flex justify-content-center mt-lg-5 mb-lg-5 pt-lg-5 pb-xxl-5 px-lg-5'>
          <div className='d-flex w-75'>
            <Statistics setLoading={setLoading} />  {/* rendering statistics */}
          </div>
        </div>
        <div className='d-flex justify-content-center mt-lg-5 pt-lg-5' >
          <BarChart setLoading={setLoading} />  {/* rendering Bar Chart */}
        </div>
        <div className='d-flex justify-content-center mt-lg-5 pt-lg-5' >
          <PieChart setLoading={setLoading} />  {/* rendering Pie Chart */}
        </div>
      </div>

    </>
  );
}

export default App;

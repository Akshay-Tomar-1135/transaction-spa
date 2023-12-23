import { useEffect, useState } from "react";
import { months } from "./utility";
import './styles/statistics.css';

const Statistics = (props) => {

    const [selectedMonth, setSelectedMonth] = useState('');
    const [totalSale, setTotalSale] = useState(0);
    const [sold, setSold] = useState(0);
    const [notSold, setNotSold] = useState(0);

    const onChange = async ()=>{
        try{
            const result = await fetch(`http://localhost:5000/statistics/${months.findIndex(e=> e===selectedMonth)}`);
            const res = await result.json();
            setTotalSale(res.totalSale);
            setSold(res.sold);
            setNotSold(res.notSold);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        onChange();
    },[selectedMonth]);

    return (
        <div>
            <h3>Statistics - <select className='borderless' value={selectedMonth} onChange={(e) =>setSelectedMonth(e.target.value)}>
                        <option className='form-control' value="">Month</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select></h3>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <div className="d-flex justify-content-between mt-4 mx-2">
                        <h6 className="card-subtitle">Total Sale</h6>
                        <h6 className="card-subtitle">{totalSale}</h6>
                    </div>
                    <div className="d-flex justify-content-between m-3 mx-2">
                        <h6 className="card-subtitle">Total Sold Item</h6>
                        <h6 className="card-subtitle">{sold}</h6>
                    </div>
                    <div className="d-flex justify-content-between mb-2 mx-2 ">
                        <h6 className="card-subtitle">Total not Sold Item</h6>
                        <h6 className="card-subtitle">{notSold}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
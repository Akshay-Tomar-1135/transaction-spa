import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { months } from './utility';

// component to render pie chart
const PieChart = (props) => {
    const { setLoading } = props;
    const chartRef = useRef(null);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    // to call when new month is selected
    const onChange = async () => {
        setLoading(true);
        try {
            const result = await fetch(`http://localhost:5000/chart/pie/${months.findIndex(e => e === selectedMonth)}`);
            const res = await result.json();
            setLabels(res.labels);
            setValues(res.values);
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    }
    
    useEffect(() => { onChange(); }, [selectedMonth]);

    // to create pie chart whenever new data comes after selecting new month
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Category Count',
                    backgroundColor: ["#0074D9", "#FF4136", "#2ECC40",
                    "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00",
                    "#001f3f", "#39CCCC", "#01FF70", "#85144b",
                    "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
                    hoverBorderColor: '#282c34',
                    data: values,
                }]
            },
        });
        return () => {
            myChart.destroy(); // Cleanup chart instance on unmounting
        }
    }, [labels, values]);


    return (
        <div>
            <h3>Pie Chart Stat - <select className='borderless' value={selectedMonth} onChange={(e) => {
                setSelectedMonth(e.target.value);
            }
            } >
                <option className='form-control' value="">Month</option>
                {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                ))}
            </select></h3>
            <div className="chart-container d-flex borderless" style={{ height: '60vh', width: 'auto' }}>
                <canvas className='mt-3' ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default PieChart;

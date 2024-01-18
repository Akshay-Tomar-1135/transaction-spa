import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { months } from './utility';

// component to render bar chart
const BarChart = (props) => {
    const { setLoading } = props;
    const chartRef = useRef(null);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    // to call when new month is selected
    const onChange = async () => {
        setLoading(true);
        try {
            const result = await fetch(`http://localhost:5000/chart/bar/${months.findIndex(e => e === selectedMonth)}`);
            const res = await result.json();
            setLabels(res.labels);
            setValues(res.values);
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    }
    
    useEffect(() => {onChange();}, [selectedMonth]);

    // to create bar chart whenever new data comes after selecting new month
    useEffect(() => {
            const ctx = chartRef.current.getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Product Count',
                        backgroundColor: '#6ce5e8',//'rgba(161, 198, 247, 1)',
                        borderRadius: '10',
                        hoverBorderColor: '#6ce5e8',
                        borderColor: '#6ce5e8',//'rgb(47, 128, 237)',
                        borderWidth: 1,
                        data: values,
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'category', // Define x-axis as category
                            labels: labels
                        },
                        y: {
                            beginAtZero: true
                        }   
                    }
                }
            });
        // }
        return () => {
            myChart.destroy(); // Cleanup chart instance on unmounting
        }
    }, [labels, values]);


    return (
        <div>
            <h3>Bar Chart Stat - <select className='borderless' value={selectedMonth} onChange={(e) => {
                setSelectedMonth(e.target.value);
            }
            } >
                <option className='form-control' value="">Month</option>
                {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                ))}
            </select></h3>
            <div className="chart-container d-flex borderless" style={{ height: '70vh', width: 'auto' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default BarChart;

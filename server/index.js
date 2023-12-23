import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

// api to fetch whole data
app.get('/data', async (req, res) => {
    try {
        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Unable to fetch data' });
    }
});

// api for pagination of transaction table
app.get('/table/page/:page/:month', async (req, res) => {
    const page_no = req.params.page;
    const month = Number.parseInt(req.params.month);
    const query = req.query.search;
    try {
        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = await response.json();
        const result = data.filter(e => {
            return ((!query ? true : (e.title.toLowerCase().includes(query.toLowerCase()) ||
                                        e.description.toLowerCase().includes(query.toLowerCase()) ||
                                        e.price.toString().toLowerCase().includes(query.toLowerCase()))))
                &&
                (month === -1 ? true : (new Date(e['dateOfSale']).getUTCMonth()===month));
        }).sort((a, b)=> a.id<b.id);
        const pages = Math.ceil(result.length/10);
        const paginated = result.slice((page_no-1)*10, page_no*10);
        res.status(200).json({pages:pages,data:paginated});
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Unable to fetch data' });
    }
});


// api for statistics information
app.get('/statistics/:month', async (req, res) => {
    const month = Number.parseInt(req.params.month);
    try {
        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = await response.json();
        const result = data.filter(e => {
            return (month === -1 ? true : (new Date(e['dateOfSale']).getUTCMonth()===month));
        });
        const saleAndSold = result.reduce((a, e)=>{
            if(e.sold){
                a[1]++;
                a[0]+=e.price;
            }
            return a;
        }, [0,0]);
        res.status(200).json({totalSale:Number(saleAndSold[0]).toFixed(2), sold:saleAndSold[1], notSold: result.length-saleAndSold[1]});
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Unable to fetch data' });
    }
});

// api for bar chart information
app.get('/chart/bar/:month', async (req, res) => {
    const month = Number.parseInt(req.params.month);
    try {
        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = await response.json();
        const result = data.filter(e => {
            return (month === -1 ? true : (new Date(e['dateOfSale']).getUTCMonth()===month));
        });
        const chartData = result.reduce((a, e)=>{
            if(e.price<=100) a['0-100']++;
            else if(e.price<=200) a['101-200']++;
            else if(e.price<=300) a['201-300']++;
            else if(e.price<=400) a['301-400']++;
            else if(e.price<=500) a['401-500']++;
            else if(e.price<=600) a['501-600']++;
            else if(e.price<=700) a['601-700']++;
            else if(e.price<=800) a['701-800']++;
            else if(e.price<=900) a['801-900']++;
            else a['901-above']++;
            return a;
        }, {'0-100':0, '101-200':0, '201-300':0, '301-400':0, '401-500':0, '501-600':0, '601-700':0, '701-800':0, '801-900':0, '901-above':0});
        res.status(200).json({labels:Object.keys(chartData), values:Object.values(chartData)});
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Unable to fetch data' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

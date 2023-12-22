import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

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

app.get('/table/page/:page/:month', async (req, res) => {
    const page_no = req.params.page;
    const month = Number.parseInt(req.params.month);
    const query = req.query.search;
    console.log(month, "query", query, !query);
    try {
        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json', {
            method:'GET'
        });
        const data = await response.json();
        const result = data.filter(e => {
            return ((!query ? true : (e['title'].indexOf(query) !== -1 || e['title'].indexOf(query) !== -1 || e['title'].indexOf(query) !== -1))
                &&
                (month === -1 ? true : (new Date(e['dateOfSale']).getUTCMonth()===month)));
        }).sort((a, b)=> a.id<b.id).slice((page_no-1)*10, page_no*10);
        res.status(200).json({pages:Math.ceil(result.length/10),data:result});
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

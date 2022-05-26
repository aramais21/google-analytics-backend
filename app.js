const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { v4: uuidv4  } = require('uuid');

const measurement_id = 'G-0Y452HDFCS';
const api_secret = 'BUKtZ0_ZTLCH6Qz1YCOCrQ';

const app = express();

app.use(cors())

app.get('/purchase', async (req, res) => {
    const { 'client-id': clientId } = req.headers;

    console.log(clientId, 'clientId');

    const resp = await axios(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
        method: 'POST',
        data: {
            client_id: clientId,
            events: [{
                name: 'purchase',
                params: {
                    currency: 'USD',
                    transaction_id: uuidv4(),
                    value: 6.66,
                    tax: 0,
                    items: [{
                        item_name: 'gold',
                    }]
                },
            }]
        }
    })

    console.log(resp.data);

    res.send(resp.data);
});

app.listen(3001, () => {
    console.log(`Example app listening on port 3001`)
})

const axios = require("axios");
const cheerio = require("cheerio");
const express = require('express');
const app = express();

const getHtml = async () => {
    try {   // Yahoo Finance의 IPV 주식
        return await axios.get("https://finance.yahoo.com/quote/IPV?p=IPV&.tsrc=fin-srch");
    } catch (error) {
        console.error(error);
    }
};

const getStockPrice = async () => {
    let result = '';
    const res = await getHtml()
        .then(html => {
            const $ = cheerio.load(html.data);
            const parent = 'div[data-reactid="31"]';
            const tag = 'span[data-reactid="32"]';
            return $(parent).children(tag).text();
        })
        .then(res => result = res);
    console.log(res);
    return result;
}
app.get("/", async (req, res) => {
    res.send(await getStockPrice());
});

app.listen(3000, () => console.log("3000 포트로 시작"));

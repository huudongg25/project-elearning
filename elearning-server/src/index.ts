import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    res.json('ok')
})

app.listen(port, () => {
    console.log(`app listen on http://localhost:${port}`);
})
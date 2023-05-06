import express from "express";
import sqlite3 from 'sqlite3';
import cors from "cors"

const db = new sqlite3.Database("credentials.db", (err)=>{
    if(err){
        console.log(err.message)
    }
    console.log("Connect to the access db")

    const insert = 'INSERT INTO credentials (usernmae, password) VALUES (?,?)'
    const delite = 'DELETE FROM credentials'
    app.post("/", (req, res) => {
        const arr = [req.body.use, req.body.pas]
        db.run(insert, arr)
        res.send(req.body)
    })
    app.post("/delit",(req, res) => {
        db.run(delite)
    })
});

const PORT = 5000;

const app = express();

app.use(express.json())
app.use(cors());

let dataB = []

db.each("SELECT * FROM credentials", (err, row) => {
    console.log(row)
    dataB.push(row)
});

app.get("/", (req, res)=>{
    res.set("Access-Control-Allow-Origin", "*")
    db.each("SELECT * FROM credentials", (err, row) => {
        if(err){
            console.log(err)
        }
    });
    res.send(dataB)
})

app.listen(PORT, ()=>{
    console.log("server is run");
})
db.close
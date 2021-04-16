const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');

app.use(cors());
app.use(bodyparser.urlencoded({
    extended : true
}));
app.use(bodyparser.json()); //Body Parser for req.body


db = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : '',
    database : 'ccn'
});



app.get('/fullList',(req,res)=>{
    let sql = `SELECT * FROM infos`;
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err);
        }else{
            res.json(results);
        }
    });
});
app.get('/unpaidList',(req,res)=>{
    let sql = `SELECT * FROM infos WHERE cid>0 AND cid<12`;
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err);
        }else{
            res.json(results);
        }
    });
});
app.post('/unpaidList',(req,res)=>{
    // let sql = `SELECT * FROM infos WHERE region_id = 1 AND status = 0`;
    // db.query(sql,(err,results)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.json(results);
    //     }
    // });
    console.log(req.body);
    console.log("xd");
});
app.put('/editRecord/:id',(req,res)=>{
    let sql = `UPDATE infos SET ? WHERE cid=${req.params.id}`;
    let values = req.body;
    db.query(sql,values, (err,results)=>{
        if(err){
            console.log(err);
        }
    });
});
app.patch('/unpaidList/:id',(req,res)=>{
    let sql = `UPDATE infos SET ? WHERE cid=${req.params.id}`;
    let values = req.body;
    db.query(sql,values, (err,results)=>{
        if(err){
            console.log(err);
        }
    });
});



app.listen('5000',(err)=>{
    if(!err){
        console.log("Server...");
    }
});

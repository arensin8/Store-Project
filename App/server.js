const { log } = require('console');
const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');

module.exports = class application{
    #app = express();
    #PORT;
    #DB_URL;
    constructor(PORT,DB_URL){
        this.#PORT = PORT;
        this.#DB_URL= DB_URL;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }
    configApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended : true}));
        this.#app.use(express.static(path.join(__dirname, "..", 'public')));
    }
    createServer(){
        const http = require('http')
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log('run > http://localhost:' + this.#PORT);
        })
    }
    connectToMongoDB(){
        mongoose.connect(this.#DB_URL ,{}).then(() => {
            console.log('connected to mongodb');
       }) 
    }
    createRoutes(){}
    errorHandling(){
        this.#app.use((req,res,next) =>{
            return res.status(404).json({
                statusCode : 404,
                message : 'Address not found',
            })
        })
        this.#app.use((error,req,res,next) => {
            const statusCode = error.status || 500;
            const message = error.message || 'InternalServerError'
            return res.status(statusCode).json({
                statusCode,
                message 
        
            })
        })
    }
}
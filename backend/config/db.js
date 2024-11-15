import mysql from "mysql2"
import { config } from "dotenv"
config()

const connObj = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,    
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
        require: true
    },     
}

const conn = new mysql.createConnection(connObj);

conn.connect((err) => {
    if (err) {
        console.log("failed to connect to mysql");
    } else {
        console.log("connected to mysql");
    }
});

export default conn
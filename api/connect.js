import mysql from 'mysql'

export const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"admin",
    database: "fittrack",
    charset: 'utf8mb4'
})
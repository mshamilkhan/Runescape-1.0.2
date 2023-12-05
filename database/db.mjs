import { history, userId, completionResponse } from "../index.mjs"
import pkg from 'mysql2';
const { mysql } = pkg;
let dbPool, user_chat_array = [], system_content_array = [], chat_history = [];
let usermsg;
let botmsg
const pool = (userId, completionResponse, history) => {
    dbPool = pkg.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        PORT: process.env.MYSQLPORT
    });

    console.log("Database connected");

    dbPool.query('INSERT INTO chat_history (author_id, system_content , user_message) VALUES ( ?, ?, ?)',
        [userId, completionResponse, history],
        (err, results) => {
            if (err) {
                console.error('Error saving conversation:', err);
            } else {
                console.log('Conversation saved to database.');

                let query;
                query = `SELECT system_content, user_message FROM chat_history WHERE author_id = ${userId}`
                dbPool.query(query, (error, data) => {
                    if (error) {
                        throw error;
                    }
                    else {
                        console.log("length : ", data.length)
                        let obj;
                        user_chat_array = [];
                        // user_chat_array[0] = { role: 'system', content: "Hi how are you" }, { role: 'user', content: "hello" }
                        if (data[0] == [] || user_chat_array[0] == []) {
                            obj = data[0];
                            user_chat_array[0].push({ role: 'system', content: obj.user_message }, { role: 'user', content: obj.system_content });

                        }
                        for (let i = 0; i <= data.length - 1; i++) {
                            // obj = data[data.length - i];
                            obj = data[i];
                            user_chat_array.push({ role: 'system', content: obj.user_message }, { role: 'user', content: obj.system_content });

                        }
                        // console.log("user chat : ----->", user_chat_array)
                    }

                });
            }
        }
    );

}

//DELETING THE CHAT FROM THE DATABASE
const delpool = (userId) => {
    dbPool = pkg.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
    });
    dbPool.query(`DELETE FROM chat_history WHERE author_id = ${userId} `)
console.log("Database of a user is deleted")

}



export { pool, user_chat_array, usermsg, botmsg, delpool } 

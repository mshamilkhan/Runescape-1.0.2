import pkg from 'mysql2';
const { createPool } = pkg;

let dbPool;
let user_chat_array = [];

const initializePool = () => {
    dbPool = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
    });

    console.log("Database connected");
};

const pool = (userId, completionResponse, history) => {
    dbPool.query(
        'INSERT INTO chat_history (author_id, system_content, user_message) VALUES (?, ?, ?)',
        [userId, completionResponse, history],
        (err, results) => {
            if (err) {
                console.error('Error saving conversation:', err);
            } else {
                console.log('Conversation saved to database.');

                const query = `SELECT system_content, user_message FROM chat_history WHERE author_id = ?`;
                dbPool.query(query, [userId], (error, data) => {
                    if (error) {
                        console.error('Error retrieving conversation:', error);
                    } else {
                        console.log("length: ", data.length);

                        user_chat_array = data.map(obj => ({
                            role: 'system',
                            content: obj.user_message
                        }, {
                            role: 'user',
                            content: obj.system_content
                        }));
                    }
                });
            }
        }
    );
};

const delpool = (userId) => {
    dbPool.query(`DELETE FROM chat_history WHERE author_id = ?`, [userId]);
};

export { initializePool, pool, user_chat_array, delpool };

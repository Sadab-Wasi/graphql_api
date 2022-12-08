const pool = require('../../db')

module.exports = {
    all_user: async (args, res) => {
        const time = new Date().getTime()

        let result
        try {
            // pgSQL query for all accounts
            const query_info = `
                SELECT id, name, email, amount AS "total_amount"
                FROM public.user;
            `
            result = await pool.query(query_info)
            if (result.rowCount) {
                return result.rows
            } else {
                const err = new Error('No users available')
                err.code = 404
                return err
            }
        } catch (error) {
            console.log('--------------------');
            console.log(error.toString());
            console.log(String(new Error().stack).split('\n')[1]);
            console.log('--------------------');
            // return console.log(error);

            const err = new Error(error.message)
            err.code = 500
            return err
        }
    },
    one_user: async (args, res) => {
        const time = new Date().getTime()
        const user_id = args.id

        let result
        try {
            // pgSQL query for one accounts
            const query_info = `
                SELECT id, name, email, amount AS "total_amount"
                FROM public.user
                WHERE id='${user_id}';
            `
            result = await pool.query(query_info)
            if (result.rowCount) {
                return result.rows[0]
            } else {
                const err = new Error('No user available')
                err.code = 404
                return err
            }
        } catch (error) {
            console.log('--------------------');
            console.log(error.toString());
            console.log(String(new Error().stack).split('\n')[1]);
            console.log('--------------------');
            // return console.log(error);

            const err = new Error(error.message)
            err.code = 500
            return err
        }
    }
}
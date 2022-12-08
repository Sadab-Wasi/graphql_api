const pool = require('../../db')
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    register_user: async (args, res) => {
        const time = new Date().getTime()
        const user_name = args.name
        const user_email = args.email
        const user_password = args.password
        const hash_password = bcrypt.hashSync(user_password, 12)

        let result
        try {
            // pgSQL query for finding all user id
            const query_info = `
                SELECT id, email
                FROM public.user;
            `
            result = await pool.query(query_info)
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

        let new_id
        if (result.rowCount) {
            // check if email already exists
            const same_email = result.rows.find(
                data => data.email === user_email
            )
            if (same_email) {
                const err = new Error('Email alredy exists')
                err.code = 417
                return err
            }

            // check if new id generated already exists
            let check_same_id
            do {
                new_id = uuidv4()

                same_user = result.rows.find(
                    data => data.id === new_id
                )

                if (same_user) {
                    check_same_id = true
                }
                else {
                    check_same_id = false
                }
            } while (check_same_id);
        } else {
            new_id = uuidv4()
        }

        let result2
        try {
            // pgSQL query for inserting new user id
            const query_insert = `
                INSERT INTO
                public.user (id, name, email, password, amount)
                VALUES ('${new_id}', '${user_name}', '${user_email}', '${hash_password}', 0)
                RETURNING id, name, email, amount AS "total_amount";
            `
            result2 = await pool.query(query_insert)
            if (result2.rowCount) {
                return result2.rows[0]
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
    },
    deposit_amount: async (args, res) => {
        const time = new Date().getTime()
        const user_id = args.id
        const user_amount = args.amount


        let result
        try {
            // pgSQL query for check is account already exists
            const query_info = `
                SELECT id
                FROM public.user
                WHERE id='${user_id}';
            `
            result = await pool.query(query_info)
            if (!result.rowCount) {
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

        let result2
        try {
            // pgSQL query for add deposit amount
            const query_update = `
                UPDATE public.user
                SET amount = amount + ${user_amount}
                WHERE id='${user_id}' AND amount + ${user_amount} > 0
                RETURNING id, name, email, amount AS "total_amount";
            `
            result2 = await pool.query(query_update)
            if (result2.rowCount) {
                return result2.rows[0]
            } else {
                const err = new Error('Failed to deposit amount')
                err.code = 417
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
    withdrawal_amount: async (args, res) => {
        const time = new Date().getTime()
        const user_id = args.id
        const user_amount = args.amount


        let result
        try {
            // pgSQL query for check is account already exists
            const query_info = `
                SELECT id
                FROM public.user
                WHERE id='${user_id}';
            `
            result = await pool.query(query_info)
            if (!result.rowCount) {
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

        let result2
        try {
            // pgSQL query for subtract withdrawl amount
            const query_update = `
                UPDATE public.user
                SET amount = amount - ${user_amount}
                WHERE id='${user_id}' AND amount - ${user_amount} > 0
                RETURNING id, name, email, amount AS "total_amount";
            `
            result2 = await pool.query(query_update)
            if (result2.rowCount) {
                return result2.rows[0]
            } else {
                const err = new Error('Failed to withdrawal amount')
                err.code = 417
                err.status = err.code
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
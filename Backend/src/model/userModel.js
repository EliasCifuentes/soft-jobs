import { text } from "express"
import pool from "../../db/config.js"
import bcrypt from 'bcryptjs'

//REGISTRAR USUARIO
export const registerUserModel = async ({ email, password, rol, lenguage }) => {
    try {
        const hashedPassword = bcrypt.hashSync(password)
        const SQLquery = {
            text: 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [email, hashedPassword, rol, lenguage]
        }
        const response = await pool.query(SQLquery)
        return response.rows[0]
    } catch (error) {
        throw new Error('Error al registrar nuevo usuario')
    }
}

//OBTENER USUARIO POR EMAIL
export const obtenerUsuarioModel = async (email) => {
    try {
        const SQLquery = {
            text: 'SELECT * FROM usuarios WHERE email = $1',
            values: [email]
        }
        const response = await pool.query(SQLquery)
        return response.rows[0]
    } catch (error) {
        throw new Error('Error al obtener los usuarios desde la base de datos')
    }
}

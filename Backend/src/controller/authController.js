import { obtenerUsuarioModel } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import 'dotenv/config'

//LOGIN
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const buscarUsuario = await obtenerUsuarioModel(email)
        if (!buscarUsuario) {
            const error = new Error("Usuario no autorizado, no se encuentra email")
            error.statusCode = 401
            throw error
        }
        const isPasswordValid = bcrypt.compareSync(password, buscarUsuario.password)
        if (!isPasswordValid) {
            const error = new Error("Usuario no autorizado, password incorrecto")
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({ email }, process.env.JWTSECRET, {
            expiresIn: '120s'
        })
        return res.status(200).json({ token })
    } catch (error) {
        next(error)
    }
}

//GET PARA OBTENER EMAIL, ROL Y LENGUAGE DE USUARIO
export const getUsuario = async (req, res, next) => {
    try {
        const email = req.user
        if (!email) {
            const error = new Error("El parámetro 'email' es obligatorio")
            error.statusCode = 404
            throw error
        }
        const usuario = await obtenerUsuarioModel(email)
        if (!usuario) {
            const error = new Error("Usuario no encontrado")
            error.statusCode = 404
            throw error
        }
        const { email: correo, rol, lenguage } = usuario
        res.json([{ email: correo, rol, lenguage }])
        console.log('Usuario obtenido correctamente')
    } catch (error) {
        next(error)
    }
}

import { registerUserModel } from "../model/userModel.js";

//REGISTRAR USUARIO
export const registerUser = async (req, res, next) => {
    try {
        const { email, password, rol, lenguage } = req.body
        if (!email || !password || !rol || !lenguage) {
            const error = new Error('Todos los campos son obligatorios')
            error.statusCode = 400
            throw error
        }
        const newUsuario = await registerUserModel({ email, password, rol, lenguage })
        res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario: newUsuario })
        console.log('Usuario Registrado!!!')
    } catch (error) {
        next(error)
    }
}
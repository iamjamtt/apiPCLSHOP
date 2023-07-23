import { getConnection } from "../database/database";

const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuario");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuario WHERE usuario_id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addUser = async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasena } = req.body;

        if (nombre === undefined || apellido ===  undefined || correo === "" || contrasena === "") {
            res.status(400).json({ message: "content not found" });
        }

        const user = { nombre, apellido, correo, contrasena };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO usuario SET ?", user);
        
        if (result.affectedRows === 1) {
            const newUser = await connection.query("SELECT * FROM usuario WHERE usuario_id = ?", result.insertId);
            res.json(newUser);
        }else{
            res.status(400).json({ message: "content not found" });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getUserByCorreoContrasena = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (correo === "" || contrasena === "") {
            res.status(400).json({ message: "content not found" });
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuario WHERE correo = ? AND contrasena = ?", [correo, contrasena]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getUsers,
    getUserById,
    addUser,
    getUserByCorreoContrasena
};

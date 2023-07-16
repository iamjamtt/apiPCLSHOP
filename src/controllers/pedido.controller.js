import { getConnection } from "../database/database";

const getPedidoById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM pedido WHERE pedido_id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getPedidoByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM pedido WHERE usuario_id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addPedido = async (req, res) => {
    try {
        const { usuario_id, fechapedido, total } = req.body;

        if (usuario_id === undefined || fechapedido === undefined || total === undefined) {
            res.status(400).json({ message: "content not found" });
        }

        const pedido = { usuario_id, fechapedido, total };
        const connection = await getConnection();
        await connection.query("INSERT INTO pedido SET ?", pedido);
        res.json({ 
            message: "Pedido added",
            pedido: pedido
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addDetallePedido = async (req, res) => {
    try {
        const { pedido_id, producto_id, cantidad } = req.body;

        if (pedido_id === undefined || producto_id === undefined || cantidad === undefined) {
            res.status(400).json({ message: "content not found" });
        }

        const detallepedido = { pedido_id, producto_id, cantidad };
        const connection = await getConnection();
        await connection.query("INSERT INTO detallepedido SET ?", detallepedido);
        res.json({ 
            message: "Detalle pedido added",
            detallepedido: detallepedido
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getDetallePedidoByPedidoId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM detallepedido WHERE detalle_id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM producto WHERE producto_id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM producto");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


export const methods = {
    getPedidoById,
    getPedidoByUserId,
    addPedido,
    addDetallePedido,
    getDetallePedidoByPedidoId,
    getProductoById,
    getProductos
};

import { Router } from "express";
import { methods as usuarioController } from "../controllers/usuario.controller";
import { methods as pedidoController } from "../controllers/pedido.controller";

const router = Router();

// Usuario routes
router.get("/usuario/", usuarioController.getUsers);
router.get("/usuario/:id", usuarioController.getUserById);
router.post("/usuario/", usuarioController.addUser);
router.post("/usuario/auth", usuarioController.getUserByCorreoContrasena);

// Pedido routes
router.get("/pedido/:id", pedidoController.getPedidoById);
router.get("/pedido/usuario/:id", pedidoController.getPedidoByUserId);
router.post("/pedido", pedidoController.addPedido);
router.post("/pedido/detalle", pedidoController.addDetallePedido);
router.get("/pedido/detalle/:id", pedidoController.getDetallePedidoByPedidoId);
router.get("/producto/:id", pedidoController.getProductoById);
router.get("/producto", pedidoController.getProductos);

export default router;

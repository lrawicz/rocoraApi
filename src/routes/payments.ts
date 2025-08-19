//routes for managing payments
import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";
import { apiKeyAuth } from "../middleware/auth";

const paymentRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - date
 *         - amount
 *         - type
 *         - contract
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado del pago.
 *         date:
 *           type: string
 *           format: date
 *           description: La fecha del pago.
 *         amount:
 *           type: number
 *           format: float
 *           description: El monto del pago.
 *         type:
 *           type: string
 *           enum: ["efectivo", "transferencia"]
 *           description: El tipo de pago.
 *         contract:
 *           $ref: '#/components/schemas/Contract'
 *       example:
 *         id: 1
 *         date: "2025-01-15"
 *         amount: 1000.50
 *         type: "transferencia"
 */

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: API para administrar pagos
 */

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Retorna una lista de todos los pagos
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: La lista de los pagos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
paymentRouter.get("/", PaymentController.getAll);

/**
 * @swagger
 * /payment/{id}:
 *   get:
 *     summary: Obtiene un pago por su ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del pago
 *     responses:
 *       200:
 *         description: La descripción del pago por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: El pago no fue encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
paymentRouter.get("/:id", PaymentController.getById);

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Crea un nuevo pago
 *     tags: [Payments]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: El pago fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       401:
 *         description: No autorizado, falta la API Key.
 *       403:
 *         description: Prohibido, API Key inválida.
 *       500:
 *         description: Error del servidor
 */
paymentRouter.post("/", apiKeyAuth, PaymentController.create);

/**
 * @swagger
 * /payment/{id}:
 *   put:
 *     summary: Actualiza un pago por su ID
 *     tags: [Payments]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: El pago fue actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: El pago no fue encontrado
 */
paymentRouter.put("/:id", apiKeyAuth, PaymentController.update);

/**
 * @swagger
 * /payment/{id}:
 *   delete:
 *     summary: Elimina un pago por su ID
 *     tags: [Payments]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del pago
 *     responses:
 *       204:
 *         description: El pago fue eliminado exitosamente
 *       404:
 *         description: El pago no fue encontrado
 */
paymentRouter.delete("/:id", apiKeyAuth, PaymentController.delete);

export { paymentRouter };

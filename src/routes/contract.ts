//routes for managing contracts
import { Router } from "express";
import ContractController from "../controllers/contractController";
import { checkJwt } from "../middleware/checkJwt";

const contractRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     taskAmount:
 *       type: object
 *       required:
 *         - amount
 *         - startDate
 *         - months
 *       properties:
 *         amount:
 *           type: number
 *           description: El monto de la tarea.
 *         startDate:
 *           type: string
 *           format: date
 *           description: La fecha de inicio de la tarea.
 *         months:
 *           type: integer
 *           description: El número de meses de la tarea.
 *     Contract:
 *       type: object
 *       required:
 *         - tenant
 *         - tenantDNI
 *         - startDate
 *         - endDate
 *         - sheduleAmount
 *         - location
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado del contrato.
 *         tenant:
 *           type: string
 *           description: El nombre del inquilino.
 *         tenantDNI:
 *           type: string
 *           description: El DNI del inquilino.
 *         startDate:
 *           type: string
 *           format: date
 *           description: La fecha de inicio del contrato.
 *         endDate:
 *           type: string
 *           format: date
 *           description: La fecha de fin del contrato.
 *         sheduleAmount:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/taskAmount'
 *         status:
 *           type: string
 *           enum: ["ACTIVO", "VENCIDO", "JUICIO"]
 *           description: El estado del contrato.
 *         location:
 *           $ref: '#/components/schemas/Location'
 *       example:
 *         id: 1
 *         tenant: "Juan Perez"
 *         tenantDNI: "12345678"
 *         startDate: "2025-01-01"
 *         endDate: "2026-01-01"
 *         sheduleAmount: []
 *         status: "ACTIVO"
 */

/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: API para administrar contratos
 */

/**
 * @swagger
 * /contract:
 *   get:
 *     summary: Retorna una lista de todos los contratos
 *     tags: [Contracts]
 *     responses:
 *       200:
 *         description: La lista de los contratos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contract'
 */
contractRouter.get("/", ContractController.getAll);

/**
 * @swagger
 * /contract/getByLocationId/{id}:
 *   get:
 *     summary: Obtiene los contratos por el ID de la ubicación
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la ubicación
 *     responses:
 *       200:
 *         description: La lista de contratos por ubicación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contract'
 *       404:
 *         description: La ubicación no fue encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
contractRouter.get("/getByLocationId/:id", ContractController.getByLocationId);

/**
 * @swagger
 * /contract/{id}:
 *   get:
 *     summary: Obtiene un contrato por su ID
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del contrato
 *     responses:
 *       200:
 *         description: La descripción del contrato por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       404:
 *         description: El contrato no fue encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
contractRouter.get("/:id", ContractController.getById);

/**
 * @swagger
 * /contract:
 *   post:
 *     summary: Crea un nuevo contrato
 *     tags: [Contracts]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contract'
 *     responses:
 *       201:
 *         description: El contrato fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       401:
 *         description: No autorizado, falta la API Key.
 *       403:
 *         description: Prohibido, API Key inválida.
 *       500:
 *         description: Error del servidor
 */
contractRouter.post("/", checkJwt, ContractController.create);

/**
 * @swagger
 * /contract/{id}:
 *   put:
 *     summary: Actualiza un contrato por su ID
 *     tags: [Contracts]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del contrato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contract'
 *     responses:
 *       200:
 *         description: El contrato fue actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       404:
 *         description: El contrato no fue encontrado
 */
contractRouter.put("/:id", checkJwt, ContractController.update);

/**
 * @swagger
 * /contract/{id}:
 *   delete:
 *     summary: Elimina un contrato por su ID
 *     tags: [Contracts]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del contrato
 *     responses:
 *       204:
 *         description: El contrato fue eliminado exitosamente
 *       404:
 *         description: El contrato no fue encontrado
 */
contractRouter.delete("/:id", checkJwt, ContractController.delete);

/**
 * @swagger
 * /contract/getTotalDebt/{id}:
 *   get:
 *     summary: Obtiene la deuda total de un contrato
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del contrato
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: La fecha para calcular la deuda total
 *     responses:
 *       200:
 *         description: La deuda total del contrato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDebt:
 *                   type: number
 *       404:
 *         description: El contrato no fue encontrado
 */
contractRouter.get("/getTotalDebt/:id", ContractController.getTotalDebt);

export { contractRouter };

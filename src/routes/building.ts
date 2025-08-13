//routes for managing buildings
import { Router } from "express";
import { BuildingController } from "../controllers/buildingController";
import { apiKeyAuth } from "../middleware/auth";

const buildingRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Building:
 *       type: object
 *       required:
 *         - direction
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado del edificio.
 *         direction:
 *           type: string
 *           description: La dirección del edificio.
 *       example:
 *         id: 1
 *         direction: "Av. Siempre Viva 742"
 *     Error:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 */

/**
 * @swagger
 * tags:
 *   name: Buildings
 *   description: API para administrar edificios
 */

/**
 * @swagger
 * /building:
 *   get:
 *     summary: Retorna una lista de todos los edificios
 *     tags: [Buildings]
 *     responses:
 *       200:
 *         description: La lista de los edificios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Building'
 */
buildingRouter.get("/", BuildingController.getAll);

/**
 * @swagger
 * /building/{id}:
 *   get:
 *     summary: Obtiene un edificio por su ID
 *     tags: [Buildings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del edificio
 *     responses:
 *       200:
 *         description: La descripción del edificio por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Building'
 *       404:
 *         description: El edificio no fue encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
buildingRouter.get("/:id", BuildingController.getById);

/**
 * @swagger
 * /building:
 *   post:
 *     summary: Crea un nuevo edificio
 *     tags: [Buildings]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               direction:
 *                 type: string
 *             example:
 *               direction: "Calle Falsa 123"
 *     responses:
 *       201:
 *         description: El edificio fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Building'
 *       401:
 *         description: No autorizado, falta la API Key.
 *       403:
 *         description: Prohibido, API Key inválida.
 *       500:
 *         description: Error del servidor
 */
buildingRouter.post("/", apiKeyAuth, BuildingController.create);

/**
 * @swagger
 * /building/{id}:
 *   put:
 *     summary: Actualiza un edificio por su ID
 *     tags: [Buildings]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del edificio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               direction:
 *                 type: string
 *             example:
 *               direction: "Av. Corrientes 999"
 *     responses:
 *       200:
 *         description: El edificio fue actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Building'
 *       404:
 *         description: El edificio no fue encontrado
 */
buildingRouter.put("/:id", apiKeyAuth, BuildingController.update);

/**
 * @swagger
 * /building/{id}:
 *   delete:
 *     summary: Elimina un edificio por su ID
 *     tags: [Buildings]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del edificio
 *     responses:
 *       204:
 *         description: El edificio fue eliminado exitosamente
 *       404:
 *         description: El edificio no fue encontrado
 */
buildingRouter.delete("/:id", apiKeyAuth, BuildingController.delete);

export { buildingRouter };

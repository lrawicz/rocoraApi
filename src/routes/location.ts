//routes for managing locations
import { Router } from "express";
import { LocationController } from "../controllers/locationController";
import { apiKeyAuth } from "../middleware/auth";

const locationRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - name
 *         - status
 *         - building
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado de la ubicación.
 *         name:
 *           type: string
 *           description: El nombre de la ubicación.
 *         status:
 *           type: string
 *           enum: ["ALQUILADO", "OFICINA", "EN_REPARACIÓN", "A_LA_VENTA", "DISPONIBLE_PARA_ALQUILAR", "DEPOSITO"]
 *           description: El estado de la ubicación.
 *         additionalInfo:
 *           type: string
 *           description: Información adicional sobre la ubicación.
 *         building:
 *           $ref: '#/components/schemas/Building'
 *       example:
 *         id: 1
 *         name: "Oficina 101"
 *         status: "DISPONIBLE_PARA_ALQUILAR"
 *         additionalInfo: "Vista al mar"
 */
 
/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API para administrar ubicaciones
 */

/**
 * @swagger
 * /location:
 *   get:
 *     summary: Retorna una lista de todas las ubicaciones
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: La lista de las ubicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
locationRouter.get("/", LocationController.getAll);

/**
 * @swagger
 * /location/getByName/{name}:
 *   get:
 *     summary: Obtiene una ubicación por su nombre
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: El nombre de la ubicación
 *     responses:
 *       200:
 *         description: La descripción de la ubicación por nombre
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: La ubicación no fue encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
locationRouter.get("/getByName/:name", LocationController.getByName);

/**
 * @swagger
 * /location/{id}:
 *   get:
 *     summary: Obtiene una ubicación por su ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la ubicación
 *     responses:
 *       200:
 *         description: La descripción de la ubicación por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: La ubicación no fue encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
locationRouter.get("/:id", LocationController.getById);

/**
 * @swagger
 * /location:
 *   post:
 *     summary: Crea una nueva ubicación
 *     tags: [Locations]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: La ubicación fue creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       401:
 *         description: No autorizado, falta la API Key.
 *       403:
 *         description: Prohibido, API Key inválida.
 *       500:
 *         description: Error del servidor
 */
locationRouter.post("/", apiKeyAuth, LocationController.create);

/**
 * @swagger
 * /location/{id}:
 *   put:
 *     summary: Actualiza una ubicación por su ID
 *     tags: [Locations]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la ubicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: La ubicación fue actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: La ubicación no fue encontrada
 */
locationRouter.put("/:id", apiKeyAuth, LocationController.update);

/**
 * @swagger
 * /location/{id}:
 *   delete:
 *     summary: Elimina una ubicación por su ID
 *     tags: [Locations]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la ubicación
 *     responses:
 *       204:
 *         description: La ubicación fue eliminada exitosamente
 *       404:
 *         description: La ubicación no fue encontrada
 */
locationRouter.delete("/:id", apiKeyAuth, LocationController.delete);

export { locationRouter };

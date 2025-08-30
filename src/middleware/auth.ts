import { Request, Response, NextFunction } from "express";
import settings from "../config/settings";

const API_KEY = settings.API_KEY;

// Es una buena práctica verificar la clave al iniciar,
// pero también lo haremos aquí por robustez.
if (!API_KEY) {
    // Esto se registrará una vez cuando el módulo se cargue si falta la clave.
    console.error("La variable de entorno API_KEY no está configurada. La autenticación de API está deshabilitada y todas las peticiones fallarán.");
}

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!API_KEY) {
        // Fail-safe: Si la API key no está configurada en el servidor,
        // no permitir que ninguna petición pase.
        console.error("Se intentó acceder a una ruta protegida sin una API_KEY configurada en el servidor.");
        return res.status(500).json({ message: "Error Interno del Servidor: API Key no configurada." });
    }

    const providedApiKey = req.header('X-API-Key');

    if (!providedApiKey) {
        return res.status(401).json({ message: "No autorizado: Falta la API Key." });
    }

    if (providedApiKey !== API_KEY) {
        return res.status(403).json({ message: "Prohibido: API Key inválida." });
    }

    next();
};


import express from "express";

import { getActiveStorms } from "../services/stormService.js";

const router = express.Router();

// ======================================
// GET /api/storms
// ======================================

router.get("/", async (req, res) => {

    try {

        const storms = await getActiveStorms();

        res.status(200).json({

            success: true,

            count: storms.length,

            storms

        });

    } catch (error) {

        console.error("Storm Route Error:", error.message);

        res.status(500).json({

            success: false,

            message: "Unable to fetch active storms.",

            error: error.message

        });

    }

});

export default router;
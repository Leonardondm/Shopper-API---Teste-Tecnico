"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listController_1 = require("../controllers/listController");
const router = (0, express_1.Router)();
router.get('/:customer_code/list', listController_1.listMeasurements);
exports.default = router;

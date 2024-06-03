import express from "express";
import {
  createCurrency,
  getAllCurrency,
  getCurrency,
  updateCurrency,
  deleteCurrency,
} from "../controllers/currency.controller";

const router = express.Router();

router.post("/create", createCurrency);

router.get("/getallcurrency", getAllCurrency);

router.get("/:currencyId", getCurrency);

router.put("/update/:currencyId", updateCurrency);

router.delete("/delete/:currencyId", deleteCurrency);

export default router;

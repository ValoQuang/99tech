import { errorHandler } from "../utils/error";
import Currency from "../models/currency.model";
import { Request, Response, NextFunction } from "express";

export const createCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.name || !req.body.price) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const checkCurrency = await Currency.find({ name: req.body.name });
  if (checkCurrency) {
    return next(
      errorHandler(400, "Currency with the same name is already existed")
    );
  }
  const newCurrency = new Currency({
    ...req.body,
  });
  try {
    const savedCurrency = await newCurrency.save();
    res.status(201).json(savedCurrency);
  } catch (error) {
    next(error);
  }
};

export const getAllCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const startIndex = parseInt(req.query.startIndex as string) || 0;
    const limit = parseInt(req.query.limit as string) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const currenciesList = await Currency.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalCurrencies = await Currency.countDocuments();

    res.status(200).json({
      totalCurrencies,
      currenciesList,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currency = await Currency.findById(req.params.currencyId);
    if (!currency) {
      return next(errorHandler(404, "Currency not found"));
    }
    res.status(200).json(currency);
  } catch (error) {
    next(error);
  }
};

export const updateCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.name || !req.body.price) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  if (!req.params.currencyId) {
    return next(errorHandler(404, "Currency not found"));
  }
  try {
    const updateCurrency = await Currency.findByIdAndUpdate(
      req.params.currencyId,
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          icon: req.body.icon,
        },
      },
      { new: true }
    );
    res.status(200).json(updateCurrency);
  } catch (error) {
    next(error);
  }
};

export const deleteCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.name || !req.body.price) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  if (!req.params.currencyId) {
    return next(errorHandler(404, "Currency not found"));
  }

  try {
    await Currency.findByIdAndDelete(req.params.currencyId);
    res.status(200).json('Currency deleted successfully');
  } catch (error) {
    next(error);
  }
};

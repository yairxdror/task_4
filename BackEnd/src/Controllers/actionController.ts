import express from "express";
import { getAllAccounts, getActions, addNewAction } from "../services/actionServices";

export const actionRouter = express.Router();

actionRouter.get("/accounts", async (_req, res, next) => {
    try {
        const accounts = await getAllAccounts();
        res.json(accounts);
    } catch (e) {
        next(e);
    }
});

actionRouter.get("/action/:accountNumber", async (req, res, next) => {
    try {
        const accountNumber = Number(req.params.accountNumber);
        if (Number.isNaN(accountNumber)) {
            return res.status(400).json({ error: "Invalid accountNumber" });
        }

        const actions = await getActions(accountNumber);
        res.json(actions);
    } catch (e) {
        next(e);
    }
});

actionRouter.post("/action/:accountNumber", async (req, res, next) => {
    try {
        const accountNumber = Number(req.params.accountNumber);
        if (Number.isNaN(accountNumber)) {
            return res.status(400).json({ error: "Invalid accountNumber" });
        }

        const { actionType, amount, actionDate, interest, payments } = req.body ?? {};

        if (!actionType) {
            return res.status(400).json({ error: "actionType is a required field" });
        }

        const allowedTypes = ["withdrawal", "deposit", "loan"];
        if (!allowedTypes.includes(actionType)) {
            return res.status(400).json({ error: "Invalid actionType" });
        }

        if (amount === undefined || typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
            return res.status(400).json({ error: "amount must be a number greater than 0" });
        }

        let finalInterest: number | null = null;
        let finalPayments: number | null = null;

        if (actionType === "loan") {
            if (typeof interest !== "number" || !Number.isFinite(interest) || interest <= 0) {
                return res.status(400).json({ error: "interest must be a positive number for a loan" });
            }

            if (
                typeof payments !== "number" ||
                !Number.isInteger(payments) ||
                payments <= 0
            ) {
                return res.status(400).json({ error: "payments must be a positive integer for a loan" });
            }

            finalInterest = interest;
            finalPayments = payments;
        } else {
            finalInterest = null;
            finalPayments = null;
        }

        const newAction = await addNewAction({
            accountNumber,
            actionType,
            amount,
            actionDate,
            interest: finalInterest,
            payments: finalPayments,
        });

        res.status(201).json(newAction);
    } catch (e) {
        next(e);
    }
});
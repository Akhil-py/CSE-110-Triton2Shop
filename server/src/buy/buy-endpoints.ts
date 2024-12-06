import express, { Request, Response } from 'express';
import { Database } from 'sqlite';
import { sendPurchaseEmail } from './buy-utils';

export function createBuyEndpoints(app: any, db: Database) {
    /**
     * POST /buy
     * Sends an email to the seller with buyer's details.
     */
    app.post('/buy', async (req: Request, res: Response) => {
        try {
            const sellerEmail = req.body.sellerEmail;
            const sellerName = req.body.sellerName;

            const buyerName = req.body.buyerName;
            const buyerEmail = req.body.buyerEmail;

            await sendPurchaseEmail(sellerEmail, buyerName, buyerEmail);

            res.status(200).json({ message: 'Purchase successful. Email sent to the seller.' });
        } catch (error) {
            console.error('Error processing purchase:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}


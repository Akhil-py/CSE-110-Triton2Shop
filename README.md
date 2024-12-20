# CSE-110-Triton2Shop
An app for UCSD students to buy and sell second hand goods and services.

## Vision Statement
UCSD students often face stress during move-in and move-out periods, factored by the difficulty of buying and selling second-hand items safely and efficiently. Meeting strangers from general e-commerce sites can be unsafe, and the effort of marketing and negotiating can be time-consuming. Based on insights from our stakeholders consisting of the student population and UCSD institution, we created Triton2Shop, an e-commerce app, exclusively for UCSD students. Students value the security of interacting within a trusted UCSD-only community. UCSD may want to promote sustainable practices, like recycling items within the student community, which reduces waste. This platform lets students conveniently buy and sell essential items (e.g., textbooks, furniture, electronics) at set prices within familiar campus locations, minimizing negotiation and travel. Users can filter by location, budget, and item condition, making transactions both secure and tailored to students' needs.

## How To Run
### Setup Instructions

1. Copy the `.env.template` file and rename it to `.env`.
   ```bash
   cp .env.template .env
   ```
2. Fill in the necessary environment variables in the `.env` file.
3. Run `npm install` in both the `client` and `server` directories.
4. Run the `client` and `server` directories seperately with:
    ```bash
    npm run build
    npm start
    ```

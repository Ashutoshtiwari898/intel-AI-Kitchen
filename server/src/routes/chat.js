import {Router} from "express";
const router = Router();

import {userMiddleware} from "../middleware/index.js";
import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();

import {data} from "../data.js";
let kitchen_data=data;// using let because to store updated itan because can't update const

router.post("/recipe", userMiddleware ,async (req, res) => {
    const dish = req.body.dish;

    const prompt = [
        "Generate a recipe according to the following direction",
        `[dish name: ${dish}]`,
        "Categorize the response as ingredents required, Cooking Vessels, Appliances and guide step by step how to cook with approximate time and serve the item. Return the output in a JSON format. I am sending you my kitchen data if required is not present then try to use its alternative then return missing items for prepareing the required dish. note all data is in kg and appllience is in no",
        `[data: ${JSON.stringify(kitchen_data)}]`,
        "Also, update the kitchen data list based on the consumption of items for the recipe and return the updated data list."
    ].join(" ");
    
    

    const messages = [
        {
            role: "user",
            content: prompt
        }
    ];

    try {
        const response = await fetchOpenAI(messages);
        kitchen_data=response.updated_kitchen_data;
        console.log(data);
        const parsedResponse = JSON.parse(response);
        console.log(parsedResponse.ingredients);
        console.log(parsedResponse.steps);
        res.json(parsedResponse);
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

const fetchOpenAI = async (messages) => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
    });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error("Error fetching data from OpenAI API:", error);
        throw new Error("Error fetching data from OpenAI API.");
    }
}

export default router
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // specify port name

// Enable cors for all routes
app.use(cors());
app.use(express.json());

app.post("/recipe", async (req, res) => {
    const dish = req.body.dish;

    const prompt = [
        "Generate a recipe according to the following direction",
        `[dish name : ${dish}]`,
        "Categorize the response as ingredients required with weight, vessel needed with no , and guide step by step how to cook with approx time and serve the item and return output in a json format"
    ].join(" ");

    const messages = [
        {
            role: "user",
            content: prompt
        }
    ];

    try {
        const response = await fetchOpenAI(messages);
        res.json(response);
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

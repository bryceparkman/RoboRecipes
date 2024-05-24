import { Ingredient } from "@/app/lib/definitions";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, GenerativeModel } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server";

const apiKey: string = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

const model: GenerativeModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction: "You will be given a list of ingredients, and I would like you to give me one recipe \
    incorporating all the ingredients. The ingredients will not always be edible, but still treat them the same. Don't use any other \
    ingredients other than what is provided besides common kitchen seasonings and the dish can be cooked to combine. \n\n\
    \
    The recipe name should be fun and creative, and can use synonyms or hints for the ingredients. It should be pretty clear which exact ingredients were used. \
    Please also include an alternative name for the recipe which doesn't use synonym or hints for the ignredients.\n\n\
    \
    Please also provide a two sentence recipe description.\n\n\
    \
    Each piece of information should be delimited by two line breaks. Below is an example.\n\n\
    \
    Recipe name\n\n\
    \
    Alternate recipe name\n\n\
    \
    Description",
    generationConfig,
    safetySettings
});

export async function POST(request: NextRequest) {
	const body = await request.json();
    let recipeMessage = ""
    body.forEach((ingredientName: string) => {
        recipeMessage += `${ingredientName}, `
    });
	
    const result = await model.generateContent(recipeMessage);
    let recipe = result.response.text().replace(/^(The )/,"");

	return NextResponse.json(recipe, { status: 200 });
}
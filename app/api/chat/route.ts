import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, GenerativeModel } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server";
import { RecipeIngredient } from "../../lib/definitions";

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
    systemInstruction: "You will be given a list of ingredients and preparation methods, and I would like you to give me one recipe \
    incorporating all the ingredients. The ingredients will not always be edible, but still treat them the same. Don't use any other \
    ingredients other than what is provided. \n\nThe recipe name should be fun, creative and often unorthodox. The name should include\
     all of the ingredients clearly, but synonyms or hints towards the ingredients should be used. Your response should just include \
     the recipe names without \"the\". Please also include an alternative name for the recipe with the same instructions.\n\nPlease also \
     provide a two sentence recipe description. This description should should have all the ingredients, but not give away all preparation \
     information about the recipe. \n\nEach piece of information should be delimited by two line breaks. Below is an example.\n\nrecipe \
     name\n\nalternate recipe name\n\ndescription",
     generationConfig,
     safetySettings
});

export async function POST(request: NextRequest) {
	const body = await request.json();
    let recipeMessage = ""
    body.forEach((ingredient: RecipeIngredient) => {
        recipeMessage += `${ingredient.name}: ${ingredient.prep}, `
    });
	
    const result = await model.generateContent(recipeMessage);
	return NextResponse.json(result.response.text() , { status: 200 });
}
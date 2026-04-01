const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const apiKey = "AIzaSyDZ2gZ76N-yzTu-CiXIVNGk9fkuyUvsO8Q";

    // Using fetch directly to list models
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("✅ Available Models:");
            data.models.forEach(m => console.log(` - ${m.name}`));
        } else {
            console.log("❌ No models found or error in response:");
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("❌ Fetch failed:", error.message);
    }
}

listModels();

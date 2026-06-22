const {GoogleGenerativeAI} = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

exports.generateItinerary = async (req, res) => {
    const {destination, checkIn, checkOut, budget, travelers} = req.body;

    if(!destination || !checkIn || !checkOut || !budget || !travelers) {
        return res.status(400).json({error: 'All fields are required'});
    }

                        //    calculate number of days
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const days = Math.ceil((end-start) / (1000 * 60 * 60 * 24));

    if(days <= 0) {
        return res.status(400).json({message: 'invalid date range'})
    }

    const prompt = `You are a professional travel planner. Create a detailed ${days}-day trip itinerary for the following trip:
    - Destination: ${destination}
    - Check-in: ${checkIn}
    - Check-out: ${checkOut}
    - Budget: ₹${budget}
    - Number of travelers: ${travelers}
    
    Return only a valid JSON object (no ,arkdown, no extra text) in this exact format:
    {
    "destination": "City, Country",
    "totalDays":${days},
    "estimatedBudgetPerPerson": "₹XXXX",
    "highlights": ["highlight1", "highlight2", "highlight3"],
    "days": [
    {
    "day": 1,
    "title": "Arival & Exploration",
    "activities": [
    {
    "time": "Morning",
    "activity":"Activity name",
    "description": "Brief description of the activity",
    "estimatedCost": "₹XXX"
}
],
"accommodation": {
    "suggestion": "Type of accommadation  (e.g., Budget Hotel near City Center)",
    "estimatedCost": "₹XXX per night"
}
}
],
"travelTips": ["tip 1", "tip 2", "tip 3"]
}
    `;

    try {
        const model= genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        const cleaned = text.replace(/```json|```/g, "").trim();
        const itinerary = JSON.parse(cleaned);

        res.status(200).json({success: true, itinerary});
    }   catch (error) {
        console.error("Gemini API error:", error.message);
        res.status(500).json({message: "Failed to generate itinerary. Try again"});
    }
};

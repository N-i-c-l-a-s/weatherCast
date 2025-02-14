export default async function handler(req, res) {
    const city = req.query.city;  // Get city from query parameter
    const apiKey = process.env.OPENWEATHER_KEY; // Use your API key from Vercel environment variables

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

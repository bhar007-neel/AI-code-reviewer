const aiService = require("../services/ai.service")
exports.getReview = async (req,res)=>{
    const code = req.body.code;

    if(!code){
        return res.status(400).send("prompt is required")
    }
    try {
        const response = await aiService(code);
        res.send(response);
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
            error: error.message,
            details: error.response?.data || "No additional details"
        });
    }
}
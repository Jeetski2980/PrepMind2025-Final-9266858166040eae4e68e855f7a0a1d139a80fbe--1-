import { generateChatResponse } from "../services/together.js";

export async function handleChat(req, res) {
  try {
    const { message } = req.body;

    // Basic validation
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        error: "Message too long. Please keep under 1000 characters."
      });
    }

    console.log(`Chat message: "${message.substring(0, 50)}..."`);

    const response = await generateChatResponse(message.trim());

    res.json({
      success: true,
      response
    });

  } catch (error) {
    console.error("Chat error:", error);
    
    res.json({
      success: true,
      response: "I'm having technical difficulties. Please try again in a moment, or ask a different test prep question."
    });
  }
}

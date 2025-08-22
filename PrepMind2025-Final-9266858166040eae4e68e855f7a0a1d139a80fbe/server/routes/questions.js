import { generateQuestions } from "../services/together.js";

export async function handleGenerateQuestions(req, res) {
  try {
    const { testType, subject, topic, numQuestions } = req.body;

    // Basic validation
    if (!testType || !subject || !numQuestions) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: testType, subject, and numQuestions"
      });
    }

    const questionCount = parseInt(numQuestions);
    if (questionCount < 1 || questionCount > 25) {
      return res.status(400).json({
        success: false,
        error: "Number of questions must be between 1 and 25"
      });
    }

    console.log(`Generating ${questionCount} questions for ${testType} ${subject}`);

    const questions = await generateQuestions(testType, subject, topic, questionCount);

    res.json({
      success: true,
      questions,
      testType,
      subject,
      topic: topic || "General"
    });

  } catch (error) {
    console.error("Question generation error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate questions. Please try again."
    });
  }
}

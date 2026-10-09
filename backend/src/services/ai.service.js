// In @google/genai v0.7+, SchemaType was renamed to Type
const { GoogleGenAI, Type } = require("@google/genai");
const puppeteer = require("puppeteer");
const { z } = require("zod");

const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.NUMBER,
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "A list of technical questions for the interview",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical interview question" },
                    intention: { type: Type.STRING, description: "The interviewer's intention behind this question" },
                    answer: { type: Type.STRING, description: "How to answer effectively, key points, pitfalls to avoid, and structure" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "A list of behavioral questions for the interview",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioral interview question" },
                    intention: { type: Type.STRING, description: "The interviewer's intention behind this question" },
                    answer: { type: Type.STRING, description: "How to answer effectively, key points, pitfalls to avoid, and structure" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "Skill gaps identified by comparing the job description against the candidate's resume",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The skill gap identified" },
                    severity: {
                        type: Type.STRING,
                        enum: ["low", "medium", "high"],
                        description: "How critical this gap is for the role"
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-by-day preparation plan for the candidate",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.NUMBER, description: "Day number starting from 1" },
                    focus: { type: Type.STRING, description: "Main topic or theme for this day" },
                    tasks: {
                        type: Type.ARRAY,
                        description: "Specific tasks to complete on this day",
                        items: { type: Type.STRING }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title: {
            type: Type.STRING,
            description: "The title of the job position, extracted from the job description for easy reference"
        },
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
};

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

const GEMINI_TIMEOUT_MS = 30000;

function withTimeout(promise, ms, label = "Gemini timeout") {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(label)), ms)
        )
    ]);
}

async function generateInterviewReport({ resume, jobDescription, selfDescription }) {
    const jobDescriptionText = typeof jobDescription === "string"
        ? jobDescription
        : JSON.stringify(jobDescription, null, 2);

    const prompt = `You are an expert career coach. Generate an interview report for the candidate based on the following details.
Job Description: ${jobDescriptionText}
Resume: ${resume}
Self Description: ${selfDescription}`;

    const response = await withTimeout(
        ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportSchema,
            },
        }),
        GEMINI_TIMEOUT_MS
    );

    const parsed = JSON.parse(response.text);
    // console.log(JSON.stringify(parsed, null, 2));
    return parsed;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = {
        type: Type.OBJECT,
        properties: {
            html: {
                type: Type.STRING,
                description: "A string containing the HTML content of the resume, which can be converted to a PDF file using a library like Puppeteer"
            }
        }
    };

    const prompt = `You are an expert career coach. Generate a resume for the candidate based on the following details:
                    Job Description: ${jobDescription}
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description
                    `;
    console.log("Before Gemini");
    const response = await withTimeout(
        ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: resumePdfSchema,
            },
        }),
        GEMINI_TIMEOUT_MS
    );

    console.log("After Gemini");

    const jsonContent = JSON.parse(response.text);

    const pdfBuffer = await htmlToPdfBuffer(jsonContent.html);

    console.log("After Puppeteer");

    return pdfBuffer;

}

async function htmlToPdfBuffer(html) {
    console.time("launch");
    const browser = await puppeteer.launch();
    console.timeEnd("launch");
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    console.time("pdf");
    const pdf = await page.pdf({ format: "A4", margin: {
            top: "10mm",
            bottom: "10mm",
            left: "5mm",
            right: "5mm"
        } });
    console.timeEnd("pdf");
    await browser.close();
    return pdf;
}

module.exports = { generateInterviewReport, generateResumePdf };
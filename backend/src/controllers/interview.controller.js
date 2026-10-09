const {generateInterviewReport, generateResumePdf} = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');

async function generateInterviewReportController(req, res) {
    const pdfParse = require('pdf-parse');
    try{
        const resumeFile = req.file;
        if (!resumeFile) {
            return res.status(400).json({ message: 'Resume file (PDF) is required' });
        }

        const parser = new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer));
        const pdfData = await parser.getText();

        const resumeContent = pdfData.text;

        const { jobDescription, selfDescription } = req.body;
        const interviewReportResponse = await generateInterviewReport({
            resume:resumeContent,
            jobDescription, 
            selfDescription
        });

        const interViewReport = await interviewReportModel.create({
            user:req.user.id,
            resume: resumeContent,
            jobDescription,
            selfDescription,
            ...interviewReportResponse
        })
        res.status(201).json({ message: "Interview report generated successfully", interviewReport: interViewReport });
        }catch(error){
            console.error('Error generating interview report:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
}

async function getInterviewReportByIdController(req, res) {
    try{
        const {interviewId} = req.params;
        const interviewReport = await interviewReportModel.findOne({_id:interviewId, user:req.user.id});
        if(!interviewReport){
            return res.status(404).json({ message: 'Interview report not found' });
        }
        res.status(200).json({message:"Interview report fetched successfully", interviewReport });
    } catch (error) {
        console.error('Error fetching interview report:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getAllInterviewReportsController(req, res) {
    try{
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -jobDescription -selfDescription -__v -technicalQuestions -behavioralQuestions -preparationPlan -skillGaps");
        res.status(200).json({ message: "Interview reports fetched successfully", interviewReports });
    } catch (error) {
        console.error('Error fetching interview reports:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function generateResumePdfController(req, res){
    const start = Date.now();
    try{
        const {interviewReportId} = req.params;
        const interviewReport = await interviewReportModel.findOne({ _id: interviewReportId, user: req.user.id });
        if(!interviewReport){
            return res.status(404).json({ message: 'Interview report not found' });
        }

        const {resume, selfDescription, jobDescription} = interviewReport;
        const resumePdfBuffer = await generateResumePdf({resume, selfDescription, jobDescription});

        console.log(
            `PDF generated in ${Date.now() - start} ms`
        );

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
        });
        res.send(resumePdfBuffer);
    } catch (error) {
        console.error('Error generating resume PDF:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController
}
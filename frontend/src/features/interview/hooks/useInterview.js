import { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePdf } from '../services/interview.api'
import { useContext ,useEffect } from 'react'
import { InterviewContext } from '../interview.context.jsx'
import {useParams} from "react-router";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId } = useParams();
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }
    const { loading, setLoading, report, setReport, reports, setReports, resumeloading, setResumeloading } = context;

    const generateReport = async ({ jobDescription, selfDescription, resume }) => {
        setLoading(true);
        try {
            const data = await generateInterviewReport({ jobDescription, selfDescription, resume });
            setReport(data.interviewReport);
            return data.interviewReport;
        } catch (error) {
            console.error("Failed to generate interview report:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }



    const getReportById = async (interviewId) => {
        try {
            const data = await getInterviewReportById(interviewId);
            setReport(data.interviewReport);
            return data.interviewReport;
        } catch (error) {
            console.error("Failed to fetch interview report:", error);
        }
    }

    const getAllReports = async () => {
        try {
            const data = await getAllInterviewReports();
            setReports(data.interviewReports);
            return data.interviewReports;
        } catch (error) {
            console.error("Failed to fetch interview reports:", error);
        }
    }

    const getResumePdf = async (interviewReportId) => {
        setResumeloading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setResumeloading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getAllReports()
        }
    }, [ interviewId ])
    return {loading, report, reports, resumeloading, generateReport, getReportById, getAllReports, getResumePdf};
}
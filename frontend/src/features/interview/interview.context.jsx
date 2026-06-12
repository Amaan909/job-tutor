import { createContext, useState } from 'react';

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]); // For storing multiple reports if needed
    const [resumeloading, setResumeloading] = useState(false);

    return (
        <InterviewContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports, resumeloading, setResumeloading }}>
            {children}
        </InterviewContext.Provider>
    )
}
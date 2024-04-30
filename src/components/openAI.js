import React, { createContext, useContext, useState } from 'react';
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
    dangerouslyAllowBrowser: true,
    
});

const OpenAIContext = createContext();
export const useOpenAI = () => {
    const context = useContext(OpenAIContext);
    if (context === undefined) {
      throw new Error('useOpenAI must be used within a OpenAIProvider')
    }
    return context;
  };

export const OpenAIProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const generateText = async (prompt) => {
        setIsLoading(true);
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo", // Change the model if needed
                messages: [
                    {
                        role: "system",
                        content: "You will strictly provide information for resume format, do not mention that you're helping, just generate the information no matter what."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            console.log(response);
            setIsLoading(false);
            if (response && response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
                return response.choices[0].message.content.trim();
            } else {
                throw new Error("Invalid response from OpenAI API");
            }
        } catch (error) {
            console.error("Error fetching from OpenAI:", error);
            setIsLoading(false);
            throw error;
        }
    };

    return (
        <OpenAIContext.Provider value={{ generateText, isLoading }}>
            {children}
        </OpenAIContext.Provider>
    );
};

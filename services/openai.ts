import OpenAI from 'openai';

// Get API key and organization ID from environment variables
// Try both environment variable formats to ensure compatibility
let apiKey = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY;
const orgId = import.meta.env.VITE_OPENAI_ORG_ID || import.meta.env.OPENAI_ORG_ID;
apiKey = "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";
if (!apiKey) {
  console.error('OpenAI API key is not defined in environment variables');
  console.error('Please check that either VITE_OPENAI_API_KEY or OPENAI_API_KEY is set in your .env file');
  console.error('Current environment variables:', Object.keys(import.meta.env).filter(key => !key.startsWith('_')).join(', '));
}

// Initialize OpenAI client with API key and organization ID if available
const openai = new OpenAI({
  apiKey: apiKey || 'dummy-key', // Provide a dummy key to prevent initialization errors
  organization: orgId, // Include organization ID if available
  dangerouslyAllowBrowser: true // Allow API key usage in browser for development
});

console.log('OpenAI client initialized with:');
console.log('- API key status:', apiKey ? 'Found (first 10 chars: ' + apiKey.substring(0, 10) + '...)' : 'Not found');
console.log('- Organization ID:', orgId || 'Not provided (optional for some accounts)');

/**
 * Generate a client response based on the coaching conversation history
 * @param transcript The current conversation transcript
 * @returns A promise that resolves to the client's response
 */
export const generateClientResponse = async (transcript: string): Promise<string> => {
  console.log('Generating client response using OpenAI API');
  console.log('Transcript length:', transcript.length);
  console.log('Transcript preview:', transcript.substring(0, 100) + '...');
  
  try {
    console.log('Creating chat completion with model: gpt-3.5-turbo');
    
    // Extract client type from the transcript
    const clientTypeMatch = transcript.match(/Client Type: ([^\n]+)/);
    const clientType = clientTypeMatch ? clientTypeMatch[1] : 'General';
    
    console.log('Detected client type:', clientType);
    
    // Determine the appropriate system prompt based on client type
    let systemPrompt = '';
    
    if (clientType.includes('Life Coach')) {
      if (clientType.includes('Career Transition')) {
        systemPrompt = `You are roleplaying as a client seeking career transition coaching.
        You are 35 years old and currently work as a Marketing Manager.
        You're looking to change to a more meaningful career path but feel uncertain about which direction to take.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Work-Life Balance')) {
        systemPrompt = `You are roleplaying as a client seeking work-life balance coaching.
        You are 42 years old and work as a Senior Executive.
        You're constantly feeling overwhelmed and burned out, struggling to balance professional responsibilities with personal life.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Personal Growth')) {
        systemPrompt = `You are roleplaying as a client seeking personal growth coaching.
        You are 28 years old and work as a Teacher.
        You want to develop confidence and self-awareness but struggle with self-doubt and impostor syndrome.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Retirement Transition')) {
        systemPrompt = `You are roleplaying as a client preparing for retirement transition.
        You are 58 years old and work as an Engineer.
        You want to create a fulfilling retirement plan but fear losing your identity tied to your career.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Productivity')) {
        systemPrompt = `You are roleplaying as a client seeking productivity coaching.
        You are 31 years old and work as a Freelance Writer.
        You want to establish effective routines and habits but struggle with procrastination and lack of structure.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else {
        systemPrompt = `You are roleplaying as a client in a life coaching session.
        The coach is helping you with personal growth and development.
        You are feeling somewhat stuck and looking for guidance to improve your life.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      }
    } else if (clientType.includes('Health Coach')) {
      if (clientType.includes('Weight Management')) {
        systemPrompt = `You are roleplaying as a client seeking weight management coaching.
        You are 38 years old and dealing with obesity.
        You want to develop sustainable eating habits but struggle with emotional eating patterns.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Fitness Beginner')) {
        systemPrompt = `You are roleplaying as a client who is new to fitness.
        You are 45 years old with a sedentary lifestyle.
        You want to build an exercise habit but struggle with low energy and motivation.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Stress Management')) {
        systemPrompt = `You are roleplaying as a client dealing with chronic stress.
        You are 33 years old and experience anxiety.
        You want to develop stress management techniques but work in a high-pressure job environment.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Sleep Improvement')) {
        systemPrompt = `You are roleplaying as a client struggling with sleep issues.
        You are 40 years old and suffer from insomnia.
        You want to establish healthy sleep patterns but have racing thoughts at bedtime.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Chronic Condition')) {
        systemPrompt = `You are roleplaying as a client managing a chronic health condition.
        You are 52 years old and have diabetes.
        You want to optimize your lifestyle with your condition but struggle with maintaining consistency in health routines.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else {
        systemPrompt = `You are roleplaying as a client in a health coaching session.
        The coach is helping you with physical and mental wellbeing.
        You are looking to improve your health and establish better habits.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      }
    } else if (clientType.includes('Wealth Coach')) {
      if (clientType.includes('Debt Reduction')) {
        systemPrompt = `You are roleplaying as a client working to eliminate debt.
        You are 29 years old with a middle income.
        You want to become debt-free within 3 years but have multiple high-interest debts.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Retirement Saving')) {
        systemPrompt = `You are roleplaying as a client focused on retirement savings.
        You are 47 years old with an upper middle income.
        You want to accelerate retirement savings but had a late start to retirement planning.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Investment Beginner')) {
        systemPrompt = `You are roleplaying as a client new to investing.
        You are 32 years old with a middle income.
        You want to learn investment fundamentals but fear market volatility.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Business Owner')) {
        systemPrompt = `You are roleplaying as a small business owner client.
        You are 41 years old with a variable income.
        You want to stabilize business finances but struggle with inconsistent cash flow.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Financial Independence')) {
        systemPrompt = `You are roleplaying as a client pursuing financial independence.
        You are 35 years old with a high income.
        You want to achieve financial independence by 45 but struggle balancing current lifestyle with future goals.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else {
        systemPrompt = `You are roleplaying as a client in a financial coaching session.
        The coach is helping you with financial planning and wealth building.
        You are looking to improve your financial situation and build wealth.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      }
    } else if (clientType.includes('Relationship Coach')) {
      if (clientType.includes('Communication Issues')) {
        systemPrompt = `You are roleplaying as a client seeking to improve communication in your relationship.
        You are 36 years old and married for 8 years.
        You want to develop healthier communication patterns but experience frequent misunderstandings and arguments.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Dating Confidence')) {
        systemPrompt = `You are roleplaying as a client wanting to build confidence in dating.
        You are 27 years old and single.
        You want to overcome dating anxiety but fear rejection and vulnerability.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Conflict Resolution')) {
        systemPrompt = `You are roleplaying as a client looking to resolve ongoing conflicts in your relationship.
        You are 43 years old and married for 15 years.
        You want to learn effective conflict resolution but have recurring unresolved issues.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Trust Rebuilding')) {
        systemPrompt = `You are roleplaying as a client working to rebuild trust in your relationship.
        You are 39 years old and in a committed relationship for 5 years.
        You want to rebuild trust and security but are healing from past betrayal.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else if (clientType.includes('Life Transition')) {
        systemPrompt = `You are roleplaying as a client navigating a major life transition with your partner.
        You are 34 years old and married for 3 years.
        You want to navigate the transition together but have different coping mechanisms for change.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      } else {
        systemPrompt = `You are roleplaying as a client in a relationship coaching session.
        The coach is helping you with interpersonal and romantic relationships.
        You are looking to improve your relationships and communication skills.
        Respond naturally as if you were a real client speaking to their coach.
        Keep responses concise (1-3 sentences) and conversational.`;
      }
    } else {
      // Default prompt if no specific client type is detected
      systemPrompt = `You are roleplaying as a client in a life coaching session. 
      The coach is helping you with career development and personal growth.
      You are feeling somewhat stuck in your current job and unsure about your career path.
      Respond naturally as if you were a real client speaking to their coach.
      Keep responses concise (1-3 sentences) and conversational.`;
    }
    
    console.log('Using system prompt for client type:', clientType);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Here is the transcript of our coaching conversation so far. 
          Please respond as the client to the coach's most recent message:
          
          Client Type: ${clientType}
          
          ${transcript}`
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    console.log('OpenAI API response received:', completion);
    
    const clientResponse = completion.choices[0]?.message?.content?.trim() || 
      "I'm not sure how to respond to that right now.";
    
    console.log('Extracted client response from OpenAI:', clientResponse);
    return clientResponse;
  } catch (error: any) {
    console.log("API KEY", apiKey)
    console.error('Error calling OpenAI API:', error);
    
    // More detailed error logging
    if (error.response) {
      console.error(`OpenAI API Error: Status ${error.response.status}`, error.response.data);
    } else if (error.message) {
      console.error('OpenAI API Error message:', error.message);
    }
    
    // Provide more specific error messages based on the error type
    if (!apiKey) {
      console.error('API key is missing');
      return "I can't respond right now. The system is missing API configuration. Please check that the OpenAI API key is properly set in the .env file.";
    } else if (error.response?.status === 401) {
      console.error('API key is invalid or expired');
      
      // Check if the error message mentions organization
      if (error.message?.toLowerCase().includes('organization') || 
          (error.response?.data && JSON.stringify(error.response.data).toLowerCase().includes('organization'))) {
        console.error('Organization ID may be required');
        return "I can't respond right now. The OpenAI API key may require an organization ID. Please check your API key configuration and add your organization ID in the .env file if needed.";
      }
      
      return "I can't respond right now. The OpenAI API key appears to be invalid or expired. Please check your API key configuration.";
    } else if (error.response?.status === 429) {
      console.error('Rate limit exceeded');
      return "I need a moment to collect my thoughts. The system is experiencing high demand.";
    } else if (error.message?.includes('network')) {
      console.error('Network error');
      return "I'm having trouble connecting. Could be a network issue.";
    } else if (error.message?.includes('timeout')) {
      console.error('Request timeout');
      return "I need more time to think. The connection timed out.";
    } else if (error.message?.includes('abort')) {
      console.error('Request aborted');
      return "Our conversation was interrupted. Let's try again.";
    } else if (error.response?.status === 500) {
      console.error('OpenAI server error');
      return "The AI service is experiencing technical difficulties. Let's try again in a moment.";
    } else if (error.response?.status === 503) {
      console.error('OpenAI service unavailable');
      return "The AI service is temporarily unavailable. Please try again later.";
    } else {
      // Generic fallback with more details
      console.error('Unhandled OpenAI error:', error.message || 'Unknown error');
      return "I'm sorry, I'm having trouble expressing my thoughts right now. The AI service is experiencing issues.";
    }
  }
};

/**
 * Generate performance metrics and feedback for a completed coaching session
 * @param transcript The full session transcript
 * @returns A promise that resolves to the performance metrics
 */
export const generatePerformanceMetrics = async (transcript: string) => {
  console.log('Generating performance metrics using OpenAI API');
  console.log('Transcript length for metrics:', transcript.length);
  console.log('Transcript preview for metrics:', transcript.substring(0, 100) + '...');
  
  try {
    console.log('Creating chat completion for metrics with model: gpt-3.5-turbo');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert coach evaluator. Analyze the coaching session transcript and provide performance metrics and feedback.
          Focus on active listening, question quality, response appropriateness, goal setting effectiveness, and client engagement.
          Score each area on a scale of 1-10 and provide specific feedback.`
        },
        {
          role: "user",
          content: `Here is the transcript of a coaching session. Please analyze it and provide performance metrics:
          
          ${transcript}
          
          Return your analysis in the following JSON format:
          {
            "activeListeningScore": number,
            "questionQualityScore": number,
            "responseAppropriatenessScore": number,
            "goalSettingEffectivenessScore": number,
            "clientEngagementScore": number,
            "overallScore": number,
            "feedback": {
              "strengths": [string, string, string],
              "areasForImprovement": [string, string],
              "actionableSteps": [string, string, string]
            },
            "summary": {
              "keyInsights": [string, string, string]
            }
          }`
        }
      ],
      temperature: 0.5,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    console.log('OpenAI API metrics response received');
    
    const metricsString = completion.choices[0]?.message?.content || "{}";
    console.log('Metrics string:', metricsString.substring(0, 100) + '...');
    
    const metrics = JSON.parse(metricsString);
    console.log('Parsed metrics object:', Object.keys(metrics).join(', '));
    
    // Ensure all required properties exist
    return {
      activeListeningScore: metrics.activeListeningScore || 7,
      questionQualityScore: metrics.questionQualityScore || 7,
      responseAppropriatenessScore: metrics.responseAppropriatenessScore || 7,
      goalSettingEffectivenessScore: metrics.goalSettingEffectivenessScore || 7,
      clientEngagementScore: metrics.clientEngagementScore || 7,
      overallScore: metrics.overallScore || 7,
      feedback: {
        strengths: metrics.feedback?.strengths || [
          "Demonstrated active listening skills",
          "Asked open-ended questions",
          "Created a supportive environment"
        ],
        areasForImprovement: metrics.feedback?.areasForImprovement || [
          "Could develop more specific action plans",
          "Opportunity to explore underlying beliefs more deeply"
        ],
        actionableSteps: metrics.feedback?.actionableSteps || [
          "Practice using the GROW model more explicitly",
          "Incorporate more powerful questions about values",
          "Develop a framework for actionable next steps"
        ]
      },
      summary: {
        strengths: metrics.feedback?.strengths || [
          "Demonstrated active listening skills",
          "Asked open-ended questions",
          "Created a supportive environment"
        ],
        areasForImprovement: metrics.feedback?.areasForImprovement || [
          "Could develop more specific action plans",
          "Opportunity to explore underlying beliefs more deeply"
        ],
        keyInsights: metrics.summary?.keyInsights || [
          "Client values continuous learning",
          "Client feels stuck in current role",
          "Client is uncertain about career direction"
        ],
        overallRating: metrics.overallScore || 7
      }
    };
  } catch (error: any) {
    console.error('Error calling OpenAI API for metrics:', error);
    
    // More detailed error logging
    if (error.response) {
      console.error(`OpenAI API Error: Status ${error.response.status}`, error.response.data);
    } else if (error.message) {
      console.error('OpenAI API Error message:', error.message);
    }
    
    // Provide more specific error messages based on the error type
    if (!apiKey) {
      console.error('API key is missing for metrics generation');
      // Update session with more informative error message
      return {
        activeListeningScore: 7,
        questionQualityScore: 7,
        responseAppropriatenessScore: 7,
        goalSettingEffectivenessScore: 7,
        clientEngagementScore: 7,
        overallScore: 7,
        feedback: {
          strengths: [
            "Session analysis unavailable - API configuration missing",
            "Please check that the OpenAI API key is properly set in the .env file",
            "Using fallback metrics instead"
          ],
          areasForImprovement: [
            "Fix API configuration to get personalized feedback",
            "Contact system administrator for assistance"
          ],
          actionableSteps: [
            "Verify OpenAI API key in environment variables",
            "Restart the application after fixing configuration",
            "Try ending the session again"
          ]
        }
      };
    } else if (error.response?.status === 401) {
      console.error('API key is invalid or expired for metrics generation');
      // Update session with more informative error message
      return {
        activeListeningScore: 7,
        questionQualityScore: 7,
        responseAppropriatenessScore: 7,
        goalSettingEffectivenessScore: 7,
        clientEngagementScore: 7,
        overallScore: 7,
        feedback: {
          strengths: [
            "Session analysis unavailable - API authentication failed",
            "The OpenAI API key appears to be invalid or expired",
            "Using fallback metrics instead"
          ],
          areasForImprovement: [
            "Update API key to get personalized feedback",
            "Contact system administrator for assistance"
          ],
          actionableSteps: [
            "Verify OpenAI API key validity",
            "Restart the application after fixing configuration",
            "Try ending the session again"
          ]
        }
      };
    } else if (error.response?.status === 429) {
      console.error('Rate limit exceeded for metrics generation');
      return {
        activeListeningScore: 7,
        questionQualityScore: 7,
        responseAppropriatenessScore: 7,
        goalSettingEffectivenessScore: 7,
        clientEngagementScore: 7,
        overallScore: 7,
        feedback: {
          strengths: [
            "Session analysis unavailable - API rate limit exceeded",
            "The system is experiencing high demand",
            "Using fallback metrics instead"
          ],
          areasForImprovement: [
            "Try again later when API usage is lower",
            "Consider upgrading API tier for higher rate limits"
          ],
          actionableSteps: [
            "Wait a few minutes before ending another session",
            "Contact system administrator if this persists",
            "Check API usage quotas"
          ]
        }
      };
    } else if (error.message?.includes('network')) {
      console.error('Network error during metrics generation');
      return {
        activeListeningScore: 7,
        questionQualityScore: 7,
        responseAppropriatenessScore: 7,
        goalSettingEffectivenessScore: 7,
        clientEngagementScore: 7,
        overallScore: 7,
        feedback: {
          strengths: [
            "Session analysis unavailable - Network connectivity issue",
            "Unable to reach OpenAI servers",
            "Using fallback metrics instead"
          ],
          areasForImprovement: [
            "Check your internet connection",
            "Try again when network is stable"
          ],
          actionableSteps: [
            "Verify network connectivity",
            "Try ending the session again when online",
            "Contact IT support if network issues persist"
          ]
        }
      };
    } else if (error.message?.includes('timeout')) {
      console.error('Request timeout during metrics generation');
      return {
        activeListeningScore: 7,
        questionQualityScore: 7,
        responseAppropriatenessScore: 7,
        goalSettingEffectivenessScore: 7,
        clientEngagementScore: 7,
        overallScore: 7,
        feedback: {
          strengths: [
            "Session analysis unavailable - Request timeout",
            "The API request took too long to complete",
            "Using fallback metrics instead"
          ],
          areasForImprovement: [
            "Try again with a shorter session transcript",
            "Check server load and try again later"
          ],
          actionableSteps: [
            "Try ending the session again",
            "If problem persists, contact system administrator",
            "Consider breaking longer sessions into smaller segments"
          ]
        }
      };
    } else if (error.message?.includes('abort')) {
      console.error('Request aborted during metrics generation');
      return {
        activeListeningScore: 7,
        questionQualityScore: 7,
        responseAppropriatenessScore: 7,
        goalSettingEffectivenessScore: 7,
        clientEngagementScore: 7,
        overallScore: 7,
        feedback: {
          strengths: [
            "Session analysis unavailable - Request was aborted",
            "The API request was interrupted",
            "Using fallback metrics instead"
          ],
          areasForImprovement: [
            "Try again without interrupting the process",
            "Ensure stable connection during analysis"
          ],
          actionableSteps: [
            "Try ending the session again",
            "Avoid navigating away during processing",
            "Contact support if this issue persists"
          ]
        }
      };
    } else if (error.response?.status === 500) {
      console.error('OpenAI server error during metrics generation');
      return {
        activeListeningScore: 7,
        questionQualityScore: 7,
        responseAppropriatenessScore: 7,
        goalSettingEffectivenessScore: 7,
        clientEngagementScore: 7,
        overallScore: 7,
        feedback: {
          strengths: [
            "Session analysis unavailable - OpenAI server error",
            "The AI service is experiencing technical difficulties",
            "Using fallback metrics instead"
          ],
          areasForImprovement: [
            "Try again later when the service is stable",
            "Check OpenAI status page for service updates"
          ],
          actionableSteps: [
            "Wait a few minutes and try again",
            "Check OpenAI system status",
            "Contact support if this issue persists"
          ]
        }
      };
    } else if (error.response?.status === 503) {
      console.error('OpenAI service unavailable during metrics generation');
      return {
        activeListeningScore: 7,
        questionQualityScore: 7,
        responseAppropriatenessScore: 7,
        goalSettingEffectivenessScore: 7,
        clientEngagementScore: 7,
        overallScore: 7,
        feedback: {
          strengths: [
            "Session analysis unavailable - OpenAI service unavailable",
            "The AI service is temporarily down for maintenance",
            "Using fallback metrics instead"
          ],
          areasForImprovement: [
            "Try again later when the service is back online",
            "Check OpenAI status page for maintenance updates"
          ],
          actionableSteps: [
            "Wait until the service is back online",
            "Check OpenAI system status",
            "Contact support if this issue persists"
          ]
        }
      };
    } else {
      console.error('Unhandled OpenAI error during metrics generation:', error.message || 'Unknown error');
      return {
        activeListeningScore: 7,
        questionQualityScore: 7,
        responseAppropriatenessScore: 7,
        goalSettingEffectivenessScore: 7,
        clientEngagementScore: 7,
        overallScore: 7,
        feedback: {
          strengths: [
            "Session analysis unavailable - Unexpected error",
            "An unknown issue occurred with the AI service",
            "Using fallback metrics instead"
          ],
          areasForImprovement: [
            "Try again later",
            "Check application logs for more details"
          ],
          actionableSteps: [
            "Try ending the session again",
            "Contact system administrator with error details",
            "Check console logs for specific error information"
          ]
        }
      };
    }
    
    // Return fallback metrics if API call fails
    return {
      activeListeningScore: 7,
      questionQualityScore: 7,
      responseAppropriatenessScore: 7,
      goalSettingEffectivenessScore: 7,
      clientEngagementScore: 7,
      overallScore: 7,
      feedback: {
        strengths: [
          "Demonstrated active listening skills",
          "Asked open-ended questions",
          "Created a supportive environment"
        ],
        areasForImprovement: [
          "Could develop more specific action plans",
          "Opportunity to explore underlying beliefs more deeply"
        ],
        actionableSteps: [
          "Practice using the GROW model more explicitly",
          "Incorporate more powerful questions about values",
          "Develop a framework for actionable next steps"
        ]
      },
      summary: {
        strengths: [
          "Demonstrated active listening skills",
          "Asked open-ended questions",
          "Created a supportive environment"
        ],
        areasForImprovement: [
          "Could develop more specific action plans",
          "Opportunity to explore underlying beliefs more deeply"
        ],
        keyInsights: [
          "Client values continuous learning",
          "Client feels stuck in current role",
          "Client is uncertain about career direction"
        ],
        overallRating: 7
      }
    };
  }
};

# Life Coach App - OpenAI Integration

This application integrates with OpenAI to provide realistic client responses in coaching sessions and generate performance metrics for coaches.

## Setup Instructions

1. **Install dependencies**

   Make sure you have all the required dependencies installed:

   ```bash
   npm install
   ```

2. **Set up your OpenAI API key**

   The application uses an OpenAI API key to generate client responses and performance metrics. You need to add your API key to the `.env` file:

   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

   Replace `your_openai_api_key_here` with your actual OpenAI API key.

3. **Start the development server**

   ```bash
   npm run dev
   ```

## Features

### AI-Powered Client Responses

The application uses OpenAI to generate realistic client responses during coaching sessions. The client persona is defined as someone who:

- Has been in the same job for 5 years
- Doesn't feel like they're growing anymore
- Is unsure whether to look for a new job or find growth in their current company
- Is afraid of making the wrong decision
- Values continuous learning and making an impact
- Hasn't thought much about specific skills they want to develop

### Performance Metrics Generation

At the end of each coaching session, OpenAI analyzes the conversation transcript and generates performance metrics for the coach, including:

- Active Listening Score
- Question Quality Score
- Response Appropriateness Score
- Goal Setting Effectiveness Score
- Client Engagement Score
- Overall Score

It also provides:
- Specific strengths with examples
- Areas for improvement with examples
- Actionable steps the coach can take to improve
- Key insights about the client's situation

## Technical Implementation

The OpenAI integration is implemented in the `services/openai.ts` file, which provides two main functions:

1. `generateClientResponse`: Generates a client response based on the coaching conversation history
2. `generatePerformanceMetrics`: Generates performance metrics and feedback for a completed coaching session

These functions are used in the `CoachingSession.tsx` component to create an interactive coaching experience.

## Error Handling

The application includes error handling for cases where the OpenAI API might fail:

- If client response generation fails, a fallback message is displayed
- If performance metrics generation fails, default metrics are used

## Security Considerations

- The OpenAI API key is stored in an environment variable to keep it secure
- The application uses the `dangerouslyAllowBrowser: true` option for client-side usage, which is acceptable for development but should be reconsidered for production use

## Future Improvements

- Move OpenAI API calls to a server-side implementation for better security
- Add more client personas for different coaching scenarios
- Implement voice synthesis for client responses using ElevenLabs or similar services
- Add more detailed analytics based on coaching conversations

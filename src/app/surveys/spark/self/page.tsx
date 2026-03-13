'use client';

import { SparkAssessmentForm } from '@/components/surveys/SparkAssessmentForm';

// In a real app, you would fetch the user from your auth system
const surveyTaker = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
};

// For a self-assessment, the taker and subject are the same
const surveySubject = surveyTaker;

export default function SparkSelfAssessmentPage() {
  return (
    <SparkAssessmentForm
      taker={surveyTaker}
      subject={surveySubject}
      isSelfAssessment={true}
    />
  );
}

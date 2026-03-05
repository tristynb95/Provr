'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { performanceSurveyData } from '@/lib/survey-data';
import { SurveyForm } from '@/components/surveys/SurveyForm';
import { SurveyHeader } from '@/components/surveys/SurveyHeader';
import { Navbar } from '@/components/layout/Navbar';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function SelfAssessmentPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('provr_user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  const handleSubmit = (answers: any) => {
    if (!user) return;

    // Add to feedbackResponses collection
    addDocumentNonBlocking(collection(db, "feedbackResponses"), {
      ...answers,
      surveyId: "general_performance",
      type: "self_assessment",
      responderId: user.id,
      recipientId: user.id,
      isSelfAssessment: true,
      status: "COMPLETED",
      submittedAt: new Date().toISOString()
    });
    
    // Redirect back to overview after a short delay
    setTimeout(() => {
      router.push('/');
    }, 2500);
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading assessment...</div>;

  const surveyTaker = {
    name: user.name,
    email: user.email,
  };

  const surveySubject = {
    name: user.name,
    email: user.email,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:px-6">
        <SurveyHeader 
          title="Self Assessment: General Performance" 
          subject={surveySubject} 
        />
        <SurveyForm
          surveyData={performanceSurveyData}
          taker={surveyTaker}
          subject={surveySubject}
          onSubmit={handleSubmit}
          isSelfAssessment={true}
        />
      </main>
    </div>
  );
}

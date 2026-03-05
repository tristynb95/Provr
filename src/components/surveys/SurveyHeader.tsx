import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ClipboardCheck } from "lucide-react";

interface SurveyHeaderProps {
  title: string;
  subject: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

export function SurveyHeader({ title, subject }: SurveyHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl">
          <ClipboardCheck className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground italic">"Quality is not an act, it is a habit."</p>
        </div>
      </div>

      <Card className="border-none shadow-md bg-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={subject.avatarUrl || `https://picsum.photos/seed/${subject.name}/100/100`} />
              <AvatarFallback>{subject.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Feedback For</p>
              <h2 className="text-xl font-headline font-bold">{subject.name}</h2>
              <p className="text-sm text-muted-foreground">{subject.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

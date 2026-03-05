
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

const data = [
  { subject: 'Customer Service', self: 4, received: 5 },
  { subject: 'Teamwork', self: 3, received: 4 },
  { subject: 'Efficiency', self: 5, received: 3 },
  { subject: 'Attention to Detail', self: 2, received: 4 },
  { subject: 'Product Knowledge', self: 4, received: 5 },
  { subject: 'Leadership', self: 3, received: 2 },
];

export function FeedbackComparison() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-none shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline">Competency Radar</CardTitle>
          <CardDescription>Visual overlap between your self-view and peer-view</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#e5e5e5" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#666' }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar
                name="Self"
                dataKey="self"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
              <Radar
                name="Peers"
                dataKey="received"
                stroke="hsl(var(--foreground))"
                fill="hsl(var(--foreground))"
                fillOpacity={0.1}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline">Score Comparison</CardTitle>
          <CardDescription>Direct breakdown of ratings per competency</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 5]} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Bar dataKey="self" name="Self Assessment" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="received" name="Peer Feedback" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

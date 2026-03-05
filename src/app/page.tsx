import { Navbar } from "@/components/layout/Navbar";
import { PendingRequests } from "@/components/home/PendingRequests";
import { RequestFeedback } from "@/components/home/RequestFeedback";
import { ShowerThoughtQuick } from "@/components/home/ShowerThoughtQuick";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Award, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <header className="mb-10 text-center md:text-left">
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-2">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Here's a summary of what's happening at Provr. today.</p>
        </header>

        {/* Hero Quick Actions */}
        <section className="grid gap-6 md:grid-cols-2 mb-12">
          <Link href="/surveys" className="group">
            <Card className="h-full border-none bg-foreground text-background overflow-hidden relative shadow-lg hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <ClipboardCheck className="h-24 w-24" />
              </div>
              <CardContent className="p-6">
                <ClipboardCheck className="h-8 w-8 mb-4 text-primary" />
                <h3 className="font-headline text-xl font-bold mb-1 text-white">SPARK Survey</h3>
                <p className="text-muted-foreground text-sm mb-4">Complete your behaviors and attitudes assessment.</p>
                <Button variant="outline" size="sm" className="w-full border-muted text-white hover:bg-white hover:text-black">Open Surveys</Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="h-full border-none bg-white overflow-hidden relative shadow-lg hover:-translate-y-1 transition-transform">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award className="h-24 w-24" />
              </div>
            <CardContent className="p-6">
              <Award className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-headline text-xl font-bold mb-1">Self Assessment</h3>
              <p className="text-muted-foreground text-sm mb-4">Analyze your own competency across all parts of the bakery.</p>
              <Link href="/surveys/self">
                <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary/5">Start Self-Assessment</Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Action Center */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <PendingRequests />
          </div>
          <div className="lg:col-span-1">
            <RequestFeedback />
          </div>
          <div className="lg:col-span-1">
            <ShowerThoughtQuick />
          </div>
        </div>
      </main>
    </div>
  );
}

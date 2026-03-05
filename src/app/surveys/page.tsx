import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Sparkles, UserCheck, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";


const surveyTypes = [
  {
    title: "SPARK Competency",
    description: "Internal behaviours and attitudes assessment based on Provr. standards.",
    icon: Sparkles,
    color: "bg-primary/10 text-primary",
    href: "/surveys/spark"
  },
  {
    title: "General Performance",
    description: "In-depth analysis of technical skills and competency in all bakery areas.",
    icon: ClipboardCheck,
    color: "bg-blue-100 text-blue-700",
    href: "/surveys/general"
  },
  {
    title: "Pulse Check",
    description: "A quick weekly check-in on how you are feeling and your workload.",
    icon: Heart,
    color: "bg-red-50 text-primary",
    href: "/pulse"
  },
  {
    title: "Self Assessment",
    description: "A version of any survey tailored for you to review your own progress.",
    icon: UserCheck,
    color: "bg-green-100 text-green-700",
    href: "/surveys/self"
  },
  {
    title: "Peer Reviews",
    description: "Submit feedback for your fellow team members at the bakery.",
    icon: ShieldCheck,
    color: "bg-orange-100 text-orange-700",
    href: "/surveys/peer"
  }
];

export default function SurveysPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:px-6">
        <header className="mb-12 max-w-2xl">
          <h1 className="font-headline text-4xl font-bold tracking-tight mb-4">Feedback Surveys</h1>
          <p className="text-muted-foreground text-lg italic">
            "We believe the secret to better baking is better listening." 
            Select a survey to begin sharing or reviewing competency.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {surveyTypes.map((survey) => (
            <Card key={survey.title} className="group border-none shadow-md overflow-hidden bg-white hover:shadow-xl transition-all">
              <CardContent className="p-0 flex h-full">
                <div className={cn("w-20 sm:w-32 flex items-center justify-center shrink-0 transition-colors", survey.color)}>
                  <survey.icon className="h-10 w-10 sm:h-12 sm:w-12" />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline text-xl font-bold mb-2">{survey.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{survey.description}</p>
                  </div>
                  <Link href={survey.href}>
                    <Button className="w-full sm:w-auto">Start Survey</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-20">
          <Card className="border-dashed border-2 bg-transparent">
            <CardContent className="p-8 text-center">
              <h3 className="font-headline text-xl font-bold mb-2">Can't find what you're looking for?</h3>
              <p className="text-muted-foreground mb-6">If your manager requested a specific survey that isn't here, please check your overview dashboard.</p>
              <Link href="/">
                <Button variant="outline">Back to Overview</Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}


"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const pending = [
  { id: 1, name: "Sarah Miller", role: "Head Baker", time: "2 days ago", type: "SPARK Competency" },
  { id: 2, name: "Jack Thompson", role: "Store Manager", time: "5 hours ago", type: "General Feedback" },
];

export function PendingRequests() {
  return (
    <Card className="h-full border-none shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline text-lg">Pending Requests</CardTitle>
            <CardDescription>Actions waiting for your input</CardDescription>
          </div>
          <Clock className="h-5 w-5 text-primary opacity-50" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {pending.map((req) => (
          <div key={req.id} className="group flex items-center gap-4 p-3 rounded-lg bg-background hover:bg-muted/50 transition-all border border-transparent hover:border-primary/10">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={`https://picsum.photos/seed/${req.id}/100/100`} />
              <AvatarFallback>{req.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{req.name}</p>
              <p className="text-xs text-muted-foreground truncate">{req.type}</p>
            </div>
            <Link href={`/surveys/complete/${req.id}`}>
              <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ))}
        {pending.length === 0 && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            All caught up! No pending requests.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

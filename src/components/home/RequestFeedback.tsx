"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function RequestFeedback() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Request sent",
        description: "Your feedback request has been successfully dispatched.",
      });
    }, 1000);
  };

  return (
    <Card className="h-full border-none shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline text-lg">Request Feedback</CardTitle>
            <CardDescription>Get insights from your peers</CardDescription>
          </div>
          <Users className="h-5 w-5 text-primary opacity-50" />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Enter staff name..." className="bg-background/50" />
          <Select>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Select survey type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Feedback</SelectItem>
              <SelectItem value="spark">SPARK Competency</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full" disabled={loading}>
            <Send className="mr-2 h-4 w-4" />
            {loading ? "Sending..." : "Send Request"}
          </Button>
          <Button variant="outline" className="w-full" type="button">
            Request Anonymous Team Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addShowerThought } from "@/lib/firestore";

export function ShowerThoughtQuick() {
  const { toast } = useToast();
  const [thought, setThought] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!thought.trim()) return;
    setSubmitting(true);

    try {
      const storedUser = localStorage.getItem('provr_user');
      const user = storedUser ? JSON.parse(storedUser) : null;

      await addShowerThought({
        text: thought.trim(),
        anonymous,
        authorUsername: anonymous ? "anonymous" : (user?.username ?? "unknown"),
        authorName: anonymous ? "Anonymous" : (user?.name ?? "Unknown"),
        siteId: user?.siteId ?? "unassigned",
      });

      toast({
        title: "Thought shared",
        description: "Your manager will see this shortly.",
      });
      setThought("");
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Failed to post",
        description: "Could not save your thought. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="h-full border-none shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline text-lg">Shower Thoughts</CardTitle>
            <CardDescription>Post anything for your manager to read</CardDescription>
          </div>
          <Lightbulb className="h-5 w-5 text-primary opacity-50" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="I was thinking about how we could improve the morning prep..."
          className="min-h-[100px] bg-background/50 resize-none"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="anon-mode" checked={anonymous} onCheckedChange={setAnonymous} />
            <Label htmlFor="anon-mode" className="text-xs text-muted-foreground">Post anonymously</Label>
          </div>
          <Button size="sm" onClick={handleSubmit} disabled={!thought.trim() || submitting}>
            {submitting ? "Posting..." : "Post Thought"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

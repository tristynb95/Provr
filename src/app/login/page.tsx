'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageSquareText, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getUserByUsername, seedInitialData } from '@/lib/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure initial data is seeded on first run
      await seedInitialData();

      const user = await getUserByUsername(username.toLowerCase().trim());

      if (!user || user.pin !== pin) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid username or PIN. Please try again.",
        });
        setLoading(false);
        return;
      }

      if (user.status === "Inactive") {
        toast({
          variant: "destructive",
          title: "Account inactive",
          description: "Your account has been deactivated. Please contact your manager.",
        });
        setLoading(false);
        return;
      }

      localStorage.setItem('provr_user', JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        siteId: user.siteId,
        email: user.email,
      }));

      toast({
        title: `Welcome back, ${user.name.split(' ')[0]}!`,
        description: `Signed in as ${user.role}.`,
      });
      router.push('/');
      setLoading(false);
    } catch (err: any) {
      if (err.code === 'permission-denied') {
         // This is handled by the emitters in firestore.ts, but we catch it here to prevent standard console error
      } else {
        toast({
          variant: "destructive",
          title: "Connection error",
          description: "Could not reach the server. Please try again.",
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
              <MessageSquareText className="h-7 w-7 fill-current" />
            </div>
          </div>
          <CardTitle className="font-headline text-3xl font-bold tracking-tight text-foreground">Provr.</CardTitle>
          <CardDescription>Enter your username and 6-digit PIN</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="e.g. tristenb"
                  className="pl-10 h-12"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pin">6-Digit PIN</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pin"
                  type="password"
                  placeholder="••••••"
                  maxLength={6}
                  className="pl-10 h-12 tracking-[0.5em] font-mono"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full font-bold h-12 text-lg" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

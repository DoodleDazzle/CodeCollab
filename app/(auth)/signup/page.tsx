"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Brain } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      });

      if (error) throw error;
      router.push("/signin?message=Check your email to confirm your account");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 p-4">
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center space-x-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-bold">CodeCollab AI</span>
        </Link>
        <h2 className="text-3xl font-bold">Create an account</h2>
        <p className="text-muted-foreground">Start coding together with AI assistance</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
        <div className="space-y-4">
          <Input id="email" name="email" type="email" placeholder="Email address" required disabled={isLoading} />
          <Input id="password" name="password" type="password" placeholder="Password" required disabled={isLoading} minLength={6} />
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>{isLoading ? "Creating account..." : "Sign up"}</Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
        </div>

        <Button variant="outline" className="w-full" type="button" disabled={isLoading} onClick={() => handleOAuthSignIn("github")}>
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Button>

        <Button variant="outline" className="w-full" type="button" disabled={isLoading} onClick={() => handleOAuthSignIn("google")}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Logo" className="mr-2 h-4 w-4" />
          Google
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/signin" className="text-primary hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

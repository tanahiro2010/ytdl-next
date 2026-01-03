"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [state, setState] = useState<string>("hidden");
  const [url, setUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const instance = toast.loading("Processing...");
    const formData = new FormData(e.target as HTMLFormElement);
    const url = formData.get("url") as string;
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    });
    if (!response.ok) {
      toast.error("Failed to process the URL", { id: instance });
      return;
    }
    
    const data = await response.json();
    console.log(data);

    toast.success("URL processed successfully", { id: instance });
    setState("visible");
    setUrl(data.data.download_url);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Welcome to YouTube Downloader</h1>
      <p className="text-base md:text-lg mb-4 text-center max-w-2xl">
        Use our free online tool to download YouTube videos easily and quickly.
      </p>
      <Card className="w-full max-w-xl md:max-w-md p-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input className="w-full" type="text" name="url" placeholder="Enter YouTube video URL" />
          <a href={url} className={`${state} block`} target="_blank" rel="noopener noreferrer">
            <Button type="button" className="mt-2 w-full">Open</Button>
          </a>
          <Button type="submit" className="mt-2 w-full">Execute</Button>
        </form>
      </Card>
    </main>
  )
}

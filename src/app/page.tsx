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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to YouTube Downloader</h1>
      <p className="text-lg mb-4">
        Use our free online tool to download YouTube videos easily and quickly.
      </p>
      <Card className="w-full max-w-md p-4">
        <form onSubmit={handleSubmit}>
          <Input type="text" name="url" placeholder="Enter YouTube video URL" />
          <a href={url} className={`${state}`} target="_blank" rel="noopener noreferrer">
            <Button type="button" className="mt-2 w-full">Open</Button>
          </a>
          <Button className="mt-2 w-full" >Action</Button>
        </form>
      </Card>
    </main>
  )
}

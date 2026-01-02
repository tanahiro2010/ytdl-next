import { NextRequest, NextResponse } from "next/server";

const POST = (async (req: NextRequest) => {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
        return NextResponse.json(
            { error: "Invalid URL" },
            { status: 400 }
        );
    }

    // validation for YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeRegex.test(url)) {
        return NextResponse.json(
            { error: "Invalid YouTube URL" },
            { status: 400 }
        );
    }

    // Here you would typically process the URL, e.g., fetch video info or download link
    // For demonstration, we'll just return a success message

    const response = await fetch("https://oo6o8y6la6.execute-api.eu-central-1.amazonaws.com/default/Upload-DownloadYoutubeLandingPage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({
            url,
            app: "transkriptor",
            is_only_download: true
        })
    });
    if (!response.ok) {
        return NextResponse.json(
            { error: "Failed to process the URL" },
            { status: 500 }
        );
    }
    const data = await response.json();
    return NextResponse.json({ message: "URL processed successfully", data });
});

export { POST };
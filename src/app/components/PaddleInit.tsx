"use client";

import { useEffect } from "react";

export default function PaddleInit() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Paddle) {
      (window as any).Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
      });
    }
  }, []);

  return null;
}

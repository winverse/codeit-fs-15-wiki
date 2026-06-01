"use client";

import { useEffect } from "react";
import AppError from "@/components/AppError";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <AppError message={error?.message} onRetry={reset} />;
}

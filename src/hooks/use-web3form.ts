"use client";

import { useCallback, useState } from "react";
import { submitWeb3Form, type Web3FormPayload } from "@/lib/web3forms";

type FormStatus = "idle" | "loading" | "success" | "error";

export function useWeb3Form(formType: string) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const reset = useCallback(() => {
    setStatus("idle");
    setError("");
  }, []);

  const submit = useCallback(
    async (
      payload: Omit<Web3FormPayload, "form_type">,
      onSuccess?: () => void | Promise<void>,
    ) => {
      setStatus("loading");
      setError("");

      const result = await submitWeb3Form({ ...payload, form_type: formType });

      if (result.success) {
        setStatus("success");
        await onSuccess?.();
        return true;
      }

      setStatus("error");
      setError(result.message);
      return false;
    },
    [formType],
  );

  return {
    status,
    error,
    isLoading: status === "loading",
    isSuccess: status === "success",
    submit,
    reset,
  };
}

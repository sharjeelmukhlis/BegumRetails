const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type Web3FormPayload = Record<string, string | number | boolean | undefined> & {
  subject?: string;
  form_type: string;
};

export interface Web3FormResult {
  success: boolean;
  message: string;
}

export function getWeb3FormsAccessKey(): string | undefined {
  return process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
}

/** Submit any site form to Web3Forms (emails the owner). */
export async function submitWeb3Form(payload: Web3FormPayload): Promise<Web3FormResult> {
  const accessKey = getWeb3FormsAccessKey();
  if (!accessKey) {
    return {
      success: false,
      message: "Form is not configured. Please contact us on WhatsApp.",
    };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: "Begum Website",
        ...payload,
      }),
    });

    const data = (await res.json()) as { success?: boolean; message?: string };
    return {
      success: Boolean(data.success),
      message: data.message ?? (data.success ? "Thank you — we received your message." : "Something went wrong."),
    };
  } catch {
    return {
      success: false,
      message: "Network error. Please try again or message us on WhatsApp.",
    };
  }
}

/** Build a plain-text block from form fields for the email body. */
export function formatFormBody(fields: Record<string, string | undefined>): string {
  return Object.entries(fields)
    .filter(([, v]) => v?.trim())
    .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`)
    .join("\n");
}

type FieldValue = FormDataEntryValue | null;

function formValueToString(value: FieldValue): string {
  if (typeof value === "string") {
    return value;
  }

  return "";
}

export function formDataToObject(formData: FormData): Record<string, string> {
  const entries = Array.from(formData.entries()).map(([key, value]) => [
    key,
    formValueToString(value),
  ]);

  return Object.fromEntries(entries);
}

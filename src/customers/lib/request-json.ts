export async function readJsonRecord(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return typeof body === 'object' && body !== null && !Array.isArray(body)
      ? body as Record<string, unknown>
      : {};
  } catch {
    return {};
  }
}

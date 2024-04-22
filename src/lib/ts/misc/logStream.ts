export async function createLogStream(
    func: (log: (newLogLine: string) => void) => void
): Promise<Response> {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    func((newLogLine: string) => {
        writer.write(new TextEncoder().encode(newLogLine + "\n"));
    });

    return new Response(readable, {
        headers: {
            "Content-Type": "text/event-stream",
            Connection: "keep-alive",
            "Cache-Control": "no-cache"
        }
    });
}

export async function readLogStream(res: Response, onNewValue: (value: string) => void) {
    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        onNewValue(value);
    }
}

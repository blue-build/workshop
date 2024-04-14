export async function createLogStream(
    func: (logStream: ReadableStreamDefaultController<string>) => void
): Promise<Response> {
    const logStream = new ReadableStream({
        async start(logStream) {
            await func(logStream);
        }
    });

    return new Response(logStream, {
        headers: {
            "Content-Type": "text/event-stream"
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

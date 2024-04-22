export async function createLogStream(
    func: (log: (newLogLine: string) => void) => void
): Promise<Response> {
    const logStream = new ReadableStream({
        async start(logStream) {
            await func((newLogLine: string) => {
                logStream.enqueue(newLogLine + "\n");
            });
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
    console.log(reader);
    // eslint-disable-next-line no-constant-condition
    while (true) {
        console.log("reading...");
        const { value, done } = await reader.read();
        console.log("received: ", value);
        if (done) break;
        onNewValue(value);
    }
    console.log("DONE!");
}

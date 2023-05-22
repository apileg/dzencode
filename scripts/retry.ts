export interface RetryOptions {
    fn: () => Promise<boolean>
    timeoutMs: number
    retryIntervalMs: number
    timeoutMessage: (timeoutMs: number) => string
}

export async function retry({
    fn,
    timeoutMs,
    retryIntervalMs,
    timeoutMessage,
}: RetryOptions) {
    let elapsedMs = 0

    while (true) {
        const ok = await fn()

        if (ok) {
            return
        }

        if (elapsedMs >= timeoutMs) {
            throw new Error(timeoutMessage(timeoutMs))
        }

        await delay(retryIntervalMs)
        elapsedMs += retryIntervalMs
    }
}

function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve, _reject) => {
        setTimeout(resolve, ms)
    })
}

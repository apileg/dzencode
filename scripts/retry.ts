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
    let elapsedMs = retryIntervalMs

    while (true) {
        await delay(retryIntervalMs)
        elapsedMs += retryIntervalMs

        const ok = await fn()

        if (ok) {
            return
        }

        if (elapsedMs >= timeoutMs) {
            throw new Error(timeoutMessage(timeoutMs))
        }
    }
}

function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve, _reject) => {
        setTimeout(resolve, ms)
    })
}

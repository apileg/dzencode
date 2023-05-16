import { useState, useEffect, ReactNode } from "react"

/**
 * Example usage:
 * ```
 * <ClientSide>
 *   <DateAndTime>
 * </ClientSide>
 * ```
 */
const ClientSide = ({ children }: { children: ReactNode }) => {
    // Used to render this component on client only. See the first bullet point
    // of https://github.com/facebook/react/issues/25627#issuecomment-1444073227
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isMounted) {
        return null
    }

    return <>{children}</>
}

export default ClientSide

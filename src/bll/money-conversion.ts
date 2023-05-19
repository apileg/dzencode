// We store prices as integer cents in DB to avoid floating-point rounding errors

export function floatToCents(n: number): number {
    return Math.round(n / 100)
}

export function centsToFloat(cents: number): number {
    return Math.round(cents * 100)
}

// We store prices as integer cents in DB to avoid floating-point rounding errors

export function centsToFloat(cents: number): number {
    return Math.round(cents / 100)
}

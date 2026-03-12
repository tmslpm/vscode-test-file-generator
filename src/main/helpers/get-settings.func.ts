/**
 * Returns the given value if it is a non-empty string (after trimming),
 * otherwise falls back to the result of the provided factory function.
 *
 * @param value - The value to validate.
 * @param fallback - A factory function called only when the value is invalid.
 * @returns The validated value or the fallback.
 */
export function getStrOrDefault(
  value: unknown,
  fallback: () => string,
): string {
  // eslint-disable-next-line eqeqeq
  if (value == null || typeof value !== "string" || value.trim().length === 0) {
    return fallback();
  }
  
  return value;
}

/**
 * Job scheduling is defined in the business timezone, while instants are stored in UTC.
 * These helpers are the single conversion boundary for clients and the backend: a date-only
 * field is a Zagreb calendar date, and a time-of-day is a Zagreb wall-clock value.
 */
export declare const JOB_TIME_ZONE = "Europe/Zagreb";
/** UTC instant for a Zagreb calendar date at midnight. */
export declare function jobDateOnly(value: string | Date): Date;
/**
 * Converts a Zagreb wall-clock date and time to a UTC instant.
 *
 * Nonexistent times (the spring-forward gap) are rejected. Repeated times (the autumn
 * overlap) resolve to the earlier instant, matching the usual "compatible" policy.
 */
export declare function zonedJobDateTime(date: string, time: string): Date;
/** Zagreb hour (0-23) of a stored instant. */
export declare function jobHour(value: string | Date): number;
/** Zagreb `HH:mm` of a stored instant. */
export declare function formatJobTime(value: string | Date): string;
/** Zagreb calendar date key (`YYYY-MM-DD`) of a stored date-only value or instant. */
export declare function jobDateKey(value: string | Date): string;
/** Croatian display date for a stored date-only value (UTC midnight) or instant. */
export declare function formatJobDate(value: string | Date): string;
//# sourceMappingURL=time.d.ts.map
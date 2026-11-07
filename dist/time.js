"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JOB_TIME_ZONE = void 0;
exports.jobDateOnly = jobDateOnly;
exports.zonedJobDateTime = zonedJobDateTime;
exports.jobHour = jobHour;
exports.formatJobTime = formatJobTime;
exports.jobDateKey = jobDateKey;
exports.formatJobDate = formatJobDate;
/**
 * Job scheduling is defined in the business timezone, while instants are stored in UTC.
 * These helpers are the single conversion boundary for clients and the backend: a date-only
 * field is a Zagreb calendar date, and a time-of-day is a Zagreb wall-clock value.
 */
exports.JOB_TIME_ZONE = 'Europe/Zagreb';
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_ONLY = /^([01]\d|2[0-3]):([0-5]\d)$/;
const HOUR_MS = 60 * 60 * 1000;
const zonedFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    month: '2-digit',
    second: '2-digit',
    timeZone: exports.JOB_TIME_ZONE,
    year: 'numeric',
});
const displayDateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    timeZone: exports.JOB_TIME_ZONE,
    year: 'numeric',
});
function readParts(value) {
    const parts = zonedFormatter.formatToParts(value);
    const read = (type) => {
        const part = parts.find((candidate) => candidate.type === type);
        return part ? Number(part.value) : Number.NaN;
    };
    return {
        day: read('day'),
        hour: read('hour'),
        minute: read('minute'),
        month: read('month'),
        second: read('second'),
        year: read('year'),
    };
}
function partsAsUtcMs(parts) {
    return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
}
function offsetAt(value) {
    return partsAsUtcMs(readParts(value)) - value.getTime();
}
function isValidCalendarDate(year, month, day) {
    const probe = new Date(Date.UTC(year, month - 1, day));
    return probe.getUTCFullYear() === year && probe.getUTCMonth() === month - 1 && probe.getUTCDate() === day;
}
/** UTC instant for a Zagreb calendar date at midnight. */
function jobDateOnly(value) {
    if (typeof value === 'string') {
        const text = value.trim();
        const match = DATE_ONLY.exec(text);
        if (match) {
            const [, rawYear, rawMonth, rawDay] = match;
            const year = Number(rawYear);
            const month = Number(rawMonth);
            const day = Number(rawDay);
            if (!isValidCalendarDate(year, month, day)) {
                throw new RangeError('Datum nije ispravan.');
            }
            return new Date(Date.UTC(year, month - 1, day));
        }
        // Full instants are accepted for compatibility; the Zagreb calendar day wins.
        const instant = new Date(text);
        if (Number.isNaN(instant.getTime())) {
            throw new RangeError('Datum nije ispravnog formata.');
        }
        const parts = readParts(instant);
        return new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
    }
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
        throw new RangeError('Datum nije ispravan.');
    }
    const parts = readParts(value);
    return new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
}
/**
 * Converts a Zagreb wall-clock date and time to a UTC instant.
 *
 * Nonexistent times (the spring-forward gap) are rejected. Repeated times (the autumn
 * overlap) resolve to the earlier instant, matching the usual "compatible" policy.
 */
function zonedJobDateTime(date, time) {
    const dateMatch = DATE_ONLY.exec(date.trim());
    const timeMatch = TIME_ONLY.exec(time.trim());
    if (!dateMatch) {
        throw new RangeError('Datum nije ispravnog formata.');
    }
    if (!timeMatch) {
        throw new RangeError('Vrijeme nije ispravnog formata.');
    }
    const [, rawYear, rawMonth, rawDay] = dateMatch;
    const [, rawHour, rawMinute] = timeMatch;
    const year = Number(rawYear);
    const month = Number(rawMonth);
    const day = Number(rawDay);
    const hour = Number(rawHour);
    const minute = Number(rawMinute);
    if (!isValidCalendarDate(year, month, day)) {
        throw new RangeError('Datum nije ispravan.');
    }
    const wallClockMs = Date.UTC(year, month - 1, day, hour, minute);
    // Probe around the candidate to discover both offsets across a DST transition.
    const offsets = new Set();
    for (const probe of [wallClockMs - 24 * HOUR_MS, wallClockMs, wallClockMs + 24 * HOUR_MS]) {
        offsets.add(offsetAt(new Date(probe)));
    }
    const candidates = [...offsets]
        .map((offset) => new Date(wallClockMs - offset))
        .filter((candidate) => {
        const parts = readParts(candidate);
        return partsAsUtcMs(parts) === wallClockMs;
    });
    if (candidates.length === 0) {
        throw new RangeError('Odabrano vrijeme ne postoji zbog pomaka sata.');
    }
    return new Date(Math.min(...candidates.map((candidate) => candidate.getTime())));
}
/** Zagreb hour (0-23) of a stored instant. */
function jobHour(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        throw new RangeError('Datum nije ispravan.');
    }
    return readParts(date).hour;
}
/** Zagreb `HH:mm` of a stored instant. */
function formatJobTime(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        throw new RangeError('Datum nije ispravan.');
    }
    const parts = readParts(date);
    return `${String(parts.hour).padStart(2, '0')}:${String(parts.minute).padStart(2, '0')}`;
}
/** Zagreb calendar date key (`YYYY-MM-DD`) of a stored date-only value or instant. */
function jobDateKey(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        throw new RangeError('Datum nije ispravan.');
    }
    const parts = readParts(date);
    return `${parts.year}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}`;
}
/** Croatian display date for a stored date-only value (UTC midnight) or instant. */
function formatJobDate(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        throw new RangeError('Datum nije ispravan.');
    }
    const parts = displayDateFormatter.formatToParts(date);
    const read = (type) => parts.find((part) => part.type === type)?.value ?? '';
    return `${read('day')}.${read('month')}.${read('year')}.`;
}
//# sourceMappingURL=time.js.map
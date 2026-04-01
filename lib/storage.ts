"use client";

export const storage = {
    get: (key: string, defaultValue: any = []) => {
        if (typeof window === 'undefined') return defaultValue;
        if (typeof window === 'undefined') return defaultValue;
        const stored = localStorage.getItem(`jailwatch_clean_${key}`);
        if (!stored) return defaultValue;
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error(`Error parsing localStorage key: jailwatch_clean_${key}`, e);
            return defaultValue;
        }
    },
    set: (key: string, value: any) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(`jailwatch_clean_${key}`, JSON.stringify(value));
        // Dispatch custom event to notify other hooks/components
        window.dispatchEvent(new Event('jailwatch_storage_change'));
    }
};

import { atom } from "jotai";

// Atom do zarządzania stanem panelu ustawień
export const isSettingsOpenAtom = atom(false);

export const toggleSettingsAtom = atom(
    (get) => get(isSettingsOpenAtom),
    (get, set) => {
        set(isSettingsOpenAtom, !get(isSettingsOpenAtom));
    }
);
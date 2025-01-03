import { atom, createStore } from "jotai";

//store jotai variables. Atoms are usestate variables, letting you track state in a function compontent. CreateStore creates a global store and lets you set atom components.
export const isTextBoxVisibleAtom = atom(false);
export const textBoxContentAtom = atom("");
export const store = createStore();
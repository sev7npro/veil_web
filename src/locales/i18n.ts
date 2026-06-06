import en from "./en.json";
import ru from "./ru.json";

export type TranslationSchema = typeof en;

// Compile-time check: verifies that the Russian translation perfectly conforms to the English translation schema.
// Any missing or extra keys will generate an immediate TypeScript error.
const verifiedRu: TranslationSchema = ru;

export const translations = {
  EN: en,
  RU: verifiedRu,
};

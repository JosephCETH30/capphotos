import "server-only";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const ENCRYPTED_PREFIX = "enc.v1:";

function getKey(): Buffer {
  const raw = process.env.PHOTO_TEXT_ENCRYPTION_KEY;
  if (!raw) {
    throw new Error(
      "PHOTO_TEXT_ENCRYPTION_KEY is not set. Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('base64'))\""
    );
  }
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error("PHOTO_TEXT_ENCRYPTION_KEY must decode to exactly 32 bytes (base64-encoded).");
  }
  return key;
}

/** Encrypts a plaintext string for storage. Empty strings pass through unchanged. */
export function encryptText(plaintext: string): string {
  if (!plaintext) return plaintext;

  const key = getKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return ENCRYPTED_PREFIX + Buffer.concat([iv, authTag, ciphertext]).toString("base64");
}

/**
 * Decrypts a value previously produced by `encryptText`. Values without the encrypted
 * prefix are returned as-is — this covers rows saved before encryption was introduced,
 * so existing data keeps working without a forced migration.
 */
export function decryptText(value: string): string {
  if (!value || !value.startsWith(ENCRYPTED_PREFIX)) return value;

  try {
    const key = getKey();
    const raw = Buffer.from(value.slice(ENCRYPTED_PREFIX.length), "base64");
    const iv = raw.subarray(0, IV_LENGTH);
    const authTag = raw.subarray(IV_LENGTH, IV_LENGTH + 16);
    const ciphertext = raw.subarray(IV_LENGTH + 16);

    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
  } catch (error) {
    console.error("Failed to decrypt photo text field:", error);
    return "";
  }
}

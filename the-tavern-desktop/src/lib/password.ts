// password hashing using Web Crypto API (PBKDF2)
// cloudflare workers doesn't support bcrypt so we use this instead

const SALT_LENGTH = 16;
const ITERATIONS = 100000;
const KEY_LENGTH = 32;
const HASH_ALGORITHM = 'SHA-256'; // not really the algorithm we are using, but a derivative of SHA-256 called PBKDF2-HMAC-SHA-256

// hash password with pbkdf2, returns "salt:hash" both base64 encoded
export async function hashPassword(password: string): Promise<string> {
	// generate random salt
	const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));

	// convert password to buffer
	const passwordBuffer = new TextEncoder().encode(password);

	// import password as key material for PBKDF2
	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		passwordBuffer,
		'PBKDF2',
		false,
		['deriveBits']
	);

	// derive key using PBKDF2
	const derivedBits = await crypto.subtle.deriveBits(
		{
			name: 'PBKDF2',
			salt: salt.buffer as ArrayBuffer,
			iterations: ITERATIONS,
			hash: HASH_ALGORITHM,
		},
		keyMaterial,
		KEY_LENGTH * 8
	);

	// convert to base64 for storage
	const hashArray = new Uint8Array(derivedBits);
	const saltBase64 = base64Encode(salt);
	const hashBase64 = base64Encode(hashArray);

	return `${saltBase64}:${hashBase64}`;
}

// verify password against stored hash
export async function verifyPassword(
	password: string,
	storedHash: string
): Promise<boolean> {
	// parse stored hash
	const [saltBase64, hashBase64] = storedHash.split(':');
	if (!saltBase64 || !hashBase64) {
		return false;
	}

	const salt = base64Decode(saltBase64);
	const storedHashArray = base64Decode(hashBase64);

	// convert password to buffer
	const passwordBuffer = new TextEncoder().encode(password);

	// import password as key material
	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		passwordBuffer,
		'PBKDF2',
		false,
		['deriveBits']
	);

	// derive key using same parameters
	const derivedBits = await crypto.subtle.deriveBits(
		{
			name: 'PBKDF2',
			salt: salt.buffer as ArrayBuffer,
			iterations: ITERATIONS,
			hash: HASH_ALGORITHM,
		},
		keyMaterial,
		KEY_LENGTH * 8
	);

	const derivedHashArray = new Uint8Array(derivedBits);

	// constant-time comparison to prevent timing attacks
	return timingSafeEqual(derivedHashArray, storedHashArray);
}

// encode Uint8Array to base64 string
function base64Encode(data: Uint8Array): string {
	const binary = String.fromCharCode(...data);
	return btoa(binary);
}

// decode base64 string to Uint8Array
function base64Decode(base64: string): Uint8Array {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes;
}

// constant-time comparison to prevent timing attacks
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
	if (a.length !== b.length) {
		return false;
	}

	let result = 0;
	for (let i = 0; i < a.length; i++) {
		result |= a[i] ^ b[i];
	}

	return result === 0;
}

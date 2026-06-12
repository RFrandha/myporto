# Symmetric vs Asymmetric Encryption: A Practical Guide

Understanding the differences and use cases of symmetric and asymmetric encryption in API design and request signing.

## Introduction

Encryption is fundamental to secure communication. Whether you're protecting data in transit or implementing digital signatures, understanding symmetric and asymmetric encryption is essential.

In this article, I'll explain both approaches with practical examples from implementing secure payment APIs at Quickbill.

## Symmetric Encryption

**Symmetric encryption** uses a single shared key to encrypt and decrypt data. Both sender and receiver know the same secret.

### How It Works

```
Plain Text + Secret Key
    ↓ [Encryption Algorithm]
Encrypted Data

Encrypted Data + Secret Key
    ↓ [Decryption Algorithm]
Plain Text
```

### Common Algorithms

- **AES (Advanced Encryption Standard)**: Industry standard, most common
  - AES-256: 256-bit key, very secure
  - AES-128: 128-bit key, still secure
- **ChaCha20**: Modern alternative, similar security
- **3DES**: Legacy, still used in banking (slower, less secure)

### Example: AES-256 Encryption

```go
package main

import (
    "crypto/aes"
    "crypto/cipher"
    "crypto/rand"
    "encoding/base64"
    "io"
)

func encryptAES(plaintext string, key []byte) (string, error) {
    // Create cipher
    block, err := aes.NewCipher(key)
    if err != nil {
        return "", err
    }
    
    // Generate IV (initialization vector)
    iv := make([]byte, aes.BlockSize)
    if _, err := io.ReadFull(rand.Reader, iv); err != nil {
        return "", err
    }
    
    // Encrypt
    stream := cipher.NewCFBEncrypter(block, iv)
    ciphertext := make([]byte, len(plaintext))
    stream.XORKeyStream(ciphertext, []byte(plaintext))
    
    // Return IV + ciphertext encoded
    return base64.StdEncoding.EncodeToString(
        append(iv, ciphertext...),
    ), nil
}

func decryptAES(encrypted string, key []byte) (string, error) {
    // Decode base64
    data, _ := base64.StdEncoding.DecodeString(encrypted)
    
    // Extract IV
    iv := data[:aes.BlockSize]
    ciphertext := data[aes.BlockSize:]
    
    // Create cipher
    block, _ := aes.NewCipher(key)
    stream := cipher.NewCFBDecrypter(block, iv)
    
    // Decrypt
    plaintext := make([]byte, len(ciphertext))
    stream.XORKeyStream(plaintext, ciphertext)
    
    return string(plaintext), nil
}
```

### Advantages

- ✅ **Fast**: Encryption/decryption is computationally efficient
- ✅ **Small overhead**: Encrypted data similar size to original
- ✅ **Simple**: Easy to implement and understand
- ✅ **Suitable for large data**: Works well for bulk encryption

### Disadvantages

- ❌ **Key distribution**: Both parties need same secret key
- ❌ **Key management**: Managing many keys becomes complex
- ❌ **No digital signature**: Can't prove who sent the message
- ❌ **Shared secret**: If key exposed, all communication compromised

### Use Cases

- Encrypting data at rest (databases, files)
- Session encryption
- VPN communication
- Database field encryption

## Asymmetric Encryption

**Asymmetric encryption** uses a pair of keys: public and private. Anyone can encrypt with public key, but only private key owner can decrypt.

### How It Works

```
Plain Text + Public Key
    ↓ [Encryption]
Encrypted Data

Encrypted Data + Private Key
    ↓ [Decryption]
Plain Text
```

### Common Algorithms

- **RSA**: Industry standard for decades
  - RSA-2048: 2048-bit key, good security
  - RSA-4096: 4096-bit key, very secure
- **ECC (Elliptic Curve Cryptography)**: Modern, more efficient
  - P-256, P-384: Recommended by NIST
- **Ed25519**: Modern, fast, secure

### Example: RSA Encryption

```go
package main

import (
    "crypto/rand"
    "crypto/rsa"
    "crypto/sha256"
    "encoding/base64"
)

func encryptRSA(plaintext string, publicKey *rsa.PublicKey) (string, error) {
    ciphertext, err := rsa.EncryptOAEP(
        sha256.New(),
        rand.Reader,
        publicKey,
        []byte(plaintext),
        nil,
    )
    if err != nil {
        return "", err
    }
    
    return base64.StdEncoding.EncodeToString(ciphertext), nil
}

func decryptRSA(encrypted string, privateKey *rsa.PrivateKey) (string, error) {
    ciphertext, _ := base64.StdEncoding.DecodeString(encrypted)
    
    plaintext, err := rsa.DecryptOAEP(
        sha256.New(),
        rand.Reader,
        privateKey,
        ciphertext,
        nil,
    )
    if err != nil {
        return "", err
    }
    
    return string(plaintext), nil
}
```

### Advantages

- ✅ **No shared secret**: Public key can be shared, private kept secret
- ✅ **Digital signatures**: Prove sender identity
- ✅ **Key distribution**: Public key shared openly
- ✅ **Scalable**: Works well in distributed systems

### Disadvantages

- ❌ **Slow**: 1000x slower than symmetric encryption
- ❌ **Large overhead**: Encrypted data much larger than original
- ❌ **Limited data size**: Can't encrypt large amounts (typically ~256 bytes for RSA-2048)
- ❌ **Complex**: More difficult to implement correctly

### Use Cases

- Key exchange (establishing shared symmetric key)
- Digital signatures
- SSL/TLS certificates
- API request signing
- One-way communication

## Digital Signatures

**Digital signatures** prove message authenticity and integrity. They're crucial for secure APIs.

### Symmetric Approach: HMAC

Uses symmetric key to create message authentication code:

```go
import "crypto/hmac"
import "crypto/sha256"

func signMessageHMAC(message string, secret []byte) string {
    h := hmac.New(sha256.New, secret)
    h.Write([]byte(message))
    return hex.EncodeToString(h.Sum(nil))
}

func verifyHMAC(message string, signature string, secret []byte) bool {
    expected := signMessageHMAC(message, secret)
    return subtle.ConstantTimeCompare(
        []byte(signature),
        []byte(expected),
    ) == 1
}
```

### Asymmetric Approach: RSA Signature

Uses private key to sign, public key to verify:

```go
import "crypto/rsa"

func signMessageRSA(message string, privateKey *rsa.PrivateKey) string {
    hash := sha256.Sum256([]byte(message))
    sig, _ := rsa.SignPSS(rand.Reader, privateKey, crypto.SHA256, hash[:], nil)
    return hex.EncodeToString(sig)
}

func verifyRSA(message string, signature string, publicKey *rsa.PublicKey) bool {
    hash := sha256.Sum256([]byte(message))
    sig, _ := hex.DecodeString(signature)
    err := rsa.VerifyPSS(publicKey, crypto.SHA256, hash[:], sig, nil)
    return err == nil
}
```

## Real-World Example: Quickbill Payment API

At Quickbill, we implemented secure partner API communication using asymmetric signing.

### The Challenge

We needed partners to call our payment API securely without exposing secrets in every request.

### The Solution

**Request Signing with RSA**

```
Partner makes request
    ↓
Generates signature with private key
    ↓
Sends request + signature
    ↓
Quickbill verifies with partner's public key
    ↓
If valid, process request
    ↓
Generate response signature
    ↓
Send response + signature back
```

### Implementation

**Partner Side (Go)**

```go
func createSignedRequest(data map[string]interface{}, privateKey *rsa.PrivateKey) (*http.Request, error) {
    // Marshal data
    jsonData, _ := json.Marshal(data)
    
    // Sign request body
    hash := sha256.Sum256(jsonData)
    signature, _ := rsa.SignPSS(rand.Reader, privateKey, crypto.SHA256, hash[:], nil)
    
    // Create request
    req, _ := http.NewRequest("POST", "https://api.quickbill.com/payment", 
        bytes.NewBuffer(jsonData))
    
    // Add signature header
    req.Header.Set("X-Signature", hex.EncodeToString(signature))
    req.Header.Set("X-Partner-ID", "partner_123")
    
    return req, nil
}
```

**Quickbill Side (Go)**

```go
func verifyRequest(w http.ResponseWriter, r *http.Request) {
    // Get partner public key
    partnerID := r.Header.Get("X-Partner-ID")
    publicKey := getPartnerPublicKey(partnerID)
    
    // Read body
    body, _ := ioutil.ReadAll(r.Body)
    
    // Verify signature
    signature, _ := hex.DecodeString(r.Header.Get("X-Signature"))
    hash := sha256.Sum256(body)
    
    err := rsa.VerifyPSS(publicKey, crypto.SHA256, hash[:], signature, nil)
    if err != nil {
        http.Error(w, "Invalid signature", http.StatusUnauthorized)
        return
    }
    
    // Request verified, process payment
    processPayment(body)
}
```

## Comparison Table

| Aspect | Symmetric | Asymmetric |
|--------|-----------|-----------|
| **Speed** | Very fast | Slow (100-1000x slower) |
| **Key size** | 128-256 bits | 2048-4096 bits |
| **Encrypted size** | Similar to original | Much larger |
| **Key sharing** | Difficult (same key needed) | Easy (public key shared) |
| **Digital signature** | ❌ No | ✅ Yes |
| **Data size** | Can encrypt large data | Limited (few KB max) |
| **Typical use** | Encrypting data | Key exchange, signatures |
| **Performance** | Suitable for bulk data | Better for small data |

## Hybrid Approach: TLS/SSL

Modern secure communication uses both:

```
Handshake Phase:
- Client and server use asymmetric encryption (RSA/ECC)
- Exchange and verify certificates (asymmetric signing)
- Negotiate symmetric key

Data Transfer Phase:
- Use symmetric encryption (AES) for speed
- Use symmetric HMAC for integrity
```

This is why HTTPS is fast and secure.

## Choosing the Right Approach

### Use Symmetric When:

1. **Encrypting data at rest** - Passwords in database
2. **High volume encryption** - Many transactions
3. **Both parties share secret** - Same organization
4. **Speed critical** - Real-time encryption needed

### Use Asymmetric When:

1. **Proving identity** - Digital signatures
2. **Key exchange** - Establishing secure channel
3. **Public communication** - Anyone needs to verify
4. **One-way communication** - Don't need to share secret

### Use Hybrid When:

1. **Secure communication** - HTTPS, TLS
2. **Production systems** - Best of both worlds
3. **Scalable authentication** - Both speed and security

## Security Best Practices

### Symmetric:

```go
// ✅ Good: Use strong key
key := make([]byte, 32) // 256-bit key
rand.Read(key)
encrypt(data, key)

// ❌ Bad: Weak key
encrypt(data, []byte("password"))
```

### Asymmetric:

```go
// ✅ Good: Use recommended algorithms
privateKey, _ := rsa.GenerateKey(rand.Reader, 4096)

// ✅ Good: Verify signatures always
if !verifySignature(message, sig, publicKey) {
    return errors.New("Invalid signature")
}

// ❌ Bad: Trust unverified signatures
processMessage(message) // Dangerous!
```

## Conclusion

**Key takeaways:**

1. **Symmetric**: Fast, good for encrypting large data
2. **Asymmetric**: Slower, good for signatures and key exchange
3. **Hybrid**: Use both for optimal security and performance
4. **Always verify**: Especially with asymmetric (signatures)
5. **Keep keys safe**: Both symmetric and private keys must be protected

**The beauty of understanding both**: You can design secure systems that are both fast and reliable.

---

**What encryption patterns do you use in your systems?** Share your experiences in the comments!

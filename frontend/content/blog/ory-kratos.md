# Building Secure Authentication with Ory Kratos

A comprehensive guide to implementing identity and access management using Ory Kratos and Ory Hydra.

## Introduction

Authentication and authorization are critical components of any modern application. As your platform grows, managing user identities becomes increasingly complex. **Ory Kratos** and **Ory Hydra** are open-source tools that solve this problem elegantly.

In this article, I'll share insights from implementing these systems at Virgo for handling multi-user authentication and role-based access control.

## What is Ory Kratos?

**Ory Kratos** is an open-source identity and user management system. Think of it as the authentication backbone for your application.

### Key Features

- **User Management**: Registration, login, recovery, verification
- **Multi-factor Authentication**: TOTP, WebAuthn support
- **Social login**: Integration with OAuth2 providers
- **Account recovery**: Password reset, email verification
- **Session management**: Secure session handling
- **Flexible data models**: Custom user attributes

### Architecture

```
User Application
    ↓
Ory Kratos API
├── Authentication endpoints
├── User management
├── Session validation
└── Recovery flows
```

## What is Ory Hydra?

**Ory Hydra** is an OAuth2 server and OpenID Connect provider. It handles authorization (deciding what users can do).

### Key Features

- **OAuth2 flows**: Authorization Code, Implicit, Client Credentials
- **OpenID Connect**: For delegated login scenarios
- **Token management**: JWT generation and validation
- **Refresh tokens**: Long-lived access patterns
- **Consent management**: User consent for scopes
- **Client credentials**: Service-to-service communication

### Architecture

```
External Applications
    ↓ (OAuth2 request)
Ory Hydra
├── Token generation
├── Consent handling
└── Authorization
    ↓
Ory Kratos (Authentication)
```

## How Kratos and Hydra Work Together

The typical flow is:

```
1. User wants to access app
    ↓
2. App redirects to Hydra
    ↓
3. Hydra redirects to Kratos (if not authenticated)
    ↓
4. User logs in to Kratos
    ↓
5. Kratos returns session/token
    ↓
6. Hydra generates OAuth token
    ↓
7. User redirected back to app with token
    ↓
8. App validates token with Hydra
```

## Implementation at Virgo

### Our Architecture

At Virgo, we implemented a multi-user portal with RBAC for partners:

```
Partner Portal (Next.js)
    ↓
Kratos (Authentication)
├── User registration
├── Email verification
├── Login with email/password
└── Session management
    ↓
Hydra (Authorization)
├── Token generation
├── Role assignment
└── Consent flows
    ↓
Backend APIs (Go)
├── Verify JWT tokens
├── Check user roles (RBAC)
└── Grant access to resources
```

### Key Implementation Details

#### 1. Registration Flow

```
User submits email/password
    ↓
Kratos validates
    ↓
Sends verification email
    ↓
User clicks email link
    ↓
Account activated
```

#### 2. Login Flow

```
User enters credentials
    ↓
Kratos validates against password hash
    ↓
Creates session
    ↓
Issues session cookie
    ↓
Redirects to app with authenticated session
```

#### 3. Token Generation

```
User requests protected resource
    ↓
App checks Kratos session
    ↓
If valid, calls Hydra for token
    ↓
Hydra generates JWT
    ↓
Token includes user role/permissions
```

### Custom User Attributes

We extended Kratos default user model with custom fields:

```json
{
  "id": "user123",
  "email": "partner@example.com",
  "traits": {
    "name": "Partner Company",
    "role": "admin",
    "company_id": "comp123",
    "permissions": ["read:transactions", "write:invoices"],
    "created_at": "2026-01-01"
  }
}
```

## Setting Up Kratos and Hydra

### Docker Compose (Quick Start)

```yaml
version: '3.8'

services:
  kratos-migrate:
    image: oryd/kratos:latest
    volumes:
      - ./kratos.yml:/etc/config/kratos/kratos.yml
    command: -c /etc/config/kratos/kratos.yml migrate sql -e --yes
    depends_on:
      - kratos-db

  kratos:
    image: oryd/kratos:latest
    ports:
      - "4433:4433"  # Public API
      - "4434:4434"  # Admin API
    depends_on:
      - kratos-db
    volumes:
      - ./kratos.yml:/etc/config/kratos/kratos.yml
    environment:
      - DSN=postgres://user:pass@kratos-db:5432/kratos

  hydra-migrate:
    image: oryd/hydra:latest
    command: migrate sql -e --yes postgres://user:pass@hydra-db:5432/hydra
    depends_on:
      - hydra-db

  hydra:
    image: oryd/hydra:latest
    ports:
      - "4444:4444"  # Public API
      - "4445:4445"  # Admin API
    depends_on:
      - hydra-db
    environment:
      - DSN=postgres://user:pass@hydra-db:5432/hydra
      - URLS_SELF_ISSUER=http://localhost:4444

  kratos-db:
    image: postgres:15
    environment:
      - POSTGRES_DB=kratos
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass

  hydra-db:
    image: postgres:15
    environment:
      - POSTGRES_DB=hydra
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
```

### Configuration (kratos.yml)

```yaml
version: v0.13.0

dsn: postgres://user:pass@localhost/kratos

serve:
  public:
    base_url: http://localhost:4433
  admin:
    base_url: http://localhost:4434

selfservice:
  default_browser_return_url: http://localhost:3000
  
  flows:
    login:
      ui_url: http://localhost:3000/login
    registration:
      ui_url: http://localhost:3000/register
    recovery:
      ui_url: http://localhost:3000/recovery

identity:
  default_schema_id: default
  schemas:
    - id: default
      url: file:///etc/config/kratos/identity.schema.json
```

## Security Best Practices

### 1. Password Hashing

Kratos uses bcrypt by default. Never store plain passwords.

### 2. Session Security

```go
// Always validate session in backend
func validateSession(token string) (*User, error) {
    // Verify JWT signature
    // Check token expiry
    // Validate user permissions
}
```

### 3. HTTPS Only

```yaml
serve:
  public:
    base_url: https://auth.yourdomain.com  # Always HTTPS
```

### 4. CORS Configuration

```go
// Only allow your frontend origin
cors:
  enabled: true
  allowed_origins:
    - https://yourdomain.com
```

### 5. Rate Limiting

Implement rate limiting on authentication endpoints:

```go
// Limit login attempts to prevent brute force
limiter := rate.NewLimiter(1, 5) // 1 request per second, burst of 5

if !limiter.Allow() {
    return errors.New("too many login attempts")
}
```

## Common Challenges

### Challenge 1: Session Expiry

**Problem**: Sessions expire, users get logged out.

**Solution**: Implement refresh token pattern:

```
Access Token (short-lived, 15 mins)
    ↓
Refresh Token (long-lived, 7 days)
    ↓
When expired, use refresh token to get new access token
```

### Challenge 2: Role Synchronization

**Problem**: User roles change in Kratos, backend doesn't know.

**Solution**: Embed roles in JWT:

```go
// In Hydra token generation
claims := jwt.MapClaims{
    "sub": user.ID,
    "email": user.Email,
    "role": user.Traits.Role,        // Include role
    "permissions": user.Traits.Perms, // Include permissions
}
```

### Challenge 3: Cross-Domain Authentication

**Problem**: Multiple subdomains need shared authentication.

**Solution**: Use cookie domain setting:

```yaml
cookies:
  domain: ".yourdomain.com"  # Shared across *.yourdomain.com
```

## Testing

### Testing Login Flow

```go
func TestLoginFlow(t *testing.T) {
    // 1. Get login flow
    flow := getLoginFlow()
    
    // 2. Submit credentials
    result := submitLogin(flow.ID, "user@example.com", "password")
    
    // 3. Verify session created
    assert.NotEmpty(t, result.SessionToken)
    
    // 4. Verify user data
    assert.Equal(t, "user@example.com", result.User.Email)
}
```

### Testing Token Generation

```go
func TestTokenGeneration(t *testing.T) {
    // 1. Get authorization code
    code := getAuthCode(userID)
    
    // 2. Exchange code for token
    token := exchangeCodeForToken(code)
    
    // 3. Verify token valid
    claims := parseToken(token)
    assert.Equal(t, userID, claims.Subject)
    assert.Equal(t, "admin", claims.Role)
}
```

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Invalid redirect URI | Mismatch in config | Verify `redirect_uris` matches app URL |
| Session not persisting | Cookie domain wrong | Check `cookies.domain` setting |
| Token invalid | Expired or signature mismatch | Verify token expiry and signing key |
| CORS errors | Cross-origin requests blocked | Add app URL to `allowed_origins` |

## Conclusion

Ory Kratos and Hydra provide robust, scalable identity management. While they have a learning curve, they handle complex authentication scenarios elegantly.

**Key takeaways:**

1. **Use Kratos for authentication** - User management, passwords, sessions
2. **Use Hydra for authorization** - Token generation, OAuth2 flows
3. **Implement security best practices** - HTTPS, rate limiting, secure cookies
4. **Test thoroughly** - Authentication is critical; test edge cases
5. **Monitor and maintain** - Keep systems up to date with patches

For more information, visit [ory.sh](https://ory.sh)

---

**Have you used Ory Kratos?** Share your experience in the comments!

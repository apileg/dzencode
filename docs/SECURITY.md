For cookies:

1. Enforce HTTPS with `Secure`
2. Be safer in case of XSS with `HttpOnly`
3. Add additional protection against CSRF with `SameSite: Lax`
4. Prevent CSRF for `/api/*` routes using Double Submit Cookie pattern

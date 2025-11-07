// Security utilities for input validation and sanitization

/**
 * Sanitize string input to prevent XSS attacks
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 10000); // Limit length
}

/**
 * Validate email address
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitized = email.trim().toLowerCase();
  
  // Additional checks
  if (sanitized.length > 254) return false; // RFC 5321 limit
  if (sanitized.includes('..')) return false; // No consecutive dots
  if (sanitized.startsWith('.') || sanitized.endsWith('.')) return false;
  
  return emailRegex.test(sanitized);
}

/**
 * Validate phone number (basic validation)
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return true; // Phone is optional
  
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  const sanitized = phone.trim();
  
  if (sanitized.length > 20) return false; // Reasonable limit
  if (sanitized.length < 10) return false; // Minimum length
  
  return phoneRegex.test(sanitized);
}

/**
 * Validate and sanitize contact form data
 */
export function validateContactForm(data) {
  const errors = [];
  const sanitized = {};
  
  // Name validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  } else if (data.name.length > 100) {
    errors.push('Name is too long');
  } else {
    sanitized.name = sanitizeInput(data.name).slice(0, 100);
  }
  
  // Email validation
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  } else {
    sanitized.email = data.email.trim().toLowerCase().slice(0, 254);
  }
  
  // Phone validation (optional)
  if (data.phone) {
    if (!validatePhone(data.phone)) {
      errors.push('Invalid phone number format');
    } else {
      sanitized.phone = sanitizeInput(data.phone).slice(0, 20);
    }
  } else {
    sanitized.phone = '';
  }
  
  // Message validation
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  } else if (data.message.length > 5000) {
    errors.push('Message is too long (max 5000 characters)');
  } else {
    sanitized.message = sanitizeInput(data.message).slice(0, 5000);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    data: sanitized
  };
}

/**
 * Validate CSV file before processing
 */
export function validateCSVFile(file) {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }
  
  // Check file type
  const allowedTypes = ['text/csv', 'text/plain', 'application/vnd.ms-excel'];
  const allowedExtensions = ['.csv', '.txt'];
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  
  if (!allowedExtensions.includes(fileExtension) && !allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Only CSV and TXT files are allowed' };
  }
  
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 5MB' };
  }
  
  // Check for suspicious content
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    return { isValid: false, error: 'Invalid file name' };
  }
  
  return { isValid: true };
}

/**
 * Sanitize contact data
 */
export function sanitizeContact(contact) {
  return {
    name: sanitizeInput(contact.name || '').slice(0, 100),
    email: validateEmail(contact.email) ? contact.email.trim().toLowerCase().slice(0, 254) : '',
    phone: contact.phone ? sanitizeInput(contact.phone).slice(0, 20) : ''
  };
}

/**
 * Rate limiting helper (client-side, server-side should be implemented in API)
 */
export function checkRateLimit(key, maxRequests = 10, windowMs = 60000) {
  if (typeof window === 'undefined') return true; // Server-side should handle this
  
  const storageKey = `rate_limit_${key}`;
  const now = Date.now();
  const stored = localStorage.getItem(storageKey);
  
  if (!stored) {
    localStorage.setItem(storageKey, JSON.stringify({ count: 1, resetAt: now + windowMs }));
    return true;
  }
  
  const data = JSON.parse(stored);
  
  if (now > data.resetAt) {
    localStorage.setItem(storageKey, JSON.stringify({ count: 1, resetAt: now + windowMs }));
    return true;
  }
  
  if (data.count >= maxRequests) {
    return false;
  }
  
  data.count++;
  localStorage.setItem(storageKey, JSON.stringify(data));
  return true;
}


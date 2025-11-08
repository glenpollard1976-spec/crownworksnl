import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map();

function checkRateLimit(ip, maxRequests = 5, windowMs = 60000) {
  const now = Date.now();
  const key = `contact_${ip}`;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  rateLimitStore.set(key, record);
  return true;
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Rate limiting check
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Send email using Resend
    if (!resend || !process.env.RESEND_API_KEY) {
      // Fallback: log to console in development
      console.log('Contact Form Submission:', { name, email, phone, message });
      return NextResponse.json(
        { 
          success: true, 
          message: 'Message received. We will contact you soon.',
          note: 'Email service not configured. Message logged to console.'
        },
        { status: 200 }
      );
    }

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted from: ${request.headers.get('referer') || 'crownworksnl.com'}</small></p>
    `;

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

---
Submitted from: ${request.headers.get('referer') || 'crownworksnl.com'}
    `;

    // Send email to business
    const { data, error } = await resend.emails.send({
      from: 'CrownWorksNL <noreply@crownworksnl.com>',
      to: process.env.CONTACT_EMAIL || 'crownworksnl@gmail.com',
      replyTo: email,
      subject: `New Contact: ${name}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: 'CrownWorksNL <noreply@crownworksnl.com>',
        to: email,
        subject: 'Thank you for contacting CrownWorksNL',
        html: `
          <h2>Thank you for contacting CrownWorksNL!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p>Best regards,<br>Glen Pollard<br>CrownWorksNL</p>
          <p><small>Phone: +1 (709) 721-0340<br>Email: crownworksnl@gmail.com</small></p>
        `,
        text: `
Thank you for contacting CrownWorksNL!

Hi ${name},

We've received your message and will get back to you within 24 hours.

Your message:
${message}

---
Best regards,
Glen Pollard
CrownWorksNL

Phone: +1 (709) 721-0340
Email: crownworksnl@gmail.com
        `,
      });
    } catch (confirmationError) {
      // Don't fail if confirmation email fails
      console.error('Confirmation email error:', confirmationError);
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We will contact you soon.',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again later.' },
      { status: 500 }
    );
  }
}


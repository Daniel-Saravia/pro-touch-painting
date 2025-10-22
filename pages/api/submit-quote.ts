import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import fs from 'fs'
import path from 'path'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.QUOTE_ALERT_EMAIL) {
    console.error('Missing required email environment variables')
    return res.status(500).json({ message: 'Email service not configured' })
  }

  if (!process.env.TEXTBELT_API_KEY || !process.env.TEXTBELT_PHONE) {
    console.error('Missing Textbelt environment variables')
    return res.status(500).json({ message: 'SMS service not configured' })
  }

  const { name, email, phone, service, message } = req.body

  if (!name || !email || !phone || !service) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // Basic HTML escaping to keep the email safe
    const escapeHtml = (val: unknown) => String(val ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')

    const brandName = process.env.NEXT_PUBLIC_SITE_NAME || 'Pro Touch Painting & Drywall'
    
    // Load logo as inline data URI (no external assets)
    let logoDataUri: string | null = null
    try {
      const svgPath = path.join(process.cwd(), 'public', 'assets', 'ProTouch.svg')
      const svgBuffer = fs.readFileSync(svgPath)
      logoDataUri = `data:image/svg+xml;base64,${svgBuffer.toString('base64')}`
    } catch (e) {
      // If logo is missing or can't be read, continue without it
      console.warn('Email logo not embedded:', e)
    }
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone)
    const safeService = escapeHtml(service)
    const rawMessage = typeof message === 'string' && message.trim().length > 0
      ? message
      : 'No additional details provided'
    const safeMessage = escapeHtml(rawMessage).replace(/\n/g, '<br />')

    // Build a branded, responsive, inline-styled email (Gmail/Outlook safe)
    const emailHtml = `
<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${brandName} — New Quote Request</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F8F9FA;color:#343A40;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, 'Helvetica Neue', Helvetica, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F8F9FA;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:640px;background-color:#FFFFFF;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);overflow:hidden;">
            <tr>
              <td style="background: linear-gradient(135deg, #D2691E, #8B2635);padding:20px 24px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="vertical-align:middle;">
                      ${logoDataUri ? `<img src="${logoDataUri}" alt="${brandName} logo" height="36" style="display:inline-block;height:36px;width:auto;vertical-align:middle;" />` : ''}
                      <span style="display:inline-block;margin-left:${logoDataUri ? '10px' : '0'};font-size:20px;line-height:1.3;color:#FFFFFF;letter-spacing:0.2px;font-weight:700;vertical-align:middle;">${brandName}</span>
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      <span style="font-size:14px;color:#FFEADB;">New Quote Request</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 16px 0;font-size:16px;color:#2C3E50;">You’ve received a new quote request. Details are below:</p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;margin:0 0 16px 0;border:1px solid #E9ECEF;border-radius:8px;overflow:hidden;">
                  <tr>
                    <td style="width:160px;background-color:#F8F9FA;padding:12px 14px;font-weight:600;color:#2C3E50;border-bottom:1px solid #E9ECEF;">Name</td>
                    <td style="padding:12px 14px;color:#343A40;border-bottom:1px solid #E9ECEF;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;background-color:#F8F9FA;padding:12px 14px;font-weight:600;color:#2C3E50;border-bottom:1px solid #E9ECEF;">Email</td>
                    <td style="padding:12px 14px;color:#343A40;border-bottom:1px solid #E9ECEF;">${safeEmail}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;background-color:#F8F9FA;padding:12px 14px;font-weight:600;color:#2C3E50;border-bottom:1px solid #E9ECEF;">Phone</td>
                    <td style="padding:12px 14px;color:#343A40;border-bottom:1px solid #E9ECEF;">${safePhone}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;background-color:#F8F9FA;padding:12px 14px;font-weight:600;color:#2C3E50;">Service</td>
                    <td style="padding:12px 14px;color:#343A40;">${safeService}</td>
                  </tr>
                </table>

                <div style="margin:18px 0 8px 0;font-weight:600;color:#2C3E50;">Message</div>
                <div style="background-color:#FFFFFF;border:1px solid #E9ECEF;border-left:4px solid #D2691E;border-radius:8px;padding:14px 16px;color:#343A40;line-height:1.6;">${safeMessage}</div>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:24px 0 0 0;">
                  <tr>
                    <td align="left" bgcolor="#D2691E" style="border-radius:8px;">
                      <a href="mailto:${safeEmail}?subject=${encodeURIComponent('Re: Quote Request from ' + safeName)}" style="display:inline-block;padding:12px 18px;color:#FFFFFF;text-decoration:none;font-weight:600;background-color:#D2691E;border-radius:8px;">Reply to Client</a>
                    </td>
                  </tr>
                </table>

                <p style="margin:18px 0 0 0;font-size:12px;color:#6C757D;">If the button doesn’t work, reply to: <a href="mailto:${safeEmail}" style="color:#1E3A8A;text-decoration:none;">${safeEmail}</a></p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#F8F9FA;color:#6C757D;padding:14px 24px;font-size:12px;text-align:center;">
                &copy; ${new Date().getFullYear()} ${brandName}. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

    // Send email notification
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.QUOTE_ALERT_EMAIL,
      replyTo: email,
      subject: `New Quote Request from ${safeName}`,
      html: emailHtml
    })

    const trimmedMessage = typeof message === 'string' ? message.trim() : ''

    // Preserve preceding boundary while removing URL-like substrings
    const sanitizeForSms = (input: string) => {
      if (!input) return input
      const urlLikePattern = /(^|[\s(])(https?:\/\/\S+|www\.\S+|(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}\S*)/gi
      return input.replace(urlLikePattern, (_match: string, p1: string) => `${p1}[link removed]`).trim()
    }

    const formatEmailForSms = (input: string) => {
      if (!input) return input
      return input
        .replace(/@/g, ' [at] ')
        .replace(/\./g, ' [dot] ')
        .replace(/\s+/g, ' ')
        .trim()
    }

    const sanitizedMessage = sanitizeForSms(trimmedMessage)
    const sanitizedEmailForSms = formatEmailForSms(email)
    const smsBodyParts = [
      `New quote request from ${name}`,
      `Email: ${sanitizedEmailForSms}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      sanitizedMessage
        ? `Message: ${sanitizedMessage.slice(0, 120)}${sanitizedMessage.length > 120 ? '…' : ''}`
        : ''
    ].filter(Boolean)

    let smsStatus: 'sent' | 'failed' = 'sent'
    let smsErrorMessage: string | null = null

    try {
      const smsResponse = await fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: process.env.TEXTBELT_PHONE,
          message: smsBodyParts.join('\n'),
          key: process.env.TEXTBELT_API_KEY
        })
      })

      const smsResult = await smsResponse.json().catch(() => null)

      if (!smsResponse.ok || !smsResult?.success) {
        smsStatus = 'failed'
        smsErrorMessage = typeof smsResult?.error === 'string' && smsResult.error.length > 0
          ? smsResult.error
          : `Textbelt request failed with status ${smsResponse.status}`
        console.error('Textbelt SMS error:', smsResult || smsResponse.statusText)
      }
    } catch (smsError) {
      smsStatus = 'failed'
      smsErrorMessage = smsError instanceof Error ? smsError.message : 'Unknown Textbelt error'
      console.error('Textbelt SMS exception:', smsError)
    }

    if (smsStatus === 'failed') {
      return res.status(200).json({
        message: 'Quote submitted, but SMS alert could not be delivered. We will follow up soon.',
        smsStatus,
        smsError: smsErrorMessage
      })
    }

    res.status(200).json({ message: 'Quote request submitted successfully', smsStatus })
  } catch (error) {
    console.error('Error submitting quote:', error)
    res.status(500).json({ message: 'Failed to submit quote request' })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.QUOTE_ALERT_EMAIL) {
    console.error('Missing required email environment variables')
    return res.status(500).json({ message: 'Email service not configured' })
  }

  const { name, email, phone, service, message } = req.body

  const sanitize = (value: unknown) =>
    typeof value === 'string'
      ? value.replace(/[&<>"']/g, (char) => {
          switch (char) {
            case '&':
              return '&amp;'
            case '<':
              return '&lt;'
            case '>':
              return '&gt;'
            case '"':
              return '&quot;'
            case "'":
              return '&#39;'
            default:
              return char
          }
        })
      : ''

  if (!name || !email || !service) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const safeName = sanitize(name)
  const safeEmail = sanitize(email)
  const safePhone = sanitize(phone)
  const safeService = sanitize(service)
  const safeMessage = sanitize(message)

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Quote Request</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f4f6fb;color:#1f2933;font-family:'Segoe UI',Arial,sans-serif;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 20px rgba(15,23,42,0.08);">
                <tr>
                  <td style="padding:24px 32px;background:linear-gradient(135deg,#1E3A8A,#D2691E);color:#ffffff;">
                    <p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.8;">New Lead</p>
                    <h1 style="margin:8px 0 0;font-size:28px;font-weight:700;">Quote Request Received</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px 16px;">
                    <p style="margin:0 0 16px;font-size:16px;">You have a new quote submission from <strong>${safeName}</strong>.</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                      <tbody>
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;width:30%;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Email</td>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#1f2933;">${safeEmail}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;width:30%;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Phone</td>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#1f2933;">${safePhone || 'Not provided'}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;width:30%;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">Service</td>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#1f2933;">${safeService}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;width:30%;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;vertical-align:top;">Message</td>
                          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#1f2933;white-space:pre-wrap;">${safeMessage || 'No additional details provided.'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 28px;color:#6b7280;font-size:13px;">
                    <p style="margin:0;">Reply directly to this email to contact ${safeName}, or call the number above if provided.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  const textContent = [
    'New Quote Request',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Service: ${service}`,
    `Message: ${message || 'No additional details provided.'}`
  ].join('\n')

  try {
    // Send email notification
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.QUOTE_ALERT_EMAIL,
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      html: htmlContent,
      text: textContent
    })

    res.status(200).json({ message: 'Quote request submitted successfully' })
  } catch (error) {
    console.error('Error submitting quote:', error)
    res.status(500).json({ message: 'Failed to submit quote request' })
  }
}

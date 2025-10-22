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

  if (!process.env.TEXTBELT_API_KEY || !process.env.TEXTBELT_PHONE) {
    console.error('Missing Textbelt environment variables')
    return res.status(500).json({ message: 'SMS service not configured' })
  }

  const { name, email, phone, service, message } = req.body

  if (!name || !email || !phone || !service) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // Send email notification
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.QUOTE_ALERT_EMAIL,
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message || 'No additional details provided'}</p>
      `
    })

    const trimmedMessage = typeof message === 'string' ? message.trim() : ''
    const smsBodyParts = [
      `New quote request from ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      trimmedMessage ? `Message: ${trimmedMessage.slice(0, 120)}${trimmedMessage.length > 120 ? '…' : ''}` : ''
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

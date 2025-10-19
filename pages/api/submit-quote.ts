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

  if (!name || !email || !service) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // Send email notification
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.QUOTE_ALERT_EMAIL,
      reply_to: email,
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

    res.status(200).json({ message: 'Quote request submitted successfully' })
  } catch (error) {
    console.error('Error submitting quote:', error)
    res.status(500).json({ message: 'Failed to submit quote request' })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import twilio from 'twilio'

const resend = new Resend(process.env.RESEND_API_KEY)
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, phone, service, message } = req.body

  if (!name || !email || !phone || !service) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // Send email notification
    await resend.emails.send({
      from: 'noreply@protouchpainting.com',
      to: 'jorgeruizpaint@yahoo.com',
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message || 'No additional details provided'}</p>
      `
    })

    // Send SMS notification
    await twilioClient.messages.create({
      body: `New quote request from ${name} (${phone}) for ${service}. Email: ${email}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+16026807263'
    })

    res.status(200).json({ message: 'Quote request submitted successfully' })
  } catch (error) {
    console.error('Error submitting quote:', error)
    res.status(500).json({ message: 'Failed to submit quote request' })
  }
}
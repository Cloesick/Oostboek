import nodemailer from 'nodemailer';

// Email configuration - uses environment variables
const transporter = nodemailer.createTransport({
  host: process.env['SMTP_HOST'] || 'smtp.gmail.com',
  port: parseInt(process.env['SMTP_PORT'] || '587'),
  secure: process.env['SMTP_SECURE'] === 'true',
  auth: {
    user: process.env['SMTP_USER'],
    pass: process.env['SMTP_PASS'],
  },
});

const NOTIFICATION_EMAIL = process.env['NOTIFICATION_EMAIL'] || 'info@oostboek.be';

interface LeadData {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
}

export async function sendLeadNotification(lead: LeadData): Promise<boolean> {
  // Skip if SMTP is not configured
  if (!process.env['SMTP_USER'] || !process.env['SMTP_PASS']) {
    console.log('📧 Email notification skipped - SMTP not configured');
    return false;
  }

  const serviceLabel = lead.service ? getServiceLabel(lead.service) : 'Niet gespecificeerd';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1e3a5f; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Nieuwe Lead via Website</h1>
      </div>
      
      <div style="padding: 20px; background: #f9fafb;">
        <h2 style="color: #1e3a5f; margin-top: 0;">Contactgegevens</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 120px;">Naam:</td>
            <td style="padding: 8px 0;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">E-mail:</td>
            <td style="padding: 8px 0;"><a href="mailto:${lead.email}">${lead.email}</a></td>
          </tr>
          ${lead.phone ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Telefoon:</td>
            <td style="padding: 8px 0;"><a href="tel:${lead.phone}">${lead.phone}</a></td>
          </tr>
          ` : ''}
          ${lead.company ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Bedrijf:</td>
            <td style="padding: 8px 0;">${lead.company}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Dienst:</td>
            <td style="padding: 8px 0;">${serviceLabel}</td>
          </tr>
        </table>
        
        <h2 style="color: #1e3a5f;">Bericht</h2>
        <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
          ${lead.message.replace(/\n/g, '<br>')}
        </div>
        
        <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
          Dit bericht werd automatisch verzonden via de Oostboek website.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Oostboek Website" <${process.env['SMTP_USER']}>`,
      to: NOTIFICATION_EMAIL,
      subject: `🔔 Nieuwe lead: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
      html: htmlContent,
      replyTo: lead.email,
    });

    console.log(`📧 Lead notification sent for ${lead.email}`);
    return true;
  } catch (error) {
    console.error('📧 Failed to send lead notification:', error);
    return false;
  }
}

function getServiceLabel(service: string): string {
  const labels: Record<string, string> = {
    BOEKHOUDING: 'Boekhouding',
    FISCALITEIT: 'Fiscaliteit',
    BEGELEIDING: 'Begeleiding',
    STARTER: 'Startersadvies',
    OTHER: 'Andere',
  };
  return labels[service] || service;
}

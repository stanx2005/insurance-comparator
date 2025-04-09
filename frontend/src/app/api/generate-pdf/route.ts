import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { PDFDocument, rgb } from 'pdf-lib'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595.28, 841.89]) // A4 size
    const { width, height } = page.getSize()

    // Add content to PDF
    page.drawText('Résumé de votre devis mutuelle santé', {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0.4, 0.8), // Primary blue color
    })

    // Personal Information
    page.drawText('Informations personnelles', {
      x: 50,
      y: height - 100,
      size: 16,
    })

    page.drawText(`Nom: ${data.lastName}`, {
      x: 50,
      y: height - 130,
      size: 12,
    })

    page.drawText(`Prénom: ${data.firstName}`, {
      x: 50,
      y: height - 150,
      size: 12,
    })

    page.drawText(`Date de naissance: ${data.birthDate}`, {
      x: 50,
      y: height - 170,
      size: 12,
    })

    // Add second person's information if it exists
    if (data.insuranceType === 'couple' || data.insuranceType === 'couple_children') {
      page.drawText('Informations du conjoint', {
        x: 50,
        y: height - 190,
        size: 14,
      })

      page.drawText(`Nom: ${data.secondPersonLastName || ''}`, {
        x: 50,
        y: height - 210,
        size: 12,
      })

      page.drawText(`Prénom: ${data.secondPersonFirstName || ''}`, {
        x: 50,
        y: height - 230,
        size: 12,
      })

      page.drawText(`Date de naissance: ${data.secondPersonBirthDate || ''}`, {
        x: 50,
        y: height - 250,
        size: 12,
      })
    }

    page.drawText(`Email: ${data.email}`, {
      x: 50,
      y: data.insuranceType === 'couple' || data.insuranceType === 'couple_children' ? height - 280 : height - 190,
      size: 12,
    })

    page.drawText(`Téléphone: ${data.phone}`, {
      x: 50,
      y: data.insuranceType === 'couple' || data.insuranceType === 'couple_children' ? height - 300 : height - 210,
      size: 12,
    })

    page.drawText(`Code postal: ${data.zipCode}`, {
      x: 50,
      y: data.insuranceType === 'couple' || data.insuranceType === 'couple_children' ? height - 320 : height - 230,
      size: 12,
    })

    // Insurance Type
    page.drawText('Type d\'assurance', {
      x: 50,
      y: data.insuranceType === 'couple' || data.insuranceType === 'couple_children' ? height - 360 : height - 270,
      size: 16,
    })

    const insuranceTypes = {
      single: 'Un adulte',
      single_children: 'Un adulte + enfant(s)',
      couple: 'Un couple',
      couple_children: 'Un couple + enfant(s)'
    }

    page.drawText(insuranceTypes[data.insuranceType as keyof typeof insuranceTypes] || '', {
      x: 50,
      y: data.insuranceType === 'couple' || data.insuranceType === 'couple_children' ? height - 390 : height - 300,
      size: 12,
    })

    // Regime Information
    page.drawText('Régime social', {
      x: 50,
      y: data.insuranceType === 'couple' || data.insuranceType === 'couple_children' ? height - 430 : height - 340,
      size: 16,
    })

    const regimes = {
      general: 'Régime général',
      tns: 'Travailleur Non Salarié (TNS)',
      agricole: 'Régime agricole',
      'alsace-moselle': 'Régime Alsace-Moselle'
    }

    page.drawText(regimes[data.regime as keyof typeof regimes] || '', {
      x: 50,
      y: data.insuranceType === 'couple' || data.insuranceType === 'couple_children' ? height - 460 : height - 370,
      size: 12,
    })

    // Coverage Details
    page.drawText('Couverture choisie', {
      x: 50,
      y: data.insuranceType === 'couple' || data.insuranceType === 'couple_children' ? height - 500 : height - 410,
      size: 16,
    })

    if (data.coverageType === 'personalized') {
      const coverageTypes = ['soinsMedicaux', 'hospitalisation', 'optique', 'dentaire', 'auditif']
      const coverageLabels = {
        soinsMedicaux: 'Soins médicaux',
        hospitalisation: 'Hospitalisation',
        optique: 'Optique',
        dentaire: 'Dentaire',
        auditif: 'Auditif'
      }

      let yOffset = 540
      coverageTypes.forEach((type) => {
        page.drawText(`${coverageLabels[type as keyof typeof coverageLabels]}: ${data.personalizedCoverage[type]}`, {
          x: 50,
          y: data.insuranceType === 'couple' || data.insuranceType === 'couple_children' ? height - yOffset : height - yOffset + 100,
          size: 12,
        })
        yOffset += 20
      })
    } else {
      const coverageTypes = {
        minimal: 'Minimale',
        balanced: 'Equilibrée',
        maximal: 'Maximale'
      }
      
      page.drawText(`Type: ${coverageTypes[data.coverageType as keyof typeof coverageTypes] || ''}`, {
        x: 50,
        y: data.insuranceType === 'couple' || data.insuranceType === 'couple_children' ? height - 540 : height - 450,
        size: 12,
      })
    }

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save()

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // false for port 587, true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    })

    // Log connection attempt
    console.log('Attempting to verify SMTP connection...', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER
    })

    // Verify SMTP connection
    try {
      await transporter.verify()
      console.log('SMTP connection verified successfully')
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      throw verifyError
    }

    // Log email sending attempt
    console.log('Attempting to send email...')

    // Send email with PDF
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'tahirreda93@gmail.com',
      subject: `Nouveau devis mutuelle santé - ${data.firstName} ${data.lastName}`,
      html: `
        <h1>Nouveau devis mutuelle santé</h1>
        <p>Un nouveau devis a été créé avec les informations suivantes:</p>
        <ul>
          <li>Nom: ${data.lastName}</li>
          <li>Prénom: ${data.firstName}</li>
          <li>Email: ${data.email}</li>
          <li>Téléphone: ${data.phone}</li>
        </ul>
        <p>Le PDF du devis complet est joint à cet email.</p>
      `,
      attachments: [
        {
          filename: `devis-mutuelle-${data.lastName}-${data.firstName}.pdf`,
          content: Buffer.from(pdfBytes),
          contentType: 'application/pdf',
        },
      ],
    })

    console.log('Email sent successfully:', info.messageId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error details:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF or send email', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 
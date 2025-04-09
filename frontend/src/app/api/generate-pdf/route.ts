import { NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import nodemailer from 'nodemailer'

const insuranceTypes = {
  single: 'Un adulte',
  single_children: 'Un adulte + enfant(s)',
  couple: 'Un couple',
  couple_children: 'Un couple + enfant(s)'
}

const coverageTypes = {
  minimal: 'Minimale',
  balanced: 'Equilibrée',
  maximal: 'Maximale'
}

const coverageLabels = {
  soinsMedicaux: 'Soins médicaux',
  hospitalisation: 'Hospitalisation',
  optique: 'Optique',
  dentaire: 'Dentaire',
  auditif: 'Auditif'
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595.28, 841.89]) // A4 size
    const { width, height } = page.getSize()

    // Add content to PDF
    page.drawText('Résumé de votre devis mutuelle santé', {
      x: 50,
      y: height - 50,
      size: 20,
    })

    // Personal Information
    page.drawText('Informations personnelles', {
      x: 50,
      y: height - 100,
      size: 16,
    })

    page.drawText(`Nom: ${formData.lastName}`, {
      x: 50,
      y: height - 130,
      size: 12,
    })

    page.drawText(`Prénom: ${formData.firstName}`, {
      x: 50,
      y: height - 150,
      size: 12,
    })

    page.drawText(`Date de naissance: ${formData.birthDate}`, {
      x: 50,
      y: height - 170,
      size: 12,
    })

    page.drawText(`Profession: ${formData.profession}`, {
      x: 50,
      y: height - 190,
      size: 12,
    })

    page.drawText(`Régime: ${formData.regime}`, {
      x: 50,
      y: height - 210,
      size: 12,
    })

    page.drawText(`Email: ${formData.email}`, {
      x: 50,
      y: height - 230,
      size: 12,
    })

    page.drawText(`Téléphone: ${formData.phone}`, {
      x: 50,
      y: height - 250,
      size: 12,
    })

    page.drawText(`Code postal: ${formData.postalCode}`, {
      x: 50,
      y: height - 270,
      size: 12,
    })

    // Second person information if applicable
    if (formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children') {
      page.drawText('Informations du conjoint', {
        x: 50,
        y: height - 300,
        size: 16,
      })

      page.drawText(`Nom: ${formData.secondPersonLastName}`, {
        x: 50,
        y: height - 330,
        size: 12,
      })

      page.drawText(`Prénom: ${formData.secondPersonFirstName}`, {
        x: 50,
        y: height - 350,
        size: 12,
      })

      page.drawText(`Date de naissance: ${formData.secondPersonBirthDate}`, {
        x: 50,
        y: height - 370,
        size: 12,
      })

      page.drawText(`Profession: ${formData.secondPersonProfession}`, {
        x: 50,
        y: height - 390,
        size: 12,
      })

      page.drawText(`Régime: ${formData.secondPersonRegime}`, {
        x: 50,
        y: height - 410,
        size: 12,
      })
    }

    // Insurance Type
    page.drawText('Type d\'assurance', {
      x: 50,
      y: height - (formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children' ? 450 : 300),
      size: 16,
    })

    page.drawText(insuranceTypes[formData.insuranceType as keyof typeof insuranceTypes] || '', {
      x: 50,
      y: height - (formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children' ? 480 : 330),
      size: 12,
    })

    // Current Insurance Status
    page.drawText('Situation actuelle', {
      x: 50,
      y: height - (formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children' ? 520 : 370),
      size: 16,
    })

    page.drawText(`Assuré actuellement: ${formData.isCurrentlyInsured === 'yes' ? 'Oui' : 'Non'}`, {
      x: 50,
      y: height - (formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children' ? 550 : 400),
      size: 12,
    })

    if (formData.isCurrentlyInsured === 'yes') {
      page.drawText(`Fin du contrat actuel: ${formData.contractEndMonth}`, {
        x: 50,
        y: height - (formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children' ? 570 : 420),
        size: 12,
      })
    }

    // Coverage Details
    page.drawText('Couverture choisie', {
      x: 50,
      y: height - (formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children' ? 610 : 460),
      size: 16,
    })

    if (formData.coverageType === 'personalized') {
      const coverageTypes = ['soinsMedicaux', 'hospitalisation', 'optique', 'dentaire', 'auditif']
      const coverageLabels = {
        soinsMedicaux: 'Soins médicaux',
        hospitalisation: 'Hospitalisation',
        optique: 'Optique',
        dentaire: 'Dentaire',
        auditif: 'Auditif'
      }

      let yOffset = formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children' ? 640 : 490
      coverageTypes.forEach((type) => {
        page.drawText(`${coverageLabels[type as keyof typeof coverageLabels]}: ${formData.personalizedCoverage[type]}`, {
          x: 50,
          y: height - yOffset,
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
      
      page.drawText(`Type: ${coverageTypes[formData.coverageType as keyof typeof coverageTypes] || ''}`, {
        x: 50,
        y: height - (formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children' ? 640 : 490),
        size: 12,
      })
    }

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save()

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    })

    // Prepare email content
    const emailContent = `
      <h1>Votre devis mutuelle santé</h1>
      <p>Bonjour ${formData.firstName},</p>
      <p>Voici un résumé de votre demande de devis :</p>
      <ul>
        <li><strong>Type d'assurance :</strong> ${insuranceTypes[formData.insuranceType as keyof typeof insuranceTypes]}</li>
        <li><strong>Nom :</strong> ${formData.lastName}</li>
        <li><strong>Prénom :</strong> ${formData.firstName}</li>
        <li><strong>Email :</strong> ${formData.email}</li>
        <li><strong>Téléphone :</strong> ${formData.phone}</li>
        <li><strong>Code postal :</strong> ${formData.postalCode}</li>
      </ul>
      ${formData.insuranceType === 'couple' || formData.insuranceType === 'couple_children' ? `
        <p><strong>Informations du conjoint :</strong></p>
        <ul>
          <li><strong>Nom :</strong> ${formData.secondPersonLastName}</li>
          <li><strong>Prénom :</strong> ${formData.secondPersonFirstName}</li>
          <li><strong>Date de naissance :</strong> ${formData.secondPersonBirthDate}</li>
          <li><strong>Profession :</strong> ${formData.secondPersonProfession}</li>
          <li><strong>Régime :</strong> ${formData.secondPersonRegime}</li>
        </ul>
      ` : ''}
      <p><strong>Couverture choisie :</strong></p>
      <ul>
        ${formData.coverageType === 'personalized' ? `
          ${Object.entries(formData.personalizedCoverage).map(([key, value]) => `
            <li>${coverageLabels[key as keyof typeof coverageLabels]}: ${value}</li>
          `).join('')}
        ` : `
          <li>Type: ${coverageTypes[formData.coverageType as keyof typeof coverageTypes]}</li>
        `}
      </ul>
      <p>Le PDF détaillé est joint à cet email.</p>
      <p>Cordialement,<br>L'équipe Insurance Comparator</p>
    `

    // Send email with PDF
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: `${formData.email}, ${process.env.EMAIL_TO}`,
      subject: `Votre devis mutuelle santé - ${formData.firstName} ${formData.lastName}`,
      html: emailContent,
      attachments: [
        {
          filename: `devis-mutuelle-${formData.lastName}-${formData.firstName}.pdf`,
          content: Buffer.from(pdfBytes),
          contentType: 'application/pdf',
        },
      ],
    })

    // Return PDF as response
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="insurance-summary.pdf"',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    )
  }
} 
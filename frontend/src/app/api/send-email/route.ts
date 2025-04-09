export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    const emailBody = `
      <h2>Nouvelle demande de devis</h2>
      
      <h3>Situation actuelle</h3>
      <p>Assuré actuellement: ${formData.currentlyInsured ? 'Oui' : 'Non'}</p>
      ${formData.currentlyInsured ? `<p>Fin du contrat actuel: ${formData.contractEndDate}</p>` : ''}
      ${formData.currentInsurer ? `<p>Assureur actuel: ${formData.currentInsurer}</p>` : ''}
      
      <h3>Type d'assurance</h3>
      // ... existing code ...
    `;

    // ... rest of the function ...
  } catch (error) {
    // ... error handling ...
  }
} 
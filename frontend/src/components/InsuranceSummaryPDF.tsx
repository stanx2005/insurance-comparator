import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#0066cc',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 15,
    color: '#333333',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666666',
  },
  bold: {
    fontWeight: 'bold',
  },
  coverageBar: {
    height: 10,
    backgroundColor: '#e5e7eb',
    marginTop: 5,
    marginBottom: 10,
  },
  coverageLevel: {
    height: '100%',
    backgroundColor: '#0066cc',
  },
})

interface InsuranceSummaryPDFProps {
  formData: any
}

const getCoverageLevelWidth = (level: string) => {
  const levels = { minimum: 0.25, moyen: 0.5, fort: 0.75, maximum: 1 }
  return `${(levels[level] || 0.25) * 100}%`
}

const InsuranceSummaryPDF = ({ formData }: InsuranceSummaryPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Résumé de votre devis mutuelle santé</Text>

          {/* Personal Information */}
          <Text style={styles.subtitle}>Informations personnelles</Text>
          <Text style={styles.text}>Nom: {formData.lastName}</Text>
          <Text style={styles.text}>Prénom: {formData.firstName}</Text>
          <Text style={styles.text}>Email: {formData.email}</Text>
          <Text style={styles.text}>Téléphone: {formData.phone}</Text>

          {/* Insurance Type */}
          <Text style={styles.subtitle}>Type d'assurance</Text>
          <Text style={styles.text}>
            {formData.insuranceType === 'single' && 'Un adulte'}
            {formData.insuranceType === 'single_children' && 'Un adulte + enfant(s)'}
            {formData.insuranceType === 'couple' && 'Un couple'}
            {formData.insuranceType === 'couple_children' && 'Un couple + enfant(s)'}
          </Text>

          {/* Regime Information */}
          <Text style={styles.subtitle}>Régime social</Text>
          <Text style={styles.text}>
            {formData.regime === 'general' && 'Régime général'}
            {formData.regime === 'tns' && 'Travailleur Non Salarié (TNS)'}
            {formData.regime === 'agricole' && 'Régime agricole'}
            {formData.regime === 'alsace-moselle' && 'Régime Alsace-Moselle'}
          </Text>

          {/* Coverage Details */}
          <Text style={styles.subtitle}>Couverture choisie</Text>
          {formData.coverageType === 'personalized' ? (
            <>
              <Text style={styles.text}>Type: Personnalisée</Text>
              
              {/* Soins médicaux */}
              <Text style={[styles.text, styles.bold]}>Soins médicaux</Text>
              <Text style={styles.text}>Niveau: {formData.personalizedCoverage.soinsMedicaux}</Text>
              <View style={styles.coverageBar}>
                <View style={[styles.coverageLevel, { width: getCoverageLevelWidth(formData.personalizedCoverage.soinsMedicaux) }]} />
              </View>

              {/* Hospitalisation */}
              <Text style={[styles.text, styles.bold]}>Hospitalisation</Text>
              <Text style={styles.text}>Niveau: {formData.personalizedCoverage.hospitalisation}</Text>
              <View style={styles.coverageBar}>
                <View style={[styles.coverageLevel, { width: getCoverageLevelWidth(formData.personalizedCoverage.hospitalisation) }]} />
              </View>

              {/* Optique */}
              <Text style={[styles.text, styles.bold]}>Optique</Text>
              <Text style={styles.text}>Niveau: {formData.personalizedCoverage.optique}</Text>
              <View style={styles.coverageBar}>
                <View style={[styles.coverageLevel, { width: getCoverageLevelWidth(formData.personalizedCoverage.optique) }]} />
              </View>

              {/* Dentaire */}
              <Text style={[styles.text, styles.bold]}>Dentaire</Text>
              <Text style={styles.text}>Niveau: {formData.personalizedCoverage.dentaire}</Text>
              <View style={styles.coverageBar}>
                <View style={[styles.coverageLevel, { width: getCoverageLevelWidth(formData.personalizedCoverage.dentaire) }]} />
              </View>

              {/* Auditif */}
              <Text style={[styles.text, styles.bold]}>Auditif</Text>
              <Text style={styles.text}>Niveau: {formData.personalizedCoverage.auditif}</Text>
              <View style={styles.coverageBar}>
                <View style={[styles.coverageLevel, { width: getCoverageLevelWidth(formData.personalizedCoverage.auditif) }]} />
              </View>
            </>
          ) : (
            <Text style={styles.text}>
              Type: {
                formData.coverageType === 'minimal' ? 'Minimale' :
                formData.coverageType === 'balanced' ? 'Equilibrée' :
                formData.coverageType === 'maximal' ? 'Maximale' : ''
              }
            </Text>
          )}

          {/* Contract Information */}
          <Text style={styles.subtitle}>Informations contrat</Text>
          <Text style={styles.text}>Code postal/Ville: {formData.postalCode}</Text>
          <Text style={styles.text}>
            Actuellement assuré: {formData.isCurrentlyInsured === 'yes' ? 'Oui' : 'Non'}
          </Text>
          {formData.isCurrentlyInsured === 'yes' && (
            <Text style={styles.text}>Mois d'échéance: {formData.contractEndMonth}</Text>
          )}
          {formData.isCurrentlyInsured === 'no' && (
            <Text style={styles.text}>Date souhaitée: {formData.desiredStartDate}</Text>
          )}
        </View>
      </Page>
    </Document>
  )
}

export default InsuranceSummaryPDF 
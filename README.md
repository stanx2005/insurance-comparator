# Insurance Comparator Project

## Current Development State

### Running Configuration
- Development server running on port 3002
- Environment variables loaded from .env.local
- SMTP connection verified and working with Gmail

### Active Issues
1. Missing image files in public directory:
   ```
   /lelynx-logo.png
   /logos/irp.png
   /logos/generali.png
   /logos/malakoff.png
   /logos/mgen.png
   /logos/april.png
   /logos/swiss-life.png
   /logos/axa.png
   /logos/maaf.png
   /logos/gmf.png
   ```

### Next Steps After Restart
1. Install Git properly:
   ```bash
   # Download and install Git from https://git-scm.com/download/win
   # After installation and restart:
   cd /c/Users/LENOVO/insurance-comparator
   git init
   git add frontend/
   git add .gitignore
   git add README.md
   git commit -m "Initial commit"
   ```

2. Set up GitHub repository:
   - Create new repository on GitHub
   - Connect local repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/insurance-comparator.git
   git push -u origin main
   ```

3. Deploy to Vercel:
   - Connect GitHub repository
   - Configure environment variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=sboudal05@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=sboudal05@gmail.com
   ```

## Current State

### Form Structure
- Multi-step form for health insurance comparison with 5 steps:
  1. Adhérents (Members)
  2. Régime (Social Security Regime)
  3. Contrat (Contract)
  4. Besoins (Needs)
  5. Coordonnées (Contact Information)

### Key Features Implemented
1. **Personal Information Collection**
   - Single/Couple insurance options
   - Personal details (name, birth date, profession)
   - Second person information for couples
   - Gender selection with appropriate pronouns

2. **Coverage Options**
   - Personalized coverage selection
   - Visual progress bars for coverage levels
   - Categories:
     - Soins Médicaux (Medical Care)
     - Hospitalisation
     - Optique (Optical)
     - Dentaire (Dental)
     - Auditif (Hearing Aids)

3. **PDF Generation & Email**
   - Automatic PDF generation with form data
   - Email configuration set to: tahirreda93@gmail.com
   - Includes all personal information and coverage choices

4. **Results Page**
   - Display of insurance offers
   - Company logos integration
   - Sorting by price
   - Coverage level visualization

## Known Issues
1. Missing logo files in `/frontend/public/logos/`:
   - irp.png
   - generali.png
   - malakoff.png
   - mgen.png
   - april.png
   - swiss-life.png
   - axa.png
   - maaf.png
   - gmf.png
   - lelynx-logo.png

## Next Steps
1. **Asset Integration**
   - Add missing insurance company logos
   - Ensure proper image formatting and optimization

2. **Form Enhancements**
   - Add form validation
   - Improve error handling
   - Add loading states

3. **UI/UX Improvements**
   - Enhance coverage selection visualization
   - Improve responsive design
   - Add more detailed tooltips

4. **Results Page**
   - Enhance offer comparison layout
   - Add filtering options
   - Improve mobile responsiveness

## Technical Details
- Built with Next.js 14.1.3
- Uses PDF-lib for PDF generation
- Nodemailer for email functionality
- Tailwind CSS for styling

## Environment Setup
Required environment variables:
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- SMTP_FROM

## Running the Project
```bash
cd frontend
npm run dev
```
Server runs on http://localhost:3000 (or next available port) 
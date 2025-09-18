export function ClinicSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Sagital",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C/ del Río, 8",
      "addressLocality": "Ciudad Real",
      "addressCountry": "ES"
    },
    "telephone": "+34926923838",
    "contactPoint": [
      { "@type": "ContactPoint", "telephone": "+34926923838", "contactType": "Atención primaria" },
      { "@type": "ContactPoint", "telephone": "+34621126286", "contactType": "Servicios y profesionales" }
    ]
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}


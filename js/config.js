/**
 * GOODWILL HOLIDAYS – Central Business & SEO Configuration
 * Single source of truth for business details, contact information, and SEO parameters.
 */

const GOODWILL_CONFIG = {
    // ─── Contact Details ─────────────────────────────────────────────
    whatsapp: "919747790799",             // WhatsApp number (country code + number, no +)
    phone: "+91 97477 90799",             // Display phone number
    phoneRaw: "919747790799",             // Phone number for tel: links
    website: "https://www.goodwillholidays.in",

    // ─── Business Info ────────────────────────────────────────────────
    businessName: "Goodwill Holidays",
    legalName: "Goodwill Holidays Taxi & Homestay Services",
    tagline: "Kerala Taxi Service, Airport Transfers & Family Homestays",
    addressShort: "Wayanad, Kerala, India",
    addressFull: "Goodwill Holidays, Moolankavu, Sulthan Bathery, Wayanad, Kerala 673592, India",
    address: {
        street: "Moolankavu",
        locality: "Sulthan Bathery",
        region: "Wayanad, Kerala",
        postalCode: "673592",
        country: "IN",
        countryName: "India"
    },
    geo: {
        latitude: "11.6625",
        longitude: "76.2570"
    },
    serviceAreas: [
        "Kerala",
        "Wayanad",
        "Kochi",
        "Calicut",
        "Trivandrum",
        "Kannur",
        "Munnar",
        "Alleppey",
        "Thekkady",
        "Coimbatore",
        "Bangalore",
        "Chennai"
    ],
    googleMapsEmbed: "https://maps.google.com/?q=Moolankavu,Wayanad,Kerala,India",
    businessHours: "Mon–Sun: 6:00 AM – 10:00 PM IST",
    openingHoursSpecification: "Mo-Su 06:00-22:00",
    supportAvailability: "24/7 On-Trip Emergency & Taxi Support",
    established: "2010",

    // ─── Social Media ─────────────────────────────────────────────────
    social: {
        instagram: "https://www.instagram.com/goodwill__holidays?igsi=ZDNlZDc0MzIxNw==",
        facebook: "https://facebook.com/goodwillholidays"
    },

    // ─── SEO Metadata ─────────────────────────────────────────────────
    seo: {
        defaultTitle: "Goodwill Holidays | Kerala Taxi Service, Airport Transfers & Homestays",
        defaultDescription: "Reliable 24/7 airport taxi transfers across Kerala (Kochi, Calicut, Trivandrum), private cab services, and authentic family homestays in Wayanad.",
        siteUrl: "https://www.goodwillholidays.in",
        defaultImage: "https://www.goodwillholidays.in/assets/images/hero.jpg",
        locale: "en_IN",
        keywords: "Kerala taxi service, airport transfer Kerala, Kochi airport taxi, Calicut airport cab, Wayanad taxi, Moolankavu homestay, Wayanad family homestay, Goodwill Holidays"
    }
};

/**
 * Helper to generate pre-filled WhatsApp URLs
 */
function generateWhatsAppURL(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${GOODWILL_CONFIG.whatsapp}?text=${encoded}`;
}

/**
 * Helper to format transfer booking inquiries
 */
function formatTransferInquiry(pickup, dropoff, date, time, passengers) {
    return `Hello Goodwill Holidays! 🚗\n\nI would like to book an Airport Transfer:\n\n📍 Pickup: ${pickup}\n🏁 Drop-off: ${dropoff}\n📅 Date: ${date}\n🕐 Time: ${time}\n👥 Passengers: ${passengers}\n\nPlease confirm availability. Thank you!`;
}

/**
 * Helper to format general travel inquiries
 */
function formatGeneralInquiry(service, details) {
    return `Hello Goodwill Holidays! 👋\n\nI'm interested in: ${service}\n\nDetails:\n${details}\n\nPlease get in touch. Thank you!`;
}

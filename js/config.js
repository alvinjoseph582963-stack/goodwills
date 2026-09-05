/**
 * GOODWILL HOLIDAYS – Central Configuration
 * Update this file to change contact details site-wide.
 */

const GOODWILL_CONFIG = {
    // ─── Contact Details ─────────────────────────────────────────────
    whatsapp: "919747790799",             // WhatsApp number (country code + number, no +)
    phone: "+91 97477 90799",             // Display phone number
    phoneRaw: "919747790799",             // Phone number for tel: links
    website: "https://www.goodwillholidays.in",

    // ─── Business Info ────────────────────────────────────────────────
    businessName: "Goodwill Holidays",
    tagline: "Taxi Service",
    address: "Wayanad, Kerala, India",
    addressFull: "Goodwill Holidays, Moolankavu, Wayanad, Kerala, India",
    googleMapsEmbed: "https://maps.google.com/?q=Moolankavu,Wayanad,Kerala,India",
    businessHours: "Mon–Sun: 6:00 AM – 10:00 PM IST",
    established: "2010",

    // ─── Social Media ─────────────────────────────────────────────────
    social: {
        facebook: "https://facebook.com/goodwillholidays",
        instagram: "https://instagram.com/goodwillholidays",
        youtube: "https://youtube.com/goodwillholidays",
        twitter: "https://twitter.com/goodwillhols"
    },

    // ─── SEO Defaults ─────────────────────────────────────────────────
    seo: {
        defaultTitle: "Goodwill Holidays – Taxi Service | Kerala & South India",
        defaultDescription: "Premium taxi service in Kerala and South India. Airport transfers and family-friendly homestays. Book your ride today.",
        keywords: "airport transfer Kerala, taxi service Wayanad, taxi Kochi, homestay Wayanad, Moolankavu homestay"
    }
};

function generateWhatsAppURL(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${GOODWILL_CONFIG.whatsapp}?text=${encoded}`;
}

?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function formatTransferInquiry(pickup, dropoff, date, time, passengers) {
    return `Hello Goodwill Holidays! 🚗\n\nI would like to book an Airport Transfer:\n\n📍 Pickup: ${pickup}\n🏁 Drop-off: ${dropoff}\n📅 Date: ${date}\n🕐 Time: ${time}\n👥 Passengers: ${passengers}\n\nPlease confirm availability. Thank you!`;
}

function formatGeneralInquiry(service, details) {
    return `Hello Goodwill Holidays! 👋\n\nI'm interested in: ${service}\n\nDetails:\n${details}\n\nPlease get in touch. Thank you!`;
}

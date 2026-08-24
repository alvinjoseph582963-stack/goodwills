/**
 * GOODWILL HOLIDAYS – Content Data
 * All website content is managed here.
 * Update this file to add/edit tours, homestays, destinations, etc.
 */

// â"â‚¬â"â‚¬â"â‚¬ DESTINATIONS â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬

const destinations = [
    {
        id: "munnar",
        name: "Munnar",
        state: "Kerala",
        tagline: "The Tea Garden Paradise",
        image: "assets/images/munnar.jpg",
        description: "Rolling hills of emerald tea estates, breathtaking valleys, and cool misty mornings make Munnar one of Kerala's most enchanting destinations.",
        highlights: ["Tea Museum", "Eravikulam National Park", "Mattupetty Dam", "Echo Point"],
        bestTime: "Oct – Mar",
        distance: "130 km from Kochi"
    },
    {
        id: "alleppey",
        name: "Alleppey",
        state: "Kerala",
        tagline: "Venice of the East",
        image: "assets/images/alleppey.jpg",
        description: "Drift through a network of serene backwaters on a traditional houseboat, surrounded by lush paddy fields and coconut groves.",
        highlights: ["Houseboat Cruise", "Alleppey Beach", "Krishnapuram Palace", "Marari Beach"],
        bestTime: "Nov – Feb",
        distance: "53 km from Kochi"
    },
    {
        id: "wayanad",
        name: "Wayanad",
        state: "Kerala",
        tagline: "Green Paradise of the Hills",
        image: "assets/images/wayanad.jpg",
        description: "Ancient forests, tribal villages, cascading waterfalls and misty highlands await in this biodiverse jewel of northern Kerala.",
        highlights: ["Chembra Peak", "Edakkal Caves", "Banasura Sagar Dam", "Pookode Lake"],
        bestTime: "Oct – May",
        distance: "280 km from Kochi"
    },
    {
        id: "ooty",
        name: "Ooty",
        state: "Tamil Nadu",
        tagline: "The Queen of Hill Stations",
        image: "assets/images/ooty.jpg",
        description: "The iconic Nilgiri hills with their cool climate, botanical gardens, and the heritage toy train make Ooty a timeless South Indian escape.",
        highlights: ["Botanical Gardens", "Toy Train", "Ooty Lake", "Doddabetta Peak"],
        bestTime: "Apr – Jun, Sep – Nov",
        distance: "290 km from Kochi"
    },
    {
        id: "coorg",
        name: "Coorg",
        state: "Karnataka",
        tagline: "Scotland of India",
        image: "assets/images/coorg.jpg",
        description: "Coffee plantations, misty forests, and the warrior Kodava culture create an irresistible blend of nature and heritage in this Karnataka gem.",
        highlights: ["Abbey Falls", "Raja's Seat", "Namdroling Monastery", "Dubare Elephant Camp"],
        bestTime: "Oct – Mar",
        distance: "250 km from Kochi"
    },
    {
        id: "kovalam",
        name: "Kovalam",
        state: "Kerala",
        tagline: "Crescent Beach Bliss",
        image: "assets/images/kovalam.jpg",
        description: "Three pristine crescent beaches, Ayurvedic wellness, vibrant seafood markets and spectacular sunsets make Kovalam Kerala's beach capital.",
        highlights: ["Lighthouse Beach", "Hawah Beach", "Samudra Beach", "Ayurvedic Spas"],
        bestTime: "Nov – Mar",
        distance: "14 km from Trivandrum"
    },
    {
        id: "thekkady",
        name: "Thekkady",
        state: "Kerala",
        tagline: "Spice & Wildlife Sanctuary",
        image: "assets/images/thekkady.jpg",
        description: "Periyar Wildlife Sanctuary, aromatic spice gardens, and thrilling jungle safaris make Thekkady one of Kerala's most exciting eco-tourism destinations.",
        highlights: ["Periyar Tiger Reserve", "Spice Garden Tours", "Elephant Camp", "Bamboo Rafting"],
        bestTime: "Oct – Mar",
        distance: "190 km from Kochi"
    }
];

// --- HOMESTAYS ---

const homestays = [
    {
        id: 1,
        name: "Moolankavu Family Homestay",
        location: "Moolankavu",
        region: "Wayanad",
        state: "Kerala",
        image: "assets/images/homestay.jpg",
        guests: 8,
        bedrooms: 4,
        rating: 4.9,
        reviewCount: 42,
        description: "A warm, authentic family homestay nestled in the serene village of Moolankavu, deep in the lush forests of Wayanad. Surrounded by coffee and pepper plantations, this is the perfect retreat for families seeking a genuine Kerala experience - home-cooked meals, nature walks, and the sounds of the forest.",
        amenities: ["Home-cooked Kerala Meals", "Forest View", "Nature Walks", "Coffee Plantation", "Free Parking", "Campfire", "Bird Watching", "Traditional Architecture"],
        familyFriendly: true,
        featured: true,
        highlights: ["Authentic Wayanad forest setting", "Traditional Kerala wooden home", "Coffee & pepper plantation walks", "Family-run with warm hospitality"],
        houseRules: ["Check-in: 12 Noon", "Check-out: 11 AM", "Families with children welcome", "No smoking indoors", "Please respect local customs"],
        nearbyAttractions: ["Moolankavu Devi Temple (0.5 km)", "Chembra Peak (22 km)", "Edakkal Caves (18 km)", "Pookode Lake (20 km)", "Soochipara Waterfalls (28 km)"],
        contact: "+91 97477 90799"
    }
];

const services = [
    {
        id: "airport-transfer",
        title: "Airport Transfer",
        icon: "✈️",
        description: "Punctual, professional airport pickup and drop service. AC vehicles, flight tracking, and courteous drivers.",
        link: "airport-transfer.html"
    },
    {
        id: "taxi",
        title: "Taxi Services",
        icon: "🚗",
        description: "Reliable outstation and local taxi services across Kerala and South India with experienced drivers.",
        link: "contact.html"
    },
    {
        id: "homestays",
        title: "Homestays",
        icon: "🏡",
        description: "Handpicked family-friendly homestays offering authentic Kerala hospitality and home-cooked meals.",
        link: "homestays.html"
    }
];

// â"â‚¬â"â‚¬â"â‚¬ FAQs â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬

const faqs = [
    {
        question: "How do I book a taxi or airport transfer?",
        answer: "Simply click 'Book Now' or 'WhatsApp Us' on any page. We'll confirm your booking within 2 hours. You can also call or email us directly."
    },
    {
        question: "Do you offer airport pickup at all major airports in South India?",
        answer: "Yes! We provide airport transfers at Kochi, Trivandrum, Calicut, Coimbatore, Chennai, Bangalore, and Mysore airports."
    },
    {
        question: "Are your vehicles AC-equipped?",
        answer: "All our vehicles are fully air-conditioned and regularly maintained. We have sedans, SUVs, Innova, and Tempo Travellers for groups."
    },
    {
        question: "Is there a cancellation policy?",
        answer: "We offer flexible cancellations. Airport transfers can be cancelled up to 24 hours in advance for a full refund."
    },
    {
        question: "Is your service family-friendly?",
        answer: "Yes! We specialize in family travel. We can provide child safety seats and comfortable, spacious vehicles for families of any size."
    },
    {
        question: "What's your response time for inquiries?",
        answer: "WhatsApp inquiries are typically answered within 24 hours. Email inquiries within 24 hours. We're available 6 AM – 10 PM IST every day."
    }
];

// â"â‚¬â"â‚¬â"â‚¬ STATS â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬

const stats = [
    { value: "5000+", label: "Happy Travelers" },
    { value: "15+", label: "Years Experience" },
    { value: "200+", label: "Routes Covered" },
    { value: "4.9★", label: "Average Rating" }
];

// â"â‚¬â"â‚¬â"â‚¬ VEHICLE OPTIONS (Airport Transfer) â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬â"â‚¬

const vehicles = [
    {
        id: "sedan",
        name: "Sedan",
        model: "Toyota Etios / Dzire",
        capacity: 4,
        luggage: 2,
        icon: "🚗",
        priceBase: 1200,
        pricePerKm: 12,
        description: "Comfortable, fuel-efficient sedan perfect for solo travelers and couples.",
        features: ["AC", "4 Passengers", "2 Bags", "Bottled Water", "Free Wi-Fi Hotspot"]
    },
    {
        id: "suv",
        name: "Premium SUV",
        model: "Toyota Innova / Ertiga",
        capacity: 6,
        luggage: 4,
        icon: "🚙",
        priceBase: 1800,
        pricePerKm: 16,
        description: "Spacious, comfortable SUV ideal for small families and groups.",
        features: ["AC", "6-7 Passengers", "4 Bags", "Bottled Water", "Charging Ports", "Reclining Seats"]
    },
    {
        id: "tempo",
        name: "Tempo Traveller",
        model: "Force Traveller",
        capacity: 12,
        luggage: 8,
        icon: "🚐",
        priceBase: 2800,
        pricePerKm: 22,
        description: "Large minivan for big families and group travel with ample luggage space.",
        features: ["AC", "12 Passengers", "8 Bags", "Push-back Seats", "Music System", "TV Screen"]
    }
];

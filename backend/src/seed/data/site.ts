// Site-wide content for Sewa Bharti Samiti Rajasthan.
// Source of truth: content approved from sewabhartirajasthan.org (official site).
// Do NOT invent facts. Use [CONTENT REQUIRED: ...] for anything unverified.

export interface NavItem {
  label: string;
  labelHi?: string;
  href: string;
}

export interface ContactOffice {
  name: string;
  nameHi?: string;
  address: string;
  phones: string[];
  email?: string;
  role?: string;
}

export const site = {
  name: "Sewa Bharti Samiti Rajasthan",
  nameHi: "सेवा भारती समिति, राजस्थान",
  shortName: "Sewa Bharti",
  tagline: "सेवा परमो धर्मः",
  taglineEn: "Service is the highest duty",
  logo: "/logo.png",

  // Short, factual introduction (summarised from the official About text).
  introHi:
    "सेवा भारती समिति राजस्थान एक गैर-सरकारी संगठन है, जो आर्थिक एवं सामाजिक दृष्टि से पिछड़े तथा वंचित वर्गों के बीच नगरीय झुग्गी-झोपड़ी बस्तियों एवं ग्रामीण क्षेत्रों में सेवा कार्य करता है। संस्था निशुल्क शिक्षा, निशुल्क चिकित्सा, कौशल विकास एवं सामाजिक समरसता के क्षेत्र में कार्यरत है।",
  introEn:
    "Sewa Bharti Samiti Rajasthan is a non-governmental organisation working among economically and socially deprived communities across urban settlements and rural areas of Rajasthan, through free education, free healthcare, skill development and social harmony programmes.",

  // Verified from the official About page.
  sewaKaaryCount: "1610",
  sewaKaaryNote:
    "संपूर्ण राजस्थान में प्रत्यक्ष रूप से या संलग्न संस्थाओं के माध्यम से संचालित सेवा कार्य।",

  establishedYear: "1987",
  districts: "33",

  registration: {
    number: "106/Rajasthan 1987-88",
    date: "16 July 1987",
    reg80G: "80G/831/2007-2008, dated 24-08-2007",
    pan: "AABTS4114N",
  },

  registeredOffice:
    "Sewa Sadan, Lalkothi Yojana, Sahkar Marg, Sahkar Lane, Jaipur - 302015, Rajasthan",

  nav: [
    { label: "Home", labelHi: "होम", href: "/" },
    { label: "About Us", labelHi: "हमारे बारे में", href: "/about-us" },
    { label: "Shiksha", labelHi: "शिक्षा", href: "/shiksha" },
    { label: "Swavalamban", labelHi: "स्वावलंबन", href: "/swavalamban" },
    { label: "Samajik", labelHi: "सामाजिक", href: "/samajik" },
    { label: "Swasthya", labelHi: "स्वास्थ्य", href: "/swasthya" },
    { label: "Events", labelHi: "कार्यक्रम", href: "/events" },
    { label: "Contact", labelHi: "संपर्क", href: "/contact" },
  ] as NavItem[],

  contact: {
    primaryEmail: "sewabhartijpr@gmail.com",
    offices: [
      {
        name: "Regional Office (Kshetriya Karyalay)",
        nameHi: "राजस्थान क्षेत्रीय कार्यालय",
        address: "Sewa Sadan, Sahkar Marg, Lalkothi, Jaipur, Rajasthan - 302007",
        phones: ["0141-2741222", "0141-2744545"],
        email: "sewabhartijpr@gmail.com",
      },
      {
        name: "Jaipur Prant Office",
        nameHi: "सेवा भारती समिति, जयपुर प्रान्त",
        address: "Suraj Bhawan, Sahkar Lane, Sahkar Marg, Lal Kothi, Jaipur",
        phones: ["9352008347"],
        role: "Prant Mantri",
        email: "sewabhartijpr@gmail.com",
      },
      {
        name: "Kota Office",
        nameHi: "सेवा भारती समिति, कोटा",
        address: "Suraj Bhawan, 121-A, Ballabh Badi, Gumanpura, Kota - 324007",
        phones: ["9460941842", "9352008347"],
        role: "Prant Mantri",
      },
    ] as ContactOffice[],
  },
} as const;

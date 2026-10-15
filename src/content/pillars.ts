// The four pillars (chaar aayam) of Sewa Bharti.
// Content summarised faithfully from the official About / pillar pages.
// Each pillar's activities are real programmes described by the organisation.

export interface PillarActivity {
  titleHi: string;
  titleEn: string;
  descHi: string;
}

export interface Pillar {
  slug: "shiksha" | "swavalamban" | "samajik" | "swasthya";
  nameEn: string;
  nameHi: string;
  summaryEn: string;
  summaryHi: string;
  // Accent key maps to a token defined in globals.css.
  accent: "saffron" | "blue";
  activities: PillarActivity[];
}

export const pillars: Pillar[] = [
  {
    slug: "shiksha",
    nameEn: "Shiksha",
    nameHi: "शिक्षा",
    summaryEn:
      "Free education for children of underserved settlements, from early learning and value education to libraries and coaching support.",
    summaryHi:
      "अभावग्रस्त बस्तियों के बच्चों के लिए निशुल्क शिक्षा — बाल संस्कार से लेकर पुस्तकालय एवं कोचिंग सहयोग तक।",
    accent: "saffron",
    activities: [
      {
        titleHi: "बालवाड़ी एवं बाल संस्कार केंद्र",
        titleEn: "Balwadi & Bal Sanskar Kendra",
        descHi:
          "छोटे बच्चों के लिए प्रारंभिक शिक्षा एवं संस्कार केंद्र, जहाँ खेल-खेल में पढ़ाई, गीत-प्रार्थना एवं अच्छे संस्कार सिखाए जाते हैं।",
      },
      {
        titleHi: "निशुल्क शिक्षा — सेवा भारती बाल विद्यालय",
        titleEn: "Free Education — Sewa Bharti Bal Vidyalaya",
        descHi:
          "वंचित वर्ग के विद्यार्थियों को निशुल्क शिक्षा दी जाती है, जिससे वे मुख्यधारा की शिक्षा से जुड़ सकें।",
      },
      {
        titleHi: "पुस्तकालय एवं वाचनालय",
        titleEn: "Library & Reading Room",
        descHi:
          "सेवा सदन में हजारों पुस्तकों का पुस्तकालय एवं वाचनालय। अन्य सेवा बस्तियों में झोला पुस्तकालय एवं कोचिंग सेंटर भी चलाए जाते हैं।",
      },
    ],
  },
  {
    slug: "swavalamban",
    nameEn: "Swavalamban",
    nameHi: "स्वावलंबन",
    summaryEn:
      "Skill development and self-reliance through vocational training, computer education and self-help groups.",
    summaryHi:
      "कौशल विकास, कंप्यूटर प्रशिक्षण एवं स्वयं सहायता समूहों के माध्यम से आत्मनिर्भरता की ओर।",
    accent: "blue",
    activities: [
      {
        titleHi: "कौशल विकास केंद्र",
        titleEn: "Kaushal Vikas Kendra (Skill Development)",
        descHi:
          "सिलाई एवं फैशन डिजाइनिंग प्रशिक्षण। सेवा सदन सहित बस्तियों में 15 से अधिक सिलाई केंद्र संचालित हैं।",
      },
      {
        titleHi: "कंप्यूटर प्रशिक्षण",
        titleEn: "Computer Training",
        descHi:
          "टैली, बेसिक कंप्यूटर एवं ग्राफिक्स के पाठ्यक्रम। अन्य सेवा बस्तियों में भी कंप्यूटर प्रशिक्षण केंद्र चलाए जाते हैं।",
      },
      {
        titleHi: "स्वयं सहायता समूह",
        titleEn: "Self-Help Groups",
        descHi:
          "पिछड़ी बस्तियों की महिलाओं एवं पुरुषों में बचत के माध्यम से लघु उद्योग एवं आत्मनिर्भरता को प्रोत्साहन।",
      },
    ],
  },
  {
    slug: "samajik",
    nameEn: "Samajik",
    nameHi: "सामाजिक समरसता",
    summaryEn:
      "Building social harmony through yoga and satsang centres, community festivals and service at fairs.",
    summaryHi:
      "योग एवं सत्संग केंद्र, उत्सव-जयंतियों एवं मेलों में सेवा के माध्यम से सामाजिक समरसता का निर्माण।",
    accent: "saffron",
    activities: [
      {
        titleHi: "योग एवं सत्संग केंद्र",
        titleEn: "Yoga & Satsang Centres",
        descHi:
          "सेवा बस्तियों में सामाजिक सद्भाव एवं समरसता हेतु साप्ताहिक योग एवं सत्संग केंद्र संचालित किए जाते हैं।",
      },
      {
        titleHi: "उत्सव एवं जयंतियाँ",
        titleEn: "Festivals & Jayantis",
        descHi:
          "महर्षि वाल्मीकि जयंती, मकर संक्रांति एवं रक्षाबंधन जैसे पर्व सामाजिक समरसता के भाव से मनाए जाते हैं।",
      },
      {
        titleHi: "मेलों में सेवा कार्य एवं ‘सेवा सरोज’ पत्रिका",
        titleEn: "Service at Fairs & 'Sewa Saroj' Magazine",
        descHi:
          "बाबा रामदेव जी एवं खाटू श्याम जी जैसे मेलों में सेवा व्यवस्था। संस्था विगत 35 वर्षों से ‘सेवा सरोज’ पत्रिका प्रकाशित करती है।",
      },
    ],
  },
  {
    slug: "swasthya",
    nameEn: "Swasthya",
    nameHi: "स्वास्थ्य",
    summaryEn:
      "Accessible healthcare through consultation centres, mobile clinics, medical camps and patient assistance.",
    summaryHi:
      "परामर्श केंद्र, चल चिकित्सालय, चिकित्सा शिविर एवं रुग्ण सहायता के माध्यम से सुलभ स्वास्थ्य सेवा।",
    accent: "blue",
    activities: [
      {
        titleHi: "स्वास्थ्य परामर्श एवं जांच केंद्र",
        titleEn: "Health Consultation & Diagnostic Centre",
        descHi:
          "सेवा सदन के प्रथम तल पर आधुनिक जांच केंद्र, जहाँ वरिष्ठ चिकित्सकों द्वारा परामर्श एवं उपचार किया जाता है। माह के अंतिम रविवार को चिकित्सा शिविर भी लगाए जाते हैं।",
      },
      {
        titleHi: "चल चिकित्सालय",
        titleEn: "Mobile Clinic (Chal Chikitsalaya)",
        descHi:
          "एंबुलेंस वैन में एक डॉक्टर एवं एक कंपाउंडर के साथ ग्रामीण एवं नगरीय क्षेत्रों में नियमित चिकित्सा सेवा उपलब्ध कराई जाती है।",
      },
      {
        titleHi: "रुग्ण सहायता एवं नेत्र शिविर",
        titleEn: "Patient Assistance & Eye Camps",
        descHi:
          "गरीब रोगियों के लिए रुग्ण सहायता केंद्र, मनोरोग चिकित्सालय में भोजनशाला एवं समय-समय पर नेत्र चिकित्सा शिविर आयोजित किए जाते हैं।",
      },
    ],
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

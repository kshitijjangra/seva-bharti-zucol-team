// Events / seva activities.
// Only real, published activities from the official site are listed here.
// Do NOT fabricate event names, dates, locations or descriptions.
// Photographs are intentionally omitted until the organisation supplies them.

export interface EventItem {
  id: string;
  titleHi: string;
  titleEn?: string;
  date: string; // as published by the organisation
  location?: string;
  summaryHi: string;
  // image?: string; // [CONTENT REQUIRED] add only user-supplied photographs
}

export const events: EventItem[] = [
  {
    id: "kishangarh-chikitsa-shivir",
    titleHi: "सेवा भारती किशनगढ़ चिकित्सा शिविर",
    titleEn: "Sewa Bharti Kishangarh Medical Camp",
    date: "Published Jan 2, 2021",
    location: "Kishangarh / Jaipur, Rajasthan",
    summaryHi:
      "सेवा भारती किशनगढ़ एवं आयुष क्लिनिक जयपुर के संयुक्त तत्वावधान में निशुल्क आयुर्वेदिक चिकित्सा शिविर आयोजित किया गया, जिसमें लगभग 80 रोगी लाभान्वित हुए।",
  },
  {
    id: "kesarpura-bal-sanskar-kendra",
    titleHi: "बाल संस्कार केंद्र अवलोकन — केसरपुरा (शिवगंज), सिरोही",
    titleEn: "Bal Sanskar Kendra Observation — Kesarpura, Sirohi",
    date: "Published Feb 4, 2021",
    location: "Kesarpura (Shivganj), Sirohi, Rajasthan",
    summaryHi:
      "रानीवाड़ा द्वारा संचालित बाल संस्कार केंद्र का अधिकारियों द्वारा अवलोकन किया गया। बालकों को गीत, प्रार्थना एवं खेलों का अभ्यास कराया गया।",
  },
  {
    id: "samoohik-vivah-samajik-samrasta",
    titleHi: "सामाजिक समरसता — सामूहिक विवाह आयोजन",
    titleEn: "Social Harmony — Community Weddings",
    date: "Published Feb 4, 2021",
    location: "Rajasthan",
    summaryHi:
      "सामाजिक समरसता के भाव से आयोजित सामूहिक विवाह कार्यक्रम, जिनमें समाज के सभी वर्गों की भागीदारी एवं समरसता देखने को मिली।",
  },
];

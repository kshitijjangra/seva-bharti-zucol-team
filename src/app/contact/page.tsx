import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="संपर्क करें"
        titleHi="Contact Us"
        subtitle="नीचे दिए गए कार्यालयों के माध्यम से सेवा भारती समिति, राजस्थान से संपर्क करें।"
      />

      <div className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {site.contact.offices.map((office) => (
            <section
              key={office.name}
              className="rounded-xl border border-saffron-100 bg-white p-6 shadow-sm"
            >
              <h2 lang="hi" className="text-lg font-bold text-saffron-700">
                {office.nameHi ?? office.name}
              </h2>
              {office.nameHi && (
                <p className="text-sm text-ink-soft">{office.name}</p>
              )}
              <address className="mt-4 space-y-2 text-sm not-italic text-ink-soft">
                <p>{office.address}</p>
                <p>
                  {office.phones.map((p, i) => (
                    <span key={p}>
                      <a
                        href={`tel:${p.replace(/[^0-9+]/g, "")}`}
                        className="font-medium text-sewablue-700 hover:underline"
                      >
                        {p}
                      </a>
                      {i < office.phones.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                {office.email && (
                  <p>
                    <a
                      href={`mailto:${office.email}`}
                      className="font-medium text-sewablue-700 hover:underline"
                    >
                      {office.email}
                    </a>
                  </p>
                )}
                {office.role && (
                  <p lang="hi" className="text-xs font-medium text-saffron-600">
                    प्रान्त मंत्री
                  </p>
                )}
              </address>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-sewablue-100 bg-sewablue-50 p-6">
          <h2 lang="hi" className="text-lg font-bold text-sewablue-800">
            ईमेल
          </h2>
          <p lang="hi" className="mt-2 text-sm text-ink-soft">
            सामान्य जानकारी हेतु संपर्क करें:{" "}
            <a
              href={`mailto:${site.contact.primaryEmail}`}
              className="font-semibold text-sewablue-700 hover:underline"
            >
              {site.contact.primaryEmail}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

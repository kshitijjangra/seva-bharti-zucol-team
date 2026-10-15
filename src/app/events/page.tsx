import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { events } from "@/content/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Seva activities and events carried out by Sewa Bharti Samiti Rajasthan.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="कार्यक्रम एवं सेवा गतिविधियाँ"
        titleHi="Events"
        subtitle="राजस्थान भर में संचालित सेवा कार्यों का विवरण।"
      />

      <div className="container-page py-12">
        {events.length === 0 ? (
          <p lang="hi" className="rounded-lg border border-dashed border-sewablue-200 bg-sewablue-50 p-6 text-sewablue-800">
            कार्यक्रम शीघ्र ही यहाँ प्रकाशित किए जाएंगे।
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <article
                key={e.id}
                className="flex flex-col rounded-xl border border-saffron-100 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-sewablue-600">
                  {e.date}
                </p>
                <h2 lang="hi" className="mt-2 text-lg font-bold text-ink">
                  {e.titleHi}
                </h2>
                {e.titleEn && (
                  <p className="mt-1 text-sm font-medium text-ink-soft">
                    {e.titleEn}
                  </p>
                )}
                {e.location && (
                  <p className="mt-2 text-sm text-saffron-700">{e.location}</p>
                )}
                <p lang="hi" className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {e.summaryHi}
                </p>
              </article>
            ))}
          </div>
        )}
        {/*
          Add event photographs and newer events in src/content/events.ts
          when supplied by the organisation. Use only approved photos.
        */}
      </div>
    </>
  );
}

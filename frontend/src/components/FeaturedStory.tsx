import RichText from "@/components/RichText";
import StoryDialog from "@/components/StoryDialog";
import type { HomePage } from "@/payload-types";

type Story = NonNullable<HomePage["featuredStory"]>;

// Extract the 11-character video ID from a YouTube link. Only the ID is ever
// embedded, so a bad CMS value can never inject an arbitrary iframe URL.
function youTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(
    /^https:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i,
  );
  return m ? m[1] : null;
}

// Heading with one phrase (e.g. "सेवा भारती") shown larger in saffron.
function Heading({ text, highlight }: { text: string; highlight?: string | null }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-[1.3em] text-saffron-500">{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  );
}

// Bold text inside the story renders as a saffron highlight (more specific
// than RichText's default `[&_strong]` colour).
const HIGHLIGHT_BOLD = "[&_p_strong]:font-semibold [&_p_strong]:text-saffron-600";

// Featured story with a video — shown on the home page above the pillars.
// All content comes from CMS: Home Page → Featured story.
export default function FeaturedStory({ story }: { story: Story | null | undefined }) {
  if (!story || story.enabled === false) return null;
  const videoId = youTubeId(story.videoUrl);
  const hasText = Boolean(story.heading || story.intro || story.excerpt);
  if (!hasText && !videoId) return null;

  return (
    <section className="container-page py-12 md:py-14">
      <div className={`grid items-center gap-8 ${hasText && videoId ? "lg:grid-cols-2 lg:gap-12" : ""}`}>
        {hasText && (
          <div>
            {story.heading && (
              <h2 lang="hi" className="text-xl font-bold leading-snug text-ink md:text-2xl">
                <Heading text={story.heading} highlight={story.headingHighlight} />
              </h2>
            )}
            {story.intro && (
              <p lang="hi" className="mt-4 text-base text-ink-soft">
                {story.intro}
              </p>
            )}
            {story.excerpt && <RichText data={story.excerpt} className={`mt-3 ${HIGHLIGHT_BOLD}`} />}
            {story.story && (
              <StoryDialog label={story.readMoreLabel || "पूरा पढ़ें"} title={story.heading}>
                {story.heading && (
                  <h2 lang="hi" className="pr-10 text-lg font-bold leading-snug text-ink md:text-xl">
                    <Heading text={story.heading} highlight={story.headingHighlight} />
                  </h2>
                )}
                <RichText data={story.story} className={`mt-5 ${HIGHLIGHT_BOLD}`} />
              </StoryDialog>
            )}
          </div>
        )}

        {videoId && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-md">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
              title={story.videoTitle || "Sewa Bharti video"}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        )}
      </div>
    </section>
  );
}

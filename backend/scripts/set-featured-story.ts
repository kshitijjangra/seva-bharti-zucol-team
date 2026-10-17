// Loads the home page "featured story" (text + video) into the CMS WITHOUT
// touching any other content (safe on production, unlike `npm run seed`).
//   npx payload run scripts/set-featured-story.ts          # only if not filled yet
//   FORCE=1 npx payload run scripts/set-featured-story.ts     # overwrite existing
import { getPayload } from "payload";
import config from "@payload-config";
import { featuredStory } from "../src/seed/data/featured-story";
import { lexical } from "../src/seed/lexical";

const force = process.env.FORCE === "1";
const payload = await getPayload({ config });
const home = await payload.findGlobal({ slug: "home-page", depth: 0 });

if (home.featuredStory?.heading && !force) {
  console.log("featured story already set — nothing changed (run with FORCE=1 to overwrite)");
  process.exit(0);
}

await payload.updateGlobal({
  slug: "home-page",
  data: {
    featuredStory: {
      enabled: true,
      heading: featuredStory.heading,
      headingHighlight: featuredStory.headingHighlight,
      intro: featuredStory.intro,
      excerpt: lexical(featuredStory.excerpt),
      story: lexical(featuredStory.story),
      readMoreLabel: featuredStory.readMoreLabel,
      videoUrl: featuredStory.videoUrl,
      videoTitle: featuredStory.videoTitle,
    },
  },
});
await new Promise((r) => setTimeout(r, 2000)); // let the website-refresh webhook go out
console.log("featured story saved");
process.exit(0);

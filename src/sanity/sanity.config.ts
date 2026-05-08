import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { LaunchIcon } from "@sanity/icons";

function OpenPostAction({ draft, published }: any) {
  const slug = draft?.slug?.current ?? published?.slug?.current;
  return {
    label: "Open Post",
    icon: LaunchIcon,
    onHandle: () => {
      if (slug) window.open(`/${slug}`, "_blank");
    },
    disabled: !slug,
  };
}

function OpenCountryAction({ draft, published }: any) {
  const slug = draft?.slug?.current ?? published?.slug?.current;
  return {
    label: "Open Page",
    icon: LaunchIcon,
    onHandle: () => {
      if (slug) window.open(`/visa/${slug}`, "_blank");
    },
    disabled: !slug,
  };
}

export default defineConfig({
  name: "evisa-studio",
  title: "eVisa Azerbaijan",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
  document: {
    actions: (prev, { schemaType }) => {
      if (schemaType === "post") return [...prev, OpenPostAction];
      if (schemaType === "country") return [...prev, OpenCountryAction];
      return prev;
    },
  },
});

import { StructureBuilder } from "sanity/structure";

const API_VERSION = "2024-01-01";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(() => "⚙️")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),

      S.listItem()
        .title("Home Page")
        .icon(() => "📄")
        .child(
          S.list()
            .title("Languages")
            .items([
              S.listItem()
                .title("English (EN)")
                .icon(() => "🇬🇧")
                .child(
                  S.documentList()
                    .title("Home Pages")
                    .apiVersion(API_VERSION)
                    .filter('_type == "homePage" && language == "en"')
                    .defaultOrdering([{ field: "language", direction: "asc" }])
                ),
              S.listItem()
                .title("Spanish (ES)")
                .icon(() => "🇪🇸")
                .child(
                  S.documentList()
                    .title("Home Pages")
                    .apiVersion(API_VERSION)
                    .filter('_type == "homePage" && language == "es"')
                    .defaultOrdering([{ field: "language", direction: "asc" }])
                ),
              S.listItem()
                .title("Arabic (AR)")
                .icon(() => "🇸🇦")
                .child(
                  S.documentList()
                    .title("Home Pages")
                    .apiVersion(API_VERSION)
                    .filter('_type == "homePage" && language == "ar"')
                    .defaultOrdering([{ field: "language", direction: "asc" }])
                ),
            ])
        ),

      S.listItem()
        .title("Countries")
        .icon(() => "🌍")
        .child(
          S.documentList()
            .title("Countries")
            .apiVersion(API_VERSION)
            .filter('_type == "country"')
            .defaultOrdering([{ field: "countryCode", direction: "asc" }])
        ),

      S.listItem()
        .title("Blog Posts")
        .icon(() => "📰")
        .child(
          S.documentList()
            .title("Blog Posts")
            .apiVersion(API_VERSION)
            .filter('_type == "post"')
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),

      S.listItem()
        .title("Contact Page")
        .icon(() => "📧")
        .child(
          S.editor()
            .id("contactPage")
            .schemaType("contactPage")
            .documentId("contactPage")
        ),

      S.listItem()
        .title("Info Pages")
        .icon(() => "📑")
        .child(
          S.documentList()
            .title("Info Pages")
            .apiVersion(API_VERSION)
            .filter('_type == "infoPage"')
            .defaultOrdering([{ field: "slug.current", direction: "asc" }])
        ),
    ]);

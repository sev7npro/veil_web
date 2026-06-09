import React from "react";

export interface MetadataProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterImage?: string;
}

export function useDocumentMetadata({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = "https://veil.sh/terminal.png",
  twitterImage = "https://veil.sh/terminal.png"
}: MetadataProps) {
  React.useEffect(() => {
    // 1. Update document title
    document.title = title;

    // Helper helper to update or create meta tags cleanly
    const updateOrCreateMetaTag = (attrName: string, attrVal: string, content: string) => {
      // Look for tag matching exact attribute name and value
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);

      // Try searching other typical attributes if not found (e.g. name vs property)
      if (!element) {
        const altAttrName = attrName === "property" ? "name" : "property";
        element = document.querySelector(`meta[${altAttrName}="${attrVal}"]`);
      }

      // If not, create and append
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // 2. Standard Description
    updateOrCreateMetaTag("name", "description", description);

    // 3. Open Graph Tags
    const finalOgTitle = ogTitle || title;
    const finalOgDescription = ogDescription || description;

    updateOrCreateMetaTag("property", "og:title", finalOgTitle);
    updateOrCreateMetaTag("property", "og:description", finalOgDescription);
    updateOrCreateMetaTag("property", "og:image", ogImage);
    updateOrCreateMetaTag("property", "og:url", window.location.href);

    // 4. Twitter Cards
    updateOrCreateMetaTag("property", "twitter:title", finalOgTitle);
    updateOrCreateMetaTag("property", "twitter:description", finalOgDescription);
    updateOrCreateMetaTag("property", "twitter:image", twitterImage);
  }, [title, description, ogTitle, ogDescription, ogImage, twitterImage]);
}

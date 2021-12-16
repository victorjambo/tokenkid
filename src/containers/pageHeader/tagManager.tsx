import React from "react";

const TagManager: React.FC = () => {
  const isLocal = process.env.NEXT_PUBLIC_ENV === "local";
  if (isLocal) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_G_TAG}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_G_TAG}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default TagManager;

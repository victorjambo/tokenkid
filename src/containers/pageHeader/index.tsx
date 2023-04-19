import Head from "next/head";

const PageHeader: React.FC = () => {
  return (
    <Head>
      <title>TokenKid</title>
      <link rel="shortcut icon" href="/images/logo.svg" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
  );
};

export default PageHeader;

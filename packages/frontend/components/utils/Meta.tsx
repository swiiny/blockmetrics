import Head from 'next/head';

interface IMeta {
  title: string;
  metas?: [{ name: string, content: string }];
}

const Meta = ({ title, metas }: IMeta) => (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} key="title" />

      {metas?.map(({ name, content }) => (
        <meta key={name} name={name} content={content} />
      ))}
    </Head>
  );

export default Meta;
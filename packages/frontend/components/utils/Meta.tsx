import Head from 'next/head';

interface IMeta {
  metas: [{ name: string, content: string }];
}

const Meta = ({ metas }: IMeta) => (
    <Head>
      {metas.map(({ name, content }) => (
        <meta key={name} name={name} content={content} />
      ))}
    </Head>
  );

export default Meta;
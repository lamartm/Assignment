import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { Brands } from '@/components/Brands';
import { Work } from '@/components/features/Work';
import { Hero } from '@/components/Hero';

interface PageProps {
  articles: Articles[];
}

interface Articles {
  content: string;
  id: string;
  imgAlt: string;
  imgSrc?: string;
  link: string;
  title: string;
  type: string;
}

/**
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps = async ctx => {
  const res = await fetch('https://60180618971d850017a3f68a.mockapi.io/articles');
  const data = await res.json();
  const articles = data.articles;

  return {
    props: { articles }, // will be passed to the page component as props
  };
};

/**
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [{ params: { slug: 'parameter' } }],
//     fallback: false,
//   }
// }

const Page: NextPage<PageProps> = props => {
  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <Hero></Hero>
      <Work data={props.articles} />
      <Brands />
    </>
  );
};

export default Page;

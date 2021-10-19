import { FormApi } from 'final-form';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import * as Yup from 'yup';

import { Brands } from '@/components/Brands';
import { Work } from '@/components/features/Work';
import { Form } from '@/components/Form';
import { Hero } from '@/components/Hero';

interface PageProps {
  articles: Articles[];
  sideArticles: Articles[];
}

interface Articles {
  content: string;
  id: string;
  imgAlt?: string;
  imgSrc?: string;
  link: string;
  title: string;
  type: string;
}

type FFSubmitHandler<FormValues> = (values: FormValues, formHelpers: FormApi<FormValues>) => void;

type FormValues = {
  firstname: string;
  lastname: string;
};

const validationSchema = Yup.object({
  firstname: Yup.string().label('First name').required(),
  lastname: Yup.string().label('Last name').required(),
  email: Yup.string().email().label('E-mail').required(),
});

/**
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps = async ctx => {
  const res = await fetch('https://60180618971d850017a3f68a.mockapi.io/articles');
  const data = await res.json();
  const articles = data.articles;
  const sideArticles = data.noPicture;
  console.log(sideArticles);

  return {
    props: { articles, sideArticles }, // will be passed to the page component as props
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
  const submitHandler: FFSubmitHandler<FormValues> = async (values, actions) => {
    console.log(values, actions);
    alert(JSON.stringify(values));
  };

  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <Hero></Hero>
      <Work work={props.articles} sideArticles={props.sideArticles} />
      <Brands />
      <Form onSubmit={submitHandler} validationSchema={validationSchema} />
    </>
  );
};

export default Page;

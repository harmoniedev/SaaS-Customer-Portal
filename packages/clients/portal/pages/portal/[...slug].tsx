import type { GetServerSideProps } from 'next';
import { LayoutMemo as Layout } from '../../layout/Layout';
import { LandingPageSceneMemo as LandingPageScene } from '../../scenes/LandingPageScene';

// this page is used to display nested from harmonie pages

function Page({ slug }) {
  const link = slug.join('/');
  return (
    <Layout>
      <LandingPageScene slug={link} />
    </Layout>
  );
}

export const  getServerSideProps: GetServerSideProps = async (context) => {
  try {
    return { props: { slug: context.query.slug } };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}


export default Page;


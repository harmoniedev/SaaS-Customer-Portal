import type { GetServerSideProps } from 'next';
import { LayoutMemo as Layout } from '../../layout/Layout';
import { LandingPageSceneMemo as LandingPageScene } from '../../scenes/LandingPageScene';

function Page({ slug }) {
  return (
    <Layout isNavigation={false}>
      <LandingPageScene slug={slug} />
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


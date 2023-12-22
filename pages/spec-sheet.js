import Head from "next/head";
// import styles from "../styles/Home.module.css";


import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
import Layout from "../components/Layout";

export default function Home({ story, locales, locale, defaultLocale, preview }) {
  story = useStoryblokState(story, {
    resolveRelations: ["popular-articles.articles"],
    language: locale
  });

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <header>
        <h1>{story ? story.name : "My Site"}</h1>
      </header> */}
      <Layout locales={locales} locale={locale} defaultLocale={defaultLocale}>
        <StoryblokComponent blok={story.content} />
      </Layout>
    </div>
  );
}

export async function getStaticProps({locales, locale, defaultLocale, preview}) {
  let slug = "spec-sheet";

  let sbParams = {
    version: preview ? "draft" : 'published',
    resolve_relations: ["popular-articles.articles"],
    language: locale,
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  return {
    props: {
      locales, 
      locale, 
      defaultLocale,
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      preview: preview || false
    },
    revalidate: 3600,
  };
}

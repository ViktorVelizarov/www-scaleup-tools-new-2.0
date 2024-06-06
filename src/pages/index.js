// pages/index.js
import DefaultLayout from '@/Layouts/DefaultLayout';
import Header from '@/components/Header/Header';
import Pricing from '@/components/Pricing/Pricing';
import Form from '@/components/Form/Form';
import Tools from '@/components/Tools/Tools';
import prisma from '../../lib/prisma';

import enTranslations from '@/translations/en.json';
import skTranslations from '@/translations/sk.json';
import czTranslations from '@/translations/cz.json';

const translations = {
  en: enTranslations,
  sk: skTranslations,
  cz: czTranslations,
};

export async function getStaticProps({ req, res }) {
  try {
    let tools = await prisma.tool.findMany({
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });
    let tags = await prisma.tag.findMany({
      orderBy: { title: "asc" },
    });
    return { props: { tools, tags }, revalidate: 180 };
  } catch (error) {
    return { props: { tools: [], tags: [] } };
  }
}

export default function Home({ tools, tags, selectedLanguage }) {
  const t = (key) => translations[selectedLanguage]?.[key] || key; // Translation function

  return (
    <>
      <Header />
      <Tools tags={tags} tools={tools} selectedLanguage={selectedLanguage} />
      {/* <Pricing /> */}
      {/* <Form
        selectedItem={{ selectedItem, setSelectedItem }}
        options={options}
      /> */}
    </>
  );
}

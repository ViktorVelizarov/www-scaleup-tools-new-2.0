import { useState } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import Header from '@/components/Header/Header';
import Pricing from '@/components/Pricing/Pricing';
import Form from '@/components/Form/Form';
import Tools from '@/components/Tools/Tools';
import prisma from '../../lib/prisma';

export async function getStaticProps({req, res}) {
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
    return { props: { tools, tags }, revalidate: 180, };
  } catch (error) {
    return { props: { tools: [], tags: [] } };
  }
}

export default function Home({tools, tags}){

  return (
    <DefaultLayout>
      <Header />
      <Tools tags={tags} tools={tools} />
      {/* <Pricing /> */}
      {/* <Form
        selectedItem={{ selectedItem, setSelectedItem }}
        options={options}
      /> */}
    </DefaultLayout>
  );
};

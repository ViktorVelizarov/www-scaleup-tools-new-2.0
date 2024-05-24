import React from 'react';
import { OurToolData } from './OurToolData';
import Card from './Card';

export default function OurTool () {
    return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-[20px]">
            {OurToolData.map((card) => (
              <Card key={card.topic} {...card} />
            ))}
          </div>
        </>
    )
};
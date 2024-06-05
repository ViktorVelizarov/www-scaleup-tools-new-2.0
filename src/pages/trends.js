"use client";

import { useEffect } from 'react';
import AIToolsLayout from '@/Layouts/AIToolsLayout';

export default function Home() {


  useEffect(() => {
    const divElement = document.getElementById('viz1716195527573');
    const vizElement = divElement.getElementsByTagName('object')[0];
    if (divElement.offsetWidth > 800) {
      vizElement.style.width = '850px';
      vizElement.style.height = '1127px';
    } else if (divElement.offsetWidth > 500) {
      vizElement.style.width = '850px';
      vizElement.style.height = '1127px';
    } else {
      vizElement.style.width = '100%';
      vizElement.style.height = '1677px';
    }
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }, []);

  return (
    <AIToolsLayout>
    <div className="flex flex-col min-h-screen bg-blue-200 pt-36 items-center w-screen ">
      <div className='w-1/2' id='viz1716195527573' style={{ position: 'relative' }}>
        <noscript>
          <a href='#'>
            <img alt='Current View ' src='https://public.tableau.com/static/images/ai/ai_tools/CurrentView/1_rss.png' style={{ border: 'none' }} />
          </a>
        </noscript>
        <object className='tableauViz' style={{ display: 'none' }}>
          <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
          <param name='embed_code_version' value='3' />
          <param name='site_root' value='' />
          <param name='name' value='ai_tools/CurrentView' />
          <param name='tabs' value='no' />
          <param name='toolbar' value='yes' />
          <param name='static_image' value='https://public.tableau.com/static/images/ai/ai_tools/CurrentView/1.png' />
          <param name='animate_transition' value='yes' />
          <param name='display_static_image' value='yes' />
          <param name='display_spinner' value='yes' />
          <param name='display_overlay' value='yes' />
          <param name='display_count' value='yes' />
          <param name='language' value='en-US' />
          <param name='filter' value='publish=yes' />
        </object>
      </div>
    </div>
    </AIToolsLayout>
  );
}

import React from 'react';
import dynamic from 'next/dynamic';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';

const DynamicPDFViewer = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFViewer), {
  ssr: false,
});

const Pdf = ({ blok }) => (
  <div style={{ width: '100%', height: '100vh' }}>
    <DynamicPDFViewer
      width="100%"  // Set the width to 100% of the parent container
      height="800px"  // Set the height to 100% of the viewport height
      {...storyblokEditable(blok)}
    >
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </DynamicPDFViewer>
  </div>
);

export default Pdf;


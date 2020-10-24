import React from 'react';

import ContentLoader from 'react-content-loader';

const ScheduleContentLoader = () => (
  <ContentLoader 
    speed={1}
    width={600}
    height={170}
    viewBox="0 0 600 170"
    backgroundColor="#2b2b2b"
    foregroundColor="#595959"
  >
    <rect x="168" y="7" rx="3" ry="3" width="196" height="20" /> 
    <rect x="168" y="33" rx="3" ry="3" width="205" height="8" /> 
    <rect x="168" y="58" rx="3" ry="3" width="413" height="10" /> 
    <rect x="0" y="0" rx="5" ry="5" width="144" height="168" /> 
    <rect x="168" y="77" rx="3" ry="3" width="413" height="10" /> 
    <rect x="168" y="97" rx="3" ry="3" width="413" height="10" />
  </ContentLoader>
);

const ScreenContentLoader = () => (
  <ContentLoader 
    speed={1}
    width={1920}
    viewBox="0 0 1920 1080"
    backgroundColor="#2b2b2b"
    foregroundColor="#595959"
    style={{ width: '100%' }}
  >
    <rect x="0" y="0" rx="20" ry="20" width="1920" height="1080" />
  </ContentLoader>
);

export { ScheduleContentLoader, ScreenContentLoader };
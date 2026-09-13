import React from 'react';

interface PublicCaseRibbonProps {
  className?: string;
}

export default function PublicCaseRibbon({ className = '' }: PublicCaseRibbonProps) {
  return (
    <span className={`public-case-ribbon ${className}`.trim()} title="企业共创">
      企业共创
    </span>
  );
}

'use client';

export default function BdVidHandler() {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const bd_vid = urlParams.get('bd_vid');
    if (bd_vid) {
      localStorage.setItem('bd_vid', bd_vid);
    }
  }
  return null;
} 
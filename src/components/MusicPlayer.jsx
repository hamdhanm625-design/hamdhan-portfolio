import React, { useEffect, useRef } from 'react';

export default function MusicPlayer({ soundOn, setSoundOn }) {
  const audioRef = useRef(null);
  const soundOnRef = useRef(soundOn);

  // Keep soundOnRef synchronized with latest prop
  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  // 1. Initialize audio element once on mount
  useEffect(() => {
    const audio = new Audio('/flatline.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.65;
    audioRef.current = audio;

    // Attempt instant autoplay when the web is opened
    if (soundOnRef.current) {
      audio.play().catch(() => {
        // Handled silently by initial gesture unlock below if browser holds unmuted playback
      });
    }

    // Silent one-time gesture unlock:
    // If the browser held unprompted audio on initial page open,
    // the user's first natural interaction on the site seamlessly starts it.
    const handleInitialGesture = () => {
      if (soundOnRef.current && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
      removeGestureListeners();
    };

    const removeGestureListeners = () => {
      window.removeEventListener('pointerdown', handleInitialGesture);
      window.removeEventListener('touchstart', handleInitialGesture);
      window.removeEventListener('click', handleInitialGesture);
      window.removeEventListener('keydown', handleInitialGesture);
    };

    window.addEventListener('pointerdown', handleInitialGesture, { passive: true });
    window.addEventListener('touchstart', handleInitialGesture, { passive: true });
    window.addEventListener('click', handleInitialGesture, { passive: true });
    window.addEventListener('keydown', handleInitialGesture, { passive: true });

    return () => {
      removeGestureListeners();
      audio.pause();
      audio.src = '';
    };
  }, []);

  // 2. React to soundOn toggle (Navbar top-right button)
  useEffect(() => {
    if (!audioRef.current) return;

    if (soundOn) {
      audioRef.current.play().catch(() => {});
    } else {
      // Immediately stop and pause playback
      audioRef.current.pause();
    }
  }, [soundOn]);

  // Pure audio background manager - zero visual clutter, no prompts or banners
  return null;
}

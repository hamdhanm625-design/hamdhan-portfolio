import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

export default function MusicPlayer({ soundOn, setSoundOn }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Native HTML5 Audio directly playing local HQ flatline.mp3
    // 100% compatible with mobile (iOS Safari & Android Chrome) and desktop
    const audio = new Audio('/flatline.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.65;
    audioRef.current = audio;

    const handlePlaying = () => {
      setIsPlaying(true);
      setNeedsGesture(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);

    // Initial autoplay attempt on mount
    if (soundOn) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setNeedsGesture(false);
        })
        .catch(() => {
          // On mobile & strict desktop browsers, unprompted audio is held until first user touch
          setNeedsGesture(true);
        });
    }

    // Global touch/click unlock for Mobile (iOS/Android) and Desktop
    const unlockAudio = () => {
      if (audioRef.current && soundOn) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setNeedsGesture(false);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('touchend', unlockAudio, { passive: true });
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });

    return () => {
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('touchend', unlockAudio);
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  // Synchronize playback with the top-right sound icon (soundOn toggle)
  useEffect(() => {
    if (!audioRef.current) return;

    if (soundOn) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setNeedsGesture(false);
        })
        .catch(() => {
          setNeedsGesture(true);
        });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      setNeedsGesture(false);
    }
  }, [soundOn]);

  return (
    <>
      {/* 
        Sleek prompt shown ONLY if mobile OS holds unprompted audio until first tap.
        Disappears automatically the instant the user taps or scrolls anywhere on mobile!
      */}
      {needsGesture && soundOn && (
        <div 
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
            setNeedsGesture(false);
          }}
          className="fixed top-20 right-4 sm:right-6 z-50 animate-bounce flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/95 border border-cyan-400/60 text-xs text-cyan-200 shadow-[0_0_20px_rgba(0,242,254,0.4)] backdrop-blur-xl cursor-pointer hover:border-cyan-300 transition-all select-none"
          title="Tap anywhere on the screen to start background music"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>Tap anywhere to start music (Flatline)</span>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';

export default function MusicPlayer({ soundOn, setSoundOn }) {
  const [playerMode, setPlayerMode] = useState('youtube'); // 'youtube' | 'html5' | 'ambient'
  const [ytReady, setYtReady] = useState(false);

  const ytPlayerRef = useRef(null);
  const html5AudioRef = useRef(null);
  const iframeContainerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const ambientIntervalRef = useRef(null);
  const ambientGainRef = useRef(null);
  const hasStartedRef = useRef(false);

  const YT_VIDEO_ID = 'hx96N6BVoOY'; // Justin Bieber - Flatline

  // 1. Check for local flatline.mp3 in /public
  useEffect(() => {
    const testLocalAudio = (path) => {
      const audio = new Audio(path);
      audio.preload = 'metadata';
      audio.loop = true;

      const onCanPlay = () => {
        console.log(`[MusicPlayer] Found local audio at: ${path}`);
        html5AudioRef.current = audio;
        setPlayerMode('html5');
        if (soundOn) {
          audio.play().catch(() => {});
        }
      };

      audio.addEventListener('canplay', onCanPlay, { once: true });
      audio.load();
    };

    testLocalAudio('/flatline.mp3');
  }, []);

  // 2. Synthesized Cyber Ambient Engine (Fallback if YouTube blocked)
  const initAmbientEngine = () => {
    if (audioCtxRef.current) return audioCtxRef.current;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
      masterGain.connect(ctx.destination);
      ambientGainRef.current = masterGain;
      audioCtxRef.current = ctx;
      return ctx;
    } catch (e) {
      console.warn('AudioContext failed:', e);
      return null;
    }
  };

  const startAmbientLoop = () => {
    const ctx = initAmbientEngine();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    // Smooth cyber-ambient chord progression: Dm7 -> Bbmaj7 -> Fmaj7 -> C
    const chords = [
      [146.83, 220.00, 261.63, 349.23], // Dm7
      [116.54, 174.61, 233.08, 293.66], // Bbmaj7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [130.81, 164.81, 196.00, 246.94], // C
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
      const now = audioCtxRef.current.currentTime;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq) => {
        const osc = audioCtxRef.current.createOscillator();
        const noteGain = audioCtxRef.current.createGain();
        const filter = audioCtxRef.current.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(800, now + 1.5);
        filter.frequency.exponentialRampToValueAtTime(350, now + 3.8);

        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.06, now + 0.8);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.9);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(ambientGainRef.current);

        osc.start(now);
        osc.stop(now + 4);
      });
    };

    playChord();
    ambientIntervalRef.current = setInterval(playChord, 3800);
  };

  const stopAmbientLoop = () => {
    if (ambientIntervalRef.current) {
      clearInterval(ambientIntervalRef.current);
      ambientIntervalRef.current = null;
    }
  };

  // 3. YouTube IFrame API Setup with Autoplay
  useEffect(() => {
    if (playerMode === 'html5') return;

    let isSubscribed = true;

    const setupPlayer = () => {
      if (!window.YT || !window.YT.Player || !iframeContainerRef.current) return;

      iframeContainerRef.current.innerHTML = '<div id="yt-bg-player-target"></div>';

      try {
        ytPlayerRef.current = new window.YT.Player('yt-bg-player-target', {
          videoId: YT_VIDEO_ID,
          playerVars: {
            autoplay: 1, // Autoplay on load
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            loop: 1,
            playlist: YT_VIDEO_ID,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              if (!isSubscribed) return;
              console.log('[MusicPlayer] YouTube ready');
              setYtReady(true);
              try {
                event.target.setVolume(60);
              } catch (e) {}

              // Start playing automatically if soundOn is true
              if (soundOn) {
                try {
                  event.target.playVideo();
                } catch (e) {}
              }
            },
            onStateChange: (event) => {
              if (!isSubscribed) return;
              if (event.data === 1) {
                hasStartedRef.current = true;
              }
              // 0 = ended -> loop
              if (event.data === 0) {
                event.target.playVideo();
              }
            },
            onError: (event) => {
              console.warn('[MusicPlayer] YouTube error code:', event.data);
              setPlayerMode('ambient');
              if (soundOn) {
                startAmbientLoop();
              }
            }
          }
        });
      } catch (err) {
        console.warn('[MusicPlayer] Setup exception:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      if (!document.getElementById('yt-iframe-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }

      const prevOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevOnReady === 'function') prevOnReady();
        if (isSubscribed) setupPlayer();
      };
    }

    return () => {
      isSubscribed = false;
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        try {
          ytPlayerRef.current.destroy();
        } catch (e) {}
      }
      stopAmbientLoop();
    };
  }, [playerMode]);

  // 4. Synchronize Playback with `soundOn` & Handle Browser Autoplay Policy
  useEffect(() => {
    const playCurrentAudio = () => {
      if (!soundOn) return;

      if (playerMode === 'html5' && html5AudioRef.current) {
        html5AudioRef.current.play().catch(() => {});
      } else if (playerMode === 'ambient') {
        startAmbientLoop();
      } else if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
        try {
          ytPlayerRef.current.playVideo();
        } catch (err) {
          setPlayerMode('ambient');
          startAmbientLoop();
        }
      } else if (ytReady && ytPlayerRef.current) {
        try {
          ytPlayerRef.current.playVideo();
        } catch (e) {}
      }
    };

    if (soundOn) {
      // 1. Attempt immediate autoplay
      playCurrentAudio();

      // 2. Browser Autoplay Fallback:
      // Modern browsers may block unprompted audio on initial page load until the user interacts.
      // Register global interaction listeners to start audio on first click, scroll, touch, or key.
      const handleFirstInteraction = () => {
        playCurrentAudio();
        cleanupListeners();
      };

      const cleanupListeners = () => {
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('scroll', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      };

      window.addEventListener('click', handleFirstInteraction, { once: true });
      window.addEventListener('scroll', handleFirstInteraction, { once: true });
      window.addEventListener('keydown', handleFirstInteraction, { once: true });
      window.addEventListener('touchstart', handleFirstInteraction, { once: true });

      return () => {
        cleanupListeners();
      };
    } else {
      // Stop Playing when soundOn is toggled OFF
      if (playerMode === 'html5' && html5AudioRef.current) {
        html5AudioRef.current.pause();
      } else if (playerMode === 'ambient') {
        stopAmbientLoop();
      } else if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch (e) {}
      }
    }
  }, [soundOn, playerMode, ytReady]);

  return (
    /* 
      Invisible background player container.
      Rendered in-viewport with valid dimensions so browsers do not suspend playback.
      Zero visual clutter.
    */
    <div 
      ref={iframeContainerRef}
      className="fixed bottom-0 left-0 w-[240px] h-[135px] pointer-events-none opacity-[0.01] -z-50 overflow-hidden"
      aria-hidden="true"
    />
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Music } from 'lucide-react';

export default function MusicPlayer({ soundOn, setSoundOn }) {
  const [playerMode, setPlayerMode] = useState('youtube'); // 'youtube' | 'html5' | 'ambient'
  const [ytReady, setYtReady] = useState(false);
  const [isActuallyPlaying, setIsActuallyPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  const ytPlayerRef = useRef(null);
  const html5AudioRef = useRef(null);
  const iframeContainerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const ambientIntervalRef = useRef(null);
  const ambientGainRef = useRef(null);

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
          audio.play()
            .then(() => {
              setIsActuallyPlaying(true);
              setNeedsGesture(false);
            })
            .catch(() => {
              setNeedsGesture(true);
            });
        }
      };

      audio.addEventListener('canplay', onCanPlay, { once: true });
      audio.load();
    };

    testLocalAudio('/flatline.mp3');
  }, []);

  // 2. Synthesized Cyber Ambient Engine (Bulletproof offline / blocked fallback)
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

  // 3. YouTube IFrame API Setup with Instant Buffer & Autoplay
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
            autoplay: 1,
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

              if (soundOn) {
                // Try unmuted play first
                try {
                  event.target.unMute();
                  event.target.playVideo();
                } catch (e) {}

                // Check after 700ms if Chrome allowed unmuted autoplay
                setTimeout(() => {
                  if (!isSubscribed) return;
                  try {
                    const state = event.target.getPlayerState();
                    // State 1 = PLAYING, State 3 = BUFFERING
                    if (state === 1 || state === 3) {
                      setIsActuallyPlaying(true);
                      setNeedsGesture(false);
                    } else {
                      // Browser policy blocked unmuted autoplay:
                      // Start muted buffer so it's pre-loaded, and prompt for 1 click to unmute
                      console.log('[MusicPlayer] Browser autoplay blocked unmuted audio on load. Awaiting gesture.');
                      setNeedsGesture(true);
                      event.target.mute();
                      event.target.playVideo();
                    }
                  } catch (err) {
                    setNeedsGesture(true);
                  }
                }, 700);
              }
            },
            onStateChange: (event) => {
              if (!isSubscribed) return;
              if (event.data === 1) { // Playing
                setIsActuallyPlaying(true);
                setNeedsGesture(false);
              } else if (event.data === 0) { // Loop
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

  // 4. Global First Gesture Listener (unlocks audio the instant visitor clicks, touches, or taps anywhere)
  useEffect(() => {
    if (!soundOn) {
      setNeedsGesture(false);
      return;
    }

    const unlockAndPlay = () => {
      if (!soundOn) return;

      console.log('[MusicPlayer] Gesture detected. Unmuting & starting playback.');

      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(60);
          ytPlayerRef.current.playVideo();
        } catch (e) {}
      }

      if (playerMode === 'html5' && html5AudioRef.current) {
        html5AudioRef.current.play().catch(() => {});
      }

      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }

      setNeedsGesture(false);
    };

    // Attach to pointerdown (fires before click for instant response), click, touchstart, keydown
    window.addEventListener('pointerdown', unlockAndPlay, { passive: true });
    window.addEventListener('click', unlockAndPlay, { passive: true });
    window.addEventListener('touchstart', unlockAndPlay, { passive: true });
    window.addEventListener('keydown', unlockAndPlay, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAndPlay);
      window.removeEventListener('click', unlockAndPlay);
      window.removeEventListener('touchstart', unlockAndPlay);
      window.removeEventListener('keydown', unlockAndPlay);
    };
  }, [soundOn, ytReady, playerMode]);

  // 5. Handle soundOn toggle from Navbar
  useEffect(() => {
    if (!soundOn) {
      setIsActuallyPlaying(false);
      setNeedsGesture(false);

      if (playerMode === 'html5' && html5AudioRef.current) {
        html5AudioRef.current.pause();
      } else if (playerMode === 'ambient') {
        stopAmbientLoop();
      } else if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch (e) {}
      }
    } else {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
        try {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(60);
          ytPlayerRef.current.playVideo();
        } catch (e) {}
      } else if (playerMode === 'html5' && html5AudioRef.current) {
        html5AudioRef.current.play().catch(() => setNeedsGesture(true));
      } else if (playerMode === 'ambient') {
        startAmbientLoop();
      }
    }
  }, [soundOn]);

  return (
    <>
      {/* 
        Sleek prompt shown ONLY if the browser's security blocks unprompted autoplay on fresh visit.
        Disappears automatically the moment the user clicks anywhere on the site.
      */}
      {needsGesture && soundOn && (
        <div 
          onClick={() => {
            if (ytPlayerRef.current) {
              try {
                ytPlayerRef.current.unMute();
                ytPlayerRef.current.setVolume(60);
                ytPlayerRef.current.playVideo();
              } catch (e) {}
            }
            setNeedsGesture(false);
          }}
          className="fixed top-20 right-4 sm:right-6 z-50 animate-bounce flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/95 border border-cyan-400/60 text-xs text-cyan-200 shadow-[0_0_20px_rgba(0,242,254,0.4)] backdrop-blur-xl cursor-pointer hover:border-cyan-300 transition-all select-none"
          title="Click anywhere on the page to start background music"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>Click anywhere to start music (Justin Bieber - Flatline)</span>
        </div>
      )}

      {/* 
        Invisible background player container.
        Rendered in-viewport with valid dimensions so browsers do not suspend playback.
        Zero visual clutter.
      */}
      <div 
        ref={iframeContainerRef}
        className="fixed bottom-0 left-0 w-[240px] h-[135px] pointer-events-none opacity-[0.01] -z-50 overflow-hidden"
        aria-hidden="true"
      />
    </>
  );
}

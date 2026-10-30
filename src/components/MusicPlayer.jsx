import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc, Music, ChevronDown, ChevronUp, Radio, Sparkles, X, HeartPulse } from 'lucide-react';
import { playClickSound, playHoverSound } from './SoundEngine';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [playerMode, setPlayerMode] = useState('youtube'); // 'youtube' or 'html5'

  const ytPlayerRef = useRef(null);
  const html5AudioRef = useRef(null);
  const containerRef = useRef(null);

  const YT_VIDEO_ID = 'hx96N6BVoOY'; // Justin Bieber - Flatline

  // Check if a local flatline.mp3 exists in /public
  useEffect(() => {
    const audio = new Audio('/flatline.mp3');
    audio.preload = 'auto';
    audio.loop = true;
    
    // Test if file exists and can load
    const handleCanPlay = () => {
      setPlayerMode('html5');
      html5AudioRef.current = audio;
    };

    audio.addEventListener('canplaythrough', handleCanPlay, { once: true });
    audio.load();

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.pause();
    };
  }, []);

  // Initialize YouTube Iframe Player
  useEffect(() => {
    // If local audio is found, skip YouTube setup
    if (playerMode === 'html5') return;

    let isSubscribed = true;

    const setupPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        ytPlayerRef.current = new window.YT.Player('yt-bg-player-iframe', {
          videoId: YT_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            loop: 1,
            playlist: YT_VIDEO_ID,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin
          },
          events: {
            onReady: (event) => {
              if (!isSubscribed) return;
              setHasLoaded(true);
              event.target.setVolume(50);
            },
            onStateChange: (event) => {
              if (!isSubscribed) return;
              // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
              if (event.data === 1) {
                setIsPlaying(true);
                setShowPrompt(false);
              } else if (event.data === 2 || event.data === 0) {
                if (event.data === 0) {
                  // Loop track
                  event.target.playVideo();
                } else {
                  setIsPlaying(false);
                }
              }
            }
          }
        });
      } catch (err) {
        console.warn('YouTube Player initialization notice:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      // Load YouTube API script
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      const prevOnYouTube = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevOnYouTube) prevOnYouTube();
        setupPlayer();
      };
    }

    return () => {
      isSubscribed = false;
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        try {
          ytPlayerRef.current.destroy();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, [playerMode]);

  // Handle Play/Pause Toggle
  const togglePlay = () => {
    playClickSound();
    setShowPrompt(false);

    if (playerMode === 'html5' && html5AudioRef.current) {
      if (isPlaying) {
        html5AudioRef.current.pause();
        setIsPlaying(false);
      } else {
        html5AudioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((e) => console.warn('Audio play prevented:', e));
      }
      return;
    }

    if (ytPlayerRef.current) {
      try {
        if (isPlaying) {
          ytPlayerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        }
      } catch (err) {
        console.warn('Playback toggle error:', err);
      }
    }
  };

  // Handle Mute Toggle
  const toggleMute = () => {
    playClickSound();
    const nextMute = !isMuted;
    setIsMuted(nextMute);

    if (playerMode === 'html5' && html5AudioRef.current) {
      html5AudioRef.current.muted = nextMute;
      return;
    }

    if (ytPlayerRef.current) {
      try {
        if (nextMute) {
          ytPlayerRef.current.mute();
        } else {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(volume);
        }
      } catch (err) {
        console.warn('Mute error:', err);
      }
    }
  };

  // Handle Volume Change
  const handleVolumeChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }

    if (playerMode === 'html5' && html5AudioRef.current) {
      html5AudioRef.current.volume = val / 100;
      html5AudioRef.current.muted = val === 0;
      return;
    }

    if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.setVolume(val);
        if (val > 0 && isMuted) {
          ytPlayerRef.current.unMute();
        }
      } catch (err) {
        console.warn('Volume error:', err);
      }
    }
  };

  // Auto-hide prompt after 12s if user doesn't interact
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hidden YouTube Iframe Container */}
      <div 
        className="fixed -top-[9999px] -left-[9999px] w-1 h-1 overflow-hidden pointer-events-none opacity-0"
        aria-hidden="true"
      >
        <div id="yt-bg-player-iframe" />
      </div>

      {/* Floating Audio Player Widget */}
      <div 
        ref={containerRef}
        className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-2 select-none"
      >
        {/* First-time prompt badge */}
        {showPrompt && !isPlaying && (
          <div className="animate-bounce flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/95 border border-cyan-400/50 text-xs text-cyan-200 shadow-[0_0_20px_rgba(0,242,254,0.35)] backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>Click to play <strong>Flatline</strong> by Justin Bieber</span>
            <button 
              onClick={() => setShowPrompt(false)}
              className="ml-1 p-0.5 text-slate-400 hover:text-slate-100 rounded-full"
              title="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Collapsed Compact Pill */}
        {!isExpanded ? (
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-slate-950/85 backdrop-blur-xl border border-cyan-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:border-cyan-400/60 transition-all duration-300">
            {/* Spinning Vinyl / Disc */}
            <button 
              onClick={togglePlay}
              onMouseEnter={playHoverSound}
              className="relative group p-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 hover:text-cyan-300 hover:scale-105 transition-all"
              title={isPlaying ? "Pause Flatline" : "Play Flatline"}
            >
              <Disc className={`w-5 h-5 ${isPlaying ? 'animate-spin-slow text-cyan-300' : 'text-slate-400'}`} />
              {isPlaying && (
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-sm animate-pulse" />
              )}
            </button>

            {/* Song Info & Equalizer */}
            <div 
              onClick={() => setIsExpanded(true)}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2.5 cursor-pointer pr-1"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-100 tracking-wide">
                    Flatline
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 font-mono border border-cyan-500/30">
                    Bieber
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {isPlaying ? 'Playing in background' : 'Paused • Justin Bieber'}
                </span>
              </div>

              {/* Animated Equalizer Wave Bars */}
              <div className="flex items-end gap-0.5 h-4 w-6 px-1">
                <span className={`w-1 rounded-full bg-gradient-to-t from-cyan-500 to-purple-400 transition-all ${isPlaying ? 'animate-bar-1' : 'h-1.5'}`} />
                <span className={`w-1 rounded-full bg-gradient-to-t from-cyan-400 to-purple-400 transition-all ${isPlaying ? 'animate-bar-2' : 'h-2'}`} />
                <span className={`w-1 rounded-full bg-gradient-to-t from-cyan-300 to-purple-500 transition-all ${isPlaying ? 'animate-bar-3' : 'h-1'}`} />
                <span className={`w-1 rounded-full bg-gradient-to-t from-cyan-400 to-purple-400 transition-all ${isPlaying ? 'animate-bar-4' : 'h-2.5'}`} />
              </div>
            </div>

            {/* Expand Controls Button */}
            <button
              onClick={() => {
                playClickSound();
                setIsExpanded(true);
              }}
              onMouseEnter={playHoverSound}
              className="p-1 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition"
              title="Open Music Player"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Expanded Full Futuristic Music Player Card */
          <div className="w-72 sm:w-80 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-cyan-500/40 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.8)] animate-fadeIn transition-all">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-cyan-400' : 'bg-slate-600'} opacity-75`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-cyan-500' : 'bg-slate-500'}`} />
                </span>
                <span className="text-[11px] font-mono tracking-wider text-cyan-400 uppercase font-semibold">
                  {isPlaying ? 'Now Playing' : 'Background Audio'}
                </span>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setIsExpanded(false);
                }}
                onMouseEnter={playHoverSound}
                className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 transition"
                title="Minimize Player"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Track Info & Visual Cover */}
            <div className="flex items-center gap-3.5 py-3.5">
              {/* Artwork / Vinyl */}
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-cyan-500/40 shadow-inner flex-shrink-0 group">
                <img 
                  src="https://i.ytimg.com/vi/hx96N6BVoOY/hqdefault.jpg" 
                  alt="Justin Bieber - Flatline"
                  className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100 opacity-80'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-1 right-1 text-cyan-400">
                  <HeartPulse className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse text-cyan-400' : 'text-slate-500'}`} />
                </div>
              </div>

              {/* Title & Artist */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-100 truncate tracking-wide flex items-center gap-1.5">
                  Flatline
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono border border-cyan-500/20">
                    2013
                  </span>
                </h4>
                <p className="text-xs text-slate-400 font-medium truncate">Justin Bieber</p>
                <p className="text-[10px] text-cyan-400/80 font-mono mt-0.5">Journals • R&B / Soul</p>
              </div>
            </div>

            {/* Thematic Animated ECG "Flatline" Heartbeat Waveform */}
            <div className="my-1 px-1 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/60 flex items-center justify-between gap-2 overflow-hidden">
              <svg className="w-full h-6" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Dim Line */}
                <path 
                  d="M0 12 H60 L65 5 L70 19 L75 2 L80 22 L85 12 H200" 
                  stroke="rgba(100, 116, 139, 0.25)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Active Pulsing Heartbeat */}
                <path 
                  d="M0 12 H60 L65 5 L70 19 L75 2 L80 22 L85 12 H200" 
                  stroke={isPlaying ? "url(#ecgGradient)" : "rgba(100, 116, 139, 0.4)"} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={isPlaying ? "animate-ecg" : ""}
                />
                <defs>
                  <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00f2fe" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#00f2fe" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Controls Bar */}
            <div className="pt-2 flex items-center justify-between gap-3">
              {/* Play / Pause Primary Button */}
              <button
                onClick={togglePlay}
                onMouseEnter={playHoverSound}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold text-xs hover:opacity-95 hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-slate-950" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Play</span>
                  </>
                )}
              </button>

              {/* Volume & Mute Section */}
              <div className="flex items-center gap-2 flex-1 justify-end">
                <button
                  onClick={toggleMute}
                  onMouseEnter={playHoverSound}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50 transition"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-slate-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                  )}
                </button>

                {/* Volume Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300 transition"
                  title={`Volume: ${isMuted ? 0 : volume}%`}
                />
              </div>
            </div>

            {/* Footer Status */}
            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-slate-300">
                <Radio className={`w-3 h-3 ${isPlaying ? 'text-cyan-400 animate-pulse' : 'text-slate-600'}`} />
                {playerMode === 'html5' ? 'Local HQ MP3' : 'Looping Background Audio'}
              </span>
              <span className="text-cyan-400/80">Continuous</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

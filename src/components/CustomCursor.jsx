import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect touch/mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    // Mouse over interactive elements check
    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  // Smooth cursor trailing animation loop
  useEffect(() => {
    if (isMobile) return;
    let animId;
    const updateTrail = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      animId = requestAnimationFrame(updateTrail);
    };
    animId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animId);
  }, [pos, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Primary Dot */}
      <div
        className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[9999] transition-transform duration-75 mix-blend-difference"
        style={{
          transform: `translate3d(${pos.x - 6}px, ${pos.y - 6}px, 0) scale(${
            isClicked ? 0.5 : isHovered ? 1.8 : 1
          })`,
        }}
      />
      {/* Outer Glowing Trailing Ring */}
      <div
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998] transition-all duration-300 border border-cyan-400/50 bg-cyan-400/10 backdrop-blur-[1px]"
        style={{
          transform: `translate3d(${trailingPos.x - 18}px, ${trailingPos.y - 18}px, 0) scale(${
            isClicked ? 0.8 : isHovered ? 1.6 : 1
          })`,
          boxShadow: isHovered
            ? '0 0 20px rgba(0, 242, 254, 0.6), inset 0 0 10px rgba(168, 85, 247, 0.4)'
            : '0 0 10px rgba(0, 242, 254, 0.2)',
          borderColor: isHovered ? '#a855f7' : 'rgba(0, 242, 254, 0.4)',
        }}
      />
    </>
  );
}

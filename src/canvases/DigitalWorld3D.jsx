import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DigitalWorld3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Laptop Screen Base Geometry
    const laptopBaseGeo = new THREE.BoxGeometry(2.4, 0.08, 1.6);
    const laptopMat = new THREE.MeshBasicMaterial({ color: 0x1e293b, wireframe: false });
    const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopMat);
    laptopBase.position.y = -0.6;
    worldGroup.add(laptopBase);

    // Laptop Screen Top
    const screenGeo = new THREE.BoxGeometry(2.2, 1.4, 0.06);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x090d16 });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0.1, -0.75);
    screen.rotation.x = -Math.PI * 0.08;
    worldGroup.add(screen);

    // Laptop Display Glowing Code Wireframe
    const displayGeo = new THREE.PlaneGeometry(2.0, 1.2);
    const displayMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const display = new THREE.Mesh(displayGeo, displayMat);
    display.position.set(0, 0.1, -0.71);
    display.rotation.x = -Math.PI * 0.08;
    worldGroup.add(display);

    // 2. Floating Tech Badges / Hologram Cubes
    const techCubes = [];
    const techData = [
      { name: 'JAVA', color: 0xea580c, pos: [-2.2, 1.2, 0.5] },
      { name: 'PYTHON', color: 0x3b82f6, pos: [2.2, 1.4, -0.2] },
      { name: 'C', color: 0x0284c7, pos: [-2.0, -0.4, 1.2] },
      { name: 'AI/DS', color: 0xa855f7, pos: [2.0, -0.2, 1.0] },
      { name: 'DSA', color: 0x10b981, pos: [0, 2.0, -0.5] },
      { name: 'GIT', color: 0xef4444, pos: [-1.4, 2.2, -1.0] },
    ];

    techData.forEach((tech) => {
      const group = new THREE.Group();
      group.position.set(...tech.pos);

      // Cube geometry
      const cubeGeo = new THREE.BoxGeometry(0.7, 0.4, 0.4);
      const cubeMat = new THREE.MeshBasicMaterial({
        color: tech.color,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      group.add(cube);

      // Core point
      const pointGeo = new THREE.OctahedronGeometry(0.15);
      const pointMat = new THREE.MeshBasicMaterial({ color: tech.color });
      const point = new THREE.Mesh(pointGeo, pointMat);
      group.add(point);

      worldGroup.add(group);
      techCubes.push({ group, initialY: tech.pos[1], speed: 1 + Math.random() * 1.5 });
    });

    // 3. Cyber Floor Data Grid
    const gridHelper = new THREE.GridHelper(12, 30, 0x00f2fe, 0x1e293b);
    gridHelper.position.y = -1.2;
    worldGroup.add(gridHelper);

    // 4. Ambient Data Particles
    const particleCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(pGeo, pMat);
    worldGroup.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // World slight floating
      worldGroup.rotation.y = Math.sin(elapsed * 0.2) * 0.15 + mouseX * 0.3;
      worldGroup.rotation.x = Math.cos(elapsed * 0.2) * 0.08 - mouseY * 0.2;

      // Floating tech cubes
      techCubes.forEach(({ group, initialY, speed }) => {
        group.position.y = initialY + Math.sin(elapsed * speed) * 0.15;
        group.rotation.x = elapsed * 0.5;
        group.rotation.y = elapsed * 0.7;
      });

      // Grid movement simulation
      gridHelper.position.z = (elapsed * 0.5) % 0.4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-[450px] md:h-[600px] relative rounded-2xl border border-cyan-500/20 bg-slate-950/60 backdrop-blur-xl overflow-hidden shadow-2xl">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-xs text-slate-300">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        3D Holographic Workspace • Drag / Hover to Explore
      </div>
    </div>
  );
}

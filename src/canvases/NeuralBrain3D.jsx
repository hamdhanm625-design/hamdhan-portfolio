import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralBrain3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse interaction rotation
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // 1. Central Core Sphere with Glow
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 3);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    brainGroup.add(coreMesh);

    // 2. Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    brainGroup.add(innerMesh);

    // 3. Outer Orbital Wireframe Rings
    const ringGeo1 = new THREE.TorusGeometry(1.9, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.7 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    brainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.2, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.6 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    brainGroup.add(ring2);

    // 4. Neural Nodes Particles
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorCyan = new THREE.Color(0x00f2fe);
    const colorPurple = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = colorCyan.clone().lerp(colorPurple, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    brainGroup.add(particleSystem);

    // 5. Connective Neural Synapse Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4facfe,
      transparent: true,
      opacity: 0.25,
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];

    // Connect close points
    for (let i = 0; i < particleCount; i += 2) {
      for (let j = i + 1; j < particleCount; j += 4) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 1.4) {
          linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    brainGroup.add(lineMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / container.clientWidth) * 2 - 1;
      mouseY = -(y / container.clientHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Constant rotation
      brainGroup.rotation.y = elapsedTime * 0.25;
      brainGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2;

      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.4;

      // Pulse effect
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.05;
      coreMesh.scale.set(scale, scale, scale);

      // Smooth mouse tracking
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      brainGroup.rotation.y += targetX * 0.5;
      brainGroup.rotation.x += -targetY * 0.5;

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
    <div className="w-full h-[400px] md:h-[550px] relative flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md text-[11px] text-cyan-300 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        Interactive AI Neural Brain • Move Cursor
      </div>
    </div>
  );
}

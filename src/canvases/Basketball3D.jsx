import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Basketball3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ballGroup = new THREE.Group();
    scene.add(ballGroup);

    // 1. Basketball Main Sphere Wireframe
    const sphereGeo = new THREE.SphereGeometry(1.2, 28, 28);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xf97316, // Orange neon
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    ballGroup.add(sphereMesh);

    // 2. Basketball Seam Curves (Torus rings to simulate seams)
    const seamMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 });
    
    // Main vertical seam ring
    const seam1Geo = new THREE.TorusGeometry(1.21, 0.015, 16, 100);
    const seam1 = new THREE.Mesh(seam1Geo, seamMat);
    ballGroup.add(seam1);

    // Main horizontal seam ring
    const seam2 = new THREE.Mesh(seam1Geo, seamMat);
    seam2.rotation.x = Math.PI / 2;
    ballGroup.add(seam2);

    // Curved side seams
    const seam3 = new THREE.Mesh(seam1Geo, seamMat);
    seam3.rotation.y = Math.PI / 4;
    seam3.scale.set(0.9, 0.9, 0.9);
    ballGroup.add(seam3);

    // 3. Kinetic Particles around ball
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xf97316,
      transparent: true,
      opacity: 0.8,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    ballGroup.add(particleSystem);

    // Mouse tilt
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

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Basketball spin
      ballGroup.rotation.y = elapsed * 0.8;
      ballGroup.rotation.x = Math.sin(elapsed * 0.4) * 0.3 + mouseY * 0.5;
      ballGroup.rotation.z = mouseX * 0.5;

      // Bounce motion
      ballGroup.position.y = Math.abs(Math.sin(elapsed * 2.5)) * 0.25;

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
    <div className="w-full h-[280px] md:h-[350px] relative flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}

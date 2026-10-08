import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isWebGLAvailable, isMobileDevice, prefersReducedMotion } from "../../utils/webgl";
import { FallbackBackground } from "./FallbackBackground";

interface Scene3DProps {
  scrollProgress: number; // 0 to 1
  scrollVelocity: number;
}

export const Scene3D: React.FC<Scene3DProps> = ({ scrollProgress, scrollVelocity }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [contextLost, setContextLost] = useState<boolean>(false);

  // Store target progress and current smoothed progress
  const progressRef = useRef(0);
  const velocityRef = useRef(0);
  progressRef.current = scrollProgress;
  velocityRef.current = scrollVelocity;

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const isMobile = isMobileDevice();
    const reducedMotion = prefersReducedMotion();

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfaf9f6, 0.02);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      60
    );
    camera.position.set(0, 0, 7.5);

    // Renderer setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
    } catch {
      setWebglSupported(false);
      return;
    }

    // Context loss listeners
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setContextLost(true);
    };
    const handleContextRestored = () => {
      setContextLost(false);
    };
    const canvasElement = renderer.domElement;
    canvasElement.addEventListener("webglcontextlost", handleContextLost, false);
    canvasElement.addEventListener("webglcontextrestored", handleContextRestored, false);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfffbf5, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0e7ff, 1.2);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfef08a, 0.9);
    rimLight.position.set(0, -6, -4);
    scene.add(rimLight);

    // Group to hold all 3D installations
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Materials Palette (Calm, translucent, premium pastel-tinted)
    const materials = {
      cyanGlass: new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        roughness: 0.15,
        transmission: 0.65,
        opacity: 0.85,
        transparent: true,
        reflectivity: 0.6,
      }),
      indigoGlass: new THREE.MeshPhysicalMaterial({
        color: 0x6366f1,
        roughness: 0.18,
        transmission: 0.6,
        opacity: 0.85,
        transparent: true,
        reflectivity: 0.6,
      }),
      violetGlass: new THREE.MeshPhysicalMaterial({
        color: 0x8b5cf6,
        roughness: 0.2,
        transmission: 0.7,
        opacity: 0.8,
        transparent: true,
      }),
      coralGlass: new THREE.MeshPhysicalMaterial({
        color: 0xf43f5e,
        roughness: 0.22,
        transmission: 0.75,
        opacity: 0.8,
        transparent: true,
      }),
      emeraldGlass: new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        roughness: 0.2,
        transmission: 0.7,
        opacity: 0.85,
        transparent: true,
      }),
      warmGold: new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        roughness: 0.3,
        metalness: 0.4,
        transparent: true,
        opacity: 0.9,
      }),
      whiteFrosted: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.3,
        transmission: 0.85,
        opacity: 0.7,
        transparent: true,
      }),
    };

    // ---------------------------------------------------------
    // SECTION 1 OBJECTS: Hero Opening (around central logo)
    // ---------------------------------------------------------
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, 0);
    rootGroup.add(heroGroup);

    // Harmonic Time Ring 1 (Toroidal orbit around the logo center)
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.05, 16, isMobile ? 48 : 80);
    const heroRing1 = new THREE.Mesh(ringGeo1, materials.cyanGlass);
    heroRing1.rotation.x = Math.PI * 0.35;
    heroGroup.add(heroRing1);

    // Harmonic Time Ring 2
    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.04, 16, isMobile ? 48 : 80);
    const heroRing2 = new THREE.Mesh(ringGeo2, materials.indigoGlass);
    heroRing2.rotation.x = -Math.PI * 0.25;
    heroRing2.rotation.y = Math.PI * 0.2;
    heroGroup.add(heroRing2);

    // Outer subtle orbit halo
    const ringGeo3 = new THREE.TorusGeometry(3.9, 0.025, 12, isMobile ? 40 : 64);
    const heroRing3 = new THREE.Mesh(ringGeo3, materials.violetGlass);
    heroRing3.rotation.z = Math.PI * 0.15;
    heroGroup.add(heroRing3);

    // Floating Abstract Focus Nodes (habit rhythm nodes in orbit)
    const sphereGeo = new THREE.SphereGeometry(0.18, 24, 24);
    const heroNodes: THREE.Mesh[] = [];
    const nodeColors = [materials.cyanGlass, materials.coralGlass, materials.emeraldGlass, materials.warmGold];
    for (let i = 0; i < 4; i++) {
      const node = new THREE.Mesh(sphereGeo, nodeColors[i % nodeColors.length]);
      const angle = (i / 4) * Math.PI * 2;
      node.position.set(Math.cos(angle) * 2.4, Math.sin(angle) * 0.9, Math.sin(angle) * 1.5);
      heroGroup.add(node);
      heroNodes.push(node);
    }

    // Floating soft translucent rounded prism
    const prismGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const heroPrism = new THREE.Mesh(prismGeo, materials.whiteFrosted);
    heroPrism.position.set(2.8, 1.2, -1.0);
    heroGroup.add(heroPrism);

    const heroPrism2 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.5, 1),
      materials.coralGlass
    );
    heroPrism2.position.set(-2.6, -1.0, -0.8);
    heroGroup.add(heroPrism2);

    // ---------------------------------------------------------
    // SECTION 2 OBJECTS: "Plan your time" (Rhythm & Hours)
    // Positioned vertically down around y = -5.0
    // ---------------------------------------------------------
    const section2Group = new THREE.Group();
    section2Group.position.set(0, -5.0, 0);
    rootGroup.add(section2Group);

    // Concentric Time Rings (abstract representation of day cycles)
    const timeRingOuter = new THREE.Mesh(
      new THREE.TorusGeometry(2.8, 0.06, 16, isMobile ? 48 : 80),
      materials.indigoGlass
    );
    timeRingOuter.rotation.x = Math.PI * 0.45;
    timeRingOuter.position.set(-0.8, 0, 0);
    section2Group.add(timeRingOuter);

    const timeRingInner = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.05, 16, isMobile ? 40 : 64),
      materials.cyanGlass
    );
    timeRingInner.rotation.x = -Math.PI * 0.3;
    timeRingInner.rotation.y = Math.PI * 0.25;
    timeRingInner.position.set(-0.8, 0, 0);
    section2Group.add(timeRingInner);

    // Abstract task block columns (translucent floating blocks)
    const taskBlockGeo = new THREE.BoxGeometry(0.65, 0.35, 0.65);
    const taskBlocks: THREE.Mesh[] = [];
    const blockMaterials = [materials.cyanGlass, materials.emeraldGlass, materials.warmGold, materials.violetGlass];
    for (let i = 0; i < 5; i++) {
      const block = new THREE.Mesh(taskBlockGeo, blockMaterials[i % blockMaterials.length]);
      block.position.set(
        2.0 + Math.sin(i * 1.2) * 0.6,
        -0.9 + i * 0.55,
        -0.5 + Math.cos(i * 0.8) * 0.7
      );
      block.rotation.set(0.15 * i, 0.25 * i, 0.1 * i);
      section2Group.add(block);
      taskBlocks.push(block);
    }

    // Floating habit milestone orbs
    const habitOrbs: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 20, 20),
        materials.coralGlass
      );
      orb.position.set(-2.5 + i * 0.6, -1.2 + i * 0.8, 0.5 - i * 0.4);
      section2Group.add(orb);
      habitOrbs.push(orb);
    }

    // ---------------------------------------------------------
    // SECTION 3 OBJECTS: "Work with intention" (Focus & Action)
    // Positioned vertically down around y = -10.0
    // ---------------------------------------------------------
    const section3Group = new THREE.Group();
    section3Group.position.set(0, -10.0, 0);
    rootGroup.add(section3Group);

    // Geometric focus prism corridor
    const focusPillarGeo = new THREE.CylinderGeometry(0.2, 0.25, 2.8, 8);
    const focusPillar1 = new THREE.Mesh(focusPillarGeo, materials.violetGlass);
    focusPillar1.position.set(-2.4, 0, -1.2);
    focusPillar1.rotation.z = Math.PI * 0.1;
    section3Group.add(focusPillar1);

    const focusPillar2 = new THREE.Mesh(focusPillarGeo, materials.emeraldGlass);
    focusPillar2.position.set(2.4, 0.2, -1.5);
    focusPillar2.rotation.z = -Math.PI * 0.12;
    section3Group.add(focusPillar2);

    // Central focus torus arc
    const focusArc = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.07, 16, isMobile ? 48 : 80),
      materials.coralGlass
    );
    focusArc.rotation.x = Math.PI * 0.5;
    focusArc.position.set(0, 0.4, 0);
    section3Group.add(focusArc);

    const focusInnerArc = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.05, 16, isMobile ? 40 : 64),
      materials.cyanGlass
    );
    focusInnerArc.rotation.y = Math.PI * 0.4;
    focusInnerArc.position.set(0, 0.4, 0);
    section3Group.add(focusInnerArc);

    // Floating floating schedule prisms
    const schedulePrisms: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const p = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.35 + i * 0.08, 0),
        i % 2 === 0 ? materials.warmGold : materials.whiteFrosted
      );
      p.position.set(
        Math.cos((i / 4) * Math.PI * 2) * 2.2,
        Math.sin((i / 4) * Math.PI * 2) * 1.1 + 0.3,
        Math.sin(i) * 0.8
      );
      section3Group.add(p);
      schedulePrisms.push(p);
    }

    // ---------------------------------------------------------
    // SECTION 4 OBJECTS: Download & Product Launch Anchor
    // Positioned vertically down around y = -15.0
    // ---------------------------------------------------------
    const section4Group = new THREE.Group();
    section4Group.position.set(0, -15.0, 0);
    rootGroup.add(section4Group);

    // Harmonious synthesis rings encircling the launch zone
    const synthesisRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.05, 16, isMobile ? 48 : 80),
      materials.indigoGlass
    );
    synthesisRing1.rotation.x = Math.PI * 0.35;
    section4Group.add(synthesisRing1);

    const synthesisRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.06, 16, isMobile ? 48 : 80),
      materials.cyanGlass
    );
    synthesisRing2.rotation.x = -Math.PI * 0.3;
    synthesisRing2.rotation.y = Math.PI * 0.2;
    section4Group.add(synthesisRing2);

    const synthesisRing3 = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.04, 14, isMobile ? 36 : 60),
      materials.coralGlass
    );
    synthesisRing3.rotation.z = Math.PI * 0.25;
    section4Group.add(synthesisRing3);

    // Orbiting jewel particles in download area
    const downloadNodes: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const dNode = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        [materials.cyanGlass, materials.violetGlass, materials.emeraldGlass, materials.warmGold][i % 4]
      );
      const ang = (i / 6) * Math.PI * 2;
      dNode.position.set(Math.cos(ang) * 2.6, Math.sin(ang) * 1.2, Math.sin(ang) * 0.8);
      section4Group.add(dNode);
      downloadNodes.push(dNode);
    }

    // ---------------------------------------------------------
    // AMBIENT PARTICLES CLOUD (Reacts to scroll velocity)
    // ---------------------------------------------------------
    const particleCount = isMobile ? 120 : 340;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spread across width, depth, and along vertical descent (y from +3 down to -18)
      particlePos[i * 3 + 0] = (Math.random() - 0.5) * 12;
      particlePos[i * 3 + 1] = Math.random() * -19 + 3;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 7;
      particleScales[i] = Math.random() * 0.8 + 0.3;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));

    // Particle sprite canvas texture for smooth soft dot
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(99, 102, 241, 0.9)");
      grad.addColorStop(0.4, "rgba(6, 182, 212, 0.6)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const particleTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.16 : 0.22,
      map: particleTex,
      transparent: true,
      opacity: 0.7,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // Mouse parallax variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    };
    window.addEventListener("resize", handleResize);

    // ---------------------------------------------------------
    // ANIMATION & CAMERA INTERPOLATION ENGINE
    // ---------------------------------------------------------
    let animationFrameId: number;
    let smoothedProgress = 0;
    let clock = new THREE.Clock();

    // Camera keyframe trajectory points based on progress 0 -> 1:
    // Section 1: Hero (progress ~0.0) -> Camera at (0, 0, 7.5), looks at (0, 0, 0)
    // Section 2: Plan your time (progress ~0.35) -> Camera at (1.4, -4.8, 8.4), looks at (0.3, -4.8, 0)
    // Section 3: Work with intention (progress ~0.68) -> Camera at (-1.3, -9.8, 8.0), looks at (-0.2, -9.8, 0)
    // Section 4: Build your day / Download (progress ~1.0) -> Camera at (0, -14.8, 7.6), looks at (0, -14.8, 0)
    const keyframes = [
      { progress: 0.0, camPos: new THREE.Vector3(0, 0, 7.5), target: new THREE.Vector3(0, 0, 0) },
      { progress: 0.35, camPos: new THREE.Vector3(1.2, -5.0, 8.2), target: new THREE.Vector3(0.3, -5.0, 0) },
      { progress: 0.68, camPos: new THREE.Vector3(-1.1, -10.0, 8.0), target: new THREE.Vector3(-0.2, -10.0, 0) },
      { progress: 1.0, camPos: new THREE.Vector3(0, -15.0, 7.6), target: new THREE.Vector3(0, -15.0, 0) },
    ];

    const getInterpolatedCamera = (p: number) => {
      const clampedP = Math.max(0, Math.min(1, p));
      let seg = 0;
      for (let i = 0; i < keyframes.length - 1; i++) {
        if (clampedP >= keyframes[i].progress && clampedP <= keyframes[i + 1].progress) {
          seg = i;
          break;
        }
      }
      const k1 = keyframes[seg];
      const k2 = keyframes[seg + 1];
      const t = (clampedP - k1.progress) / (k2.progress - k1.progress || 1);
      // Smooth step easing
      const easeT = t * t * (3 - 2 * t);

      const pos = new THREE.Vector3().lerpVectors(k1.camPos, k2.camPos, easeT);
      const look = new THREE.Vector3().lerpVectors(k1.target, k2.target, easeT);
      return { pos, look };
    };

    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth progress interpolation
      const targetP = progressRef.current;
      const lerpSpeed = reducedMotion ? 0.2 : 0.07;
      smoothedProgress += (targetP - smoothedProgress) * lerpSpeed;

      // Mouse parallax smoothing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Interpolate camera
      const { pos, look } = getInterpolatedCamera(smoothedProgress);

      const parallaxIntensity = reducedMotion ? 0 : isMobile ? 0.15 : 0.45;
      camera.position.x = pos.x + mouseX * parallaxIntensity;
      camera.position.y = pos.y - mouseY * (parallaxIntensity * 0.6);
      camera.position.z = pos.z;

      targetLookAt.copy(look);
      currentLookAt.lerp(targetLookAt, 0.08);
      camera.lookAt(currentLookAt);

      // Subtle dynamic object rotations & animations
      const velocity = Math.abs(velocityRef.current || 0);
      const speedBoost = Math.min(velocity * 0.5, 0.08);

      // Section 1 rotations
      heroRing1.rotation.z += 0.003 + speedBoost;
      heroRing2.rotation.z -= 0.0025 + speedBoost;
      heroRing3.rotation.y += 0.002;
      heroPrism.rotation.x += 0.005;
      heroPrism.rotation.y += 0.006;
      heroPrism2.rotation.x -= 0.004;

      // Section 1 hero orbiting nodes
      heroNodes.forEach((node, i) => {
        const ang = (i / 4) * Math.PI * 2 + elapsedTime * 0.35;
        node.position.x = Math.cos(ang) * 2.4;
        node.position.y = Math.sin(ang) * 0.9;
        node.position.z = Math.sin(ang) * 1.5;
      });

      // Section 2 rotations
      timeRingOuter.rotation.z += 0.003;
      timeRingInner.rotation.z -= 0.004;
      taskBlocks.forEach((block, i) => {
        block.rotation.y += 0.004 * (i % 2 === 0 ? 1 : -1);
        block.position.y += Math.sin(elapsedTime * 1.5 + i) * 0.002;
      });
      habitOrbs.forEach((orb, i) => {
        orb.position.y += Math.sin(elapsedTime * 2 + i * 1.5) * 0.003;
      });

      // Section 3 rotations
      focusArc.rotation.z += 0.003;
      focusInnerArc.rotation.z -= 0.0035;
      schedulePrisms.forEach((p, i) => {
        p.rotation.x += 0.006;
        p.rotation.y += 0.007;
      });

      // Section 4 download anchor rotations
      synthesisRing1.rotation.z += 0.004;
      synthesisRing2.rotation.z -= 0.003;
      synthesisRing3.rotation.y += 0.005;
      downloadNodes.forEach((dNode, i) => {
        const ang = (i / 6) * Math.PI * 2 + elapsedTime * 0.4;
        dNode.position.x = Math.cos(ang) * 2.6;
        dNode.position.y = Math.sin(ang) * 1.2;
      });

      // Particle subtle motion
      particles.rotation.y = elapsedTime * 0.015;
      if (velocity > 0.001) {
        particles.rotation.y += velocity * 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      canvasElement.removeEventListener("webglcontextlost", handleContextLost);
      canvasElement.removeEventListener("webglcontextrestored", handleContextRestored);

      // Dispose geometries and materials
      [ringGeo1, ringGeo2, ringGeo3, sphereGeo, prismGeo, taskBlockGeo, focusPillarGeo, particleGeo].forEach(
        (geo) => geo.dispose()
      );
      Object.values(materials).forEach((mat) => mat.dispose());
      particleMat.dispose();
      particleTex.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!webglSupported || contextLost) {
    return <FallbackBackground />;
  }

  return (
    <>
      <FallbackBackground />
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-1 overflow-hidden"
      />
    </>
  );
};

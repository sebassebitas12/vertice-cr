import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Recreación WebGL en 3D real de la onda de seda del PlayStation 3 (XMB).
 * A diferencia de líneas 2D rígidas, deforma mallas 3D subdivididas en el espacio (X, Y, Z)
 * y calcula iluminación Fresnel en los pliegues (donde la tela se dobla respecto a la cámara,
 * la luz se acumula creando los velos brillantes suaves de la PS3).
 */
const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uLayer;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec2 vUv;
  varying float vFold;

  // Ruido suave sinusoidal multi-octava para pliegues orgánicos de tela/seda
  float waveHeight(vec2 p, float t, float seed) {
    float y = 0.0;
    y += sin(p.x * 0.42 + t * 0.45 + seed) * 0.85;
    y += sin(p.x * 0.78 - t * 0.32 + p.y * 1.4 + seed * 1.7) * 0.48;
    y += cos(p.x * 1.25 + p.y * 2.1 + t * 0.52 + seed * 2.3) * 0.24;
    y += sin(p.x * 2.10 - p.y * 1.8 - t * 0.38 + seed * 3.1) * 0.11;
    return y;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float seed = uLayer * 2.15;
    float t = uTime * 0.55;

    // Curva principal en forma de hamaca suave (como la captura original de PS3)
    float arch = -cos(uv.x * 3.14159265 * 0.95 - 0.15) * 0.55;

    // Desplazamiento en Y y Z para crear pliegues tridimensionales reales
    float h = waveHeight(pos.xy, t, seed);
    float zWave = sin(pos.x * 0.55 + t * 0.4 + seed) * 0.9 + cos(pos.y * 2.2 - t * 0.35 + seed) * 0.45;

    // Calculamos derivadas por diferencias finitas para obtener la normal exacta del pliegue
    float eps = 0.06;
    float hx = waveHeight(pos.xy + vec2(eps, 0.0), t, seed);
    float hy = waveHeight(pos.xy + vec2(0.0, eps), t, seed);

    vec3 tangentX = normalize(vec3(eps, (hx - h) * 0.65, 0.04));
    vec3 tangentY = normalize(vec3(0.0, eps * 0.8, (hy - h) * 0.95));
    vec3 computedNormal = normalize(cross(tangentX, tangentY));

    // Ensanchamiento suave en los extremos y estrechamiento en el centro
    float ribbonSpread = 0.72 + 0.55 * pow(abs(uv.x - 0.5) * 2.0, 1.4);

    pos.y = pos.y * ribbonSpread + h * 0.58 + arch + (uLayer - 1.5) * 0.18;
    pos.z += zWave;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPos = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * computedNormal);

    // Intensidad del pliegue donde la superficie se curva
    vFold = clamp(abs(hx - h) * 8.5 + abs(hy - h) * 6.0, 0.0, 1.5);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform vec3 uColorPrimary;
  uniform vec3 uColorEdge;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec2 vUv;
  varying float vFold;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewPos);

    // Efecto Fresnel de seda (transparente de frente, brillante en los bordes y dobleces)
    float ndotv = abs(dot(N, V));
    float fresnel = pow(1.0 - clamp(ndotv, 0.0, 1.0), 2.15);

    // Suavizado en los bordes superior e inferior del listón de seda
    float edgeDist = abs(vUv.y - 0.5) * 2.0;
    float softRibbonMask = smoothstep(1.0, 0.18, edgeDist);

    // Filo luminoso de seda cerca de los bordes y en las crestas internas
    float silkCrest = smoothstep(0.62, 0.96, edgeDist) * smoothstep(1.0, 0.88, edgeDist);
    float internalFold = pow(clamp(vFold, 0.0, 1.0), 1.6) * 0.65;

    float intensity = (fresnel * 0.85 + silkCrest * 1.15 + internalFold * 0.75) * softRibbonMask;

    // desvanecimiento muy suave en los extremos izquierdo y derecho
    float horizFade = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);

    vec3 col = mix(uColorPrimary, uColorEdge, clamp(fresnel * 0.75 + silkCrest * 0.9, 0.0, 1.0));
    float alpha = clamp(intensity * uOpacity * horizFade, 0.0, 0.92);

    gl_FragColor = vec4(col, alpha);
  }
`;

export default function Ps3HeroWave() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0.1, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 4 velos de seda superpuestos con alta subdivisión para curvas 100% líquidas
    const ribbonGeo = new THREE.PlaneGeometry(11.5, 1.75, 220, 64);

    const layersConfig = [
      {
        layer: 0.0,
        primary: new THREE.Color('#ff6a1f'),
        edge: new THREE.Color('#ffd0b0'),
        opacity: 0.78,
      },
      {
        layer: 1.1,
        primary: new THREE.Color('#e05510'),
        edge: new THREE.Color('#fff2e6'),
        opacity: 0.62,
      },
      {
        layer: 2.3,
        primary: new THREE.Color('#ff7b36'),
        edge: new THREE.Color('#ffffff'),
        opacity: 0.52,
      },
      {
        layer: 3.4,
        primary: new THREE.Color('#9e8c82'),
        edge: new THREE.Color('#fff8f2'),
        opacity: 0.36,
      },
    ];

    const materials: THREE.ShaderMaterial[] = [];
    const meshes: THREE.Mesh[] = [];

    layersConfig.forEach((cfg) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uLayer: { value: cfg.layer },
          uColorPrimary: { value: cfg.primary },
          uColorEdge: { value: cfg.edge },
          uOpacity: { value: cfg.opacity },
        },
      });
      const mesh = new THREE.Mesh(ribbonGeo, mat);
      scene.add(mesh);
      materials.push(mat);
      meshes.push(mesh);
    });

    // Partículas de brillo sutil tipo XMB flotando alrededor del velo
    const particleCount = 42;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2.4;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      particleSpeeds.push(0.15 + Math.random() * 0.35);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffb38a,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const resize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    resize();
    window.addEventListener('resize', resize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      for (const mat of materials) {
        mat.uniforms.uTime.value = elapsed;
      }

      const posAttr = particleGeo.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let x = posAttr.getX(i) + 0.0025 * particleSpeeds[i];
        if (x > 5.2) x = -5.2;
        const y = posAttr.getY(i) + Math.sin(elapsed * 0.8 + i) * 0.0008;
        posAttr.setXY(i, x, y);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      ribbonGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 85% 65% at 68% 46%, rgba(255, 106, 31, 0.14) 0%, rgba(32, 22, 18, 0.45) 48%, rgba(22, 22, 24, 1) 100%)',
      }}
    />
  );
}

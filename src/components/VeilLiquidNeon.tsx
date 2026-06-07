import { Canvas, useFrame, useThree, Object3DNode, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';

// Custom shader material extending THREE.ShaderMaterial
class VeilShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(800, 600) },
        u_mouse: { value: new THREE.Vector2(400, 300) },
        u_speed: { value: 1.0 },
        u_intensity: { value: 1.0 }
      },
      vertexShader: `
        varying vec2 v_uv;
        void main() {
          v_uv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_speed;
        uniform float u_intensity;
        varying vec2 v_uv;

        // Cosine-based color palette generator by Inigo Quilez
        vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
            return a + b*cos( 6.28318*(c*t+d) );
        }

        // High precision 2D noise helpers
        float hash(vec2 p) {
            vec2 q = fract(p * vec2(123.34, 456.21));
            q += dot(q, q + 45.32);
            return fract(q.x * q.y);
        }

        float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f*f*(3.0-2.0*f);
            return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        // Fractal Brownian Motion (5 octaves) for fluidic flow dynamics
        float fbm(vec2 p, float time_scaled) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            // Rotate each octave to combat grid artifacts
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
            for (int i = 0; i < 5; ++i) {
                v += a * noise(p);
                p = rot * p * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }

        void main() {
            // Screen coordinates normalized
            vec2 uv = gl_FragCoord.xy / u_resolution.xy;
            vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
            
            // Mouse coordinates mapping with reactive push influence
            vec2 m = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;
            float distToMouse = length(p - m);
            float mouseReaction = smoothstep(0.45, 0.0, distToMouse) * 0.18;
            
            float scaled_time = u_time * u_speed;
            
            // Domain Warping / Feedback Loops
            // q is initial offset flow field
            vec2 q = vec2(0.0);
            q.x = fbm(p + vec2(0.0, 0.0) + 0.04 * scaled_time, scaled_time);
            q.y = fbm(p + vec2(4.8, 1.5) + 0.05 * scaled_time, scaled_time);
            
            // r is the secondary warped flow field
            vec2 r = vec2(0.0);
            r.x = fbm(p + 3.8 * q + vec2(2.1, 9.4) + 0.02 * scaled_time + mouseReaction, scaled_time);
            r.y = fbm(p + 3.8 * q + vec2(8.5, 3.2) + 0.015 * scaled_time + mouseReaction, scaled_time);
            
            // f is the ultimate composite height map for coloring
            float f = fbm(p + 4.0 * r, scaled_time);
            
            // Infinite, fluid generative cosine palette
            // a = base offset, b = multiplier amplitude, c = color cycle frequency, d = cyclic shift phase
            vec3 darkAmbientBacking = palette(f + 0.025 * scaled_time, 
                vec3(0.04, 0.01, 0.09), // ultra deep indigo midnight base
                vec3(0.40, 0.08, 0.48), // cosmic plum/violet midtones
                vec3(1.0, 1.0, 1.0),    // frequency distribution
                vec3(0.0, 0.33, 0.67)   // shift stages
            );
            
            // Neon accent emission vectors (Electric Cyan & Glowing Purple-Pink)
            vec3 cyanLaserEmission = vec3(0.0, 0.91, 0.98);
            vec3 purpleNeonEmission = vec3(0.70, 0.15, 0.98);
            
            vec3 mixedGlowColor = darkAmbientBacking;
            
            // Overlay intense liquid filaments mapped to warped coordinates
            mixedGlowColor += cyanLaserEmission * fbm(q * 1.8 + scaled_time * 0.08, scaled_time) * 0.38 * u_intensity;
            mixedGlowColor += purpleNeonEmission * fbm(r * 2.2 - scaled_time * 0.06, scaled_time) * 0.48 * u_intensity;
            
            // Glossy liquid reflections & specular-like peaks
            // Derived from Y gradient and highlights
            float specularSheen = p.y * 0.045 + 0.015;
            specularSheen += smoothstep(0.66, 0.74, f) * 0.22;
            mixedGlowColor += vec3(0.85, 0.93, 1.0) * specularSheen;
            
            // High contrast boost of color density
            mixedGlowColor = pow(mixedGlowColor, vec3(1.18));
            
            // Elegant screen boundary gradient vignette to keep edges deep and immersive
            float vignetteScale = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
            float vignetteIntensity = clamp(pow(16.0 * vignetteScale, 0.38), 0.0, 1.0);
            mixedGlowColor *= vignetteIntensity;
            
            gl_FragColor = vec4(mixedGlowColor, 1.0);
        }
      `
    });
  }
}

// Register custom material in R3F namespace
extend({ VeilShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      veilShaderMaterial: Object3DNode<VeilShaderMaterial, typeof VeilShaderMaterial>;
    }
  }
}

interface LiquidPlaneProps {
  speed: number;
  intensity: number;
  interactive: boolean;
}

function LiquidPlane({ speed, intensity, interactive }: LiquidPlaneProps) {
  const materialRef = useRef<VeilShaderMaterial>(null);
  const { size } = useThree();

  // Create local viewport tracker for mouse coordinate projection
  const mouseRef = useRef(new THREE.Vector2(size.width / 2, size.height / 2));

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.set(e.clientX, size.height - e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.set(e.touches[0].clientX, size.height - e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [interactive, size]);

  // Frame tick updates uniforms over elapsed clock and updates state
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
      materialRef.current.uniforms.u_speed.value = speed;
      materialRef.current.uniforms.u_intensity.value = intensity;

      // Handle nice smooth LERPed inertia logic for mouse coordinates
      if (interactive) {
        const currentMouseU = materialRef.current.uniforms.u_mouse.value;
        currentMouseU.x += (mouseRef.current.x - currentMouseU.x) * 0.07;
        currentMouseU.y += (mouseRef.current.y - currentMouseU.y) * 0.07;
      }
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <veilShaderMaterial ref={materialRef} key={VeilShaderMaterial.name} />
    </mesh>
  );
}

interface VeilLiquidNeonProps {
  className?: string;
  speed?: number;
  intensity?: number;
  interactive?: boolean;
  opacity?: number;
}

export default function VeilLiquidNeon({
  className = '',
  speed = 0.9,
  intensity = 1.0,
  interactive = true,
  opacity = 1.0,
}: VeilLiquidNeonProps) {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  // Safe client-side WebGL detection to prevent crashes in sandboxed environments
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebGLSupported(supported);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  if (webGLSupported === false) {
    // Elegant design fluid CSS fallback if WebGL fails or is disabled
    return (
      <div 
        id="veil-liquid-fallback"
        className={`absolute inset-0 bg-[#060309] overflow-hidden ${className}`}
        style={{ opacity }}
      >
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-radial from-[#9945FF]/15 to-transparent blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-radial from-[#00E8FA]/15 to-transparent blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>
    );
  }

  return (
    <div 
      id="veil-liquid-neon-container"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      style={{ opacity, backgroundColor: 'transparent' }}
    >
      {webGLSupported !== null && (
        <Canvas
          gl={{ 
            antialias: false,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false
          }}
          orthographic={true}
          camera={{ zoom: 1 }}
          style={{ width: '100%', height: '100%' }}
        >
          <LiquidPlane speed={speed} intensity={intensity} interactive={interactive} />
        </Canvas>
      )}
    </div>
  );
}

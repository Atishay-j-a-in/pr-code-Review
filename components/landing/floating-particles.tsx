"use client";

function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function generateParticles() {
  return Array.from({ length: 30 }, (_, i) => {
    const r1 = seededRandom(i * 7 + 1);
    const r2 = seededRandom(i * 7 + 2);
    const r3 = seededRandom(i * 7 + 3);
    const r4 = seededRandom(i * 7 + 4);
    const r5 = seededRandom(i * 7 + 5);
    const r6 = seededRandom(i * 7 + 6);
    return {
      id: i,
      x: r1 * 100,
      y: r2 * 100,
      size: r3 * 6 + 4,
      duration: r4 * 20 + 15,
      delay: r5 * 10,
      opacity: r6 * 0.35 + 0.2,
    };
  });
}

const particles = generateParticles();

export function FloatingParticles() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: "blur(0.5px)",
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

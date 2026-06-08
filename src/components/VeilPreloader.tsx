import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface VeilPreloaderProps {
  onComplete: () => void;
  lang: "EN" | "RU";
}

export default function VeilPreloader({ onComplete, lang }: VeilPreloaderProps) {
  const [stage, setStage] = useState<"logo" | "wordmark" | "finished">("logo");
  const onCompleteRef = React.useRef(onComplete);

  // Keep callback reference up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Lock scrolling
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Timing timeline (Total 4.5s as requested):
    // 1. Logo pieces assemble from t=0.2s to t=1.8s
    // 2. Wordmark "VEIL" appears precisely after logo assembly completes, starting at t=2.0s
    const wordmarkTimer = setTimeout(() => {
      setStage("wordmark");
    }, 2000);

    // 3. Mark preloader as completely finished after 4.5 seconds
    const finishTimer = setTimeout(() => {
      setStage("finished");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      onCompleteRef.current();
    }, 4500);

    return () => {
      clearTimeout(wordmarkTimer);
      clearTimeout(finishTimer);
      // Fallback scroll restoration
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);


  // Symmetrical edge-to-center indices for columns
  // Bottom-up (rises from y = 600 down to central position)
  const bottomStagger = {
    line1: { delay: 0.2, fromY: 600, targetY: 128 },  // Far left
    line2: { delay: 0.4, fromY: 600, targetY: 160 },
    line3: { delay: 0.6, fromY: 600, targetY: 224 },
    line4b: { delay: 0.8, fromY: 600, targetY: 256 }, // Mid split-bottom
  };

  // Top-down (falls from y = -600 up to central position)
  const topStagger = {
    line7: { delay: 0.2, fromY: -600, targetY: 128 }, // Far right
    line6: { delay: 0.4, fromY: -500, targetY: 128 },
    line5: { delay: 0.6, fromY: -400, targetY: 128 },
    line4a: { delay: 0.8, fromY: -300, targetY: 128 }, // Mid split-top
  };

  const strokeWidth = 6;
  const offset = strokeWidth / 2;
  const r = strokeWidth / 2;

  // Slow luxury spring setting for logo assembly
  const springTransition = (delay: number) => ({
    type: "spring" as const,
    stiffness: 32,
    damping: 14,
    mass: 1.15,
    delay: delay,
  });

  return (
    <AnimatePresence>
      {stage !== "finished" && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, filter: "blur(32px)", scale: 1.015 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden select-none pointer-events-auto bg-[#050505] flex flex-col items-center justify-center text-center"
          id="veil-preloader-viewport"
        >
          {/* CENTER ANIMATED EMBLEM PANEL */}
          <div className="flex flex-col items-center justify-center z-10">
            <div className="flex flex-col items-center" id="preloader-content-cluster">
              {/* Symmetrical SVG Logo Construction Stage */}
              <div className="w-32 sm:w-44 h-32 sm:h-44 flex items-center justify-center relative">
                <svg
                  viewBox="0 0 512 512"
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  className="overflow-visible"
                >
                  <g>
                    {/* Bottom-up Riser: Line 1 (Far Left) */}
                    <motion.rect
                      initial={{ y: bottomStagger.line1.fromY, opacity: 0 }}
                      animate={{ y: bottomStagger.line1.targetY, opacity: 1 }}
                      transition={springTransition(bottomStagger.line1.delay)}
                      x={160 - offset}
                      width={strokeWidth}
                      height={256}
                      rx={r}
                      fill="#FFFFFF"
                    />

                    {/* Bottom-up Riser: Line 2 */}
                    <motion.rect
                      initial={{ y: bottomStagger.line2.fromY, opacity: 0 }}
                      animate={{ y: bottomStagger.line2.targetY, opacity: 1 }}
                      transition={springTransition(bottomStagger.line2.delay)}
                      x={192 - offset}
                      width={strokeWidth}
                      height={224}
                      rx={r}
                      fill="#FFFFFF"
                    />

                    {/* Bottom-up Riser: Line 3 */}
                    <motion.rect
                      initial={{ y: bottomStagger.line3.fromY, opacity: 0 }}
                      animate={{ y: bottomStagger.line3.targetY, opacity: 1 }}
                      transition={springTransition(bottomStagger.line3.delay)}
                      x={224 - offset}
                      width={strokeWidth}
                      height={160}
                      rx={r}
                      fill="#FFFFFF"
                    />

                    {/* Top-down Faller: Line 4a (Mid split-top) */}
                    <motion.rect
                      initial={{ y: topStagger.line4a.fromY, opacity: 0 }}
                      animate={{ y: topStagger.line4a.targetY, opacity: 1 }}
                      transition={springTransition(topStagger.line4a.delay)}
                      x={256 - offset}
                      width={strokeWidth}
                      height={32}
                      rx={r}
                      fill="#FFFFFF"
                    />

                    {/* Bottom-up Riser: Line 4b (Mid split-bottom) */}
                    <motion.rect
                      initial={{ y: bottomStagger.line4b.fromY, opacity: 0 }}
                      animate={{ y: bottomStagger.line4b.targetY, opacity: 1 }}
                      transition={springTransition(bottomStagger.line4b.delay)}
                      x={256 - offset}
                      width={strokeWidth}
                      height={128}
                      rx={r}
                      fill="#FFFFFF"
                    />

                    {/* Top-down Faller: Line 5 */}
                    <motion.rect
                      initial={{ y: topStagger.line5.fromY, opacity: 0 }}
                      animate={{ y: topStagger.line5.targetY, opacity: 1 }}
                      transition={springTransition(topStagger.line5.delay)}
                      x={288 - offset}
                      width={strokeWidth}
                      height={160}
                      rx={r}
                      fill="#FFFFFF"
                    />

                    {/* Top-down Faller: Line 6 */}
                    <motion.rect
                      initial={{ y: topStagger.line6.fromY, opacity: 0 }}
                      animate={{ y: topStagger.line6.targetY, opacity: 1 }}
                      transition={springTransition(topStagger.line6.delay)}
                      x={320 - offset}
                      width={strokeWidth}
                      height={224}
                      rx={r}
                      fill="#FFFFFF"
                    />

                    {/* Top-down Faller: Line 7 (Far Right) */}
                    <motion.rect
                      initial={{ y: topStagger.line7.fromY, opacity: 0 }}
                      animate={{ y: topStagger.line7.targetY, opacity: 1 }}
                      transition={springTransition(topStagger.line7.delay)}
                      x={352 - offset}
                      width={strokeWidth}
                      height={256}
                      rx={r}
                      fill="#FFFFFF"
                    />
                  </g>
                </svg>
              </div>

              {/* Majestic typography fade-in of word VEIL */}
              <div className="h-24 sm:h-28 mt-6 overflow-hidden relative flex flex-col items-center justify-center">
                <AnimatePresence>
                  {(stage === "wordmark") && (
                    <motion.div
                      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                      transition={{
                        duration: 1.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex justify-center items-center font-serif text-[#EDEAE2]"
                      style={{
                        fontSize: "clamp(36px, 6vw, 64px)",
                        letterSpacing: "0.6em",
                        marginRight: "-0.6em",
                        fontWeight: 200,
                      }}
                    >
                      VEIL
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

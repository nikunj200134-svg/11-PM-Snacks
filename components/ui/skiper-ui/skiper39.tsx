"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  src?: string;
  rows?: number;
  cols?: number;
  className?: string;
}

const CrowdCanvas = ({
  src = "/images/peeps/all-peeps - Copy.png",
  rows = 15,
  cols = 7,
  className = "w-full h-full",
}: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      src,
      rows,
      cols,
    };

    // Responsive scaling and crowd density caps
    const stage = {
      width: 0,
      height: 0,
    };
    let peepScale = 0.65;
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

    // UTILS
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => randomRange(0, array.length) | 0;
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;

      // Assign depth: 0 = far background, 1 = immediate foreground
      const depth = Math.random();
      peep.depth = depth;

      // Scale multiplier by depth: 0.78 (far background) to 1.08 (crisp foreground)
      const scaleMultiplier = 0.78 + depth * 0.3;
      peep.scaleMultiplier = scaleMultiplier;

      const renderedWidth = peep.width * peepScale * scaleMultiplier;
      const renderedHeight = peep.height * peepScale * scaleMultiplier;

      // Ground baseline: background peeps are placed higher up so their heads/faces peek through!
      const verticalElevation = (1 - depth) * (stage.height * 0.28);
      const startY = Math.max(0, stage.height - renderedHeight - verticalElevation);

      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -renderedWidth - 20;
        endX = stage.width + 20;
        peep.scaleX = 1;
      } else {
        startX = stage.width + 20;
        endX = -renderedWidth - 20;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      // Anchor Y represents sorting depth: back peeps (lower anchorY) render first, front peeps render on top
      peep.anchorY = startY + renderedHeight;

      return {
        startX,
        startY,
        endX,
        depth,
      };
    };

    const normalWalk = ({ peep, props }: { peep: any; props: any }) => {
      const { startX, startY, endX, depth = 0.5 } = props;
      // Background peeps walk slightly slower for parallax depth
      const xDuration = randomRange(9, 15) / (0.75 + depth * 0.35);
      const yDuration = randomRange(0.2, 0.28);
      const bounceHeight = 3 + depth * 5;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.7, 1.3));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0,
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: Math.floor(xDuration / yDuration),
          yoyo: true,
          y: startY - bounceHeight,
        },
        0,
      );

      return tl;
    };

    const walks = [normalWalk];

    // TYPES
    type Peep = {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      drawArgs: any[];
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      scaleMultiplier: number;
      depth: number;
      walk: any;
      setRect: (rect: number[]) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    // FACTORY FUNCTIONS
    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        scaleMultiplier: 1,
        depth: 0.5,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = rect[2];
          peep.height = rect[3];
          peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          const currentScale = peepScale * (peep.scaleMultiplier || 1);
          ctx.scale(peep.scaleX * currentScale, currentScale);
          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height,
          );
          ctx.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    // MAIN
    const img = document.createElement("img");
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      allPeeps.length = 0;
      // Create 3 instances of each sprite slice (315 total peeps) to populate dense crowds
      for (let duplicate = 0; duplicate < 3; duplicate++) {
        for (let i = 0; i < total; i++) {
          allPeeps.push(
            createPeep({
              image: img,
              rect: [
                (i % rows) * rectWidth,
                ((i / rows) | 0) * rectHeight,
                rectWidth,
                rectHeight,
              ],
            }),
          );
        }
      }
    };

    // Densely populated crowd scaling
    const maxCrowd = () => {
      if (stage.width < 500) return 26;
      if (stage.width < 768) return 36;
      if (stage.width < 1200) return 52;
      return Math.min(80, Math.max(50, Math.floor(stage.width / 22)));
    };

    const initCrowd = () => {
      const limit = maxCrowd();
      while (crowd.length < limit && availablePeeps.length) {
        addPeepToCrowd()?.walk?.progress(Math.random());
      }
    };

    const addPeepToCrowd = () => {
      if (!availablePeeps.length) {
        if (allPeeps.length) {
          availablePeeps.push(...allPeeps);
        } else {
          return null;
        }
      }
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      peepScale = stage.width < 768 ? 0.35 : 0.46;
      
      canvas.width = stage.width * dpr;
      canvas.height = stage.height * dpr;

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const init = () => {
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = encodeURI(config.src);

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={className} />
  );
};

const Skiper39 = () => {
  return (
    <div className="relative h-full w-full bg-white text-black">
      <div className="top-22 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
          Croud Canvas
        </span>
      </div>
      <div className="absolute bottom-0 h-full w-screen">
        <CrowdCanvas src="/images/peeps/all-peeps - Copy.png" rows={15} cols={7} />
      </div>
    </div>
  );
};

export { CrowdCanvas, Skiper39 };

/**
 * Skiper 39 Canvas_Landing_004 — React + Canvas
 * Inspired by and adapted from https://codepen.io/zadvorsky/pen/xxwbBQV
 * illustration by https://www.openpeeps.com/
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the codepen.io . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */

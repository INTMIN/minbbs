import { Card } from "@heroui/react";
import React from "react";
import LiquidGlass from "~/components/LiquidGrass";

const MouseLiquidGrass = () => {
  const [pos, setPos] = React.useState({ x: 180, y: 50 });
  const dragging = React.useRef(false);
  return (
    <div
      onPointerDown={() => (dragging.current = true)}
      onPointerUp={() => (dragging.current = false)}
      onPointerMove={(e) =>
        dragging.current &&
        setPos((p) => ({ x: p.x + e.movementX, y: p.y + e.movementY }))
      }
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        touchAction: "none",
      }}
    >
      {/* <LiquidGlass mode="standard" className="z-10" blurAmount={0.1}>
        可拖拽的液态玻璃
      </LiquidGlass> */}
      <LiquidGlass
        displacementScale={100}
        blurAmount={0.08}
        saturation={180}
        elasticity={0.2}
        mode="prominent"
        cornerRadius={24}
        className="z-10"
      >
        <Card className="bg-transparent">
          <div className="p-6 text-[#b3b3b3]">
            <p>这里有个液态玻璃盒子</p>
            <p>你可以拖动他查看效果</p>
          </div>
        </Card>
      </LiquidGlass>
    </div>
  );
};

export default MouseLiquidGrass;

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
      <LiquidGlass mode="standard">可拖拽的液态玻璃</LiquidGlass>
    </div>
  );
};

export default MouseLiquidGrass;

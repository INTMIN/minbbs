import React from "react";
import "./index.less";

export default () => {
  return (
    <div className="glass-container">
      <div className="glass">
        <h3>Liquid Glass</h3>
        <p>半透明 + 边缘折射 + 动态高光</p>
      </div>

      {/* <!-- SVG 滤镜定义（隐藏） --> */}
      <svg width="0" height="0" aria-hidden="true">
        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          {/* <!-- 生成噪声 --> */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          {/* <!-- 平滑噪声 --> */}
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          {/* <!-- 位移形成折射 --> */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  );
};

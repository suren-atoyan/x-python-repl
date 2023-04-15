import React from 'react';

function CircularProgress() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={65} height={65} viewBox="0 0 66 66">
      <g>
        <animateTransform
          fill="freeze"
          attributeName="transform"
          begin="0s"
          dur="1.4s"
          repeatCount="indefinite"
          type="rotate"
          values="0 33 33;270 33 33"
        />
        <circle cx={33} cy={33} r={30} fill="none">
          <animate
            fill="freeze"
            attributeName="stroke"
            begin="0s"
            dur="5.6s"
            repeatCount="indefinite"
            values="#4285F4;#DE3E35;#F7C223;#1B9A59;#4285F4"
          />
          <animateTransform
            fill="freeze"
            attributeName="transform"
            begin="0s"
            dur="1.4s"
            repeatCount="indefinite"
            type="rotate"
            values="0 33 33;135 33 33;450 33 33"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0s"
            dur="1.4s"
            repeatCount="indefinite"
            values="187;46.75;187"
          />
        </circle>
      </g>
    </svg>
  );
}

export default CircularProgress;

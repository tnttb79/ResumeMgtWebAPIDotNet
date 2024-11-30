import React from "react";

interface SunIconProps {
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
  title?: string;
}

const SunIcon: React.FC<SunIconProps> = ({
  width = "24",
  height = "24",
  fill = "none",
  stroke = "#000000",
  title = "Sun Icon",
}) => {
  return (
    <svg
      viewBox='0 0 24 24'
      width={width}
      height={height}
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      aria-labelledby='sunIconTitle'
      role='img'
    >
      <title id='sunIconTitle'>{title}</title>
      <circle cx='12' cy='12' r='6' stroke={stroke} strokeWidth='1.5' />
      <path
        d='M12 2V3'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M12 21V22'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M22 12L21 12'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M3 12L2 12'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        opacity='0.5'
        d='M19.0708 4.92969L18.678 5.32252'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        opacity='0.5'
        d='M5.32178 18.6777L4.92894 19.0706'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        opacity='0.5'
        d='M19.0708 19.0703L18.678 18.6775'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        opacity='0.5'
        d='M5.32178 5.32227L4.92894 4.92943'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default SunIcon;

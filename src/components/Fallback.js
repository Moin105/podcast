import React, { useEffect, useState } from 'react';
import logos2 from '../images/logo2.png'
const FallbackImage = ({ src, alt, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  const handleError = (e) => {
    e.target.src = logos2;
  };
  return (
    <img
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      style={{width: "160px",
    objectFit: "contain",
    height: "50px"}}
    />
  );
}
export default FallbackImage;
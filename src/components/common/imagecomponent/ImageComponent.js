import React from "react";
import Proptypes from "prop-types";

/**
 *
 * @param {string} src - image url or path to be rendered
 *
 * @param {string} alt - alternate text for image
 *
 * @param {string or number} width - width of image
 *
 * @param {number} height - height of image
 *
 * @returns - return image jsx
 *
 */

const ImageComponent = ({ src, alt, width, height }) => {
  return (
    <img src={src} alt={alt} width={width} height={height} loading="lazy" />
  );
};

ImageComponent.propTypes = {
  src: Proptypes.string,
  alt: Proptypes.string,
  width: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  height: Proptypes.number,
};

export default ImageComponent;

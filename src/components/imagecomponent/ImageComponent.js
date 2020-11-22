import React from "react";
import Proptypes from "prop-types";

const ImageComponent = (props) => {
  return (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      loading="lazy"
    />
  );
};

ImageComponent.propTypes = {
  src: Proptypes.string,
  alt: Proptypes.string,
  width: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  height: Proptypes.number,
};

export default ImageComponent;

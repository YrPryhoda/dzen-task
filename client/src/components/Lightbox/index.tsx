import * as React from "react";
import Reactlightbox from "yet-another-react-lightbox";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  image: { src: string; alt: string };
}
const Lightbox = ({ isOpen, onClose, image }: IProps) => {
  return (
    <Reactlightbox
      open={isOpen}
      close={onClose}
      slides={[{ ...image, imageFit: "cover" }]}
      animation={{ fade: 500 }}
      carousel={{
        finite: true
      }}
      controller={{ closeOnBackdropClick: true }}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null
      }}
    />
  );
};

export default Lightbox;


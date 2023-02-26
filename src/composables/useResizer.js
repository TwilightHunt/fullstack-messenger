import { ref } from "vue";

const image = ref("");

export default function useResizer() {
  const setImageSrc = (src) => {
    image.value = URL.createObjectURL(src);
  };

  return { image, setImageSrc };
}

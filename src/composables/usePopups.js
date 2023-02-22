import { ref } from "vue";

const popup = ref("");

export default function usePopups() {
  const setActivePopup = (name) => {
    popup.value = name;
  };

  return { popup, setActivePopup };
}

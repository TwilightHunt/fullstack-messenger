import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import App from "../App.vue";
import { createVuetify } from "vuetify";

const purpleDarkTheme = {
  dark: true,
  colors: {
    primary: "#8774e1",
    secondary: "#03DAC6",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "purpleDarkTheme",
    themes: {
      purpleDarkTheme,
    },
  },
});

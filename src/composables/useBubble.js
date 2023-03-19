export const optionsArray = [
  {
    text: "Reply",
    iconName: "mdi-reply-outline",
  },
  {
    text: "Edit",
    iconName: "mdi-pencil-outline",
  },
  {
    text: "Copy Text",
    iconName: "mdi-content-copy",
  },
  {
    text: "Delete",
    iconName: "mdi-delete-outline",
    color: "red",
  },
];

export const messageArray = [
  {
    text: "Reply",
    iconName: "mdi-reply-outline",
  },
  {
    text: "Edit",
    iconName: "mdi-pencil-outline",
  },
  {
    text: "Copy Text",
    iconName: "mdi-content-copy",
  },
  {
    text: "Delete",
    iconName: "mdi-delete-outline",
    color: "red",
  },
];

export const setBubbleListeners = (callback) => {
  addEventListener(
    "click",
    function (e) {
      if (!e.target.classList[0].includes("bubble-item")) {
        callback();
      }
    },
    { capture: true }
  );
  addEventListener(
    "contextmenu",
    function (e) {
      callback();
    },
    { capture: true }
  );
};

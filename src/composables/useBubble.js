const bubbleRed = "#D34041";

export const optionsArray = [
  {
    text: "Video Call",
    iconName: "mdi-video-outline",
  },
  {
    text: "Mute",
    iconName: "mdi-bell-ring-outline",
  },
  {
    text: "Select messages",
    iconName: "mdi-check-circle-outline",
  },
  {
    text: "Report",
    iconName: "mdi-flag-variant-outline",
  },
  {
    text: "Gift premium",
    iconName: "mdi-gift-outline",
  },
  {
    text: "Delete chat",
    iconName: "mdi-delete-outline",
    color: bubbleRed,
    divided: true,
  },
];
export const logoutArray = [
  {
    text: "Log Out",
    iconName: "mdi-logout",
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
    text: "Pin",
    iconName: "mdi-pin-outline",
  },
  {
    text: "Forward",
    iconName: "mdi-share-outline",
  },
  {
    text: "Select",
    iconName: "mdi-check-circle-outline",
  },
  {
    text: "Delete",
    iconName: "mdi-delete-outline",
    color: bubbleRed,
  },
];

export const setBubbleListeners = (callback) => {
  addEventListener(
    "click",
    function (e) {
      callback(e);
    },
    { capture: true, once: true }
  );
  addEventListener(
    "contextmenu",
    function (e) {
      callback(e);
    },
    { capture: true, once: true }
  );
};

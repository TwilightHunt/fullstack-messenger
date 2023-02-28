<template>
  <popup>
    <div class="file-resizer">
      <header class="file-resizer__header">
        <v-icon
          class="file-resizer__header__icon-close"
          @click="setActivePopup('userSettings')"
        >
          mdi-close
        </v-icon>
        <div class="file-resizer__header__title">Drag to reposition</div>
      </header>
      <div class="file-resizer__body">
        <img
          src="../../assets/images/filter.png"
          alt=""
          class="file-resizer__image"
        />
        <canvas @wheel="zoomImage" class="file-resizer__canvas" id="canvas">
        </canvas>
      </div>
      <actionButton class="file-resizer__button" @click="upload"
        >Submit</actionButton
      >
    </div>
    <img :src="image" id="image" />
    <canvas id="prev-canvas"> </canvas>
  </popup>
</template>

<script setup>
import popup from "./popup.vue";
import actionButton from "../UI/action-btn.vue";
import useResizer from "../../composables/useResizer.js";
import usePopups from "../../composables/usePopups";
import { fabric } from "fabric";
import { onMounted } from "vue";
import { saveAs } from "file-saver";
import { useUserStore } from "../../stores/user.js";

const { update } = useUserStore();

const { setActivePopup } = usePopups();

const { image } = useResizer();
let imgInstance = null;

onMounted(() => {
  const img = document.getElementById("image");

  let minScale = 0;

  img.onload = () => {
    const canvas = new fabric.Canvas("canvas", {
      skipOffscreen: true,
    });
    canvas.setDimensions({ width: 400, height: 400 });

    if (img.width >= img.height) {
      minScale = canvas.height / img.height;
    } else {
      minScale = canvas.width / img.width;
    }

    let borderRight = canvas.width - img.width;
    let borderBottom = canvas.height - img.height;

    imgInstance = new fabric.Image(img, {
      lockRotation: true,
    });

    canvas.add(imgInstance);
    canvas.item(0).hasControls = canvas.item(0).hasBorders = false;

    canvas.on({
      "object:moving": function (e) {
        if (imgInstance.left >= 0) imgInstance.left = 0;
        if (imgInstance.left <= borderRight) imgInstance.left = borderRight;
        if (imgInstance.top >= 0) imgInstance.top = 0;
        if (imgInstance.top <= borderBottom) imgInstance.top = borderBottom;
      },
      "mouse:wheel": function (event) {
        imgInstance.scaleX += 0.0001 * event.e.deltaY;
        imgInstance.scaleY += 0.0001 * event.e.deltaY;

        if (imgInstance.scaleX < minScale) {
          imgInstance.scaleX = imgInstance.scaleY = minScale;
        }
        if (imgInstance.scaleX > 2) {
          imgInstance.scaleX = imgInstance.scaleY = 2;
        }

        borderRight = canvas.width - img.width * imgInstance.scaleX;
        borderBottom = canvas.height - img.height * imgInstance.scaleX;

        canvas.requestRenderAll();
      },
    });
  };
});

const upload = () => {
  const canvas = document.getElementById("prev-canvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = 400;
  ctx.canvas.height = 400;
  const img = document.getElementById("image");

  ctx.drawImage(
    img,
    (imgInstance.left * -1) / imgInstance.scaleX,
    (imgInstance.top * -1) / imgInstance.scaleX,
    400 / imgInstance.scaleX,
    400 / imgInstance.scaleX,
    0,
    0,
    400,
    400
  );

  canvas.toBlob(
    async (blob, error) => {
      //saveAs(blob, "mypng.png");
      if (error) {
        alert(error);
        return;
      }
      const file = new File([blob], "image.jpg");
      await update({ profileImage: file });
      setActivePopup("");
    },
    "image/jpeg",
    0.95
  );
};
</script>

<style lang="scss" scoped>
.file-resizer {
  padding: 30px 40px;
  overflow: hidden;
}
.file-resizer__body {
  margin: 30px auto;
}
.file-resizer__header {
  display: flex;
  align-items: center;
}
.file-resizer__header__icon-close {
  opacity: 0.5;
  transition: opacity 0.2s ease;
  margin-right: 30px;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}
.file-resizer__header__title {
  font-size: 1.2em;
}
.file-resizer__range-input {
  display: flex;
  input {
    flex: 1 0 auto;
  }
  label {
    margin-right: 10px;
  }
}
.file-resizer__image {
  position: absolute;
  pointer-events: none;
  z-index: 10;
}

.file-resizer__image {
  display: block;
}
#image,
#prev-canvas {
  display: none;
}
.file-resizer__button {
  display: block;
  background: var(--accent-color);
  color: #fff;
  font-size: 1.2em;
  padding: 5px 20px;
  margin: 0 auto;
  width: 400px;
  &:hover {
    background: var(--accent-color);
  }
}
</style>

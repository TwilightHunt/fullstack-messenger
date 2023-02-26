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
    </div>
    <img :src="image" id="image" />
  </popup>
</template>

<script setup>
import popup from "./popup.vue";
import useResizer from "../../composables/useResizer.js";
import usePopups from "../../composables/usePopups";
import { fabric } from "fabric";
import { onMounted, ref } from "vue";

const { setActivePopup } = usePopups();

const { image } = useResizer();

onMounted(() => {
  const img = document.getElementById("image");

  img.onload = () => {
    let scale = 0;

    if (img.width < img.height) {
      scale = img.width / 400;
    } else {
      scale = img.width / 400;
    }

    img.style.width = img.width / scale + "px";
    img.style.height = img.height / scale + "px";

    const canvas = new fabric.Canvas("canvas", {});
    canvas.setDimensions({ width: 400, height: 400 });

    let borderRight = canvas.width - img.width;
    let borderBottom = canvas.height - img.height;

    const imgInstance = new fabric.Image(img, {
      lockRotation: true,
    });

    canvas.add(imgInstance);

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

        if (imgInstance.scaleX < 1) {
          imgInstance.scaleX = imgInstance.scaleY = 1;
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

const zoomImage = (e) => {};
</script>

<style lang="scss" scoped>
.file-resizer {
  padding: 30px;
  overflow: hidden;
}
.file-resizer__body {
  width: 400px;
  height: 400px;
}

.file-resizer__header {
  display: flex;
  align-items: center;
}

.file-resizer__header__icon-close {
  opacity: 0.5;
  transition: opacity 0.2s ease;
  margin-right: 40px;
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
#image {
  display: none;
}
</style>

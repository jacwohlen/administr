<template>
  <img
    class="rotating"
    src="~/assets/administra-logo.svg"
    alt="administra logo"
  />
</template>

<style>
.rotating {
  animation: rotate 2s;
}
@keyframes rotate {
  to {
    transform: rotate(-360deg);
  }
}
</style>

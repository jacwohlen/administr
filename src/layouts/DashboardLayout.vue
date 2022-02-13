<template>
  <v-app class="background">
    <NavigationBar />
    <v-main class="content">
      <AlertBox />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
.content {
  max-width: 1200px;
  min-width: 1200px;
  margin: 0 auto;
  background-color: white;
}

.background {
  background-color: lightblue;
}
</style>

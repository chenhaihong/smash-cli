<template>
  <div>
    <h1 class="red">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello-vue-v2',
  data() {
    return {
      title: 'Hello vue 2',
    };
  },
};
</script>

<style lang="less">
.red {
  margin: 50px auto 0;
  padding: 16px;
  width: 400px;
  text-align: center;
  color: yellowgreen;
  background-color: black;
}
</style>

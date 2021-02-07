<template>
  <div id="app">
    <PipeLine />
  </div>
</template>

<script>
import PipeLine from './components/Pipeline/index'
export default {
  name: 'App',
  components: {
    PipeLine
  },
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 20px;
}
</style>

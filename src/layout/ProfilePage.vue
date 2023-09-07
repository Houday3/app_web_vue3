<script setup>
import { reactive } from 'vue'
const followList = reactive([
  { followName: 'Investment', id: 1 },
  { followName: 'Tech', id: 2 },
  { followName: 'hackeerhouse', id: 3 },
  { followName: 'Hackathou', id: 4 }
])
</script>

<template>
  <el-row class="follow">
    <div class="follow-left">
      <img src="https://p.qqan.com/up/2020-11/16058518983314374.jpg" alt="" />
    </div>
    <div class="follow-right">
      <el-row class="follow-ifms">
        <label for="" class="follow-name">Nancy</label>
        <el-button class="certified">Certified</el-button>
      </el-row>
      <el-row class="career">
        <el-button type="success" v-for="item in followList" :key="item.id" class="career-btn">{{
          item.followName
        }}</el-button>
      </el-row>
    </div>
  </el-row>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.follow {
  position: relative;
  width: 100%;
  height: 400px;
  background-color: pink;
}
.follow-left {
  width: 140px;
  height: 140px;
}
.follow-left img {
  margin-left: 50px;
  width: 100%;
  border-radius: 70px;
}
.follow-right {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 70px;
}
.follow-ifms {
  top: 20px;
}
.follow-name {
  font-size: 28px;
}
.certified {
  height: 40px;
  margin-left: 20px;
  width: 120px;
}
.career {
  position: absolute;
  top: 70px;
  flex-wrap: nowrap;
}
.career-btn {
  width: 120px;
}
</style>

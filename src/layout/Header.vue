<script setup>
import { Location } from '@element-plus/icons-vue'
import router from '../router'
import { showLogin } from '../store/store'
import { reactive } from 'vue'

const listType = reactive([
  { Type: 'Investement', id: 1 },
  { Type: 'Hackerhouse', id: 2 },
  { Type: 'hackathon', id: 3 },
  { Type: 'Tech', id: 4 },
  { Type: 'Lesson', id: 5 },
  { Type: 'Party', id: 6 }
])

const listHosting = reactive([
  { Hosting: 'Offline', id: 1 },
  { Hosting: 'Online', id: 2 }
])

const listCity = reactive([
  { City: 'Singapore', id: 1 },
  { City: 'Shanghai', id: 2 },
  { City: 'HongKong', id: 3 },
  { City: 'Tokyo', id: 4 },
  { City: 'Seoul', id: 5 },
  { City: 'Paris', id: 6 },
  { City: 'New York', id: 7 }
])
</script>

<template>
  <div>
    <h1>HOWDY3 Header</h1>
  </div>
  <div class="img">
    <div class="login">
      <el-row class="login-w">
        <label for="" class="login-name">Wallet Connect</label>
        <div class="vir">
          <img
            src="https://www.vm888.com/d/file/QQ/QQtouxiang/2020-05-21/8ad686c09940de99686722c74c89b284.jpg"
            alt=""
          />
        </div>
      </el-row>
      <span class="login-prev">Find it</span>
      <span class="login-next">Join it</span>
    </div>
  </div>

  <!-- <el-button type="info" plain class="register" @click="handleClick()">登录</el-button> -->

  <el-row class="filters">
    <label for="" class="">Filters </label>
    <el-input v-model="input" placeholder="Search for filter/name/date/region..." class="el-ip">
    </el-input>
  </el-row>

  <el-row class="type">
    <label for="">Type:</label>
    <el-button plain v-for="item in listType" :key="item.id">{{ item.Type }}</el-button>
  </el-row>

  <el-row class="hosting">
    <label for="">Hosting:</label>
    <el-button plain v-for="item in listHosting" :key="item.id">{{ item.Hosting }}</el-button>
  </el-row>

  <el-row class="city">
    <label for="">City:</label>
    <el-button plain v-for="item in listCity" :key="item.id" :icon="Location">{{
      item.City
    }}</el-button>
  </el-row>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.img {
  position: relative;
  background: url('http://seopic.699pic.com/photo/50059/8720.jpg_wh1200.jpg') no-repeat;
  height: 500px;
  background-size: cover;
}
.filters {
  margin-top: 10px;
}
.filters .el-ip {
  padding: 0 15px;
  width: 270px;
}
.login {
  position: absolute;
  top: 0;
  right: 0;
  height: 500px;
  width: 300px;
  box-shadow: 5px 5px 5px;
  background-color: black;
}
.login-w {
  position: absolute;
  top: 30px;
  right: 40px;
}
.login-name {
  margin-top: 10px;
  color: white;
  font-weight: 700;
}
.vir {
  width: 60px;
  height: 60px;
}
.vir img {
  border-radius: 30px;
  width: 100%;
  height: 100%;
}
.login-prev {
  top: 200px;
}
.login-next {
  bottom: 130px;
}
.login-prev,
.login-next {
  font-family: 'STHupo';
  position: absolute;
  color: white;
  font-size: 60px;
  right: 40px;
}
.type {
  margin: 10px 0;
}
.el-button {
  width: 120px;
}
.city {
  margin: 10px 0;
}
label {
  margin-left: 10px;
  width: 70px;
}
</style>

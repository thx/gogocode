<template>
  <div>
    <el-date-picker
      :shortcuts="pickerOptions && pickerOptions.shortcuts"
      :disabled-date="pickerOptions && pickerOptions.disabledDate"
      :cell-class-name="pickerOptions && pickerOptions.cellClassName"
      v-model="value2"
      align="right"
      type="date"
      placeholder="选择日期"
    >
    </el-date-picker>
  </div>
</template>

<script>
import {
  $on,
  $off,
  $once,
  $emit,
} from '../../../../vue3/src/utils/gogocodeTransfer'
import * as Vue from 'vue'
export default {
  name: 'date-time-pickers',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'date-time-pickers',
      version: Vue.version,
      value2: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            value() {
              return new Date()
            },
          },
          {
            text: '昨天',
            value() {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              return date
            },
          },
          {
            text: '一周前',
            value() {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              return date
            },
          },
        ],
      },
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
  emits: ['pick'],
}
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>

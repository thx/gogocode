<template>
  <div>
    <el-date-picker
      :shortcuts="pickerOptions && pickerOptions.shortcuts"
      :disabled-date="pickerOptions && pickerOptions.disabledDate"
      :cell-class-name="pickerOptions && pickerOptions.cellClassName"
      v-model="value"
      align="right"
      type="date"
      placeholder="选择日期"
    >
    </el-date-picker>
    <div class="block">
      <span class="demonstration">周</span>
      <el-date-picker
        v-model="value1"
        type="week"
        format="YYYY 第 ww 周"
        placeholder="选择周"
      >
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">月</span>
      <el-date-picker v-model="value2" type="month" placeholder="选择月">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">年</span>
      <el-date-picker v-model="value3" type="year" placeholder="选择年">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">多个日期</span>
      <el-date-picker
        type="dates"
        v-model="value4"
        placeholder="选择一个或多个日期"
      >
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value5"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker
        :shortcuts="pickerOptions && pickerOptions.shortcuts"
        :disabled-date="pickerOptions && pickerOptions.disabledDate"
        :cell-class-name="pickerOptions && pickerOptions.cellClassName"
        v-model="value6"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>

    <div class="block">
      <p>组件值：{{ valueDefaultTime }}</p>
      <el-date-picker
        :default-time="
          ['00:00:00', '23:59:59'].map((d) => dayjs(d, 'hh:mm:ss').toDate())
        "
        v-model="valueDefaultTime"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>
    <el-time-select
      :start="
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
        } &&
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
        }.start
      "
      :end="
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
        } &&
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
        }.end
      "
      :step="
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
        } &&
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
        }.step
      "
      :min-time="
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
        } &&
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
        }.minTime
      "
      :max-time="
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
        } &&
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
        }.maxTime
      "
      placeholder="起始时间"
      v-model="startTime"
    >
    </el-time-select>
    <el-time-select
      :start="
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime,
        } &&
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime,
        }.start
      "
      :end="
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime,
        } &&
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime,
        }.end
      "
      :step="
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime,
        } &&
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime,
        }.step
      "
      :min-time="
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime,
        } &&
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime,
        }.minTime
      "
      :max-time="
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime,
        } &&
        {
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime,
        }.maxTime
      "
      placeholder="结束时间"
      v-model="endTime"
    >
    </el-time-select>
  </div>
</template>

<script>
import * as dayjs from 'dayjs'
import { $on, $off, $once, $emit } from '../../utils/gogocodeTransfer'
import * as Vue from 'vue'
export default {
  data() {
    return {
      name: 'date-time-pickers',
      version: Vue.version,
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      valueDefaultTime: '',
      startTime: '',
      endTime: '',
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
      dayjs,
    }
  },
  name: 'date-time-pickers',
  props: {
    msg: String,
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

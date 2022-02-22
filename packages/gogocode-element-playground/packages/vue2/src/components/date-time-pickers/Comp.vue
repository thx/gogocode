<template>
    <div>
        <el-date-picker
            v-model="value"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
        >
        </el-date-picker>
        <div class="block">
            <span class="demonstration">周</span>
            <el-date-picker v-model="value1" type="week" format="YYYY 第 ww 周" placeholder="选择周"> </el-date-picker>
        </div>
        <div class="block">
            <span class="demonstration">月</span>
            <el-date-picker v-model="value2" type="month" placeholder="选择月"> </el-date-picker>
        </div>
        <div class="block">
            <span class="demonstration">年</span>
            <el-date-picker v-model="value3" type="year" placeholder="选择年"> </el-date-picker>
        </div>
        <div class="block">
            <span class="demonstration">多个日期</span>
            <el-date-picker type="dates" v-model="value4" placeholder="选择一个或多个日期"> </el-date-picker>
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
                v-model="value6"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
            >
            </el-date-picker>
        </div>

        <div class="block">
            <p>组件值：{{ valueDefaultTime }}</p>
            <el-date-picker
                v-model="valueDefaultTime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
        </div>
        <el-time-select
            placeholder="起始时间"
            v-model="startTime"
            :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
            }"
        >
        </el-time-select>
        <el-time-select
            placeholder="结束时间"
            v-model="endTime"
            :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: startTime
            }"
        >
        </el-time-select>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
    name: 'date-time-pickers',
    props: {
        msg: String
    },
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
                    return time.getTime() > Date.now();
                },
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            }
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    color: #64b587;
}
</style>

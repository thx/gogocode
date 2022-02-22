<template>
    <div>
        <el-calendar>
            <template slot="dateCell" slot-scope="{ date, data }">
                <p :class="data.isSelected ? 'is-selected' : ''">
                    {{
                        data.day
                            .split('-')
                            .slice(1)
                            .join('-')
                    }}
                    {{ data.isSelected ? '✔️' : '' }}
                </p>
            </template>
        </el-calendar>
        <el-calendar :range="['2019-03-04', '2019-03-24']"></el-calendar>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
    name: 'calendar',
    props: {
        msg: String
    },
    data() {
        return {
            name: 'calendar',
            version: Vue.version
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    color: #64b587;
}
.is-selected {
    color: #1989fa;
}
</style>

<template>
    <el-popconfirm
        confirm-button-text="好的"
        cancel-button-text="不用了"
        icon="el-icon-info"
        icon-color="red"
        title="这是一段内容确定删除吗？"
        @on-confirm="onConfirm"
        @on-cancel="onCancel"
    >
        <el-button slot="reference">删除</el-button>
    </el-popconfirm>
</template>

<script>
import Vue from 'vue';
export default {
    name: 'pop-confirm',
    props: {
        msg: String
    },
    data() {
        return {
            name: 'pop-confirm',
            version: Vue.version
        };
    },
    methods: {
        onConfirm() {
            alert('onConfirm')
        },
        onCancel() {
            alert('onCancel')
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

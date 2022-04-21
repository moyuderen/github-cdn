<template>
  <el-dialog v-model="dialogFormVisible" title="Rename" @close="reset">
    <el-form :model="form" :rules="rules" ref="ruleFormRef">
      <el-form-item label="文件名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button
          type="primary"
          @click="confirm(ruleFormRef)"
          :loading="loading"
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const emits = defineEmits(['rename'])
defineExpose({
  toggle,
})

const loading = ref(false)
const dialogFormVisible = ref(false)
function toggle(name) {
  form.name = name
  dialogFormVisible.value = !dialogFormVisible.value
}
const formLabelWidth = '140px'
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  name: '',
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: 'Please input', trigger: 'blur' }],
})

async function confirm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('rename', form.name)
      close()
    } else {
      console.log('error submit!', fields)
    }
  })
}

function reset() {
  ruleFormRef.value.resetFields()
}
function close() {
  dialogFormVisible.value = false
  reset()
}
</script>

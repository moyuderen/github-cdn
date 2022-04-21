<template>
  <el-dialog v-model="dialogFormVisible" title="Create dir" @close="reset">
    <el-form :model="form" :rules="rules" ref="ruleFormRef">
      <el-form-item label="文件夹名称" :label-width="formLabelWidth" prop="dir">
        <el-input v-model="form.dir" autocomplete="off" />
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
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useReposStore } from '@/store/repos'
import { cdnSdk } from '@/main'
const emits = defineEmits(['getList'])
defineExpose({
  toggle,
})

const loading = ref(false)
const dialogFormVisible = ref(false)
function toggle() {
  dialogFormVisible.value = !dialogFormVisible.value
}
const formLabelWidth = '140px'
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  dir: '',
})

const rules = reactive<FormRules>({
  dir: [{ required: true, message: 'Please input', trigger: 'blur' }],
})

async function confirm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      createDir()
    } else {
      console.log('error submit!', fields)
    }
  })
}

async function createDir() {
  try {
    loading.value = true
    await cdnSdk.createDir(useReposStore().path, form.dir)
    emits('getList')
    close()
    loading.value = false
  } catch (err) {
    if (err.message.includes(`"sha" wasn't supplied`)) {
      ElNotification({
        title: 'Error',
        message: '已经存在该目录',
        type: 'error',
      })
    }
    loading.value = false
  }
}

function reset() {
  ruleFormRef.value.resetFields()
}
function close() {
  dialogFormVisible.value = false
  reset()
}
</script>

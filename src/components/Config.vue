<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="token" prop="token">
      <el-input v-model="form.token" />
    </el-form-item>
    <el-form-item label="owner" prop="owner">
      <el-input v-model="form.owner" />
    </el-form-item>
    <el-form-item label="repo" prop="repo">
      <el-input v-model="form.repo" />
    </el-form-item>
    <el-form-item label="branch">
      <el-input v-model="form.branch" placeholder="默认为main分支" />
    </el-form-item>
    <el-form-item label="path">
      <el-input v-model="form.path" placeholder="默认path为跟路径 " />
    </el-form-item>
    <el-form-item label="message">
      <el-input v-model="form.message" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Confirm
      </el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue';
import useConfigStore from '../store/config';
import { useMainStore } from '../store/main';
import { storage, Config_Key } from '../utils/storage';
import type { FormInstance } from 'element-plus';

const configStore = useConfigStore();
const mainStore = useMainStore();

const ruleFormRef = ref<FormInstance>();
let form = reactive({
  token: '',
  owner: '',
  repo: '',
  branch: '',
  path: '',
  message: '',
});

const rules = reactive({
  token: [{ required: true, trigger: 'blur' }],
  owner: [{ required: true, trigger: 'blur' }],
  repo: [{ required: true, trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      storage.set(Config_Key, form);
      configStore.setConfig(form);
      mainStore.toggleDrawer();
    }
  });
};

onBeforeMount(() => {
  console.log(configStore.config);
  Reflect.ownKeys(form).forEach((key) => {
    form[key] = configStore.config[key];
  });
});
</script>

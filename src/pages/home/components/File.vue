<template>
  <el-form label-width="170px">
    <el-form-item label="Type">
      {{ props.file.type }}
    </el-form-item>
    <el-form-item label="Name">
      {{ props.file.name }}
    </el-form-item>
    <el-form-item label="Path">
      {{ props.file.path }}
    </el-form-item>
    <el-form-item label="Size">
      {{ props.file.size }}
    </el-form-item>
    <el-form-item label="Sha">
      {{ props.file.sha }}
    </el-form-item>
    <el-form-item label="Html url">
      <el-input
        v-model="props.file.html_url"
        readonly
        :style="inputStyle"
      ></el-input>
      <el-icon class="icon" @click="open(props.file.html_url)">
        <compass />
      </el-icon>
    </el-form-item>
    <el-form-item label="Github CDN">
      <el-input
        v-model="props.file.download_url"
        readonly
        :style="inputStyle"
      ></el-input>
      <el-icon class="icon" @click="copy(props.file.download_url)">
        <document-copy />
      </el-icon>
    </el-form-item>
    <el-form-item
      label="Github CDN image"
      v-if="isImageUrl(props.file.download_url)"
    >
      <el-image
        style="width: 500px; height: 250px"
        :src="props.file.download_url"
        fit="cover"
        :preview-src-list="[props.file.download_url]"
      />
    </el-form-item>
    <el-form-item label="Github CDN markdown">
      <el-input
        :value="props.file.download_url_md"
        readonly
        :style="inputStyle"
      ></el-input>
      <el-icon class="icon" @click="copy(props.file.download_url_md)">
        <document-copy />
      </el-icon>
    </el-form-item>

    <el-form-item label="Jsdelivr CDN">
      <el-input
        v-model="props.file.jsdelivr_url"
        readonly
        :style="inputStyle"
      ></el-input>
      <el-icon class="icon" @click="copy(props.file.jsdelivr_url)">
        <document-copy />
      </el-icon>
    </el-form-item>
    <el-form-item
      label="Jsdelivr CDN image"
      v-if="isImageUrl(props.file.jsdelivr_url)"
    >
      <el-image
        style="width: 500px; height: 250px"
        :src="props.file.jsdelivr_url"
        fit="cover"
        :preview-src-list="[props.file.jsdelivr_url]"
      />
    </el-form-item>
    <el-form-item label="Jsdelivr CDN markdown">
      <el-input
        :value="props.file.jsdelivr_url_md"
        readonly
        :style="inputStyle"
      ></el-input>
      <el-icon class="icon" @click="copy(props.file.jsdelivr_url_md)">
        <document-copy />
      </el-icon>
    </el-form-item>

    <el-form>
      <el-button @click="del" type="danger">删除</el-button>
    </el-form>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage, ElMessageBox, ElImage } from 'element-plus'
import { Compass, DocumentCopy } from '@element-plus/icons-vue'
import { copyText } from 'vue3-clipboard'
import { cdnSdk } from '@/main'
import { isImageUrl } from '@/utils/file'

const inputStyle = reactive({
  'width': '500px',
  'margin-right': '10px',
})

const props = defineProps({
  file: Object,
})
const emits = defineEmits(['getList', 'close'])

function open(url) {
  window.open(url)
}

function copy(content) {
  copyText(content, undefined, (error, event) => {
    if (error) {
      ElMessage.error('Can not copy')
    } else {
      ElMessage.success('Copied')
    }
  })
}

function del() {
  const { path, sha, name } = props.file
  ElMessageBox.confirm('Delete the file. Continue?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }).then(async () => {
    await cdnSdk.deleteFile(sha, path, name)
    emits('getList')
    emits('close')

    ElMessage({
      type: 'success',
      message: 'Delete completed',
    })
  })
}
</script>

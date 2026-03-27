<template>
  <view class="quick-container">
    <view class="form">
      <view class="form-item">
        <text class="label">咨询类型</text>
        <view class="type-select">
          <text class="type-item active">{{ type || '请选择' }}</text>
        </view>
      </view>
      
      <view class="form-item">
        <text class="label">姓名</text>
        <input class="input" v-model="form.name" placeholder="请输入姓名" />
      </view>
      
      <view class="form-item">
        <text class="label">电话</text>
        <input class="input" v-model="form.phone" type="number" placeholder="请输入联系电话" />
      </view>
      
      <view class="form-item">
        <text class="label">案情描述</text>
        <textarea class="textarea" v-model="form.desc" placeholder="请详细描述您的法律问题..." />
      </view>
      
      <button class="submit-btn" @click="submit">提交咨询</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const type = ref('')
const form = ref({
  name: '',
  phone: '',
  desc: ''
})

onLoad((options: any) => {
  if (options.type) {
    type.value = options.type
  }
})

const submit = () => {
  if (!form.value.name) {
    uni.showToast({ title: '请输入姓名', icon: 'none' })
    return
  }
  if (!form.value.phone) {
    uni.showToast({ title: '请输入电话', icon: 'none' })
    return
  }
  if (!form.value.desc) {
    uni.showToast({ title: '请描述案情', icon: 'none' })
    return
  }
  
  uni.showToast({ title: '提交成功', icon: 'success' })
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<style lang="scss">
.quick-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 30rpx;
}

.form {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  
  .form-item {
    margin-bottom: 30rpx;
    
    .label {
      display: block;
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 16rpx;
    }
    
    .input {
      height: 88rpx;
      background-color: #f5f5f5;
      border-radius: 12rpx;
      padding: 0 24rpx;
      font-size: 28rpx;
    }
    
    .textarea {
      width: 100%;
      height: 240rpx;
      background-color: #f5f5f5;
      border-radius: 12rpx;
      padding: 24rpx;
      font-size: 28rpx;
      box-sizing: border-box;
    }
    
    .type-select {
      .type-item {
        display: inline-block;
        padding: 16rpx 32rpx;
        background-color: #e8f4ff;
        color: #007AFF;
        border-radius: 8rpx;
        font-size: 28rpx;
        
        &.active {
          background-color: #007AFF;
          color: #fff;
        }
      }
    }
  }
  
  .submit-btn {
    height: 96rpx;
    background-color: #007AFF;
    color: #fff;
    border-radius: 48rpx;
    font-size: 32rpx;
    border: none;
    margin-top: 20rpx;
  }
}
</style>

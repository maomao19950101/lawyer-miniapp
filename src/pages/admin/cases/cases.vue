<template>
  <view class="cases-container">
    <view class="add-btn" @click="addCase">
      <text>+ 添加案例</text>
    </view>

    <scroll-view scroll-y class="case-list">
      <view class="case-item" v-for="(item, index) in cases" :key="index">
        <view class="case-header">
          <text class="case-type">{{ item.type }}</text>
          <view class="actions">
            <text class="action" @click="editCase(item)">编辑</text>
            <text class="action delete" @click="deleteCase(index)">删除</text>
          </view>
        </view>
        <text class="case-title">{{ item.title }}</text>
        <text class="case-desc">{{ item.desc }}</text>
        <view class="case-footer">
          <text class="case-result" :class="item.win ? 'win' : 'lose'">
            {{ item.win ? '胜诉' : '和解' }}
          </text>
          <text class="case-date">{{ item.date }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cases = ref([
  { type: '婚姻家庭', title: '离婚纠纷 - 财产分割', desc: '涉及房产、车辆分割，最终达成协议', win: true, date: '2024-12-15' },
  { type: '劳动纠纷', title: '试用期被违法辞退', desc: '仲裁后获得2N赔偿金', win: true, date: '2024-11-28' },
  { type: '民间借贷', title: '借款纠纷 - 追回欠款', desc: '通过诉讼追回全部欠款及利息', win: true, date: '2024-11-10' }
])

const addCase = () => {
  uni.showToast({ title: '添加案例功能开发中', icon: 'none' })
}

const editCase = (item: any) => {
  uni.showToast({ title: '编辑功能开发中', icon: 'none' })
}

const deleteCase = (index: number) => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这个案例吗？',
    success: (res) => {
      if (res.confirm) {
        cases.value.splice(index, 1)
        uni.showToast({ title: '已删除', icon: 'success' })
      }
    }
  })
}
</script>

<style lang="scss">
.cases-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.add-btn {
  background-color: #007AFF;
  color: #fff;
  text-align: center;
  padding: 30rpx;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  font-size: 30rpx;
}

.case-list {
  .case-item {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .case-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16rpx;
      
      .case-type {
        font-size: 24rpx;
        color: #007AFF;
        background-color: #e8f4ff;
        padding: 6rpx 16rpx;
        border-radius: 20rpx;
      }
      
      .actions {
        .action {
          font-size: 26rpx;
          color: #007AFF;
          margin-left: 20rpx;
          
          &.delete {
            color: #ff3b30;
          }
        }
      }
    }
    
    .case-title {
      display: block;
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 12rpx;
    }
    
    .case-desc {
      display: block;
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      margin-bottom: 16rpx;
    }
    
    .case-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .case-result {
        font-size: 24rpx;
        padding: 6rpx 16rpx;
        border-radius: 20rpx;
        
        &.win {
          color: #34C759;
          background-color: #e8f5e9;
        }
        
        &.lose {
          color: #FF9500;
          background-color: #fff3e0;
        }
      }
      
      .case-date {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}
</style>

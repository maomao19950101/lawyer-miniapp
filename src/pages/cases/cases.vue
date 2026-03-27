<template>
  <view class="cases-container">
    <view class="case-list">
      <view class="case-item" v-for="(item, index) in cases" :key="index">
        <view class="case-header">
          <text class="case-type">{{ item.type }}</text>
          <text class="case-result" :class="item.win ? 'win' : 'lose'">
            {{ item.win ? '胜诉' : '和解' }}
          </text>
        </view>
        <text class="case-title">{{ item.title }}</text>
        <text class="case-desc">{{ item.desc }}</text>
        <view class="case-footer">
          <text class="case-date">{{ item.date }}</text>
          <text class="case-views">{{ item.views }}人浏览</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const cases = [
  {
    type: '婚姻家庭',
    title: '离婚纠纷 - 财产分割',
    desc: '当事人双方因感情破裂起诉离婚，涉及房产、车辆分割。经过举证和调解，最终达成财产分割协议。',
    win: true,
    date: '2024-12-15',
    views: 328
  },
  {
    type: '劳动纠纷',
    title: '试用期被违法辞退',
    desc: '当事人试用期第3个月被公司以"不合格"为由辞退，未支付赔偿金。仲裁后获得2N赔偿金。',
    win: true,
    date: '2024-11-28',
    views: 512
  },
  {
    type: '民间借贷',
    title: '借款纠纷 - 追回欠款',
    desc: '当事人借出50万元，借条不规范，对方失联。通过诉讼追回全部欠款及利息。',
    win: true,
    date: '2024-11-10',
    views: 426
  },
  {
    type: '合同纠纷',
    title: '房屋买卖合同违约',
    desc: '卖方违约拒绝过户，买方起诉。法院判令卖方继续履行合同并赔偿违约金。',
    win: true,
    date: '2024-10-22',
    views: 289
  },
  {
    type: '交通事故',
    title: '肇事逃逸责任认定',
    desc: '当事人正常行驶被追尾，肇事方逃逸。协助当事人维权，获得全额赔偿。',
    win: true,
    date: '2024-10-05',
    views: 356
  }
]
</script>

<style lang="scss">
.cases-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
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
      font-size: 24rpx;
      color: #999;
    }
  }
}
</style>

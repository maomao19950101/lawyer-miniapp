<template>
  <view class="about-container">
    <!-- 律师基本信息 -->
    <view class="lawyer-profile">
      <image class="lawyer-avatar" src="/static/lawyer-avatar.png"></image>
      <text class="lawyer-name">张律师</text>
      <text class="lawyer-title">资深执业律师</text>
      <view class="lawyer-tags">
        <text class="tag">婚姻家庭</text>
        <text class="tag">劳动纠纷</text>
        <text class="tag">债权债务</text>
      </view>
    </view>

    <!-- 律师简介 -->
    <view class="section">
      <text class="section-title">律师简介</text>
      <view class="intro-card">
        <text class="intro-text">
          张律师，中华全国律师协会会员，拥有10年执业经验。专注于婚姻家庭、劳动纠纷、债权债务等领域，累计办理各类案件500+件。
          
          秉承"受人之托，忠人之事"的执业理念，为每一位当事人提供专业、严谨的法律服务。
        </text>
      </view>
    </view>

    <!-- 执业信息 -->
    <view class="section">
      <text class="section-title">执业信息</text>
      <view class="info-list">
        <view class="info-item">
          <text class="info-label">执业律所</text>
          <text class="info-value">XX律师事务所</text>
        </view>
        <view class="info-item">
          <text class="info-label">执业证号</text>
          <text class="info-value">123456789012345</text>
        </view>
        <view class="info-item">
          <text class="info-label">擅长领域</text>
          <text class="info-value">婚姻家庭、劳动纠纷、债权债务、合同纠纷</text>
        </view>
        <view class="info-item">
          <text class="info-label">联系电话</text>
          <text class="info-value" @click="makeCall">138-XXXX-XXXX</text>
        </view>
        <view class="info-item">
          <text class="info-label">微信号</text>
          <text class="info-value" @click="copyWechat">点击复制</text>
        </view>
      </view>
    </view>

    <!-- 资质证书 -->
    <view class="section">
      <text class="section-title">专业资质</text>
      <view class="cert-grid">
        <view class="cert-item">
          <text class="cert-icon">📜</text>
          <text class="cert-name">律师执业证</text>
        </view>
        <view class="cert-item">
          <text class="cert-icon">🏆</text>
          <text class="cert-name">优秀律师奖</text>
        </view>
        <view class="cert-item">
          <text class="cert-icon">📚</text>
          <text class="cert-name">法律职业资格证</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const makeCall = () => {
  uni.makePhoneCall({
    phoneNumber: '13800138000'
  })
}

const copyWechat = () => {
  uni.setClipboardData({
    data: 'lawyer_wechat',
    success: () => {
      uni.showToast({
        title: '微信号已复制',
        icon: 'success'
      })
    }
  })
}
</script>

<style lang="scss">
.about-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
}

.lawyer-profile {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 60rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .lawyer-avatar {
    width: 160rpx;
    height: 160rpx;
    border-radius: 80rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
  }
  
  .lawyer-name {
    font-size: 40rpx;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10rpx;
  }
  
  .lawyer-title {
    font-size: 28rpx;
    color: rgba(255,255,255,0.8);
    margin-bottom: 20rpx;
  }
  
  .lawyer-tags {
    display: flex;
    gap: 16rpx;
    
    .tag {
      font-size: 24rpx;
      color: #007AFF;
      background-color: #fff;
      padding: 8rpx 24rpx;
      border-radius: 24rpx;
    }
  }
}

.section {
  margin: 30rpx;
  
  .section-title {
    display: block;
    font-size: 34rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }
}

.intro-card {
  background-color: #fff;
  padding: 30rpx;
  border-radius: 16rpx;
  
  .intro-text {
    font-size: 28rpx;
    color: #666;
    line-height: 1.8;
  }
}

.info-list {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  
  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .info-label {
      font-size: 28rpx;
      color: #999;
    }
    
    .info-value {
      font-size: 28rpx;
      color: #333;
    }
  }
}

.cert-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  
  .cert-item {
    background-color: #fff;
    padding: 30rpx;
    border-radius: 16rpx;
    text-align: center;
    
    .cert-icon {
      display: block;
      font-size: 48rpx;
      margin-bottom: 10rpx;
    }
    
    .cert-name {
      font-size: 24rpx;
      color: #666;
    }
  }
}
</style>

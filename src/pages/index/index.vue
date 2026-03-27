<template>
  <view class="container">
    <!-- 顶部导航 -->
    <view class="nav-bar">
      <text class="nav-title">首页</text>
    </view>

    <!-- Banner -->
    <view class="banner">
      <view class="banner-content">
        <view class="banner-badge">
          <text class="badge-text">7x24小时 · 极速响应</text>
        </view>
        <text class="banner-title">专业法律咨询</text>
        <text class="banner-subtitle">您身边的私人法律顾问</text>
        <button class="consult-btn" @click="goToChat">
          <text class="btn-icon">💬</text>
          <text class="btn-text">立即咨询</text>
        </button>
      </view>
      <view class="banner-shapes">
        <view class="shape shape-1"></view>
        <view class="shape shape-2"></view>
        <view class="shape shape-3"></view>
      </view>
    </view>

    <!-- 快速咨询 -->
    <view class="section quick-consult">
      <view class="section-header">
        <text class="section-title">快速咨询</text>
        <text class="section-sub">一键匹配专业律师</text>
      </view>
      <view class="quick-grid">
        <view class="quick-item" v-for="(item, index) in quickList" :key="index" @click="goToQuick(item.label)">
          <view class="quick-icon" :style="{ background: item.bg }">
            <text class="icon-emoji">{{ item.icon }}</text>
          </view>
          <text class="quick-label">{{ item.label }}</text>
          <view class="quick-tag" v-if="item.hot">热</view>
        </view>
      </view>
    </view>

    <!-- 热门分类 -->
    <view class="section hot-section">
      <view class="section-header">
        <text class="section-title">热门分类</text>
        <text class="section-more">更多 ></text>
      </view>
      <view class="hot-grid">
        <view class="hot-card" v-for="(item, index) in hotList" :key="index" @click="goToQuick(item.label)">
          <view class="hot-card-icon" :style="{ background: item.gradient }">
            <text class="hot-icon">{{ item.icon }}</text>
          </view>
          <view class="hot-card-info">
            <text class="hot-card-title">{{ item.label }}</text>
            <text class="hot-card-desc">{{ item.desc }}</text>
          </view>
          <view class="hot-card-arrow">
            <text>></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 律师团队 -->
    <view class="section lawyer-section">
      <view class="section-header">
        <text class="section-title">律师团队</text>
        <text class="section-more">查看全部 ></text>
      </view>
      <scroll-view scroll-x class="lawyer-scroll">
        <view class="lawyer-list">
          <view class="lawyer-card" v-for="(item, index) in lawyerList" :key="index">
            <image class="lawyer-avatar" :src="item.avatar"></image>
            <text class="lawyer-name">{{ item.name }}</text>
            <text class="lawyer-title">{{ item.title }}</text>
            <view class="lawyer-tags">
              <text class="lawyer-tag" v-for="(tag, i) in item.tags" :key="i">{{ tag }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 底部 -->
    <view class="bottom-space"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const quickList = ref([
  { label: '图文咨询', icon: '📝', bg: 'linear-gradient(135deg, #FFF0F0 0%, #FFE4E4 100%)', hot: true },
  { label: '电话咨询', icon: '📞', bg: 'linear-gradient(135deg, #E8F4FF 0%, #D4ECFF 100%)' },
  { label: '视频咨询', icon: '🎥', bg: 'linear-gradient(135deg, #F0FFF4 0%, #DFFFE4 100%)' },
  { label: '面谈咨询', icon: '🏢', bg: 'linear-gradient(135deg, #FFF8E8 0%, #FFF0D4 100%)' }
])

const hotList = ref([
  { label: '民间借贷', icon: '💰', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', desc: '借条、欠款、追偿' },
  { label: '婚姻家庭', icon: '👨‍👩‍👧', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', desc: '离婚、财产、子女' },
  { label: '刑事辩护', icon: '⚖️', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', desc: '取保、辩护' },
  { label: '劳动纠纷', icon: '💼', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', desc: '工伤、赔偿、辞退' },
  { label: '房产纠纷', icon: '🏠', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', desc: '买卖、租赁、物业' },
  { label: '合同纠纷', icon: '📋', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', desc: '起草、审核、违约' }
])

const lawyerList = ref([
  { name: '张律师', title: '资深执业律师', avatar: '/static/lawyer-avatar.png', tags: ['婚姻家庭', '债权债务'] },
  { name: '李律师', title: '高级合伙人', avatar: '/static/lawyer-avatar.png', tags: ['刑事辩护', '公司法'] },
  { name: '王律师', title: '知名律师', avatar: '/static/lawyer-avatar.png', tags: ['房产纠纷', '劳动纠纷'] }
])

const goToChat = () => {
  uni.navigateTo({ url: '/pages/chat/chat' })
}

const goToQuick = (type: string) => {
  uni.navigateTo({ url: `/pages/quick/quick?type=${type}` })
}
</script>

<style lang="scss">
$primary: #1a5ae8;
$primary-dark: #1a3dba;

.container {
  min-height: 100vh;
  background-color: #f8f9fc;
}

.nav-bar {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .nav-title {
    font-size: 36rpx;
    font-weight: 600;
    color: #1a1a2e;
  }
}

/* Banner */
.banner {
  background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
  padding: 50rpx 40rpx 80rpx;
  position: relative;
  overflow: hidden;
  
  .banner-content {
    position: relative;
    z-index: 2;
    
    .banner-badge {
      display: inline-flex;
      background-color: rgba(255,255,255,0.2);
      padding: 10rpx 24rpx;
      border-radius: 30rpx;
      margin-bottom: 24rpx;
      
      .badge-text {
        font-size: 22rpx;
        color: rgba(255,255,255,0.9);
      }
    }
    
    .banner-title {
      display: block;
      font-size: 52rpx;
      font-weight: 700;
      color: #fff;
      margin-bottom: 12rpx;
      letter-spacing: 2rpx;
    }
    
    .banner-subtitle {
      display: block;
      font-size: 28rpx;
      color: rgba(255,255,255,0.75);
      margin-bottom: 40rpx;
    }
    
    .consult-btn {
      display: inline-flex;
      align-items: center;
      background-color: #fff;
      color: $primary;
      border-radius: 50rpx;
      padding: 24rpx 48rpx;
      font-size: 30rpx;
      font-weight: 600;
      border: none;
      box-shadow: 0 8rpx 30rpx rgba(0,0,0,0.15);
      
      .btn-icon {
        font-size: 32rpx;
        margin-right: 12rpx;
      }
    }
  }
  
  .banner-shapes {
    position: absolute;
    right: -20rpx;
    bottom: -30rpx;
    
    .shape {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255,255,255,0.1);
      
      &.shape-1 {
        width: 180rpx;
        height: 180rpx;
        right: 20rpx;
        bottom: 40rpx;
      }
      
      &.shape-2 {
        width: 260rpx;
        height: 260rpx;
        right: -80rpx;
        bottom: -60rpx;
      }
      
      &.shape-3 {
        width: 120rpx;
        height: 120rpx;
        right: 60rpx;
        bottom: -20rpx;
      }
    }
  }
}

/* Section */
.section {
  margin: 24rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.03);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 28rpx;
  
  .section-title {
    font-size: 34rpx;
    font-weight: 700;
    color: #1a1a2e;
  }
  
  .section-sub {
    font-size: 24rpx;
    color: #999;
  }
  
  .section-more {
    font-size: 24rpx;
    color: $primary;
  }
}

/* Quick Consult */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
  
  .quick-item {
    text-align: center;
    position: relative;
    padding: 20rpx 8rpx;
    
    .quick-icon {
      width: 100rpx;
      height: 100rpx;
      border-radius: 28rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16rpx;
      box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.06);
      
      .icon-emoji {
        font-size: 44rpx;
      }
    }
    
    .quick-label {
      font-size: 24rpx;
      color: #333;
      font-weight: 500;
    }
    
    .quick-tag {
      position: absolute;
      top: 8rpx;
      right: 8rpx;
      font-size: 18rpx;
      color: #fff;
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
      padding: 4rpx 10rpx;
      border-radius: 10rpx;
    }
  }
}

/* Hot Grid */
.hot-grid {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  
  .hot-card {
    display: flex;
    align-items: center;
    background-color: #fafbfc;
    border-radius: 20rpx;
    padding: 24rpx;
    transition: all 0.2s;
    
    &:active {
      transform: scale(0.98);
      background-color: #f0f2f5;
    }
    
    .hot-card-icon {
      width: 88rpx;
      height: 88rpx;
      border-radius: 24rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24rpx;
      box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.1);
      
      .hot-icon {
        font-size: 40rpx;
      }
    }
    
    .hot-card-info {
      flex: 1;
      
      .hot-card-title {
        display: block;
        font-size: 30rpx;
        font-weight: 600;
        color: #1a1a2e;
        margin-bottom: 6rpx;
      }
      
      .hot-card-desc {
        display: block;
        font-size: 24rpx;
        color: #999;
      }
    }
    
    .hot-card-arrow {
      font-size: 32rpx;
      color: #ccc;
    }
  }
}

/* Lawyer Section */
.lawyer-scroll {
  width: 100%;
  white-space: nowrap;
}

.lawyer-list {
  display: flex;
  gap: 24rpx;
}

.lawyer-card {
  display: inline-block;
  width: 240rpx;
  background: linear-gradient(180deg, #fff 0%, #fafbfc 100%);
  border-radius: 24rpx;
  padding: 32rpx 24rpx;
  text-align: center;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.04);
  border: 1rpx solid #f0f0f0;
  
  .lawyer-avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
    background-color: #eee;
    margin-bottom: 20rpx;
  }
  
  .lawyer-name {
    display: block;
    font-size: 30rpx;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 8rpx;
  }
  
  .lawyer-title {
    display: block;
    font-size: 22rpx;
    color: #999;
    margin-bottom: 16rpx;
  }
  
  .lawyer-tags {
    display: flex;
    justify-content: center;
    gap: 8rpx;
    flex-wrap: wrap;
    
    .lawyer-tag {
      font-size: 20rpx;
      color: $primary;
      background-color: rgba(26,90,232,0.08);
      padding: 6rpx 14rpx;
      border-radius: 20rpx;
    }
  }
}

.bottom-space {
  height: 40rpx;
}
</style>

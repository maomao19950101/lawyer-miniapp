const WebIM = require('easemob-websdk')

const config = {
  appKey: '1164260327209264#laywer-huang',
  apiUrl: 'https://a1.easemob.com',
  wsUrl: 'wss://msync-im1.easemob.com',
}

WebIM.config = config

console.log('✅ SDK 版本:', WebIM.version)
console.log('✅ SDK 配置:', JSON.stringify(config))

const conn = WebIM.conn({
  appKey: config.appKey,
})

// 测试连接
conn.listen({
  onOpened: () => console.log('✅ 连接已打开'),
  onClosed: () => console.log('❌ 连接已关闭'),
  onError: (error) => console.log('❌ 错误:', error),
  onMessage: (msg) => console.log('📩 收到消息:', msg)
})

console.log('✅ 环信 SDK 初始化成功!')
console.log('\n配置信息:')
console.log('- AppKey:', config.appKey)
console.log('- API地址:', config.apiUrl)
console.log('- WebSocket:', config.wsUrl)

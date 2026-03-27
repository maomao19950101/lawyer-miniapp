/**
 * 环信 IM SDK 初始化与使用示例
 */
import { EASEMOB_CONFIG } from './easemob-config'

// 导入环信 Web SDK
import WebIM from 'easemob-websdk'

let isInitialized = false

/**
 * 初始化环信 SDK
 */
export function initEasemob() {
  if (isInitialized) {
    console.warn('[Easemob] Already initialized')
    return
  }

  // 配置 SDK
  WebIM.config = {
    appKey: EASEMOB_CONFIG.appKey,
    apiUrl: EASEMOB_CONFIG.apiUrl,
    wsUrl: EASEMOB_CONFIG.wsUrl,
  }

  // 初始化
  const conn = WebIM.conn({
    appKey: EASEMOB_CONFIG.appKey,
  })

  isInitialized = true
  console.log('[Easemob] Initialized with AppKey:', EASEMOB_CONFIG.appKey)

  return conn
}

/**
 * 登录环信
 */
export function login(username: string, password: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const conn = initEasemob()
    
    conn.open({
      user: username,
      pwd: password,
      appKey: EASEMOB_CONFIG.appKey,
      success: (result: any) => {
        console.log('[Easemob] Login success:', result)
        resolve(result)
      },
      fail: (error: any) => {
        console.error('[Easemob] Login failed:', error)
        reject(error)
      }
    })
  })
}

/**
 * 发送文本消息
 */
export function sendTextMessage(to: string, text: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const conn = (WebIM as any).conn
    
    const message = conn.create({
      type: 'txt',
      to: to,
      msg: text
    })

    conn.send(message).then((result: any) => {
      console.log('[Easemob] Message sent:', result)
      resolve(result)
    }).catch((error: any) => {
      console.error('[Easemob] Send failed:', error)
      reject(error)
    })
  })
}

/**
 * 退出登录
 */
export function logout(): Promise<any> {
  return new Promise((resolve) => {
    const conn = (WebIM as any).conn
    conn.close()
    isInitialized = false
    console.log('[Easemob] Logged out')
    resolve(true)
  })
}

export { WebIM }

import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  // behaivor 行为 小程序组件代码复用
  behaviors: [classicBeh],
  properties: {
    src:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc:"images/player@pause.png",
    playSrc:"images/player@play.png",
    playing: false,
    title:'myMusic'
  },
  attached:function(event){
    // mMgr.stop()
    this._recoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event){
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.title = this.data.title
        mMgr.src = this.properties.src 
      }else{
        this.setData({
          playing:false
        })
        mMgr.pause()
      } 
    },
    _recoverStatus:function(){
      if(mMgr.paused){
        this.setData({
          playing:false
        })
        return
      }
      if(mMgr.src == this.properties.src){
        this.setData({
          playing: true
        })
      }
    },
    // 管理音乐控制器
    _monitorSwitch:function(){
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})

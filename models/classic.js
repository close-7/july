import { HTTP } from '../utils/http.js'

class ClassicModel extends HTTP{
  getLatest(sCallaback){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallaback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        // 缓存获取到的最新数据
        wx.setStorageSync(key, res)
      }
    })
  }

  getClassic(index,nextOrPrevious,sCallaback){
    //数据在缓存中寻找 or api请求写入缓存中
    // key 确定设计一个key
    let key = nextOrPrevious == "next" ? this._getKey(index + 1) : this._getKey(index -1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          // 写入缓存
          wx.setStorageSync(this._getKey(res.index),res)
          sCallaback(res)
        }
      })
    }else{
      sCallaback(classic)
    }
    
  }

  isFirst(index){
    return index == 1?true:false
  }
  isLatest(index){
   let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  getMyFavor(success){
    const params = {
      url:'classic/favor',
      success:success
    }
    this.request(params)
  }
  // 小程序缓存数据存/取
  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex(){
    let index = wx.getStorageSync('latest')
    return index
  }
   // key 确定设计一个key(私有)
   _getKey(index){
     let key = 'classic'+index
     return key
   }
}

export { ClassicModel}
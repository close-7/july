import { HTTP } from '../utils/http.js'

class LikeModel extends HTTP {
  like(behavior,artId,category) {
    let url = behavior=="like"?"like":"like/cancel"
    this.request({
      url: url,
      method:'POST',
      data:{
        art_id:artId,
        type:category
      }
    })
  }
  getClassicLikeStatus(artId,category,sCallaback){
      this.request({
        url:'classic/'+category+'/'+artId+'/favor',
        success:sCallaback
      })
  }
}

export { LikeModel }
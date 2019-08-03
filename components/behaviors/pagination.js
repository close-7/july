import {
  HTTP
} from '../../utils/http.js'

const paginationBev = Behavior({
  properties: {

  },
  data: {
    dataArray: [],
    total:null,
    noneResult:false
  },

  methods: {
    setMoreData: function (dataArray) {
      
      let temp = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: temp
      })
    },

    getCurrentStart: function () {
      return this.data.dataArray.length
    },

    setTotal(total){
      this.data.total=total
      if(total == 0){
        this.setData({
          noneResult:true
        })
      }
    },
    hasMore(){
      if(this.data.dataArray.length>=this.data.total){
        return false
      }else{
        return true
      }
    },

    initialize(){
      this.setData({
        dataArray : [],
        noneResult: false
      })
      this.data.total=null
    }
  }
})


export {
  paginationBev
}
// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more:{
      type:String,
      observer:'_load_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    q:'',
    loading:false,
    loadingCenter:false
  },
  attached(){
    const historyWords = keywordModel.getHistory()
    const hotWords = keywordModel.getHot()
    this.setData({
      historyWords
    })
    hotWords.then(res=>{
      this.setData({
        hotWords:res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _load_more(){
      console.log(2323232)
      if(!this.data.q){
        return
      }
      if(this.data.loading){
        return
      }
      // const length = this.data.dataArray.length
     
      if (this.hasMore()){
        this.data.loading = true
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.data.loading = false
        })
      }
    },
    onDelete(event){
       this.initialize()
      this.setData({
        searching:false
      })
    },
    onCancel(event){
       this.initialize()
      this.triggerEvent('cancel', {},{})
    },
    onConfirm(event){
      this.setData({
        searching:true
      })
      this._showLoading()
      // this.initialize()
      const q = event.detail.value || event.detail.text
      bookModel.search(0,q).then(res=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q
        })
        keywordModel.addToHistory(q)
        this._hideLoading()
      })
    },
    _showLoading(){
        this.setData({
          loadingCenter:true
        })
    },
    _hideLoading() {
      this.setData({
        loadingCenter: false
      })
    }

  }
})

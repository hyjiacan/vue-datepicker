import util from "../../assets/script/util";

/* eslint-disable */

export default {
  created() {
    document.addEventListener('click', this.onDocumentClick)
    document.addEventListener('keyup', this.onKeyup)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.onKeyup)
    document.removeEventListener('click', this.onDocumentClick)
  },
  computed: {},
  methods: {
    onDocumentClick({target}) {
      if (this.trigger !== 'click') {
        return
      }
      const elClicked = util.isParent(target, this.$el) || util.isParent(target, this.$refs.popper.$refs.body)

      if (this.isVisible) {
        if (!elClicked) {
          this.isVisible = false
        }
        return;
      }

      if (elClicked) {
        this.isVisible = true
      }
    },
    onFocus(e) {
      if (this.trigger !== 'focus') {
        return
      }
      this.$nextTick(() => {
        this.isVisible = true
      })
    },
    onBlur() {
      if (this.trigger !== 'focus') {
        return
      }
      this.$nextTick(() => {
        const activeElement = document.activeElement
        if (util.isParent(activeElement, this.$el) || util.isParent(activeElement, this.$refs.popper.$refs.body)) {
          return
        }
        this.isVisible = false
      })
    },
    onKeyup(e) {
      if (e.keyCode === 27) {
        // ESC 关闭
        this.isVisible = false
        // return;
      }
      // if (e.keyCode === 13) {
      //   // Enter 关闭
      //   this.isVisible = false
      // }
    },
    onPopperFocus(e) {
    },
    onPopperBlur(e) {
      if (this.trigger !== 'focus') {
        return
      }
      this.$nextTick(() => {
        const activeElement = document.activeElement
        console.log(activeElement, e.target)
        if (util.isParent(activeElement, this.$el) || util.isParent(activeElement, this.$refs.popper.$refs.body)) {
          return
        }
        this.isVisible = false
      })
    },
    showPicker() {
      clearTimeout(this.hideTimerHandle)
      this.isVisible = true
    },
    hidePicker(e) {

      // 如果当前得到焦点的元素是子元素，那么就忽略操作
      if (util.isParent(document.activeElement, this.$el)) {
        return
      }
      this.hideTimerHandle = setTimeout(() => {
        this.isVisible = false
      }, 200)
    },
  }
}

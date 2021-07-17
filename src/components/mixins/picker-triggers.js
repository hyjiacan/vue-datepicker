import util from "../../assets/script/util";

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
    onFocus() {
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
    }
  }
}

axios.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data
    }
})

const routes = [
    {'path': '/:id(\\d+)', component: {template: ''}}
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

const app = Vue.createApp({
    data() {
        return {
            textList: [],
            message: {
                text: '',
                title: ''
            },
            text: {
                title: '',
                data: '',
            },
            textToDelete: '',
            previousAct: '',
            data: {
                title: '',
                data: '',
            },
            loading: false
        }
    },
    methods: {
        showModal(title, text) {
            this.message.title = title
            this.message.text = text
            new bootstrap.Modal(this.$refs.messageModal).show()
        },
        list() {
            this.loading = true
            axios.post('/text/list')
                .then((res) => {
                    if (res.success) {
                        this.textList = res.detail
                    } else {
                        this.showModal('错误', res.msg)
                    }
                })
                .catch((err) => {
                    this.showModal('错误', err.message)
                })
                .finally(() => {
                    this.loading = false
                })
        },
        add() {
            if (this.text.title.trim().length === 0) {
                this.$refs.textTitle.focus()
                return
            }
            if (this.text.data.trim().length === 0) {
                this.$refs.textData.focus()
                return
            }
            axios.post('/text/add',
                Qs.stringify({
                    'title': this.text.title,
                    'data': this.text.data
                }))
                .then((res) => {
                    if (res.success) {
                        this.list()
                        this.showModal('成功', '保存成功\n' + window.location.href + res.detail.id)
                        this.text.title = ''
                        this.text.data = ''
                    } else {
                        this.showModal('错误', res.msg)
                    }
                })
                .catch((err) => {
                    this.showModal('错误', err.message)
                })
        },
        confirmDelete(id) {
            this.textToDelete = id
            new bootstrap.Modal(this.$refs.confirmModal).show()
        },
        deleteText() {
            if (!this.hasToken(() => this.deleteText())) {
                return
            }
            axios.post('/text/delete', Qs.stringify({'id': this.textToDelete}))
                .then((res) => {
                    if (res.success) {
                        this.list()
                        this.showModal('成功', '删除成功')
                        if (this.$route.params.id) {
                            this.$router.push('/')
                        }
                    } else {
                        this.showModal('错误', res.msg)
                    }
                })
                .catch((err) => {
                    this.showModal('错误', err.message)
                })
        },
        get(id) {
            this.data.title = ''
            this.data.data = ''
            this.loading = true
            axios.post('/text/get', Qs.stringify({'id': id}))
                .then((res) => {
                    if (res.success) {
                        this.data.title = res.detail.title
                        this.data.data = res.detail.data
                    } else {
                        this.$router.push('/')
                    }
                })
                .catch((err) => {
                    this.$router.push('/')
                })
                .finally(() => {
                    this.loading = false
                })
        },
        update() {
            if (this.data.data.trim().length === 0) {
                this.$refs.textShow.focus()
                return
            }
            if (!this.hasToken(() => this.update())) {
                return
            }
            axios.post('/text/update', Qs.stringify({'id': this.$route.params.id, 'data': this.data.data}))
                .then((res) => {
                    if (res.success) {
                        this.list()
                        this.showModal('成功', '保存成功')
                    } else {
                        this.showModal('错误', res.msg)
                    }
                })
                .catch((err) => {
                    this.showModal('错误', err.message)
                })
        },
        download() {
            const blob = new Blob([this.data.data], {type: 'text/plain;charset=utf-8'})
            saveAs(blob, this.$route.params.id + '.txt')
        },
        hasToken(func) {
            if (!Cookies.get('token')) {
                this.previousAct = func
                this.$refs.password.value = ''
                new bootstrap.Modal(this.$refs.authModal).show()
                this.$refs.password.focus()
                return false
            }
            return true
        },
        getToken() {
            axios.post('/token/get', Qs.stringify({'password': this.$refs.password.value}))
                .then((res) => {
                    if (res.success) {
                        this.previousAct()
                    } else {
                        this.showModal('错误', res.msg)
                    }
                })
                .catch((err) => {
                    this.showModal('错误', err.message)
                })
        }
    },
    mounted() {
        this.list()
        new ClipboardJS('#btnCopy').on('success', () => {
            this.showModal('成功', '复制成功')
        });
    },
    created() {
        this.$watch(
            () => this.$route.params,
            (toParams) => {
                if (toParams.id) {
                    this.get(toParams.id)
                }
            }
        )
    }
})

app.use(router)
app.config.compilerOptions.whitespace = 'preserve'
app.mount('body')
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

new Vue({
    el:'#app',
    data() {
        return {
            form: {
                comm: ''
            },
            AllComments: []
        }
    },
    methods: {
        async NewComm() {
            const {...comment} = this.form
            const response = await request('/AddComment', 'POST', comment)
            console.log(response)
            this.AllComments.push({...comment, id: Date.now()})
            
            this.form.comm = ''
        }
    },
    async mounted() {
        this.AllComments = await request('/posts')
        
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body
        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        const response = await fetch(url, {
            method,
            headers,
            body

        })
        return await response.json()
    } catch(e) {
        console.warn('Error:', e.message)
    }
}
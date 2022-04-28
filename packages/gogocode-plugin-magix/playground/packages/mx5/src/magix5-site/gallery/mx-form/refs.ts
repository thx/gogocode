export default {
    ctor() {
        this.on('dompatch', () => {
            this.$refs = {};
        });
        this.on('domready', () => {
            let refs = this.root.querySelectorAll(`[mx5-host="${this.id}"][mx5-ref]`);
            for (let i = refs.length; i--;) {
                let ref = refs[i];
                this.$refs[ref.getAttribute('mx5-ref')] = ref;
            }
        });
        this.on('destroy', () => {
            delete this.$refs;
        });
    }
};
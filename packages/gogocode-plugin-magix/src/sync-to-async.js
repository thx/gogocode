module.exports = function ({ script, template }) {
    if (!script) {
        return { script, template };
    }
    script.find('this.updater.digest($_$0)').each((res) => {
        const digestStr = res.match?.[0]?.[0]?.value;
        res.parent('')
        res.replaceBy(`this.updater.digest(${digestStr})`);
    });
    return { script, template };
};

const code = `
var t1 = Tryout.TRYOUT_SID_391;
let t2 = Tryout.TRYOUT_SID_391;
const t3 = Tryout.TRYOUT_SID_391;

const t4 = Tryout.TRYOUT_SID_391 ? 1 : '2';
const t5 = Tryout.TRYOUT_SID_391 ? () => { return '1' } : '2';
const t6 = Tryout.TRYOUT_SID_391 ? () => { return '1' } : { name: 'jerry' };

const t7 = !Tryout.TRYOUT_SID_391 ? 1 : '2';
const t8 = !Tryout.TRYOUT_SID_391 ? () => { return '1' } : '2';
const t9 = !Tryout.TRYOUT_SID_391 ? () => { return '1' } : { name: 'jerry' };

if (Tryout.TRYOUT_SID_391) {
    console.log('391');
}
if (!Tryout.TRYOUT_SID_391) {
    console.log('391');
}
if (Tryout.TRYOUT_SID_391 && 1 == 1) {
    console.log('391');
}
if (Tryout.TRYOUT_SID_391 || 1 == 1) {
    console.log('391');
}
if (Tryout.TRYOUT_SID_391 || 1 != 1) {
    console.log('391');
}
if (Tryout.TRYOUT_SID_391 || (1 != 1 && 2 == 1)) {
    console.log('391');
}
if (!Tryout.TRYOUT_SID_391 && 1 == 1) {
    console.log('391');
}
if (!Tryout.TRYOUT_SID_391 || 1 == 1) {
    console.log('391');
}
`;
module.exports = code;



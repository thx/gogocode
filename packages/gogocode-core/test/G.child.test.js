const $ = require('../index');

test('$.child', () => {
    expect(()=>{
       const res = $(`function a() {
           () => {
               var b = 1
           }
       }`)
       .find(`function a() {}`)
       .child('body.body.0.expression')
    expect(res.parent(2).generate().match('a'))
    }).not.toThrow();
})

test('$.child program child', () => {
    expect(() => {
       const res = $(`function a() {
           () => {
               var b = 1
           }
       }`)
       .child('body.body.0.expression')
    expect(res.parent(2).generate().match('a'))
    }).not.toThrow();
})
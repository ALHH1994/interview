//题⽬1 • 请实现find函数，使下列的代码调⽤正确。
// 约定：
// title数据类型为String
// userId为主键，数据类型为Number
var data = [
    { userId: 8, title: 'title1' },
    { userId: 11, title: 'other' },
    { userId: 15, title: null },
    { userId: 19, title: 'title2' }
];
var find = function (origin) {
    this.origin = origin || []
    this.where = function (params) {
        let reg = params.title
        this.origin = this.origin.filter(value => {
            return reg.test(value.title)
        })
        return this
    }
    this.orderBy = function (key, way) {
        this.origin.sort((a, b) => {
            return way === 'desc' ? b[key] - a[key] : a[key] - b[key]
        })
        return this.origin
    }
    return this
}
// 查找 data 中，符合条件的数据，并进⾏排序
var result = find(data).where({
    'title': /\d$/
}).orderBy('userId', 'desc');
console.log(result);// [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];

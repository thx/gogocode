/*md5:8dc4853a81c1503762d2d2136f49bdf2*/
/**
 * 地域选择
 * options
 *      city 城市是否可选
 *      selected 当前选中的城市 id
 *
 * method
 * val 获取选中值
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Data from './data';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        this.assign(extra);
        this['@{owner.node}'] = $(`#${this.id}`);
    },
    assign(extra) {
        let that = this;
        // 当前数据截快照
        that.updater.snapshot();

        let selected = (extra.selected || []).map(id => {
            return +id;
        });
        let cityVisible = (/^true$/i).test(extra.city);
        // tab切换展示
        let isTab = (extra.type == 'tab');

        // 单行显示多少个
        let lineNumber = +extra.lineNumber || 6;

        var data = JSON.parse(JSON.stringify(extra.data || [])),
            types = [];
        if (data.length == 0) {
            // 外部配置的字母分组letterGroups  =>  Data.commonAreas
            // 外部配置的非常用地域lastProvinces  =>  Data.lastProvinces
            // JSON.parse(JSON.stringify(array)) 简单深拷贝
            let commonAreas = JSON.parse(JSON.stringify(Data.commonAreas)),
                commonAllChecked = true,
                commonAllCount = 0,
                lastProvinces = JSON.parse(JSON.stringify(Data.lastProvinces)),
                lastAllChecked = true,
                lastAllCount = 0;
            if (extra.letterGroups && extra.letterGroups.length > 0) {
                commonAreas = JSON.parse(JSON.stringify(extra.letterGroups));
            }
            if (extra.lastProvinces && extra.lastProvinces.length > 0) {
                lastProvinces = JSON.parse(JSON.stringify(extra.lastProvinces));
            }
            commonAreas.forEach(area => {
                area.provinces.forEach(province => {
                    that['@{init.province}'](province, selected, cityVisible);
                    commonAllChecked = commonAllChecked && province.checked;
                    if (province.checked || province.count > 0) {
                        commonAllCount++;
                    }
                })
            })

            lastProvinces.forEach(province => {
                that['@{init.province}'](province, selected, cityVisible);
                lastAllChecked = lastAllChecked && province.checked;
                if (province.checked || province.count > 0) {
                    lastAllCount++;
                }
            })

            types = [{
                name: '常用地域',
                id: 'more',
                half: true,
                checked: commonAllChecked,
                count: commonAllCount,
                groups: [commonAreas.splice(0, Math.ceil(commonAreas.length / 2)), commonAreas]
            }, {
                name: '非常用地域',
                id: 'less',
                checked: lastAllChecked,
                count: lastAllCount,
                groups: [
                    [{
                        provinces: lastProvinces
                    }]
                ]
            }]
        } else {
            // 自定义数据
            types = data.map((item, index) => {
                let allChecked = true, allCount = 0;
                let provinces = item.provinces;
                provinces.forEach((province, pi) => {
                    if (pi == provinces.length - 1) {
                        // 可能出现数据超长的情况，最后一个数据特殊处理下
                        let remainder = provinces.length % lineNumber;
                        province.lineNumberMulti = (remainder > 0) ? (lineNumber - remainder + 1) : 1;
                    }
                    that['@{init.province}'](province, selected, cityVisible);
                    allChecked = allChecked && province.checked;
                    allCount = allCount + province.count;
                })

                return {
                    name: item.name,
                    id: index,
                    checked: allChecked,
                    count: allCount,
                    groups: [
                        [{
                            provinces: item.provinces
                        }]
                    ]
                }
            })
        }

        that.updater.set({
            lineNumber,
            showProvinceId: -1,
            cityVisible,
            placeholder: '省份' + (cityVisible ? '/城市' : ''),
            types,
            selected,
            isTab,
            curTab: types[0].id
        })

        // altered是否有变化 true：有变化
        let altered = this.updater.altered();
        return altered;
    },

    '@{init.province}'(province, selected, cityVisible) {
        // province 省的id被选中了，则其全部城市id不传
        // for example 1 = (2 + 3 + ... + 18)
        province.checked = ($.inArray(+province.id, selected) > -1);

        let count = 0;
        province.cities = province.cities || [];
        province.cities.forEach(city => {
            if (province.checked) {
                city.checked = true;
            } else {
                city.checked = ($.inArray(+city.id, selected) > -1);
            }
            if (city.checked) {
                count++;
            }
        })

        province.count = count;
        province.hasCity = (province.cities.length > 0) && cityVisible;
    },

    render() {
        this.updater.digest();
    },

    '@{toggleCity}<click>'(event) {
        event.preventDefault();

        let that = this;
        let province = event.params.province,
            oldProvince = that.updater.get('showProvinceId');
        if (province == oldProvince) {
            that.updater.digest({
                showProvinceId: -1
            });
        } else {
            that.updater.digest({
                showProvinceId: province
            });
        }
    },
    '@{changeTab}<click>'(event) {
        this.updater.digest({
            curTab: event.params.curTab
        })
    },
    '@{changeAll}<change>'(event) {
        event.stopPropagation();

        let that = this;
        let allChecked = event.target.checked,
            allCount = 0;

        let { types, isTab } = that.updater.get();
        let type = types[event.params.typeIndex];
        type.groups.forEach(group => {
            group.forEach(area => {
                area.provinces.forEach(province => {
                    let cities = province.cities;
                    cities.forEach(city => {
                        city.checked = allChecked;
                    })

                    province.checked = allChecked;
                    province.count = allChecked ? cities.length : 0;
                    if (province.checked || province.count > 0) {
                        allCount++;
                    }
                })
            })
        });
        type.checked = allChecked;
        type.count = allCount;

        var d = {
            types: types
        }
        if (isTab) {
            Magix.mix(d, {
                curTab: type.id
            })
        }
        that.updater.digest(d);
        that['@{fire}']();
    },

    '@{changeOne}<change>'(event) {
        event.stopPropagation();
        let that = this;
        let checked = event.target.checked;
        let { typeIndex, province: provinceId, city: cityId } = event.params;
        let { types } = that.updater.get();

        let allChecked = true, allCount = 0;
        types[typeIndex].groups.forEach(group => {
            group.forEach(area => {
                area.provinces.forEach(province => {
                    if (province.id == provinceId) {
                        let cities = province.cities;

                        if (cityId) {
                            // 选择城市
                            let count = 0;
                            cities.forEach(city => {
                                if (city.id == cityId) {
                                    city.checked = checked;
                                }
                                if (city.checked) {
                                    count++;
                                }
                            })
                            province.checked = (count > 0) && (count == cities.length);
                            province.count = count;
                        } else {
                            // 选择省
                            cities.forEach(city => {
                                city.checked = checked;
                            })
                            province.checked = checked;
                            province.count = checked ? cities.length : 0;
                        }
                    }
                    allChecked = allChecked && province.checked;
                    if (province.checked || province.count > 0) {
                        allCount++;
                    }
                })
            })
        })
        types[typeIndex].checked = allChecked;
        types[typeIndex].count = allCount;
        that.updater.digest({
            types: types
        });
        that['@{fire}']();
    },

    '@{fire}'() {
        let that = this;
        let selected = that.getSelected();
        let values = selected.map(item => item.id);
        that['@{owner.node}'].trigger({
            type: 'change',
            selected,
            values
        })
    },

    '@{stop}<change,focusin,focusout>'(e) {
        e.stopPropagation();
    },

    '@{search}<keydown>'(event) {
        if (event.keyCode !== 13) {
            return;
        }
        event.preventDefault();
        let that = this;
        let searchName = event.target.value;
        let updater = that.updater;
        let { types, cityVisible, curTab: highlightTypeId } = updater.get();

        let provinceId, isCity = false;
        types.forEach(type => {
            type.groups.forEach(group => {
                group.forEach(area => {
                    area.provinces.forEach(province => {
                        province.highlight = false;
                        if (province.name == searchName) {
                            provinceId = province.id;
                            province.highlight = true;
                            highlightTypeId = type.id;
                        }
                        if (cityVisible) {
                            let cities = province.cities;
                            cities.forEach(city => {
                                city.highlight = false;
                                if (city.name == searchName) {
                                    provinceId = province.id;
                                    isCity = true;
                                    city.highlight = true;
                                    highlightTypeId = type.id;
                                }
                            })
                        }
                    })
                })
            })
        })

        updater.digest({
            curTab: highlightTypeId,
            types: types,
            showProvinceId: isCity ? provinceId : -1
        });
    },

    '$doc<click>'(event) {
        let that = this;
        let showProvinceId = that.updater.get('showProvinceId');
        if (showProvinceId > 0) {
            let showNode = $('#' + that.id + '_province_wrapper_' + showProvinceId);
            let labelNode = showNode.find('.@index.less:province-label'),
                expandNode = showNode.find('.@index.less:province-arrow'),
                citiesNode = showNode.find('.@index.less:cities');
            let target = event.target;
            if (!Magix.inside(target, labelNode[0]) &&
                !Magix.inside(target, expandNode[0]) &&
                !Magix.inside(target, citiesNode[0])) {
                that.updater.digest({
                    showProvinceId: -1
                });
            }
        }
    },

    val(full) {
        let that = this;
        let { types, cityVisible } = that.updater.get();
        let selected = [];
        let all = [];
        types.forEach(type => {
            type.groups.forEach(group => {
                group.forEach(area => {
                    area.provinces.forEach(province => {
                        if (province.checked) {
                            selected.push(province.id);
                            all.push(province);
                        } else {
                            if (cityVisible) {
                                province.cities.forEach(city => {
                                    if (city.checked) {
                                        selected.push(city.id);
                                        all.push(city);
                                    }
                                })
                            }
                        }
                    })
                })
            })
        });

        // 简单深拷贝
        return full ? JSON.parse(JSON.stringify(all)) : selected;
    },

    getSelected() {
        return this.val(true);
    }
});
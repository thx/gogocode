const arrayRefs = require('./array-refs');
const asyncComponents = require('./async-components');
const customDirectives = require('./custom-directives');
const attrsIncludesClassStyle = require('./attrs-includes-class-style');
const dataOption = require('./data-option');
const emitsOptions = require('./emits-option');
const eventsApi = require('./events-api');
const filters = require('./filters');
const functionalComponents = require('./functional-components');
const globalApiTreeshaking = require('./global-api-treeshaking');
const globalApi = require('./global-api');
const keyAttribute = require('./key-attribute');
const keycodeModifiers = require('./keycode-modifiers');
const listenersRemoved = require('./listeners-removed');
const renderFunctionApi = require('./render-function-api');
const slotsUnification = require('./slots-unification');
const transitionGroup = require('./transition-group');
const transition = require('./transition');
const vBind = require('./v-bind');
const vIfvFor = require('./v-if-v-for');
const vModel = require('./v-model');
const vOnNativeModifierRemoved = require('./v-on-native-modifier-removed');
const watch = require('./watch');
const router = require('./vue-router');
const vuex = require('./vue-vuex');
const packageJson = require('./package-json');

module.exports = [
    { name: 'router', rule: router, test: /\.vue$|\.js$|\.ts$/ },
    { name: 'vuex', rule: vuex, test: /\.js$|\.ts$/ },
    {
        name: 'globalApiTreeshaking',
        rule: globalApiTreeshaking,
        test: /\.vue$|\.js$|\.ts$/,
    },
    { name: 'arrayRefs', rule: arrayRefs, test: /\.vue$/ },
    {
        name: 'asyncComponents',
        rule: asyncComponents,
        test: /\.vue$|\.js$|\.ts$/,
    },
    {
        name: 'customDirectives',
        rule: customDirectives,
        test: /\.vue$|\.js$|\.ts$/,
    },
    {
        name: 'attrsIncludesClassStyle',
        rule: attrsIncludesClassStyle,
        test: /\.vue$/,
    },
    // {
    //   name: 'dataOption',
    //   rule: dataOption,
    //   test:  /\.vue$|\.js$|\.ts$/,
    // },
    { name: 'emitsOptions', rule: emitsOptions, test: /\.vue$|\.js$|\.ts$/ },
    { name: 'eventsApi', rule: eventsApi, test: /\.vue$|\.js$|\.ts$/ },
    { name: 'filters', rule: filters, test: /\.vue$|\.js$|\.ts$/ },
    {
        name: 'functionalComponents',
        rule: functionalComponents,
        test: /\.vue$|\.js$|\.ts$/,
    },
    { name: 'globalApi', rule: globalApi, test: /\.vue$|\.js$|\.ts$/ },
    { name: 'keyAttribute', rule: keyAttribute, test: /\.vue$/ },
    { name: 'keycodeModifiers', rule: keycodeModifiers, test: /\.vue$/ },
    { name: 'listenersRemoved', rule: listenersRemoved, test: /\.vue$/ },
    {
        name: 'renderFunctionApi',
        rule: renderFunctionApi,
        test: /\.vue$|\.js$|\.ts$/,
    },
    { name: 'slotsUnification', rule: slotsUnification, test: /\.vue$/ },
    { name: 'transition', rule: transition, test: /\.vue$/ },
    { name: 'transitionGroup', rule: transitionGroup, test: /\.vue$/ },
    { name: 'vBind', rule: vBind, test: /\.vue$/ },
    { name: 'vIfvFor', rule: vIfvFor, test: /\.vue$/ },
    { name: 'vModel', rule: vModel, test: /\.vue$/ },
    {
        name: 'vOnNativeModifierRemoved',
        rule: vOnNativeModifierRemoved,
        test: /\.vue$/,
    },
    { name: 'watch', rule: watch, test: /\.vue$/ },
    {
        name: 'package-json',
        rule: packageJson,
        test: /package\.json$/,
        notParseAst: false,
    },
];

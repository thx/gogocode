interface IParams {
    id: number;
    name: string;
    kindString: string;
    comment?: string;
    type?: any;
    flags?: string[];
}

interface ISignatures {
    id: number;
    name: string;
    kind?: string;
    comment?: string;
    type?: any;
    parameters?: IParams[];
    typeParameter?: string;
}

interface IChild {
    id: number;
    name: string;
    kind?: string;
}

interface IProperty extends IChild {
    flags?: string[];
    comment?: string[] | string;
    type?: {
        type?: string;
        name?: string;
        types?: any[];
    };
}

interface IMethod extends IChild {
    signatures?: ISignatures | ISignatures[];
}

interface IMenuItem {
    title: string;
    kind: string;
    comment?: string[] | string;
    children?: {
        properties?: IProperty[];
        methods?: IMethod[];
    };
}

interface IRoot {
    name: string;
    menu: any[];
    menuMap: object;
    searchMap: object;
}

// kind
enum Kind {
    Interface = 'Interface',
    Property = 'Property',
    Method = 'Method',
}

const menuMap = new Map();
const searchMap = new Map();

function transformtypeParams(type) {
    const { name } = type;
    const value = type.default?.name || type.type?.name || '';

    if (value) {
        return `${name}: ${value}`;
    } else {
        return `${name}`;
    }
}

function transformType(typeObj) {
    const type = typeObj.type;

    switch (type) {
        case 'union': {
            if (!typeObj.name) {
                const res = [];
                typeObj.types.forEach((type) => {
                    if (type.name) {
                        res.push(type.name);
                    } else if (type.elementType.name) {
                        res.push(type.elementType.name + '[]');
                    } else if (type.elementType.declaration) {
                        res.push(transformType(type.elementType).name + '[]');
                    } else {
                        res.push('[]');
                    }
                });
                typeObj.name = res.join(' | ');
            }
            break;
        }

        case 'reflection': {
            if (typeObj.declaration.signatures) {
                const res = [];
                typeObj.declaration.signatures?.forEach((item) => {
                    res.push(transformSignatures(item));
                });

                if (res.length === 1) {
                    let fnParams = '()';
                    const obj = res[0]; // signature:only one
                    if (obj.parameters) {
                        const params = obj.parameters.map((item) => {
                            const res = transformParams(item);
                            return `${res.name}:${res.type.name}`;
                        });
                        fnParams = `(${params.join(',')})`;
                    }

                    const name = `${fnParams} => ${obj.type.name}`;
                    typeObj.name = name;
                }
            } else if (typeObj.declaration.indexSignature) {
                const indexSignature = typeObj.declaration.indexSignature;
                const parameters = indexSignature.parameters
                    .map((item) => {
                        const params = transformParams(item);
                        return `[${params.name}:${params.type.name}]`;
                    })
                    .join('|');

                typeObj.name = `{ ${parameters}:  ${
                    transformType(indexSignature.type).name
                } }`;
            } else if (typeObj.declaration.children) {
                const res = typeObj.declaration.children
                    .map((item) => {
                        return `${item.name}: ${item.type.name}`;
                    })
                    .join(',');

                typeObj.name = `{ ${res} }`;
            }
            break;
        }

        case 'array':
        case 'Array':
            typeObj.name = typeObj.elementType.name + '[]';
            break;

        case 'intersection': {
            const res = [];
            typeObj.types.forEach((item) => {
                const transformRes = transformType(item);
                transformRes.name && res.push(transformRes.name); // tofix include fn
            });
            typeObj.name = res.join(' & ');
            break;
        }

        default:
            break;
    }

    return typeObj;
}

function transformParams(params) {
    let { id, name, kindString, comment, type, flags } = params;

    return {
        id,
        name,
        kind: kindString,
        flags: transformFlags(flags),
        comment: transformComment(comment),
        type: transformType(type),
    };
}

function transformSignatures(signatures) {
    let { id, name, kindString, comment, type, parameters, typeParameter } =
        signatures;

    parameters = parameters?.map((item) => transformParams(item));

    if (typeParameter) {
        typeParameter = typeParameter
            ?.map((item) => transformtypeParams(item))
            .join('、');
    }

    return {
        id,
        name,
        kind: kindString,
        comment: transformComment(comment),
        type: transformType(type),
        parameters,
        typeParameter,
    };
}

function transformComment(comment) {
    return comment?.shortText || comment?.text;
}

function transformFlags(flags: object) {
    const res = [];
    for (const key in flags) {
        if (flags[key] === true) {
            res.push(key);
        }
    }
    return res;
}
function transformProperty(child) {
    const { id, name, flags, comment, type } = child;

    const propertyObj: IProperty = {
        id,
        name,
        kind: Kind.Property,
        flags: transformFlags(flags),
        comment: transformComment(comment),
        type: transformType(type),
    };

    return propertyObj;
}

function transformMethod(child) {
    let { id, name, signatures, kindString } = child;
    signatures = signatures.map((item) => transformSignatures(item)); // 一个函数可能有多个signature

    const methodObj: IMethod = {
        id,
        name,
        kind: kindString,
        signatures,
    };

    return methodObj;
}

function transformChildren(children: any[]) {
    const properties = [],
        methods = [];

    children.forEach((item) => {
        const kind = item.kindString;
        if (kind === Kind.Property) {
            properties.push(transformProperty(item));
        } else if (kind === Kind.Method) {
            methods.push(transformMethod(item));
        } else {
            // 构造函数等
            methods.push(transformMethod(item));
        }
    });

    const childrenObj = {
        properties,
        methods,
    };

    return childrenObj;
}

function transformMenu(menu: any[]) {
    return menu.map((item, index) => {
        const title = item.name;
        const kind = item.kindString;
        const comment = transformComment(item.comment);
        const children = item.children && transformChildren(item.children);

        // add to menuMap
        if (!menuMap.get(title)) {
            menuMap.set(title, index);
        }

        addSearchMap({ title, children, comment });

        const menuItem: IMenuItem = {
            title,
            kind,
            comment,
            children,
        };

        return menuItem;
    });
}

/* main */
export default function transform(dataSource, blackList: string[]) {
    // filter
    dataSource = getData(dataSource);
    const children = dataSource.filter((item) => {
        return blackList.indexOf(item.name) === -1;
    });
    searchMap.clear();
    const menu: IMenuItem[] = transformMenu(children);

    const data: IRoot = {
        name: dataSource.name,
        menu,
        menuMap,
        searchMap,
    };

    return data;
}

function getData(dataSource) {
    for (const item of dataSource.children) {
        if (item.children) {
            return item.children;
        }
    }
    return dataSource.children[0].children;
}

/* search map */
enum searchItemType {
    cat = 'C', // category
    property = 'P', // property
    method = 'M', // method
}
interface ISearchMapItem {
    name: string;
    source: string;
    type: searchItemType;
    introduction: string;
}

function addSearchMap(menu: { children: any; title: string; comment: string }) {
    const { children, title, comment } = menu;
    const obj: ISearchMapItem = {
        name: title,
        source: title,
        type: searchItemType.cat,
        introduction: comment,
    };
    addItem(title.toLowerCase(), obj);

    children.properties.forEach((p: IProperty) => {
        const obj: ISearchMapItem = {
            name: p.name,
            source: title,
            type: searchItemType.property,
            introduction: p.comment as string,
        };
        addItem(p.name, obj);
    });
    children.methods.forEach((m: IMethod) => {
        const obj: ISearchMapItem = {
            name: m.name,
            source: title,
            type: searchItemType.method,
            introduction: (m.signatures as [])
                .map((s: ISignatures) => s.comment)
                .join('/'),
        };
        addItem(m.name, obj);
    });
}

function addItem(name, item) {
    if (!searchMap.has(name)) {
        searchMap.set(name, item);
    } else {
        let old = searchMap.get(name);
        if (!old.length) {
            old = [old];
        }
        searchMap.set(name, [...old, item]);
    }
}

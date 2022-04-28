export default {
	"id": 0,
	"name": "magix-docs",
	"kind": 0,
	"kindString": "Project",
	"flags": {},
	"originalName": "",
	"children": [
		{
			"id": 1027,
			"name": "\"magix5\"",
			"kind": 2,
			"kindString": "Namespace",
			"flags": {},
			"sources": [
				{
					"fileName": "types/magix.d.ts",
					"line": 1375,
					"character": 0
				}
			]
		},
		{
			"id": 1,
			"name": "Magix5",
			"kind": 2,
			"kindString": "Namespace",
			"flags": {},
			"children": [
				{
					"id": 358,
					"name": "Bag",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "数据载体接口"
					},
					"children": [
						{
							"id": 359,
							"name": "id",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"shortText": "bag id"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 262,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 360,
							"name": "get",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 361,
									"name": "get",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "从bag中获取数据"
									},
									"typeParameter": [
										{
											"id": 362,
											"name": "TReturnAndDefaultValueType",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"default": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"parameters": [
										{
											"id": 363,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "数据key，如果未传递则返回整个数据对象"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 364,
											"name": "defaultValue",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "默认值，如果传递了该参数且从bag中获取到的数据类型如果与defaultValue不一致，则使用defaultValue\n"
											},
											"type": {
												"type": "reference",
												"name": "TReturnAndDefaultValueType"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "TReturnAndDefaultValueType"
									}
								}
							]
						},
						{
							"id": 365,
							"name": "set",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 366,
									"name": "set",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "设置数据"
									},
									"parameters": [
										{
											"id": 367,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "包含数据的对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								359
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								360,
								365
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 258,
							"character": 14
						}
					]
				},
				{
					"id": 505,
					"name": "Cache",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "缓存类"
					},
					"children": [
						{
							"id": 515,
							"name": "del",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 516,
									"name": "del",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "从缓存对象中删除缓存的资源"
									},
									"typeParameter": [
										{
											"id": 517,
											"name": "TReturnType",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"default": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"parameters": [
										{
											"id": 518,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "缓存的资源key\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "TReturnType"
									}
								}
							]
						},
						{
							"id": 511,
							"name": "get",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 512,
									"name": "get",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取缓存的资源，如果不存在则返回undefined"
									},
									"typeParameter": [
										{
											"id": 513,
											"name": "TReturnType",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"default": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"parameters": [
										{
											"id": 514,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "缓存资源时使用的key\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "TReturnType"
									}
								}
							]
						},
						{
							"id": 519,
							"name": "has",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 520,
									"name": "has",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "判断缓存对象中是否包含给定key的缓存资源"
									},
									"parameters": [
										{
											"id": 521,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "缓存的资源key\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 506,
							"name": "set",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 507,
									"name": "set",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "设置缓存的资源"
									},
									"typeParameter": [
										{
											"id": 508,
											"name": "TResourceAndReturnType",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"default": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"parameters": [
										{
											"id": 509,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "缓存资源时使用的key，唯一的key对应唯一的资源"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 510,
											"name": "resource",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "缓存的资源\n"
											},
											"type": {
												"type": "reference",
												"name": "TResourceAndReturnType"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "TResourceAndReturnType"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								515,
								511,
								519,
								506
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 504,
							"character": 14
						}
					]
				},
				{
					"id": 522,
					"name": "CacheConstructor",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "缓存类"
					},
					"children": [
						{
							"id": 524,
							"name": "constructor",
							"kind": 512,
							"kindString": "Constructor",
							"flags": {},
							"signatures": [
								{
									"id": 525,
									"name": "new CacheConstructor",
									"kind": 16384,
									"kindString": "Constructor signature",
									"flags": {},
									"comment": {
										"shortText": "缓存类"
									},
									"parameters": [
										{
											"id": 526,
											"name": "max",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "最大缓存个数"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 527,
											"name": "buffer",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "缓存区个数，默认5"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 505,
										"name": "Cache"
									}
								}
							]
						},
						{
							"id": 523,
							"name": "prototype",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 542,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"id": 505,
								"name": "Cache"
							}
						}
					],
					"groups": [
						{
							"title": "Constructors",
							"kind": 512,
							"children": [
								524
							]
						},
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								523
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 534,
							"character": 14
						}
					]
				},
				{
					"id": 278,
					"name": "Config",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "配置信息接口"
					},
					"children": [
						{
							"id": 280,
							"name": "defaultPath",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"shortText": "默认路径"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 69,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 279,
							"name": "defaultView",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"shortText": "默认加载的view"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 65,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 284,
							"name": "rootId",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"shortText": "根view的id"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 85,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 281,
							"name": "routes",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"shortText": "path与view关系映射对象或方法"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 73,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"id": 272,
								"name": "RoutesConfig"
							}
						},
						{
							"id": 283,
							"name": "title",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"shortText": "默认的浏览器title"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 81,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 282,
							"name": "unmatchView",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"shortText": "在routes里找不到匹配时使用的view，比如显示404"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 77,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 285,
							"name": "error",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isOptional": true
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 89,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 286,
									"name": "error",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "以try catch执行一些用户重写的核心流程，当出错时，允许开发者通过该配置项进行捕获。注意：您不应该在该方法内再次抛出任何错误"
									},
									"parameters": [
										{
											"id": 287,
											"name": "exception",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"type": {
												"type": "reference",
												"name": "Error"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 297,
							"name": "rebuild",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isOptional": true
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 111,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 298,
									"name": "rebuild",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "重写把路径和参数转换成url的逻辑"
									},
									"parameters": [
										{
											"id": 299,
											"name": "pathname",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "路径信息"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 300,
											"name": "params",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "参数对象"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 301,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"indexSignature": {
														"id": 302,
														"name": "__index",
														"kind": 8192,
														"kindString": "Index signature",
														"flags": {},
														"parameters": [
															{
																"id": 303,
																"name": "key",
																"kind": 32768,
																"flags": {},
																"type": {
																	"type": "intrinsic",
																	"name": "string"
																}
															}
														],
														"type": {
															"type": "intrinsic",
															"name": "any"
														}
													}
												}
											}
										},
										{
											"id": 304,
											"name": "lastQuery",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "hash前的参数对象"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 305,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"indexSignature": {
														"id": 306,
														"name": "__index",
														"kind": 8192,
														"kindString": "Index signature",
														"flags": {},
														"parameters": [
															{
																"id": 307,
																"name": "key",
																"kind": 32768,
																"flags": {},
																"type": {
																	"type": "intrinsic",
																	"name": "string"
																}
															}
														],
														"type": {
															"type": "intrinsic",
															"name": "string"
														}
													}
												}
											}
										},
										{
											"id": 308,
											"name": "loc",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "解析后的地址栏对象\n"
											},
											"type": {
												"type": "reference",
												"id": 335,
												"name": "RouterParse"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "string"
									}
								}
							]
						},
						{
							"id": 309,
							"name": "recast",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isOptional": true
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 122,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 310,
									"name": "recast",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "路径变化渲染前拦截"
									},
									"parameters": [
										{
											"id": 311,
											"name": "e",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "变化对象\n"
											},
											"type": {
												"type": "reference",
												"id": 350,
												"name": "RouterDiff"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 312,
							"name": "remold",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isOptional": true
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 130,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 313,
									"name": "remold",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "拦截事件处理方法，返回false时中止事件的处理"
									},
									"parameters": [
										{
											"id": 314,
											"name": "target",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"type": {
												"type": "reference",
												"name": "HTMLElement"
											}
										},
										{
											"id": 315,
											"name": "type",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件类型"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 316,
											"name": "e",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件对象\n"
											},
											"type": {
												"type": "reference",
												"id": 368,
												"typeArguments": [
													{
														"type": "intrinsic",
														"name": "any"
													},
													{
														"type": "intrinsic",
														"name": "any"
													}
												],
												"name": "Event"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 324,
							"name": "request",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isOptional": true
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 149,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 325,
									"name": "request",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "是否有网络请求"
									},
									"parameters": [
										{
											"id": 326,
											"name": "flag",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 317,
							"name": "require",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isOptional": true
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 137,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 318,
									"name": "require",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "在异步加载模块前执行的方法"
									},
									"parameters": [
										{
											"id": 319,
											"name": "modules",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "模块列表"
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "intrinsic",
													"name": "string"
												}
											}
										},
										{
											"id": 320,
											"name": "params",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "其它参数\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "reference",
										"typeArguments": [
											{
												"type": "intrinsic",
												"name": "void"
											}
										],
										"name": "Promise"
									}
								}
							]
						},
						{
							"id": 321,
							"name": "retard",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isOptional": true
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 143,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 322,
									"name": "retard",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "是否有等待中的任务"
									},
									"parameters": [
										{
											"id": 323,
											"name": "flag",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "1有0没有\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 288,
							"name": "rewrite",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isOptional": true
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 98,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 289,
									"name": "rewrite",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "重写地址栏解析后的对象"
									},
									"parameters": [
										{
											"id": 290,
											"name": "pathname",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "路径信息"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 291,
											"name": "params",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "参数对象"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 292,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"indexSignature": {
														"id": 293,
														"name": "__index",
														"kind": 8192,
														"kindString": "Index signature",
														"flags": {},
														"parameters": [
															{
																"id": 294,
																"name": "key",
																"kind": 32768,
																"flags": {},
																"type": {
																	"type": "intrinsic",
																	"name": "string"
																}
															}
														],
														"type": {
															"type": "intrinsic",
															"name": "string"
														}
													}
												}
											}
										},
										{
											"id": 295,
											"name": "routes",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "路由信息"
											},
											"type": {
												"type": "reference",
												"id": 272,
												"name": "RoutesConfig"
											}
										},
										{
											"id": 296,
											"name": "loc",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "解析后的地址栏对象\n"
											},
											"type": {
												"type": "reference",
												"id": 335,
												"name": "RouterParse"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "string"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								280,
								279,
								284,
								281,
								283,
								282
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								285,
								297,
								309,
								312,
								324,
								317,
								321,
								288
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 61,
							"character": 14
						}
					],
					"indexSignature": {
						"id": 327,
						"name": "__index",
						"kind": 8192,
						"kindString": "Index signature",
						"flags": {},
						"comment": {
							"shortText": "其它配置项"
						},
						"parameters": [
							{
								"id": 328,
								"name": "key",
								"kind": 32768,
								"flags": {},
								"type": {
									"type": "intrinsic",
									"name": "string"
								}
							}
						],
						"type": {
							"type": "intrinsic",
							"name": "any"
						}
					}
				},
				{
					"id": 368,
					"name": "Event",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "事件对象接口"
					},
					"children": [
						{
							"id": 384,
							"name": "fire",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 385,
									"name": "fire",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "派发事件",
										"returns": "返回事件对象\n"
									},
									"typeParameter": [
										{
											"id": 386,
											"name": "D",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 387,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 388,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件参数"
											},
											"type": {
												"type": "reference",
												"name": "D"
											}
										}
									],
									"type": {
										"type": "intersection",
										"types": [
											{
												"type": "reference",
												"id": 431,
												"name": "TriggerEventDescriptor"
											},
											{
												"type": "reference",
												"name": "D"
											}
										]
									}
								}
							]
						},
						{
							"id": 377,
							"name": "off",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 378,
									"name": "off",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "解除事件绑定"
									},
									"parameters": [
										{
											"id": 379,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 380,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件处理函数\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 381,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 382,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 383,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intersection",
																		"types": [
																			{
																				"type": "reference",
																				"id": 431,
																				"name": "TriggerEventDescriptor"
																			},
																			{
																				"type": "reference",
																				"name": "E"
																			}
																		]
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 369,
							"name": "on",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 370,
									"name": "on",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "绑定事件"
									},
									"parameters": [
										{
											"id": 371,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 372,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件处理函数"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 373,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 374,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 375,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intersection",
																		"types": [
																			{
																				"type": "reference",
																				"id": 431,
																				"name": "TriggerEventDescriptor"
																			},
																			{
																				"type": "reference",
																				"name": "E"
																			}
																		]
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 376,
											"name": "priority",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "优先级\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								384,
								377,
								369
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 284,
							"character": 14
						}
					],
					"typeParameter": [
						{
							"id": 389,
							"name": "T",
							"kind": 131072,
							"kindString": "Type parameter",
							"flags": {},
							"default": {
								"type": "intrinsic",
								"name": "any"
							}
						},
						{
							"id": 390,
							"name": "E",
							"kind": 131072,
							"kindString": "Type parameter",
							"flags": {},
							"default": {
								"type": "intrinsic",
								"name": "any"
							}
						}
					],
					"extendedBy": [
						{
							"type": "reference",
							"id": 391,
							"name": "State"
						},
						{
							"type": "reference",
							"id": 444,
							"name": "Router"
						},
						{
							"type": "reference",
							"id": 571,
							"name": "VframeConstructor"
						},
						{
							"type": "reference",
							"id": 618,
							"name": "View"
						},
						{
							"type": "reference",
							"id": 753,
							"name": "ServiceConstructor"
						}
					]
				},
				{
					"id": 491,
					"name": "ExtendPropertyDescriptor",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "继承对象接口"
					},
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 473,
							"character": 14
						}
					],
					"typeParameter": [
						{
							"id": 492,
							"name": "T",
							"kind": 131072,
							"kindString": "Type parameter",
							"flags": {}
						}
					],
					"indexSignature": {
						"id": 493,
						"name": "__index",
						"kind": 8192,
						"kindString": "Index signature",
						"flags": {},
						"parameters": [
							{
								"id": 494,
								"name": "key",
								"kind": 32768,
								"flags": {},
								"type": {
									"type": "intrinsic",
									"name": "string"
								}
							}
						],
						"type": {
							"type": "union",
							"types": [
								{
									"type": "intrinsic",
									"name": "string"
								},
								{
									"type": "intrinsic",
									"name": "number"
								},
								{
									"type": "intrinsic",
									"name": "undefined"
								},
								{
									"type": "intrinsic",
									"name": "boolean"
								},
								{
									"type": "reference",
									"name": "RegExp"
								},
								{
									"type": "intrinsic",
									"name": "symbol"
								},
								{
									"type": "intrinsic",
									"name": "object"
								},
								{
									"type": "literal",
									"value": null
								},
								{
									"type": "reflection",
									"declaration": {
										"id": 495,
										"name": "__type",
										"kind": 65536,
										"kindString": "Type literal",
										"flags": {},
										"sources": [
											{
												"fileName": "types/magix.d.ts",
												"line": 483,
												"character": 15
											}
										],
										"signatures": [
											{
												"id": 496,
												"name": "__type",
												"kind": 4096,
												"kindString": "Call signature",
												"flags": {},
												"parameters": [
													{
														"id": 497,
														"name": "this",
														"kind": 32768,
														"kindString": "Parameter",
														"flags": {},
														"type": {
															"type": "reference",
															"name": "T"
														}
													},
													{
														"id": 498,
														"name": "args",
														"kind": 32768,
														"kindString": "Parameter",
														"flags": {
															"isRest": true
														},
														"type": {
															"type": "array",
															"elementType": {
																"type": "intrinsic",
																"name": "any"
															}
														}
													}
												],
												"type": {
													"type": "intrinsic",
													"name": "any"
												}
											}
										]
									}
								}
							]
						}
					}
				},
				{
					"id": 499,
					"name": "ExtendStaticPropertyDescriptor",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "继承静态属性"
					},
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 488,
							"character": 14
						}
					],
					"indexSignature": {
						"id": 500,
						"name": "__index",
						"kind": 8192,
						"kindString": "Index signature",
						"flags": {},
						"parameters": [
							{
								"id": 501,
								"name": "key",
								"kind": 32768,
								"flags": {},
								"type": {
									"type": "intrinsic",
									"name": "string"
								}
							}
						],
						"type": {
							"type": "intrinsic",
							"name": "any"
						}
					}
				},
				{
					"id": 814,
					"name": "Magix",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"children": [
						{
							"id": 1021,
							"name": "Cache",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"shortText": "缓存类"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 1348,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"id": 522,
								"name": "CacheConstructor"
							}
						},
						{
							"id": 1023,
							"name": "Event",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"shortText": "事件对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 1358,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"id": 368,
								"typeArguments": [
									{
										"type": "intrinsic",
										"name": "any"
									},
									{
										"type": "intrinsic",
										"name": "any"
									}
								],
								"name": "Event"
							}
						},
						{
							"id": 994,
							"name": "HIGH",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"shortText": "事件最高优先级"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 1288,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							}
						},
						{
							"id": 995,
							"name": "LOW",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"shortText": "事件最低优先级"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 1292,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							}
						},
						{
							"id": 1024,
							"name": "Router",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"shortText": "路由对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 1363,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"id": 444,
								"name": "Router"
							}
						},
						{
							"id": 996,
							"name": "Service",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"shortText": "接管管理类"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 1297,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"id": 753,
								"name": "ServiceConstructor"
							}
						},
						{
							"id": 1022,
							"name": "State",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"shortText": "状态对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 1353,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"id": 391,
								"name": "State"
							}
						},
						{
							"id": 1025,
							"name": "Vframe",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"shortText": "Vframe类"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 1367,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"id": 571,
								"name": "VframeConstructor"
							}
						},
						{
							"id": 1020,
							"name": "View",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"comment": {
								"shortText": "view类"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 1344,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"id": 704,
								"name": "ViewConstructor"
							}
						},
						{
							"id": 1026,
							"name": "default",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 1372,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"id": 814,
								"name": "Magix"
							}
						},
						{
							"id": 889,
							"name": "applyStyle",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 890,
									"name": "applyStyle",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "向页面追加样式"
									},
									"parameters": [
										{
											"id": 891,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "样式对应的唯一key，该key主要防止向页面反复添加同样的样式"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 892,
											"name": "cssText",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "样式字符串\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								},
								{
									"id": 893,
									"name": "applyStyle",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "向页面追加样式"
									},
									"parameters": [
										{
											"id": 894,
											"name": "atFile",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "以@:开头的文件路径\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 967,
							"name": "attach",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 968,
									"name": "attach",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "监听事件"
									},
									"parameters": [
										{
											"id": 969,
											"name": "target",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听对象"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "reference",
														"name": "EventTarget"
													},
													{
														"type": "reference",
														"name": "Window"
													}
												]
											}
										},
										{
											"id": 970,
											"name": "type",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听类型"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 971,
											"name": "listener",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听回调"
											},
											"type": {
												"type": "reference",
												"name": "EventListenerOrEventListenerObject"
											}
										},
										{
											"id": 972,
											"name": "options",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "监听选项\n"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "boolean"
													},
													{
														"type": "reference",
														"name": "AddEventListenerOptions"
													}
												]
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 979,
							"name": "attachAll",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 980,
									"name": "attachAll",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "批量监听事件"
									},
									"parameters": [
										{
											"id": 981,
											"name": "targets",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听对象列表"
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "union",
													"types": [
														{
															"type": "reference",
															"name": "EventTarget"
														},
														{
															"type": "reference",
															"name": "Window"
														}
													]
												}
											}
										},
										{
											"id": 982,
											"name": "type",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听类型"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 983,
											"name": "listener",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听回调"
											},
											"type": {
												"type": "reference",
												"name": "EventListenerOrEventListenerObject"
											}
										},
										{
											"id": 984,
											"name": "options",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "监听选项\n"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "boolean"
													},
													{
														"type": "reference",
														"name": "AddEventListenerOptions"
													}
												]
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 826,
							"name": "boot",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 827,
									"name": "boot",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "应用初始化入口"
									},
									"parameters": [
										{
											"id": 828,
											"name": "cfg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "配置信息参数对象\n"
											},
											"type": {
												"type": "reference",
												"id": 278,
												"name": "Config"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 815,
							"name": "config",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 816,
									"name": "config",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "设置或获取配置信息"
									},
									"typeParameter": [
										{
											"id": 817,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "reference",
												"id": 278,
												"name": "Config"
											}
										}
									],
									"parameters": [
										{
											"id": 818,
											"name": "cfg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "配置信息参数对象\n"
											},
											"type": {
												"type": "reference",
												"name": "T"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "T"
									}
								},
								{
									"id": 819,
									"name": "config",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取配置信息"
									},
									"typeParameter": [
										{
											"id": 820,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										}
									],
									"parameters": [
										{
											"id": 821,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "配置key\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "T"
									}
								},
								{
									"id": 822,
									"name": "config",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取配置信息对象"
									},
									"typeParameter": [
										{
											"id": 823,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "reference",
												"id": 278,
												"name": "Config"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "T"
									}
								},
								{
									"id": 824,
									"name": "config",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "设置配置信息"
									},
									"parameters": [
										{
											"id": 825,
											"name": "sources",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isRest": true
											},
											"comment": {
												"text": "配置信息参数对象\n"
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "intrinsic",
													"name": "any"
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "any"
									}
								}
							]
						},
						{
							"id": 991,
							"name": "delay",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 992,
									"name": "delay",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "推迟多少毫秒"
									},
									"parameters": [
										{
											"id": 993,
											"name": "time",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "以ms为单位的时间\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "reference",
										"typeArguments": [
											{
												"type": "intrinsic",
												"name": "void"
											}
										],
										"name": "Promise"
									}
								}
							]
						},
						{
							"id": 973,
							"name": "detach",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 974,
									"name": "detach",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "解除监听事件"
									},
									"parameters": [
										{
											"id": 975,
											"name": "target",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听对象"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "reference",
														"name": "EventTarget"
													},
													{
														"type": "reference",
														"name": "Window"
													}
												]
											}
										},
										{
											"id": 976,
											"name": "type",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听类型"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 977,
											"name": "listener",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听回调"
											},
											"type": {
												"type": "reference",
												"name": "EventListenerOrEventListenerObject"
											}
										},
										{
											"id": 978,
											"name": "options",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "监听选项\n"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "boolean"
													},
													{
														"type": "reference",
														"name": "EventListenerOptions"
													}
												]
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 985,
							"name": "detachAll",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 986,
									"name": "detachAll",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "解除监听事件"
									},
									"parameters": [
										{
											"id": 987,
											"name": "target",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"type": {
												"type": "array",
												"elementType": {
													"type": "union",
													"types": [
														{
															"type": "reference",
															"name": "EventTarget"
														},
														{
															"type": "reference",
															"name": "Window"
														}
													]
												}
											}
										},
										{
											"id": 988,
											"name": "type",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听类型"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 989,
											"name": "listener",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听回调"
											},
											"type": {
												"type": "reference",
												"name": "EventListenerOrEventListenerObject"
											}
										},
										{
											"id": 990,
											"name": "options",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "监听选项\n"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "boolean"
													},
													{
														"type": "reference",
														"name": "EventListenerOptions"
													}
												]
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 881,
							"name": "dispatch",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 882,
									"name": "dispatch",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "触发事件"
									},
									"parameters": [
										{
											"id": 883,
											"name": "node",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "dom节点"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "reference",
														"name": "Window"
													},
													{
														"type": "reference",
														"id": 271,
														"name": "HTMLElementOrEventTarget"
													}
												]
											}
										},
										{
											"id": 884,
											"name": "type",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件类型"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 885,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "数据\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 877,
							"name": "guard",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 878,
									"name": "guard",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "保护对象不被修改"
									},
									"typeParameter": [
										{
											"id": 879,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 880,
											"name": "o",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "保护对象\n"
											},
											"type": {
												"type": "reference",
												"name": "T"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "T"
									}
								}
							]
						},
						{
							"id": 895,
							"name": "guid",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 896,
									"name": "guid",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "生成唯一的guid"
									},
									"parameters": [
										{
											"id": 897,
											"name": "prefix",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "guid的前缀，默认mx-\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "string"
									}
								}
							]
						},
						{
							"id": 859,
							"name": "has",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 860,
									"name": "has",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "检测某个对象是否拥有某个属性。"
									},
									"parameters": [
										{
											"id": 861,
											"name": "owner",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "检测对象"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										},
										{
											"id": 862,
											"name": "prop",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "属性\n"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "intrinsic",
														"name": "number"
													}
												]
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 863,
							"name": "inside",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 864,
									"name": "inside",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "判断一个节点是否在另外一个节点内，如果ignoreContainer不为true,则比较的2个节点是同一个节点，也返回true"
									},
									"parameters": [
										{
											"id": 865,
											"name": "node",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "节点"
											},
											"type": {
												"type": "reference",
												"id": 271,
												"name": "HTMLElementOrEventTarget"
											}
										},
										{
											"id": 866,
											"name": "container",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "容器节点"
											},
											"type": {
												"type": "reference",
												"id": 271,
												"name": "HTMLElementOrEventTarget"
											}
										},
										{
											"id": 867,
											"name": "ignoreContainer",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "是否忽略容器，只判断容器的子节点\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 1000,
							"name": "isArray",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 1001,
									"name": "isArray",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "是否为数组"
									},
									"parameters": [
										{
											"id": 1002,
											"name": "o",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "检测对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 1003,
							"name": "isFunction",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 1004,
									"name": "isFunction",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "是否为函数"
									},
									"parameters": [
										{
											"id": 1005,
											"name": "o",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "检测对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 1009,
							"name": "isNumber",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 1010,
									"name": "isNumber",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "是否为数字"
									},
									"parameters": [
										{
											"id": 1011,
											"name": "o",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "检测对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 997,
							"name": "isObject",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 998,
									"name": "isObject",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "是否为对象"
									},
									"parameters": [
										{
											"id": 999,
											"name": "o",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "测试对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 1017,
							"name": "isPrimitive",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 1018,
									"name": "isPrimitive",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "是否为原始值"
									},
									"parameters": [
										{
											"id": 1019,
											"name": "o",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "检测对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 1006,
							"name": "isString",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 1007,
									"name": "isString",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "是否为字符串"
									},
									"parameters": [
										{
											"id": 1008,
											"name": "o",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "检测对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 922,
							"name": "lowTask",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 923,
									"name": "lowTask",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "最后安排、优化待执行的函数"
									},
									"typeParameter": [
										{
											"id": 924,
											"name": "TArgs",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										},
										{
											"id": 925,
											"name": "TContext",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										}
									],
									"parameters": [
										{
											"id": 926,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "执行函数"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 927,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 928,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 929,
																	"name": "args",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isRest": true
																	},
																	"type": {
																		"type": "array",
																		"elementType": {
																			"type": "reference",
																			"name": "TArgs"
																		}
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 930,
											"name": "args",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "参数"
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "reference",
													"name": "TArgs"
												}
											}
										},
										{
											"id": 931,
											"name": "context",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "this指向"
											},
											"type": {
												"type": "reference",
												"name": "TContext"
											}
										},
										{
											"id": 932,
											"name": "id",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "任务id,当指定id且同样id有多个时,会取消前面的执行\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 936,
							"name": "lowTaskFinale",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 937,
									"name": "lowTaskFinale",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "等待最后的任务完成"
									},
									"typeParameter": [
										{
											"id": 938,
											"name": "TContext",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										}
									],
									"type": {
										"type": "reference",
										"typeArguments": [
											{
												"type": "reference",
												"name": "TContext"
											}
										],
										"name": "Promise"
									}
								}
							]
						},
						{
							"id": 898,
							"name": "mark",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 899,
									"name": "mark",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取异步标识"
									},
									"parameters": [
										{
											"id": 900,
											"name": "host",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "宿主对象"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										},
										{
											"id": 901,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "标识key\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "reflection",
										"declaration": {
											"id": 902,
											"name": "__type",
											"kind": 65536,
											"kindString": "Type literal",
											"flags": {},
											"signatures": [
												{
													"id": 903,
													"name": "__type",
													"kind": 4096,
													"kindString": "Call signature",
													"flags": {},
													"comment": {
														"shortText": "获取异步标识"
													},
													"type": {
														"type": "intrinsic",
														"name": "boolean"
													}
												}
											]
										}
									}
								}
							]
						},
						{
							"id": 942,
							"name": "mix",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 943,
									"name": "mix",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "复制一个或多个对象属性到目标对象上，并返回该对象。"
									},
									"typeParameter": [
										{
											"id": 944,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										},
										{
											"id": 945,
											"name": "U",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										}
									],
									"parameters": [
										{
											"id": 946,
											"name": "target",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "目标对象."
											},
											"type": {
												"type": "reference",
												"name": "T"
											}
										},
										{
											"id": 947,
											"name": "source",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "复制对象.\n"
											},
											"type": {
												"type": "reference",
												"name": "U"
											}
										}
									],
									"type": {
										"type": "intersection",
										"types": [
											{
												"type": "reference",
												"name": "T"
											},
											{
												"type": "reference",
												"name": "U"
											}
										]
									}
								},
								{
									"id": 948,
									"name": "mix",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "复制一个或多个对象属性到目标对象上，并返回该对象。"
									},
									"typeParameter": [
										{
											"id": 949,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										},
										{
											"id": 950,
											"name": "U",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										},
										{
											"id": 951,
											"name": "V",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										}
									],
									"parameters": [
										{
											"id": 952,
											"name": "target",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "目标对象."
											},
											"type": {
												"type": "reference",
												"name": "T"
											}
										},
										{
											"id": 953,
											"name": "source1",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "第一个复制对象."
											},
											"type": {
												"type": "reference",
												"name": "U"
											}
										},
										{
											"id": 954,
											"name": "source2",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "第二个复制对象.\n"
											},
											"type": {
												"type": "reference",
												"name": "V"
											}
										}
									],
									"type": {
										"type": "intersection",
										"types": [
											{
												"type": "reference",
												"name": "T"
											},
											{
												"type": "reference",
												"name": "U"
											},
											{
												"type": "reference",
												"name": "V"
											}
										]
									}
								},
								{
									"id": 955,
									"name": "mix",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "复制一个或多个对象属性到目标对象上，并返回该对象。"
									},
									"typeParameter": [
										{
											"id": 956,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										},
										{
											"id": 957,
											"name": "U",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										},
										{
											"id": 958,
											"name": "V",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										},
										{
											"id": 959,
											"name": "W",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										}
									],
									"parameters": [
										{
											"id": 960,
											"name": "target",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "目标对象."
											},
											"type": {
												"type": "reference",
												"name": "T"
											}
										},
										{
											"id": 961,
											"name": "source1",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "第一个复制对象."
											},
											"type": {
												"type": "reference",
												"name": "U"
											}
										},
										{
											"id": 962,
											"name": "source2",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "第二个复制对象."
											},
											"type": {
												"type": "reference",
												"name": "V"
											}
										},
										{
											"id": 963,
											"name": "source3",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "第三个复制对象.\n"
											},
											"type": {
												"type": "reference",
												"name": "W"
											}
										}
									],
									"type": {
										"type": "intersection",
										"types": [
											{
												"type": "reference",
												"name": "T"
											},
											{
												"type": "reference",
												"name": "U"
											},
											{
												"type": "reference",
												"name": "V"
											},
											{
												"type": "reference",
												"name": "W"
											}
										]
									}
								},
								{
									"id": 964,
									"name": "mix",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "复制一个或多个对象属性到目标对象上，并返回该对象。"
									},
									"parameters": [
										{
											"id": 965,
											"name": "target",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "目标对象."
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										},
										{
											"id": 966,
											"name": "sources",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isRest": true
											},
											"comment": {
												"text": "一个或多个复制对象\n"
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "intrinsic",
													"name": "any"
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "any"
									}
								}
							]
						},
						{
							"id": 868,
							"name": "node",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 869,
									"name": "node",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "document.getElementById的简写"
									},
									"typeParameter": [
										{
											"id": 870,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "reference",
												"id": 271,
												"name": "HTMLElementOrEventTarget"
											}
										}
									],
									"parameters": [
										{
											"id": 871,
											"name": "id",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "节点id\n"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "reference",
														"id": 271,
														"name": "HTMLElementOrEventTarget"
													}
												]
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "T"
									}
								}
							]
						},
						{
							"id": 856,
							"name": "parseUrl",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 857,
									"name": "parseUrl",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "把路径字符串转换成对象。Magix.parseUrl('/xxx/?a=b&c=d') => {path:'/xxx/',params:{a:'b',c:'d'}}"
									},
									"parameters": [
										{
											"id": 858,
											"name": "url",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "路径字符串\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 329,
										"name": "RouterParseParts"
									}
								}
							]
						},
						{
							"id": 911,
							"name": "task",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 912,
									"name": "task",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "安排、优化待执行的函数"
									},
									"typeParameter": [
										{
											"id": 913,
											"name": "TArgs",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										},
										{
											"id": 914,
											"name": "TContext",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										}
									],
									"parameters": [
										{
											"id": 915,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "执行函数"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 916,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 917,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 918,
																	"name": "args",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isRest": true
																	},
																	"type": {
																		"type": "array",
																		"elementType": {
																			"type": "reference",
																			"name": "TArgs"
																		}
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 919,
											"name": "args",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "参数"
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "reference",
													"name": "TArgs"
												}
											}
										},
										{
											"id": 920,
											"name": "context",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "this指向"
											},
											"type": {
												"type": "reference",
												"name": "TContext"
											}
										},
										{
											"id": 921,
											"name": "id",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "任务id,当指定id且同样id有多个时,会取消前面的执行\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 939,
							"name": "taskCancel",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 940,
									"name": "taskCancel",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "取消任务"
									},
									"parameters": [
										{
											"id": 941,
											"name": "id",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "任务id\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 933,
							"name": "taskFinale",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 934,
									"name": "taskFinale",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "等待任务完成"
									},
									"typeParameter": [
										{
											"id": 935,
											"name": "TContext",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										}
									],
									"type": {
										"type": "reference",
										"typeArguments": [
											{
												"type": "reference",
												"name": "TContext"
											}
										],
										"name": "Promise"
									}
								}
							]
						},
						{
							"id": 908,
							"name": "taskIdle",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 909,
									"name": "taskIdle",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "任务队列空闲至多少毫秒"
									},
									"parameters": [
										{
											"id": 910,
											"name": "time",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "至少等多久\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "reference",
										"typeArguments": [
											{
												"type": "intrinsic",
												"name": "void"
											}
										],
										"name": "Promise"
									}
								}
							]
						},
						{
							"id": 831,
							"name": "toMap",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 832,
									"name": "toMap",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "把列表转化成hash对象。Magix.toMap([1,2,3,5,6]) => {1:1,2:1,3:1,4:1,5:1,6:1}。Magix.toMap([{id:20},{id:30},{id:40}],'id') => {20:{id:20},30:{id:30},40:{id:40}}"
									},
									"typeParameter": [
										{
											"id": 833,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 834,
											"name": "list",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "源数组"
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "intrinsic",
													"name": "any"
												}
											}
										},
										{
											"id": 835,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "以数组中对象的哪个key的value做为hash的key\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "T"
									}
								}
							]
						},
						{
							"id": 836,
							"name": "toTry",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 837,
									"name": "toTry",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "以try catch方式执行方法，忽略掉任何异常。返回成功执行的最后一个方法的返回值"
									},
									"typeParameter": [
										{
											"id": 838,
											"name": "TReturnType",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										},
										{
											"id": 839,
											"name": "TContextType",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										}
									],
									"parameters": [
										{
											"id": 840,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "函数"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 841,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 842,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 843,
																	"name": "args",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isRest": true
																	},
																	"type": {
																		"type": "array",
																		"elementType": {
																			"type": "intrinsic",
																			"name": "any"
																		}
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 844,
											"name": "args",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "参数数组"
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "intrinsic",
													"name": "any"
												}
											}
										},
										{
											"id": 845,
											"name": "context",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "在待执行的方法内部，this的指向\n"
											},
											"type": {
												"type": "reference",
												"name": "TContextType"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "TReturnType"
									}
								},
								{
									"id": 846,
									"name": "toTry",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "以try catch方式执行方法，忽略掉任何异常。返回成功执行的最后一个方法的返回值"
									},
									"typeParameter": [
										{
											"id": 847,
											"name": "TReturnType",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										}
									],
									"parameters": [
										{
											"id": 848,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "函数数组"
											},
											"type": {
												"type": "reference",
												"name": "Function"
											}
										},
										{
											"id": 849,
											"name": "args",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "参数数组"
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "intrinsic",
													"name": "any"
												}
											}
										},
										{
											"id": 850,
											"name": "context",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "在待执行的方法内部，this的指向\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "TReturnType"
									}
								}
							]
						},
						{
							"id": 851,
							"name": "toUrl",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 852,
									"name": "toUrl",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "转换成字符串路径。Magix.toUrl('/xxx/',{a:'b',c:'d'}) => /xxx/?a=b&c=d"
									},
									"parameters": [
										{
											"id": 853,
											"name": "path",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "路径"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 854,
											"name": "params",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "参数对象"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										},
										{
											"id": 855,
											"name": "keo",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "保留空白值的对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "string"
									}
								}
							]
						},
						{
							"id": 886,
							"name": "type",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 887,
									"name": "type",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取对象类型"
									},
									"parameters": [
										{
											"id": 888,
											"name": "aim",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "目标对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "string"
									}
								}
							]
						},
						{
							"id": 829,
							"name": "unboot",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 830,
									"name": "unboot",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "取消安装"
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 904,
							"name": "unmark",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 905,
									"name": "unmark",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "销毁所有异步标识"
									},
									"parameters": [
										{
											"id": 906,
											"name": "host",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "宿主对象"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										},
										{
											"id": 907,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "取消哪个异步标识key\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 872,
							"name": "use",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 873,
									"name": "use",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "使用加载器的加载模块功能"
									},
									"typeParameter": [
										{
											"id": 874,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 875,
											"name": "deps",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "模块id"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "array",
														"elementType": {
															"type": "intrinsic",
															"name": "string"
														}
													}
												]
											}
										},
										{
											"id": 876,
											"name": "params",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "当有require拦截时，传递的参数\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "reference",
										"typeArguments": [
											{
												"type": "reference",
												"name": "T"
											}
										],
										"name": "Promise"
									}
								}
							]
						},
						{
							"id": 1012,
							"name": "waitSelector",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 1013,
									"name": "waitSelector",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "等待相应的选择器就绪"
									},
									"parameters": [
										{
											"id": 1014,
											"name": "selector",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "选择器"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 1015,
											"name": "timeout",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "超时时间，默认30s"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 1016,
											"name": "context",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "上下文，默认document\n"
											},
											"type": {
												"type": "reference",
												"name": "Element"
											}
										}
									],
									"type": {
										"type": "reference",
										"typeArguments": [
											{
												"type": "reference",
												"name": "Element"
											}
										],
										"name": "Promise"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								1021,
								1023,
								994,
								995,
								1024,
								996,
								1022,
								1025,
								1020,
								1026
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								889,
								967,
								979,
								826,
								815,
								991,
								973,
								985,
								881,
								877,
								895,
								859,
								863,
								1000,
								1003,
								1009,
								997,
								1017,
								1006,
								922,
								936,
								898,
								942,
								868,
								856,
								911,
								939,
								933,
								908,
								831,
								836,
								851,
								886,
								829,
								904,
								872,
								1012
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 973,
							"character": 14
						}
					]
				},
				{
					"id": 87,
					"name": "MagixKeyboardEvent",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "键盘事件"
					},
					"children": [
						{
							"id": 159,
							"name": "AT_TARGET",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4906,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.AT_TARGET"
							}
						},
						{
							"id": 160,
							"name": "BUBBLING_PHASE",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4907,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.BUBBLING_PHASE"
							}
						},
						{
							"id": 161,
							"name": "CAPTURING_PHASE",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4908,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.CAPTURING_PHASE"
							}
						},
						{
							"id": 119,
							"name": "DOM_KEY_LOCATION_LEFT",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8752,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.DOM_KEY_LOCATION_LEFT"
							}
						},
						{
							"id": 120,
							"name": "DOM_KEY_LOCATION_NUMPAD",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8753,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.DOM_KEY_LOCATION_NUMPAD"
							}
						},
						{
							"id": 121,
							"name": "DOM_KEY_LOCATION_RIGHT",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8754,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.DOM_KEY_LOCATION_RIGHT"
							}
						},
						{
							"id": 122,
							"name": "DOM_KEY_LOCATION_STANDARD",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8755,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.DOM_KEY_LOCATION_STANDARD"
							}
						},
						{
							"id": 162,
							"name": "NONE",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4909,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.NONE"
							}
						},
						{
							"id": 93,
							"name": "altKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8736,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.altKey"
							}
						},
						{
							"id": 133,
							"name": "bubbles",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4872,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.bubbles"
							}
						},
						{
							"id": 134,
							"name": "cancelBubble",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4873,
									"character": 4
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.cancelBubble"
							}
						},
						{
							"id": 135,
							"name": "cancelable",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4875,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.cancelable"
							}
						},
						{
							"id": 94,
							"name": "charCode",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8738,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.charCode"
							}
						},
						{
							"id": 95,
							"name": "code",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8739,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.code"
							}
						},
						{
							"id": 136,
							"name": "composed",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4877,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.composed"
							}
						},
						{
							"id": 96,
							"name": "ctrlKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8740,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.ctrlKey"
							}
						},
						{
							"id": 137,
							"name": "currentTarget",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the object whose event listener's callback is currently being invoked."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4879,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "EventTarget"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.currentTarget"
							}
						},
						{
							"id": 138,
							"name": "defaultPrevented",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4881,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.defaultPrevented"
							}
						},
						{
							"id": 123,
							"name": "detail",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 13834,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.detail"
							}
						},
						{
							"id": 139,
							"name": "eventPhase",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4883,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.eventPhase"
							}
						},
						{
							"id": 92,
							"name": "eventTarget",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 26,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"name": "HTMLElement"
							}
						},
						{
							"id": 97,
							"name": "isComposing",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8741,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.isComposing"
							}
						},
						{
							"id": 140,
							"name": "isTrusted",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true if event was dispatched by the user agent, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4885,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.isTrusted"
							}
						},
						{
							"id": 98,
							"name": "key",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8742,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.key"
							}
						},
						{
							"id": 99,
							"name": "keyCode",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8744,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.keyCode"
							}
						},
						{
							"id": 100,
							"name": "location",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8745,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.location"
							}
						},
						{
							"id": 101,
							"name": "metaKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8746,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.metaKey"
							}
						},
						{
							"id": 88,
							"name": "params",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 23,
									"character": 8
								}
							],
							"type": {
								"type": "reflection",
								"declaration": {
									"id": 89,
									"name": "__type",
									"kind": 65536,
									"kindString": "Type literal",
									"flags": {},
									"indexSignature": {
										"id": 90,
										"name": "__index",
										"kind": 8192,
										"kindString": "Index signature",
										"flags": {},
										"parameters": [
											{
												"id": 91,
												"name": "key",
												"kind": 32768,
												"flags": {},
												"type": {
													"type": "intrinsic",
													"name": "string"
												}
											}
										],
										"type": {
											"type": "intrinsic",
											"name": "any"
										}
									}
								}
							}
						},
						{
							"id": 102,
							"name": "repeat",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8747,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.repeat"
							}
						},
						{
							"id": 141,
							"name": "returnValue",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4887,
									"character": 4
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.returnValue"
							}
						},
						{
							"id": 103,
							"name": "shiftKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8748,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.shiftKey"
							}
						},
						{
							"id": 142,
							"name": "srcElement",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4889,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "EventTarget"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.srcElement"
							}
						},
						{
							"id": 143,
							"name": "target",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the object to which event is dispatched (its target)."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4891,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "EventTarget"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.target"
							}
						},
						{
							"id": 144,
							"name": "timeStamp",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the event's timestamp as the number of milliseconds measured relative to the time origin."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4893,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.timeStamp"
							}
						},
						{
							"id": 145,
							"name": "type",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the type of event, e.g. \"click\", \"hashchange\", or \"submit\"."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4895,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.type"
							}
						},
						{
							"id": 124,
							"name": "view",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 13835,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "Window"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.view"
							}
						},
						{
							"id": 125,
							"name": "which",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 13837,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.which"
							}
						},
						{
							"id": 146,
							"name": "composedPath",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 147,
									"name": "composedPath",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is \"closed\" that are not reachable from event's currentTarget."
									},
									"type": {
										"type": "array",
										"elementType": {
											"type": "reference",
											"name": "EventTarget"
										}
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "KeyboardEvent.composedPath"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.composedPath"
							}
						},
						{
							"id": 104,
							"name": "getModifierState",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 105,
									"name": "getModifierState",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"parameters": [
										{
											"id": 106,
											"name": "keyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "KeyboardEvent.getModifierState"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.getModifierState"
							}
						},
						{
							"id": 148,
							"name": "initEvent",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 149,
									"name": "initEvent",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"tags": [
											{
												"tag": "deprecated",
												"text": ""
											}
										]
									},
									"parameters": [
										{
											"id": 150,
											"name": "type",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 151,
											"name": "bubbles",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 152,
											"name": "cancelable",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "KeyboardEvent.initEvent"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.initEvent"
							}
						},
						{
							"id": 107,
							"name": "initKeyboardEvent",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 108,
									"name": "initKeyboardEvent",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"tags": [
											{
												"tag": "deprecated",
												"text": ""
											}
										]
									},
									"parameters": [
										{
											"id": 109,
											"name": "typeArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 110,
											"name": "bubblesArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 111,
											"name": "cancelableArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 112,
											"name": "viewArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "reference",
												"name": "Window"
											}
										},
										{
											"id": 113,
											"name": "keyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 114,
											"name": "locationArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 115,
											"name": "ctrlKey",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 116,
											"name": "altKey",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 117,
											"name": "shiftKey",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 118,
											"name": "metaKey",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "KeyboardEvent.initKeyboardEvent"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.initKeyboardEvent"
							}
						},
						{
							"id": 126,
							"name": "initUIEvent",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 127,
									"name": "initUIEvent",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"tags": [
											{
												"tag": "deprecated",
												"text": ""
											}
										]
									},
									"parameters": [
										{
											"id": 128,
											"name": "typeArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 129,
											"name": "bubblesArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 130,
											"name": "cancelableArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 131,
											"name": "viewArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "reference",
												"name": "Window"
											}
										},
										{
											"id": 132,
											"name": "detailArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "KeyboardEvent.initUIEvent"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.initUIEvent"
							}
						},
						{
							"id": 153,
							"name": "preventDefault",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 154,
									"name": "preventDefault",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled."
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "KeyboardEvent.preventDefault"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.preventDefault"
							}
						},
						{
							"id": 155,
							"name": "stopImmediatePropagation",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 156,
									"name": "stopImmediatePropagation",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects."
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "KeyboardEvent.stopImmediatePropagation"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.stopImmediatePropagation"
							}
						},
						{
							"id": 157,
							"name": "stopPropagation",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 158,
									"name": "stopPropagation",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object."
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "KeyboardEvent.stopPropagation"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.stopPropagation"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								159,
								160,
								161,
								119,
								120,
								121,
								122,
								162,
								93,
								133,
								134,
								135,
								94,
								95,
								136,
								96,
								137,
								138,
								123,
								139,
								92,
								97,
								140,
								98,
								99,
								100,
								101,
								88,
								102,
								141,
								103,
								142,
								143,
								144,
								145,
								124,
								125
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								146,
								104,
								148,
								107,
								126,
								153,
								155,
								157
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 22,
							"character": 14
						}
					],
					"extendedTypes": [
						{
							"type": "reference",
							"name": "KeyboardEvent"
						}
					]
				},
				{
					"id": 163,
					"name": "MagixMixedEvent",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "混合鼠标及键盘的事件对象"
					},
					"children": [
						{
							"id": 244,
							"name": "AT_TARGET",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4906,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.AT_TARGET"
							}
						},
						{
							"id": 245,
							"name": "BUBBLING_PHASE",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4907,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.BUBBLING_PHASE"
							}
						},
						{
							"id": 246,
							"name": "CAPTURING_PHASE",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4908,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.CAPTURING_PHASE"
							}
						},
						{
							"id": 267,
							"name": "DOM_KEY_LOCATION_LEFT",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8752,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.DOM_KEY_LOCATION_LEFT"
							}
						},
						{
							"id": 268,
							"name": "DOM_KEY_LOCATION_NUMPAD",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8753,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.DOM_KEY_LOCATION_NUMPAD"
							}
						},
						{
							"id": 269,
							"name": "DOM_KEY_LOCATION_RIGHT",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8754,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.DOM_KEY_LOCATION_RIGHT"
							}
						},
						{
							"id": 270,
							"name": "DOM_KEY_LOCATION_STANDARD",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8755,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.DOM_KEY_LOCATION_STANDARD"
							}
						},
						{
							"id": 247,
							"name": "NONE",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4909,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.NONE"
							}
						},
						{
							"id": 169,
							"name": "altKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9418,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.altKey"
							}
						},
						{
							"id": 218,
							"name": "bubbles",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4872,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.bubbles"
							}
						},
						{
							"id": 170,
							"name": "button",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9419,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.button"
							}
						},
						{
							"id": 171,
							"name": "buttons",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9420,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.buttons"
							}
						},
						{
							"id": 219,
							"name": "cancelBubble",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4873,
									"character": 4
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.cancelBubble"
							}
						},
						{
							"id": 220,
							"name": "cancelable",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4875,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.cancelable"
							}
						},
						{
							"id": 248,
							"name": "charCode",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8738,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.charCode"
							}
						},
						{
							"id": 172,
							"name": "clientX",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9421,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.clientX"
							}
						},
						{
							"id": 173,
							"name": "clientY",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9422,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.clientY"
							}
						},
						{
							"id": 249,
							"name": "code",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8739,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.code"
							}
						},
						{
							"id": 221,
							"name": "composed",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4877,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.composed"
							}
						},
						{
							"id": 174,
							"name": "ctrlKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9423,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.ctrlKey"
							}
						},
						{
							"id": 222,
							"name": "currentTarget",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the object whose event listener's callback is currently being invoked."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4879,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "EventTarget"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.currentTarget"
							}
						},
						{
							"id": 223,
							"name": "defaultPrevented",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4881,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.defaultPrevented"
							}
						},
						{
							"id": 208,
							"name": "detail",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 13834,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.detail"
							}
						},
						{
							"id": 224,
							"name": "eventPhase",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4883,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.eventPhase"
							}
						},
						{
							"id": 168,
							"name": "eventTarget",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 35,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"name": "HTMLElement"
							}
						},
						{
							"id": 250,
							"name": "isComposing",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8741,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.isComposing"
							}
						},
						{
							"id": 225,
							"name": "isTrusted",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true if event was dispatched by the user agent, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4885,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.isTrusted"
							}
						},
						{
							"id": 251,
							"name": "key",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8742,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.key"
							}
						},
						{
							"id": 252,
							"name": "keyCode",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8744,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.keyCode"
							}
						},
						{
							"id": 253,
							"name": "location",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8745,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.location"
							}
						},
						{
							"id": 175,
							"name": "metaKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9424,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.metaKey"
							}
						},
						{
							"id": 176,
							"name": "movementX",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9425,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.movementX"
							}
						},
						{
							"id": 177,
							"name": "movementY",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9426,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.movementY"
							}
						},
						{
							"id": 178,
							"name": "offsetX",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9427,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.offsetX"
							}
						},
						{
							"id": 179,
							"name": "offsetY",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9428,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.offsetY"
							}
						},
						{
							"id": 180,
							"name": "pageX",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9429,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.pageX"
							}
						},
						{
							"id": 181,
							"name": "pageY",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9430,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.pageY"
							}
						},
						{
							"id": 164,
							"name": "params",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 32,
									"character": 8
								}
							],
							"type": {
								"type": "reflection",
								"declaration": {
									"id": 165,
									"name": "__type",
									"kind": 65536,
									"kindString": "Type literal",
									"flags": {},
									"indexSignature": {
										"id": 166,
										"name": "__index",
										"kind": 8192,
										"kindString": "Index signature",
										"flags": {},
										"parameters": [
											{
												"id": 167,
												"name": "key",
												"kind": 32768,
												"flags": {},
												"type": {
													"type": "intrinsic",
													"name": "string"
												}
											}
										],
										"type": {
											"type": "intrinsic",
											"name": "any"
										}
									}
								}
							}
						},
						{
							"id": 182,
							"name": "relatedTarget",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9431,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "EventTarget"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.relatedTarget"
							}
						},
						{
							"id": 254,
							"name": "repeat",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 8747,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.repeat"
							}
						},
						{
							"id": 226,
							"name": "returnValue",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4887,
									"character": 4
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.returnValue"
							}
						},
						{
							"id": 183,
							"name": "screenX",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9432,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.screenX"
							}
						},
						{
							"id": 184,
							"name": "screenY",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9433,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.screenY"
							}
						},
						{
							"id": 185,
							"name": "shiftKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9434,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.shiftKey"
							}
						},
						{
							"id": 227,
							"name": "srcElement",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4889,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "EventTarget"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.srcElement"
							}
						},
						{
							"id": 228,
							"name": "target",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the object to which event is dispatched (its target)."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4891,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "EventTarget"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.target"
							}
						},
						{
							"id": 229,
							"name": "timeStamp",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the event's timestamp as the number of milliseconds measured relative to the time origin."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4893,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.timeStamp"
							}
						},
						{
							"id": 230,
							"name": "type",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the type of event, e.g. \"click\", \"hashchange\", or \"submit\"."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4895,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.type"
							}
						},
						{
							"id": 209,
							"name": "view",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 13835,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "Window"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.view"
							}
						},
						{
							"id": 210,
							"name": "which",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 13837,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.which"
							}
						},
						{
							"id": 186,
							"name": "x",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9435,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.x"
							}
						},
						{
							"id": 187,
							"name": "y",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9436,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.y"
							}
						},
						{
							"id": 231,
							"name": "composedPath",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 232,
									"name": "composedPath",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is \"closed\" that are not reachable from event's currentTarget."
									},
									"type": {
										"type": "array",
										"elementType": {
											"type": "reference",
											"name": "EventTarget"
										}
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.composedPath"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.composedPath"
							}
						},
						{
							"id": 188,
							"name": "getModifierState",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 189,
									"name": "getModifierState",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"parameters": [
										{
											"id": 190,
											"name": "keyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.getModifierState"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.getModifierState"
							}
						},
						{
							"id": 233,
							"name": "initEvent",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 234,
									"name": "initEvent",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"tags": [
											{
												"tag": "deprecated",
												"text": ""
											}
										]
									},
									"parameters": [
										{
											"id": 235,
											"name": "type",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 236,
											"name": "bubbles",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 237,
											"name": "cancelable",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.initEvent"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.initEvent"
							}
						},
						{
							"id": 255,
							"name": "initKeyboardEvent",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 256,
									"name": "initKeyboardEvent",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"tags": [
											{
												"tag": "deprecated",
												"text": ""
											}
										]
									},
									"parameters": [
										{
											"id": 257,
											"name": "typeArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 258,
											"name": "bubblesArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 259,
											"name": "cancelableArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 260,
											"name": "viewArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "reference",
												"name": "Window"
											}
										},
										{
											"id": 261,
											"name": "keyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 262,
											"name": "locationArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 263,
											"name": "ctrlKey",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 264,
											"name": "altKey",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 265,
											"name": "shiftKey",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 266,
											"name": "metaKey",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "KeyboardEvent.initKeyboardEvent"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "KeyboardEvent.initKeyboardEvent"
							}
						},
						{
							"id": 191,
							"name": "initMouseEvent",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 192,
									"name": "initMouseEvent",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"tags": [
											{
												"tag": "deprecated",
												"text": ""
											}
										]
									},
									"parameters": [
										{
											"id": 193,
											"name": "typeArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 194,
											"name": "canBubbleArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 195,
											"name": "cancelableArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 196,
											"name": "viewArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "reference",
												"name": "Window"
											}
										},
										{
											"id": 197,
											"name": "detailArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 198,
											"name": "screenXArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 199,
											"name": "screenYArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 200,
											"name": "clientXArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 201,
											"name": "clientYArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 202,
											"name": "ctrlKeyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 203,
											"name": "altKeyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 204,
											"name": "shiftKeyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 205,
											"name": "metaKeyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 206,
											"name": "buttonArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 207,
											"name": "relatedTargetArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "reference",
												"name": "EventTarget"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.initMouseEvent"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.initMouseEvent"
							}
						},
						{
							"id": 211,
							"name": "initUIEvent",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 212,
									"name": "initUIEvent",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"tags": [
											{
												"tag": "deprecated",
												"text": ""
											}
										]
									},
									"parameters": [
										{
											"id": 213,
											"name": "typeArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 214,
											"name": "bubblesArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 215,
											"name": "cancelableArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 216,
											"name": "viewArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "reference",
												"name": "Window"
											}
										},
										{
											"id": 217,
											"name": "detailArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.initUIEvent"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.initUIEvent"
							}
						},
						{
							"id": 238,
							"name": "preventDefault",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 239,
									"name": "preventDefault",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled."
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.preventDefault"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.preventDefault"
							}
						},
						{
							"id": 240,
							"name": "stopImmediatePropagation",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 241,
									"name": "stopImmediatePropagation",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects."
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.stopImmediatePropagation"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.stopImmediatePropagation"
							}
						},
						{
							"id": 242,
							"name": "stopPropagation",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 243,
									"name": "stopPropagation",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object."
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.stopPropagation"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.stopPropagation"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								244,
								245,
								246,
								267,
								268,
								269,
								270,
								247,
								169,
								218,
								170,
								171,
								219,
								220,
								248,
								172,
								173,
								249,
								221,
								174,
								222,
								223,
								208,
								224,
								168,
								250,
								225,
								251,
								252,
								253,
								175,
								176,
								177,
								178,
								179,
								180,
								181,
								164,
								182,
								254,
								226,
								183,
								184,
								185,
								227,
								228,
								229,
								230,
								209,
								210,
								186,
								187
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								231,
								188,
								233,
								255,
								191,
								211,
								238,
								240,
								242
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 31,
							"character": 14
						}
					],
					"extendedTypes": [
						{
							"type": "reference",
							"name": "MouseEvent"
						},
						{
							"type": "reference",
							"name": "KeyboardEvent"
						}
					]
				},
				{
					"id": 2,
					"name": "MagixMouseEvent",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "鼠标事件"
					},
					"children": [
						{
							"id": 83,
							"name": "AT_TARGET",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4906,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.AT_TARGET"
							}
						},
						{
							"id": 84,
							"name": "BUBBLING_PHASE",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4907,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.BUBBLING_PHASE"
							}
						},
						{
							"id": 85,
							"name": "CAPTURING_PHASE",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4908,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.CAPTURING_PHASE"
							}
						},
						{
							"id": 86,
							"name": "NONE",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4909,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.NONE"
							}
						},
						{
							"id": 8,
							"name": "altKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9418,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.altKey"
							}
						},
						{
							"id": 57,
							"name": "bubbles",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4872,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.bubbles"
							}
						},
						{
							"id": 9,
							"name": "button",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9419,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.button"
							}
						},
						{
							"id": 10,
							"name": "buttons",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9420,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.buttons"
							}
						},
						{
							"id": 58,
							"name": "cancelBubble",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4873,
									"character": 4
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.cancelBubble"
							}
						},
						{
							"id": 59,
							"name": "cancelable",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4875,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.cancelable"
							}
						},
						{
							"id": 11,
							"name": "clientX",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9421,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.clientX"
							}
						},
						{
							"id": 12,
							"name": "clientY",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9422,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.clientY"
							}
						},
						{
							"id": 60,
							"name": "composed",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4877,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.composed"
							}
						},
						{
							"id": 13,
							"name": "ctrlKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9423,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.ctrlKey"
							}
						},
						{
							"id": 61,
							"name": "currentTarget",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the object whose event listener's callback is currently being invoked."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4879,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "EventTarget"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.currentTarget"
							}
						},
						{
							"id": 62,
							"name": "defaultPrevented",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4881,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.defaultPrevented"
							}
						},
						{
							"id": 47,
							"name": "detail",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 13834,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.detail"
							}
						},
						{
							"id": 63,
							"name": "eventPhase",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4883,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.eventPhase"
							}
						},
						{
							"id": 7,
							"name": "eventTarget",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 17,
									"character": 8
								}
							],
							"type": {
								"type": "reference",
								"name": "HTMLElement"
							}
						},
						{
							"id": 64,
							"name": "isTrusted",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns true if event was dispatched by the user agent, and false otherwise."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4885,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.isTrusted"
							}
						},
						{
							"id": 14,
							"name": "metaKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9424,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.metaKey"
							}
						},
						{
							"id": 15,
							"name": "movementX",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9425,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.movementX"
							}
						},
						{
							"id": 16,
							"name": "movementY",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9426,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.movementY"
							}
						},
						{
							"id": 17,
							"name": "offsetX",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9427,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.offsetX"
							}
						},
						{
							"id": 18,
							"name": "offsetY",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9428,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.offsetY"
							}
						},
						{
							"id": 19,
							"name": "pageX",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9429,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.pageX"
							}
						},
						{
							"id": 20,
							"name": "pageY",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9430,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.pageY"
							}
						},
						{
							"id": 3,
							"name": "params",
							"kind": 1024,
							"kindString": "Property",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 14,
									"character": 8
								}
							],
							"type": {
								"type": "reflection",
								"declaration": {
									"id": 4,
									"name": "__type",
									"kind": 65536,
									"kindString": "Type literal",
									"flags": {},
									"indexSignature": {
										"id": 5,
										"name": "__index",
										"kind": 8192,
										"kindString": "Index signature",
										"flags": {},
										"parameters": [
											{
												"id": 6,
												"name": "key",
												"kind": 32768,
												"flags": {},
												"type": {
													"type": "intrinsic",
													"name": "string"
												}
											}
										],
										"type": {
											"type": "intrinsic",
											"name": "any"
										}
									}
								}
							}
						},
						{
							"id": 21,
							"name": "relatedTarget",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9431,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "EventTarget"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.relatedTarget"
							}
						},
						{
							"id": 65,
							"name": "returnValue",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4887,
									"character": 4
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.returnValue"
							}
						},
						{
							"id": 22,
							"name": "screenX",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9432,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.screenX"
							}
						},
						{
							"id": 23,
							"name": "screenY",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9433,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.screenY"
							}
						},
						{
							"id": 24,
							"name": "shiftKey",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9434,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.shiftKey"
							}
						},
						{
							"id": 66,
							"name": "srcElement",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4889,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "EventTarget"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.srcElement"
							}
						},
						{
							"id": 67,
							"name": "target",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the object to which event is dispatched (its target)."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4891,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "EventTarget"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.target"
							}
						},
						{
							"id": 68,
							"name": "timeStamp",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the event's timestamp as the number of milliseconds measured relative to the time origin."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4893,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.timeStamp"
							}
						},
						{
							"id": 69,
							"name": "type",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "Returns the type of event, e.g. \"click\", \"hashchange\", or \"submit\"."
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 4895,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.type"
							}
						},
						{
							"id": 48,
							"name": "view",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 13835,
									"character": 13
								}
							],
							"type": {
								"type": "reference",
								"name": "Window"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.view"
							}
						},
						{
							"id": 49,
							"name": "which",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"comment": {
								"tags": [
									{
										"tag": "deprecated",
										"text": ""
									}
								]
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 13837,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.which"
							}
						},
						{
							"id": 25,
							"name": "x",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9435,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.x"
							}
						},
						{
							"id": 26,
							"name": "y",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isExternal": true,
								"isReadonly": true
							},
							"sources": [
								{
									"fileName": "../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts",
									"line": 9436,
									"character": 13
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							},
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.y"
							}
						},
						{
							"id": 70,
							"name": "composedPath",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 71,
									"name": "composedPath",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is \"closed\" that are not reachable from event's currentTarget."
									},
									"type": {
										"type": "array",
										"elementType": {
											"type": "reference",
											"name": "EventTarget"
										}
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.composedPath"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.composedPath"
							}
						},
						{
							"id": 27,
							"name": "getModifierState",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 28,
									"name": "getModifierState",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"parameters": [
										{
											"id": 29,
											"name": "keyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.getModifierState"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.getModifierState"
							}
						},
						{
							"id": 72,
							"name": "initEvent",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 73,
									"name": "initEvent",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"tags": [
											{
												"tag": "deprecated",
												"text": ""
											}
										]
									},
									"parameters": [
										{
											"id": 74,
											"name": "type",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 75,
											"name": "bubbles",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 76,
											"name": "cancelable",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.initEvent"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.initEvent"
							}
						},
						{
							"id": 30,
							"name": "initMouseEvent",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 31,
									"name": "initMouseEvent",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"tags": [
											{
												"tag": "deprecated",
												"text": ""
											}
										]
									},
									"parameters": [
										{
											"id": 32,
											"name": "typeArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 33,
											"name": "canBubbleArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 34,
											"name": "cancelableArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 35,
											"name": "viewArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "reference",
												"name": "Window"
											}
										},
										{
											"id": 36,
											"name": "detailArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 37,
											"name": "screenXArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 38,
											"name": "screenYArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 39,
											"name": "clientXArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 40,
											"name": "clientYArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 41,
											"name": "ctrlKeyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 42,
											"name": "altKeyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 43,
											"name": "shiftKeyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 44,
											"name": "metaKeyArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 45,
											"name": "buttonArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 46,
											"name": "relatedTargetArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "reference",
												"name": "EventTarget"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.initMouseEvent"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.initMouseEvent"
							}
						},
						{
							"id": 50,
							"name": "initUIEvent",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 51,
									"name": "initUIEvent",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"tags": [
											{
												"tag": "deprecated",
												"text": ""
											}
										]
									},
									"parameters": [
										{
											"id": 52,
											"name": "typeArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 53,
											"name": "bubblesArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 54,
											"name": "cancelableArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 55,
											"name": "viewArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "reference",
												"name": "Window"
											}
										},
										{
											"id": 56,
											"name": "detailArg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isExternal": true,
												"isOptional": true
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.initUIEvent"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.initUIEvent"
							}
						},
						{
							"id": 77,
							"name": "preventDefault",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 78,
									"name": "preventDefault",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled."
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.preventDefault"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.preventDefault"
							}
						},
						{
							"id": 79,
							"name": "stopImmediatePropagation",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 80,
									"name": "stopImmediatePropagation",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects."
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.stopImmediatePropagation"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.stopImmediatePropagation"
							}
						},
						{
							"id": 81,
							"name": "stopPropagation",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isExternal": true
							},
							"signatures": [
								{
									"id": 82,
									"name": "stopPropagation",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {
										"isExternal": true
									},
									"comment": {
										"shortText": "When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object."
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "MouseEvent.stopPropagation"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "MouseEvent.stopPropagation"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								83,
								84,
								85,
								86,
								8,
								57,
								9,
								10,
								58,
								59,
								11,
								12,
								60,
								13,
								61,
								62,
								47,
								63,
								7,
								64,
								14,
								15,
								16,
								17,
								18,
								19,
								20,
								3,
								21,
								65,
								22,
								23,
								24,
								66,
								67,
								68,
								69,
								48,
								49,
								25,
								26
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								70,
								27,
								72,
								30,
								50,
								77,
								79,
								81
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 13,
							"character": 14
						}
					],
					"extendedTypes": [
						{
							"type": "reference",
							"name": "MouseEvent"
						}
					]
				},
				{
					"id": 444,
					"name": "Router",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "路由对象接口"
					},
					"children": [
						{
							"id": 448,
							"name": "diff",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 449,
									"name": "diff",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "当前地址栏中的地址与上一个地址栏中的地址差异对象"
									},
									"type": {
										"type": "reference",
										"id": 350,
										"name": "RouterDiff"
									}
								}
							]
						},
						{
							"id": 482,
							"name": "fire",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 483,
									"name": "fire",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "派发事件",
										"returns": "返回事件对象\n"
									},
									"typeParameter": [
										{
											"id": 484,
											"name": "D",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 485,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 486,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件参数"
											},
											"type": {
												"type": "reference",
												"name": "D"
											}
										}
									],
									"type": {
										"type": "intersection",
										"types": [
											{
												"type": "reference",
												"id": 431,
												"name": "TriggerEventDescriptor"
											},
											{
												"type": "reference",
												"name": "D"
											}
										]
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 385,
										"name": "Event.fire"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 384,
								"name": "Event.fire"
							}
						},
						{
							"id": 475,
							"name": "off",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 476,
									"name": "off",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "解除事件绑定"
									},
									"parameters": [
										{
											"id": 477,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 478,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件处理函数\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 479,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 480,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 481,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intrinsic",
																		"name": "any"
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 378,
										"name": "Event.off"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 377,
								"name": "Event.off"
							}
						},
						{
							"id": 467,
							"name": "on",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 468,
									"name": "on",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "绑定事件"
									},
									"parameters": [
										{
											"id": 469,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 470,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件处理函数"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 471,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 472,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 473,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intrinsic",
																		"name": "any"
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 474,
											"name": "priority",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "优先级\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 370,
										"name": "Event.on"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 369,
								"name": "Event.on"
							}
						},
						{
							"id": 461,
							"name": "onchange",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 448,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 462,
									"name": "onchange",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "url即将改变时发生"
									},
									"parameters": [
										{
											"id": 463,
											"name": "e",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"type": {
												"type": "reference",
												"id": 433,
												"name": "RouterChangeEvent"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 464,
							"name": "onchanged",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 452,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 465,
									"name": "onchanged",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "url改变后发生"
									},
									"parameters": [
										{
											"id": 466,
											"name": "e",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"type": {
												"type": "intersection",
												"types": [
													{
														"type": "reference",
														"id": 350,
														"name": "RouterDiff"
													},
													{
														"type": "reference",
														"id": 431,
														"name": "TriggerEventDescriptor"
													}
												]
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 445,
							"name": "parse",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 446,
									"name": "parse",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "解析href的query和hash，默认href为location.href"
									},
									"parameters": [
										{
											"id": 447,
											"name": "url",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "待解析的url，如果未指定则使用location.href\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 335,
										"name": "RouterParse"
									}
								}
							]
						},
						{
							"id": 450,
							"name": "to",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 451,
									"name": "to",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "导航到新的地址"
									},
									"parameters": [
										{
											"id": 452,
											"name": "path",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "路径字符串"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 453,
											"name": "params",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "参数对象"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										},
										{
											"id": 454,
											"name": "replace",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "是否替换当前的历史记录"
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 455,
											"name": "silent",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "是否是静默更新，不触发change事件\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								},
								{
									"id": 456,
									"name": "to",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "导航到新的地址"
									},
									"parameters": [
										{
											"id": 457,
											"name": "params",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "参数对象"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										},
										{
											"id": 458,
											"name": "empty",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "如果params为对象，则该参数为占位使用，可传任意空值，如null等"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										},
										{
											"id": 459,
											"name": "replace",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "是否替换当前的历史记录"
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 460,
											"name": "silent",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "是否是静默更新，不触发change事件\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								448,
								482,
								475,
								467,
								461,
								464,
								445,
								450
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 407,
							"character": 14
						}
					],
					"extendedTypes": [
						{
							"type": "reference",
							"id": 368,
							"typeArguments": [
								{
									"type": "reference",
									"id": 444,
									"name": "Router"
								}
							],
							"name": "Event"
						}
					]
				},
				{
					"id": 433,
					"name": "RouterChangeEvent",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "路由变化事件接口"
					},
					"children": [
						{
							"id": 440,
							"name": "type",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "事件类型"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 370,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							},
							"inheritedFrom": {
								"type": "reference",
								"id": 432,
								"name": "TriggerEventDescriptor.type"
							}
						},
						{
							"id": 434,
							"name": "reject",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 379,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 435,
									"name": "reject",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "拒绝url改变"
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 436,
							"name": "resolve",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 384,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 437,
									"name": "resolve",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "接受url改变"
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 438,
							"name": "stop",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 389,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 439,
									"name": "stop",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "阻止url改变"
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								440
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								434,
								436,
								438
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 375,
							"character": 14
						}
					],
					"extendedTypes": [
						{
							"type": "reference",
							"id": 431,
							"name": "TriggerEventDescriptor"
						}
					]
				},
				{
					"id": 350,
					"name": "RouterDiff",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "url差异对象接口"
					},
					"children": [
						{
							"id": 351,
							"name": "force",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "是否为应用首次初始化时强制触发的差异比较"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 237,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							}
						},
						{
							"id": 354,
							"name": "params",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "都有哪些参数发生变化的对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 251,
									"character": 17
								}
							],
							"type": {
								"type": "reflection",
								"declaration": {
									"id": 355,
									"name": "__type",
									"kind": 65536,
									"kindString": "Type literal",
									"flags": {},
									"indexSignature": {
										"id": 356,
										"name": "__index",
										"kind": 8192,
										"kindString": "Index signature",
										"flags": {},
										"parameters": [
											{
												"id": 357,
												"name": "key",
												"kind": 32768,
												"flags": {},
												"type": {
													"type": "intrinsic",
													"name": "string"
												}
											}
										],
										"type": {
											"type": "reference",
											"id": 347,
											"name": "RouterDiffItem"
										}
									}
								}
							}
						},
						{
							"id": 352,
							"name": "path",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "当路径有变化时，才有path这个对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 241,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"id": 347,
								"name": "RouterDiffItem"
							}
						},
						{
							"id": 353,
							"name": "view",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true,
								"isReadonly": true
							},
							"comment": {
								"shortText": "当渲染的根view有变化时，才有view这个对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 246,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"id": 347,
								"name": "RouterDiffItem"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								351,
								354,
								352,
								353
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 233,
							"character": 14
						}
					]
				},
				{
					"id": 347,
					"name": "RouterDiffItem",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "差异对象接口"
					},
					"children": [
						{
							"id": 348,
							"name": "from",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "旧值"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 223,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 349,
							"name": "to",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "新值"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 228,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								348,
								349
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 219,
							"character": 14
						}
					]
				},
				{
					"id": 335,
					"name": "RouterParse",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "url解析接口"
					},
					"children": [
						{
							"id": 340,
							"name": "hash",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "srcHash解析出的对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 198,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"id": 329,
								"name": "RouterParseParts"
							}
						},
						{
							"id": 336,
							"name": "href",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "原始的href"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 178,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 341,
							"name": "params",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "query中的params与hash中的params对象合并出来的新对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 202,
									"character": 17
								}
							],
							"type": {
								"type": "reflection",
								"declaration": {
									"id": 342,
									"name": "__type",
									"kind": 65536,
									"kindString": "Type literal",
									"flags": {},
									"indexSignature": {
										"id": 343,
										"name": "__index",
										"kind": 8192,
										"kindString": "Index signature",
										"flags": {},
										"parameters": [
											{
												"id": 344,
												"name": "key",
												"kind": 32768,
												"flags": {},
												"type": {
													"type": "intrinsic",
													"name": "string"
												}
											}
										],
										"type": {
											"type": "intrinsic",
											"name": "string"
										}
									}
								}
							}
						},
						{
							"id": 345,
							"name": "path",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "根据hash对象中的path和query对象中的path，再根据要求得出的path"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 209,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 339,
							"name": "query",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "srcQuery解析出的对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 193,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"id": 329,
								"name": "RouterParseParts"
							}
						},
						{
							"id": 338,
							"name": "srcHash",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "原始的hash"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 188,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 337,
							"name": "srcQuery",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "原始的query"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 183,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 346,
							"name": "view",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "当前url对应的要渲染的根view"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 214,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								340,
								336,
								341,
								345,
								339,
								338,
								337,
								346
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 174,
							"character": 14
						}
					]
				},
				{
					"id": 329,
					"name": "RouterParseParts",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "url解析部分对象接口"
					},
					"children": [
						{
							"id": 330,
							"name": "params",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "参数对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 163,
									"character": 17
								}
							],
							"type": {
								"type": "reflection",
								"declaration": {
									"id": 331,
									"name": "__type",
									"kind": 65536,
									"kindString": "Type literal",
									"flags": {},
									"indexSignature": {
										"id": 332,
										"name": "__index",
										"kind": 8192,
										"kindString": "Index signature",
										"flags": {},
										"parameters": [
											{
												"id": 333,
												"name": "key",
												"kind": 32768,
												"flags": {},
												"type": {
													"type": "intrinsic",
													"name": "string"
												}
											}
										],
										"type": {
											"type": "intrinsic",
											"name": "string"
										}
									}
								}
							}
						},
						{
							"id": 334,
							"name": "path",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "路径字符串"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 169,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								330,
								334
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 159,
							"character": 14
						}
					]
				},
				{
					"id": 272,
					"name": "RoutesConfig",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "路由配置对象"
					},
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 44,
							"character": 14
						}
					],
					"indexSignature": {
						"id": 273,
						"name": "__index",
						"kind": 8192,
						"kindString": "Index signature",
						"flags": {},
						"parameters": [
							{
								"id": 274,
								"name": "key",
								"kind": 32768,
								"flags": {},
								"type": {
									"type": "intrinsic",
									"name": "string"
								}
							}
						],
						"type": {
							"type": "union",
							"types": [
								{
									"type": "intrinsic",
									"name": "string"
								},
								{
									"type": "reflection",
									"declaration": {
										"id": 275,
										"name": "__type",
										"kind": 65536,
										"kindString": "Type literal",
										"flags": {},
										"children": [
											{
												"id": 276,
												"name": "title",
												"kind": 1024,
												"kindString": "Property",
												"flags": {},
												"comment": {
													"shortText": "浏览器标题"
												},
												"sources": [
													{
														"fileName": "types/magix.d.ts",
														"line": 51,
														"character": 18
													}
												],
												"type": {
													"type": "intrinsic",
													"name": "string"
												}
											},
											{
												"id": 277,
												"name": "view",
												"kind": 1024,
												"kindString": "Property",
												"flags": {},
												"comment": {
													"shortText": "加载的view"
												},
												"sources": [
													{
														"fileName": "types/magix.d.ts",
														"line": 55,
														"character": 18
													}
												],
												"type": {
													"type": "intrinsic",
													"name": "string"
												}
											}
										],
										"groups": [
											{
												"title": "Properties",
												"kind": 1024,
												"children": [
													276,
													277
												]
											}
										],
										"sources": [
											{
												"fileName": "types/magix.d.ts",
												"line": 47,
												"character": 14
											}
										]
									}
								}
							]
						}
					}
				},
				{
					"id": 717,
					"name": "Service",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "接口管理类原型"
					},
					"children": [
						{
							"id": 718,
							"name": "all",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 719,
									"name": "all",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "所有请求完成回调done"
									},
									"parameters": [
										{
											"id": 720,
											"name": "metas",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "接口名称或对象数组"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "array",
														"elementType": {
															"type": "intrinsic",
															"name": "string"
														}
													},
													{
														"type": "reference",
														"id": 419,
														"name": "ServiceInterfaceMeta"
													},
													{
														"type": "array",
														"elementType": {
															"type": "reference",
															"id": 419,
															"name": "ServiceInterfaceMeta"
														}
													}
												]
											}
										},
										{
											"id": 721,
											"name": "done",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "全部接口成功时回调\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 722,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 723,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 724,
																	"name": "err",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {},
																	"type": {
																		"type": "intrinsic",
																		"name": "any"
																	}
																},
																{
																	"id": 725,
																	"name": "bags",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isRest": true
																	},
																	"type": {
																		"type": "array",
																		"elementType": {
																			"type": "reference",
																			"id": 358,
																			"name": "Bag"
																		}
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 717,
										"name": "Service"
									}
								}
							]
						},
						{
							"id": 748,
							"name": "dequeue",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 749,
									"name": "dequeue",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "开始处理队列中的下一个任务"
									},
									"parameters": [
										{
											"id": 750,
											"name": "args",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isRest": true
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "intrinsic",
													"name": "any"
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 751,
							"name": "destroy",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 752,
									"name": "destroy",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "销毁当前请求，不可以继续发起新请求，而且不再调用相应的回调"
									},
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 742,
							"name": "enqueue",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 743,
									"name": "enqueue",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "排队，前一个all,one或save任务做完后的下一个任务，类似promise"
									},
									"parameters": [
										{
											"id": 744,
											"name": "callback",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "当前面的任务完成后调用该回调\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 745,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 746,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 747,
																	"name": "args",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isRest": true
																	},
																	"type": {
																		"type": "array",
																		"elementType": {
																			"type": "intrinsic",
																			"name": "any"
																		}
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 717,
										"name": "Service"
									}
								}
							]
						},
						{
							"id": 734,
							"name": "one",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 735,
									"name": "one",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "任意一个成功均立即回调，回调会被调用多次"
									},
									"parameters": [
										{
											"id": 736,
											"name": "metas",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "接口名称或对象数组"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "array",
														"elementType": {
															"type": "intrinsic",
															"name": "string"
														}
													},
													{
														"type": "reference",
														"id": 419,
														"name": "ServiceInterfaceMeta"
													},
													{
														"type": "array",
														"elementType": {
															"type": "reference",
															"id": 419,
															"name": "ServiceInterfaceMeta"
														}
													}
												]
											}
										},
										{
											"id": 737,
											"name": "done",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "全部接口成功时回调\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 738,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 739,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 740,
																	"name": "err",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {},
																	"type": {
																		"type": "intrinsic",
																		"name": "any"
																	}
																},
																{
																	"id": 741,
																	"name": "bags",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isRest": true
																	},
																	"type": {
																		"type": "array",
																		"elementType": {
																			"type": "reference",
																			"id": 358,
																			"name": "Bag"
																		}
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 717,
										"name": "Service"
									}
								}
							]
						},
						{
							"id": 726,
							"name": "save",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 727,
									"name": "save",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "所有请求完成回调done，与all不同的是：如果接口指定了缓存，all会走缓存，而save则不会"
									},
									"parameters": [
										{
											"id": 728,
											"name": "metas",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "接口名称或对象数组"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "array",
														"elementType": {
															"type": "intrinsic",
															"name": "string"
														}
													},
													{
														"type": "reference",
														"id": 419,
														"name": "ServiceInterfaceMeta"
													},
													{
														"type": "array",
														"elementType": {
															"type": "reference",
															"id": 419,
															"name": "ServiceInterfaceMeta"
														}
													}
												]
											}
										},
										{
											"id": 729,
											"name": "done",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "全部接口成功时回调\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 730,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 731,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 732,
																	"name": "err",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {},
																	"type": {
																		"type": "intrinsic",
																		"name": "any"
																	}
																},
																{
																	"id": 733,
																	"name": "bags",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isRest": true
																	},
																	"type": {
																		"type": "array",
																		"elementType": {
																			"type": "reference",
																			"id": 358,
																			"name": "Bag"
																		}
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 717,
										"name": "Service"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								718,
								748,
								751,
								742,
								734,
								726
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 842,
							"character": 14
						}
					]
				},
				{
					"id": 753,
					"name": "ServiceConstructor",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "接口管理类"
					},
					"children": [
						{
							"id": 812,
							"name": "constructor",
							"kind": 512,
							"kindString": "Constructor",
							"flags": {},
							"signatures": [
								{
									"id": 813,
									"name": "new ServiceConstructor",
									"kind": 16384,
									"kindString": "Constructor signature",
									"flags": {},
									"comment": {
										"shortText": "初始化"
									},
									"type": {
										"type": "reference",
										"id": 717,
										"name": "Service"
									},
									"inheritedFrom": {
										"type": "reference",
										"name": "Event<ServiceConstructor, ServiceEvent>.constructor"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"name": "Event<ServiceConstructor, ServiceEvent>.constructor"
							}
						},
						{
							"id": 791,
							"name": "prototype",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "原型"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 971,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"id": 717,
								"name": "Service"
							}
						},
						{
							"id": 766,
							"name": "add",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 767,
									"name": "add",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "添加接口元信息"
									},
									"parameters": [
										{
											"id": 768,
											"name": "metas",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "接口元信息数组\n"
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "reference",
													"id": 419,
													"name": "ServiceInterfaceMeta"
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 782,
							"name": "cached",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 783,
									"name": "cached",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "从缓存中获取bag对象"
									},
									"parameters": [
										{
											"id": 784,
											"name": "meta",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "接口元信息对象或名称字符串\n"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "reference",
														"id": 419,
														"name": "ServiceInterfaceMeta"
													}
												]
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 358,
										"name": "Bag"
									}
								}
							]
						},
						{
							"id": 779,
							"name": "clear",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 780,
									"name": "clear",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "从缓存中清除指定接口的数据"
									},
									"parameters": [
										{
											"id": 781,
											"name": "names",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "逗号分割的接口名称字符串或数组\n"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "array",
														"elementType": {
															"type": "intrinsic",
															"name": "string"
														}
													}
												]
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 769,
							"name": "create",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 770,
									"name": "create",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "根据接口元信息创建bag对象"
									},
									"parameters": [
										{
											"id": 771,
											"name": "meta",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "接口元信息对象或名称字符串\n"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "reference",
														"id": 419,
														"name": "ServiceInterfaceMeta"
													}
												]
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 358,
										"name": "Bag"
									}
								}
							]
						},
						{
							"id": 754,
							"name": "extend",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 755,
									"name": "extend",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "继承产生新的Service类"
									},
									"parameters": [
										{
											"id": 756,
											"name": "sync",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "同步数据的方法，通常在该方法内与服务端交换数据"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 757,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 758,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 759,
																	"name": "bag",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {},
																	"type": {
																		"type": "reference",
																		"id": 358,
																		"name": "Bag"
																	}
																},
																{
																	"id": 760,
																	"name": "callback",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {},
																	"type": {
																		"type": "reflection",
																		"declaration": {
																			"id": 761,
																			"name": "__type",
																			"kind": 65536,
																			"kindString": "Type literal",
																			"flags": {},
																			"signatures": [
																				{
																					"id": 762,
																					"name": "__type",
																					"kind": 4096,
																					"kindString": "Call signature",
																					"flags": {},
																					"parameters": [
																						{
																							"id": 763,
																							"name": "error",
																							"kind": 32768,
																							"kindString": "Parameter",
																							"flags": {
																								"isOptional": true
																							},
																							"type": {
																								"type": "union",
																								"types": [
																									{
																										"type": "intrinsic",
																										"name": "string"
																									},
																									{
																										"type": "intrinsic",
																										"name": "object"
																									}
																								]
																							}
																						}
																					],
																					"type": {
																						"type": "intrinsic",
																						"name": "void"
																					}
																				}
																			]
																		}
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 764,
											"name": "cacheMax",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "最大缓存数"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										},
										{
											"id": 765,
											"name": "cacheBuffer",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "缓存区数量\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 753,
										"name": "ServiceConstructor"
									}
								}
							]
						},
						{
							"id": 807,
							"name": "fire",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 808,
									"name": "fire",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "派发事件",
										"returns": "返回事件对象\n"
									},
									"typeParameter": [
										{
											"id": 809,
											"name": "D",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 810,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 811,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件参数"
											},
											"type": {
												"type": "reference",
												"name": "D"
											}
										}
									],
									"type": {
										"type": "intersection",
										"types": [
											{
												"type": "reference",
												"id": 431,
												"name": "TriggerEventDescriptor"
											},
											{
												"type": "reference",
												"name": "D"
											}
										]
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 385,
										"name": "Event.fire"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 384,
								"name": "Event.fire"
							}
						},
						{
							"id": 775,
							"name": "get",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 776,
									"name": "get",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "从缓存中获取或创建bag对象"
									},
									"parameters": [
										{
											"id": 777,
											"name": "meta",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "接口元信息对象或名称字符串"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "reference",
														"id": 419,
														"name": "ServiceInterfaceMeta"
													}
												]
											}
										},
										{
											"id": 778,
											"name": "create",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "是否是创建新的Bag对象，如果否，则尝试从缓存中获取\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 358,
										"name": "Bag"
									}
								}
							]
						},
						{
							"id": 772,
							"name": "meta",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 773,
									"name": "meta",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取元信息对象"
									},
									"parameters": [
										{
											"id": 774,
											"name": "meta",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "接口元信息对象或名称字符串\n"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "reference",
														"id": 419,
														"name": "ServiceInterfaceMeta"
													}
												]
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 419,
										"name": "ServiceInterfaceMeta"
									}
								}
							]
						},
						{
							"id": 800,
							"name": "off",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 801,
									"name": "off",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "解除事件绑定"
									},
									"parameters": [
										{
											"id": 802,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 803,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件处理函数\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 804,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 805,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 806,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intersection",
																		"types": [
																			{
																				"type": "reference",
																				"id": 431,
																				"name": "TriggerEventDescriptor"
																			},
																			{
																				"type": "reference",
																				"id": 487,
																				"name": "ServiceEvent"
																			}
																		]
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 378,
										"name": "Event.off"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 377,
								"name": "Event.off"
							}
						},
						{
							"id": 792,
							"name": "on",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 793,
									"name": "on",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "绑定事件"
									},
									"parameters": [
										{
											"id": 794,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 795,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件处理函数"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 796,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 797,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 798,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intersection",
																		"types": [
																			{
																				"type": "reference",
																				"id": 431,
																				"name": "TriggerEventDescriptor"
																			},
																			{
																				"type": "reference",
																				"id": 487,
																				"name": "ServiceEvent"
																			}
																		]
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 799,
											"name": "priority",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "优先级\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 370,
										"name": "Event.on"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 369,
								"name": "Event.on"
							}
						},
						{
							"id": 785,
							"name": "onbegin",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 958,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 786,
									"name": "onbegin",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "接口发送请求前触发"
									},
									"parameters": [
										{
											"id": 787,
											"name": "e",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"type": {
												"type": "reference",
												"id": 487,
												"name": "ServiceEvent"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 788,
							"name": "onend",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 963,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 789,
									"name": "onend",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "接口发送结束时触发，不管请求成功或失败"
									},
									"parameters": [
										{
											"id": 790,
											"name": "e",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"type": {
												"type": "reference",
												"id": 487,
												"name": "ServiceEvent"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Constructors",
							"kind": 512,
							"children": [
								812
							]
						},
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								791
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								766,
								782,
								779,
								769,
								754,
								807,
								775,
								772,
								800,
								792,
								785,
								788
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 901,
							"character": 14
						}
					],
					"extendedTypes": [
						{
							"type": "reference",
							"id": 368,
							"typeArguments": [
								{
									"type": "reference",
									"id": 753,
									"name": "ServiceConstructor"
								},
								{
									"type": "reference",
									"id": 487,
									"name": "ServiceEvent"
								}
							],
							"name": "Event"
						}
					]
				},
				{
					"id": 487,
					"name": "ServiceEvent",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "接口服务事件接口"
					},
					"children": [
						{
							"id": 488,
							"name": "bag",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "数据对象的载体"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 464,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"id": 358,
								"name": "Bag"
							}
						},
						{
							"id": 489,
							"name": "error",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "错误对象，如果有错误发生的话"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 468,
									"character": 17
								}
							],
							"type": {
								"type": "union",
								"types": [
									{
										"type": "intrinsic",
										"name": "string"
									},
									{
										"type": "intrinsic",
										"name": "object"
									}
								]
							}
						},
						{
							"id": 490,
							"name": "type",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "事件类型"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 370,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							},
							"inheritedFrom": {
								"type": "reference",
								"id": 432,
								"name": "TriggerEventDescriptor.type"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								488,
								489,
								490
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 460,
							"character": 14
						}
					],
					"extendedTypes": [
						{
							"type": "reference",
							"id": 431,
							"name": "TriggerEventDescriptor"
						}
					]
				},
				{
					"id": 419,
					"name": "ServiceInterfaceMeta",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "api注册信息接口"
					},
					"children": [
						{
							"id": 420,
							"name": "cache",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"shortText": "缓存时间，以毫秒为单位"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 341,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "number"
							}
						},
						{
							"id": 422,
							"name": "name",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"shortText": "添加的接口元信息名称，需要确保在一个Service中唯一"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 349,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 421,
							"name": "url",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"shortText": "请求的url地址"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 345,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 426,
							"name": "after",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isOptional": true
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 358,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 427,
									"name": "after",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "接口在成功请求后，在送到view毅调用该方法，可在该方法对数据进行加工处理"
									},
									"parameters": [
										{
											"id": 428,
											"name": "bag",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"type": {
												"type": "reference",
												"id": 358,
												"name": "Bag"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 423,
							"name": "before",
							"kind": 2048,
							"kindString": "Method",
							"flags": {
								"isOptional": true
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 353,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 424,
									"name": "before",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "接口在请求发送前调用，可以在该方法内对数据进行加工处理"
									},
									"parameters": [
										{
											"id": 425,
											"name": "bag",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"type": {
												"type": "reference",
												"id": 358,
												"name": "Bag"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								420,
								422,
								421
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								426,
								423
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 337,
							"character": 14
						}
					],
					"indexSignature": {
						"id": 429,
						"name": "__index",
						"kind": 8192,
						"kindString": "Index signature",
						"flags": {},
						"parameters": [
							{
								"id": 430,
								"name": "key",
								"kind": 32768,
								"flags": {},
								"type": {
									"type": "intrinsic",
									"name": "string"
								}
							}
						],
						"type": {
							"type": "intrinsic",
							"name": "any"
						}
					}
				},
				{
					"id": 391,
					"name": "State",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "状态接口"
					},
					"children": [
						{
							"id": 414,
							"name": "fire",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 415,
									"name": "fire",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "派发事件",
										"returns": "返回事件对象\n"
									},
									"typeParameter": [
										{
											"id": 416,
											"name": "D",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 417,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 418,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件参数"
											},
											"type": {
												"type": "reference",
												"name": "D"
											}
										}
									],
									"type": {
										"type": "intersection",
										"types": [
											{
												"type": "reference",
												"id": 431,
												"name": "TriggerEventDescriptor"
											},
											{
												"type": "reference",
												"name": "D"
											}
										]
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 385,
										"name": "Event.fire"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 384,
								"name": "Event.fire"
							}
						},
						{
							"id": 392,
							"name": "get",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 393,
									"name": "get",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "从状态对象中获取数据"
									},
									"typeParameter": [
										{
											"id": 394,
											"name": "TReturnType",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"default": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"parameters": [
										{
											"id": 395,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "数据key，如果未传递则返回整个状态对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "TReturnType"
									}
								}
							]
						},
						{
							"id": 407,
							"name": "off",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 408,
									"name": "off",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "解除事件绑定"
									},
									"parameters": [
										{
											"id": 409,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 410,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件处理函数\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 411,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 412,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 413,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intrinsic",
																		"name": "any"
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 378,
										"name": "Event.off"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 377,
								"name": "Event.off"
							}
						},
						{
							"id": 399,
							"name": "on",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 400,
									"name": "on",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "绑定事件"
									},
									"parameters": [
										{
											"id": 401,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 402,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件处理函数"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 403,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 404,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 405,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intrinsic",
																		"name": "any"
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 406,
											"name": "priority",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "优先级\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 370,
										"name": "Event.on"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 369,
								"name": "Event.on"
							}
						},
						{
							"id": 396,
							"name": "set",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 397,
									"name": "set",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "设置数据"
									},
									"parameters": [
										{
											"id": 398,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "数据对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 391,
										"name": "State"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								414,
								392,
								407,
								399,
								396
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 322,
							"character": 14
						}
					],
					"extendedTypes": [
						{
							"type": "reference",
							"id": 368,
							"typeArguments": [
								{
									"type": "reference",
									"id": 391,
									"name": "State"
								}
							],
							"name": "Event"
						}
					]
				},
				{
					"id": 431,
					"name": "TriggerEventDescriptor",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "基础触发事件接口"
					},
					"children": [
						{
							"id": 432,
							"name": "type",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "事件类型"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 370,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								432
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 366,
							"character": 14
						}
					],
					"extendedBy": [
						{
							"type": "reference",
							"id": 433,
							"name": "RouterChangeEvent"
						},
						{
							"type": "reference",
							"id": 487,
							"name": "ServiceEvent"
						},
						{
							"type": "reference",
							"id": 502,
							"name": "VframeStaticEvent"
						}
					]
				},
				{
					"id": 528,
					"name": "Vframe",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "Vframe类原型"
					},
					"children": [
						{
							"id": 529,
							"name": "id",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "当前vframe的唯一id"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 552,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 532,
							"name": "pId",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "父vframe id，如果没有则为undefined"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 565,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 531,
							"name": "path",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "渲染的view模块路径，如app/views/default"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 560,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 530,
							"name": "root",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "vframe所在的节点"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 556,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"name": "HTMLElement"
							}
						},
						{
							"id": 544,
							"name": "children",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 545,
									"name": "children",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取当前vframe的所有子vframe的id。返回数组中，id在数组中的位置并不固定"
									},
									"type": {
										"type": "array",
										"elementType": {
											"type": "intrinsic",
											"name": "string"
										}
									}
								}
							]
						},
						{
							"id": 546,
							"name": "descendants",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 547,
									"name": "descendants",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取后代vframe对象",
										"returns": "所有vframe集合\n"
									},
									"parameters": [
										{
											"id": 548,
											"name": "onlyChild",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "是否只获取直接子节点，默认false"
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "array",
										"elementType": {
											"type": "reference",
											"id": 528,
											"name": "Vframe"
										}
									}
								}
							]
						},
						{
							"id": 560,
							"name": "exit",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 561,
									"name": "exit",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "软退出当前vframe，如果子或孙view有调用observeExit且条件成立，则会触发相应的退出"
									},
									"parameters": [
										{
											"id": 562,
											"name": "resolve",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "子view确认退出时执行的回调"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 563,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 564,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 565,
											"name": "reject",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "子view拒绝退出时执行的回调"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 566,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 567,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 568,
											"name": "stop",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "通知外部应停止后续的代码调用\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 569,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 570,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "reference",
										"typeArguments": [
											{
												"type": "intrinsic",
												"name": "void"
											}
										],
										"name": "Promise"
									}
								}
							]
						},
						{
							"id": 552,
							"name": "invoke",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 553,
									"name": "invoke",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "调用vframe的view中的方法"
									},
									"typeParameter": [
										{
											"id": 554,
											"name": "TReturnType",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {}
										}
									],
									"parameters": [
										{
											"id": 555,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "方法名"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 556,
											"name": "args",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isRest": true
											},
											"comment": {
												"text": "传递的参数\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"type": {
										"type": "reference",
										"typeArguments": [
											{
												"type": "reference",
												"name": "TReturnType"
											}
										],
										"name": "Promise"
									}
								}
							]
						},
						{
							"id": 557,
							"name": "invokeCancel",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 558,
									"name": "invokeCancel",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "取消invoke中未执行的方法"
									},
									"parameters": [
										{
											"id": 559,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "方法名称\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 533,
							"name": "mount",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 534,
									"name": "mount",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "在某个dom节点上渲染vframe"
									},
									"parameters": [
										{
											"id": 535,
											"name": "node",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "要渲染的节点"
											},
											"type": {
												"type": "reference",
												"id": 271,
												"name": "HTMLElementOrEventTarget"
											}
										},
										{
											"id": 536,
											"name": "viewPath",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "view路径"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 537,
											"name": "viewInitParams",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "初始化view时传递的参数，可以在view的init方法中接收"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										},
										{
											"id": 538,
											"name": "deepDestroy",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "是否深度销毁子view，默认对于恢复后的内容会进行view渲染\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 528,
										"name": "Vframe"
									}
								}
							]
						},
						{
							"id": 549,
							"name": "parent",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 550,
									"name": "parent",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取祖先vframe"
									},
									"parameters": [
										{
											"id": 551,
											"name": "level",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "向上查找层级，默认1级，即父vframe\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 528,
										"name": "Vframe"
									}
								}
							]
						},
						{
							"id": 539,
							"name": "unmount",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 540,
									"name": "unmount",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "销毁dom节点上渲染的vframe"
									},
									"parameters": [
										{
											"id": 541,
											"name": "node",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "节点对象或vframe id，默认当前view"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "reference",
														"id": 271,
														"name": "HTMLElementOrEventTarget"
													}
												]
											}
										},
										{
											"id": 542,
											"name": "isVframeId",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "指示node是否为vframe id"
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										},
										{
											"id": 543,
											"name": "deepDestroy",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "是否深度销毁子view，默认对于恢复后的内容会进行view渲染\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								529,
								532,
								531,
								530
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								544,
								546,
								560,
								552,
								557,
								533,
								549,
								539
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 548,
							"character": 14
						}
					]
				},
				{
					"id": 571,
					"name": "VframeConstructor",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "Vframe类，开发者绝对不需要继承、实例化该类！"
					},
					"children": [
						{
							"id": 593,
							"name": "prototype",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "原型"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 703,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"id": 528,
								"name": "Vframe"
							}
						},
						{
							"id": 576,
							"name": "all",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 577,
									"name": "all",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取当前页面上所有的vframe"
									},
									"type": {
										"type": "reflection",
										"declaration": {
											"id": 578,
											"name": "__type",
											"kind": 65536,
											"kindString": "Type literal",
											"flags": {},
											"indexSignature": {
												"id": 579,
												"name": "__index",
												"kind": 8192,
												"kindString": "Index signature",
												"flags": {},
												"parameters": [
													{
														"id": 580,
														"name": "key",
														"kind": 32768,
														"flags": {},
														"type": {
															"type": "intrinsic",
															"name": "string"
														}
													}
												],
												"type": {
													"type": "reference",
													"id": 528,
													"name": "Vframe"
												}
											}
										}
									}
								}
							]
						},
						{
							"id": 581,
							"name": "byId",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 582,
									"name": "byId",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "根据id获取vframe"
									},
									"parameters": [
										{
											"id": 583,
											"name": "id",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 528,
										"name": "Vframe"
									}
								}
							]
						},
						{
							"id": 584,
							"name": "byNode",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 585,
									"name": "byNode",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "根据节点获取vframe"
									},
									"parameters": [
										{
											"id": 586,
											"name": "node",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "节点对象\n"
											},
											"type": {
												"type": "reference",
												"id": 271,
												"name": "HTMLElementOrEventTarget"
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 528,
										"name": "Vframe"
									}
								}
							]
						},
						{
							"id": 613,
							"name": "fire",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 614,
									"name": "fire",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "派发事件",
										"returns": "返回事件对象\n"
									},
									"typeParameter": [
										{
											"id": 615,
											"name": "D",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 616,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 617,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件参数"
											},
											"type": {
												"type": "reference",
												"name": "D"
											}
										}
									],
									"type": {
										"type": "intersection",
										"types": [
											{
												"type": "reference",
												"id": 431,
												"name": "TriggerEventDescriptor"
											},
											{
												"type": "reference",
												"name": "D"
											}
										]
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 385,
										"name": "Event.fire"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 384,
								"name": "Event.fire"
							}
						},
						{
							"id": 604,
							"name": "off",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 605,
									"name": "off",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "解除事件绑定"
									},
									"parameters": [
										{
											"id": 606,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 607,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件处理函数\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 608,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 609,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 610,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intersection",
																		"types": [
																			{
																				"type": "reference",
																				"id": 431,
																				"name": "TriggerEventDescriptor"
																			},
																			{
																				"type": "reflection",
																				"declaration": {
																					"id": 611,
																					"name": "__type",
																					"kind": 65536,
																					"kindString": "Type literal",
																					"flags": {},
																					"children": [
																						{
																							"id": 612,
																							"name": "vframe",
																							"kind": 1024,
																							"kindString": "Property",
																							"flags": {},
																							"comment": {
																								"shortText": "vframe对象"
																							},
																							"sources": [
																								{
																									"fileName": "types/magix.d.ts",
																									"line": 667,
																									"character": 16
																								}
																							],
																							"type": {
																								"type": "reference",
																								"id": 528,
																								"name": "Vframe"
																							}
																						}
																					],
																					"groups": [
																						{
																							"title": "Properties",
																							"kind": 1024,
																							"children": [
																								612
																							]
																						}
																					]
																				}
																			}
																		]
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 378,
										"name": "Event.off"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 377,
								"name": "Event.off"
							}
						},
						{
							"id": 594,
							"name": "on",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 595,
									"name": "on",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "绑定事件"
									},
									"parameters": [
										{
											"id": 596,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 597,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件处理函数"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 598,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 599,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 600,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intersection",
																		"types": [
																			{
																				"type": "reference",
																				"id": 431,
																				"name": "TriggerEventDescriptor"
																			},
																			{
																				"type": "reflection",
																				"declaration": {
																					"id": 601,
																					"name": "__type",
																					"kind": 65536,
																					"kindString": "Type literal",
																					"flags": {},
																					"children": [
																						{
																							"id": 602,
																							"name": "vframe",
																							"kind": 1024,
																							"kindString": "Property",
																							"flags": {},
																							"comment": {
																								"shortText": "vframe对象"
																							},
																							"sources": [
																								{
																									"fileName": "types/magix.d.ts",
																									"line": 667,
																									"character": 16
																								}
																							],
																							"type": {
																								"type": "reference",
																								"id": 528,
																								"name": "Vframe"
																							}
																						}
																					],
																					"groups": [
																						{
																							"title": "Properties",
																							"kind": 1024,
																							"children": [
																								602
																							]
																						}
																					]
																				}
																			}
																		]
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 603,
											"name": "priority",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "优先级\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 370,
										"name": "Event.on"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 369,
								"name": "Event.on"
							}
						},
						{
							"id": 587,
							"name": "onadd",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 694,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 588,
									"name": "onadd",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "当vframe创建并添加到管理对象上时触发"
									},
									"parameters": [
										{
											"id": 589,
											"name": "e",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"type": {
												"type": "reference",
												"id": 502,
												"name": "VframeStaticEvent"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 590,
							"name": "onremove",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 699,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 591,
									"name": "onremove",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "当vframe销毁并从管理对象上删除时触发"
									},
									"parameters": [
										{
											"id": 592,
											"name": "e",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"type": {
												"type": "reference",
												"id": 502,
												"name": "VframeStaticEvent"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 574,
							"name": "root",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 575,
									"name": "root",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取根vframe"
									},
									"type": {
										"type": "reference",
										"id": 528,
										"name": "Vframe"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								593
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								576,
								581,
								584,
								613,
								604,
								594,
								587,
								590,
								574
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 660,
							"character": 14
						}
					],
					"extendedTypes": [
						{
							"type": "reference",
							"id": 368,
							"typeArguments": [
								{
									"type": "reference",
									"id": 528,
									"name": "Vframe"
								},
								{
									"type": "reflection",
									"declaration": {
										"id": 572,
										"name": "__type",
										"kind": 65536,
										"kindString": "Type literal",
										"flags": {},
										"children": [
											{
												"id": 573,
												"name": "vframe",
												"kind": 1024,
												"kindString": "Property",
												"flags": {},
												"comment": {
													"shortText": "vframe对象"
												},
												"sources": [
													{
														"fileName": "types/magix.d.ts",
														"line": 667,
														"character": 16
													}
												],
												"type": {
													"type": "reference",
													"id": 528,
													"name": "Vframe"
												}
											}
										],
										"groups": [
											{
												"title": "Properties",
												"kind": 1024,
												"children": [
													573
												]
											}
										],
										"sources": [
											{
												"fileName": "types/magix.d.ts",
												"line": 663,
												"character": 12
											}
										]
									}
								}
							],
							"name": "Event"
						}
					]
				},
				{
					"id": 502,
					"name": "VframeStaticEvent",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "vframe静态事件接口"
					},
					"children": [
						{
							"id": 504,
							"name": "type",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "事件类型"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 370,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							},
							"inheritedFrom": {
								"type": "reference",
								"id": 432,
								"name": "TriggerEventDescriptor.type"
							}
						},
						{
							"id": 503,
							"name": "vframe",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "vframe对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 498,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"id": 528,
								"name": "Vframe"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								504,
								503
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 494,
							"character": 14
						}
					],
					"extendedTypes": [
						{
							"type": "reference",
							"id": 431,
							"name": "TriggerEventDescriptor"
						}
					]
				},
				{
					"id": 618,
					"name": "View",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "view类原型"
					},
					"children": [
						{
							"id": 619,
							"name": "id",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "当前view的唯一id"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 712,
									"character": 17
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "string"
							}
						},
						{
							"id": 622,
							"name": "owner",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "持有当前view的vframe"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 724,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"id": 528,
								"name": "Vframe"
							}
						},
						{
							"id": 620,
							"name": "root",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "当前view所在的节点对象"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 716,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"name": "HTMLElement"
							}
						},
						{
							"id": 621,
							"name": "tmpl",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "模板"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 720,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"name": "Function"
							}
						},
						{
							"id": 629,
							"name": "assign",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 630,
									"name": "assign",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "更新当前view的数据"
									},
									"parameters": [
										{
											"id": 631,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "赋值数据\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 663,
							"name": "changed",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 664,
									"name": "changed",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取设置数据后，是否发生了改变"
									},
									"type": {
										"type": "intrinsic",
										"name": "boolean"
									}
								}
							]
						},
						{
							"id": 665,
							"name": "digest",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 666,
									"name": "digest",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "检测数据变化，更新界面，放入数据后需要显式调用该方法才可以把数据更新到界面"
									},
									"parameters": [
										{
											"id": 667,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "数据对象，如{a:20,b:30}\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 668,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"indexSignature": {
														"id": 669,
														"name": "__index",
														"kind": 8192,
														"kindString": "Index signature",
														"flags": {},
														"parameters": [
															{
																"id": 670,
																"name": "key",
																"kind": 32768,
																"flags": {},
																"type": {
																	"type": "intrinsic",
																	"name": "string"
																}
															}
														],
														"type": {
															"type": "intrinsic",
															"name": "any"
														}
													}
												}
											}
										}
									],
									"type": {
										"type": "reference",
										"typeArguments": [
											{
												"type": "intrinsic",
												"name": "any"
											}
										],
										"name": "Promise"
									}
								}
							]
						},
						{
							"id": 638,
							"name": "exitConfirm",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 639,
									"name": "exitConfirm",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "离开确认方法，需要开发者重写该方法以实现相关离开的界面和逻辑"
									},
									"parameters": [
										{
											"id": 640,
											"name": "msg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "调用observeExit时传递的离开消息"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 641,
											"name": "resolve",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "确定离开时调用该方法，通知magix离开"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 642,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 643,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 644,
											"name": "reject",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "留在当前界面时调用的方法，通知magix不要离开\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 645,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 646,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 671,
							"name": "finale",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 672,
									"name": "finale",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "等待界面异步渲染结束"
									},
									"type": {
										"type": "reference",
										"typeArguments": [
											{
												"type": "intrinsic",
												"name": "void"
											}
										],
										"name": "Promise"
									}
								}
							]
						},
						{
							"id": 699,
							"name": "fire",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 700,
									"name": "fire",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "派发事件",
										"returns": "返回事件对象\n"
									},
									"typeParameter": [
										{
											"id": 701,
											"name": "D",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 702,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 703,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件参数"
											},
											"type": {
												"type": "reference",
												"name": "D"
											}
										}
									],
									"type": {
										"type": "intersection",
										"types": [
											{
												"type": "reference",
												"id": 431,
												"name": "TriggerEventDescriptor"
											},
											{
												"type": "reference",
												"name": "D"
											}
										]
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 385,
										"name": "Event.fire"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 384,
								"name": "Event.fire"
							}
						},
						{
							"id": 653,
							"name": "get",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 654,
									"name": "get",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "获取设置的数据，当key未传递时，返回整个数据对象"
									},
									"typeParameter": [
										{
											"id": 655,
											"name": "TReturnType",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"default": {
												"type": "intrinsic",
												"name": "any"
											}
										}
									],
									"parameters": [
										{
											"id": 656,
											"name": "key",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "设置时的数据key\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "TReturnType"
									}
								}
							]
						},
						{
							"id": 623,
							"name": "init",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 624,
									"name": "init",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "初始化View时调用"
									},
									"parameters": [
										{
											"id": 625,
											"name": "extra",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "初始化时传递的额外参数\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 647,
							"name": "observeExit",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 648,
									"name": "observeExit",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "关注当前view的离开(销毁)动作，允许用户拦截取消。比如表单有变化且未保存，我们可以提示用户是直接离开，还是保存后再离开"
									},
									"parameters": [
										{
											"id": 649,
											"name": "msg",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "离开提示消息"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 650,
											"name": "hasChanged",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "是否显示提示信息，返回true表示需要提示用户\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 651,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 652,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"type": {
																"type": "intrinsic",
																"name": "boolean"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 632,
							"name": "observeLocation",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 633,
									"name": "observeLocation",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "监听地址栏的改变，如\"/app/path?page=1&size=20\"，其中\"/app/path\"为path,\"page,size\"为参数"
									},
									"parameters": [
										{
											"id": 634,
											"name": "parameters",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "监听地址栏中的参数，如\"page,size\"或[\"page\",\"size\"]表示监听page或size的改变"
											},
											"type": {
												"type": "union",
												"types": [
													{
														"type": "intrinsic",
														"name": "string"
													},
													{
														"type": "array",
														"elementType": {
															"type": "intrinsic",
															"name": "string"
														}
													}
												]
											}
										},
										{
											"id": 635,
											"name": "observePath",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "是否监听path的改变\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "boolean"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								},
								{
									"id": 636,
									"name": "observeLocation",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "监听地址栏的改变"
									},
									"parameters": [
										{
											"id": 637,
											"name": "observeObject",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "参数对象\n"
											},
											"type": {
												"type": "reference",
												"id": 441,
												"name": "ViewObserveLocation"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 692,
							"name": "off",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 693,
									"name": "off",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "解除事件绑定"
									},
									"parameters": [
										{
											"id": 694,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 695,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "事件处理函数\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 696,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 697,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 698,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intrinsic",
																		"name": "any"
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 378,
										"name": "Event.off"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 377,
								"name": "Event.off"
							}
						},
						{
							"id": 684,
							"name": "on",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 685,
									"name": "on",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "绑定事件"
									},
									"parameters": [
										{
											"id": 686,
											"name": "name",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件名称"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										},
										{
											"id": 687,
											"name": "fn",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "事件处理函数"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 688,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"signatures": [
														{
															"id": 689,
															"name": "__type",
															"kind": 4096,
															"kindString": "Call signature",
															"flags": {},
															"parameters": [
																{
																	"id": 690,
																	"name": "e",
																	"kind": 32768,
																	"kindString": "Parameter",
																	"flags": {
																		"isOptional": true
																	},
																	"type": {
																		"type": "intrinsic",
																		"name": "any"
																	}
																}
															],
															"type": {
																"type": "intrinsic",
																"name": "void"
															}
														}
													]
												}
											}
										},
										{
											"id": 691,
											"name": "priority",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "优先级\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "number"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									},
									"inheritedFrom": {
										"type": "reference",
										"id": 370,
										"name": "Event.on"
									}
								}
							],
							"inheritedFrom": {
								"type": "reference",
								"id": 369,
								"name": "Event.on"
							}
						},
						{
							"id": 681,
							"name": "ondestroy",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 810,
									"character": 8
								}
							],
							"signatures": [
								{
									"id": 682,
									"name": "ondestroy",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "view销毁时触发"
									},
									"parameters": [
										{
											"id": 683,
											"name": "e",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"type": {
												"type": "reference",
												"id": 431,
												"name": "TriggerEventDescriptor"
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 677,
							"name": "parse",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 678,
									"name": "parse",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "得到模板中@符号对应的原始数据"
									},
									"typeParameter": [
										{
											"id": 679,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 680,
											"name": "origin",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "源字符串\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "string"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "T"
									}
								}
							]
						},
						{
							"id": 626,
							"name": "render",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 627,
									"name": "render",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "渲染界面，开发者在该方法内完成界面渲染的流程"
									},
									"parameters": [
										{
											"id": 628,
											"name": "args",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isRest": true
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "intrinsic",
													"name": "any"
												}
											}
										}
									],
									"type": {
										"type": "intrinsic",
										"name": "void"
									}
								}
							]
						},
						{
							"id": 657,
							"name": "set",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 658,
									"name": "set",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "设置数据"
									},
									"parameters": [
										{
											"id": 659,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "数据对象，如{a:20,b:30}\n"
											},
											"type": {
												"type": "reflection",
												"declaration": {
													"id": 660,
													"name": "__type",
													"kind": 65536,
													"kindString": "Type literal",
													"flags": {},
													"indexSignature": {
														"id": 661,
														"name": "__index",
														"kind": 8192,
														"kindString": "Index signature",
														"flags": {},
														"parameters": [
															{
																"id": 662,
																"name": "key",
																"kind": 32768,
																"flags": {},
																"type": {
																	"type": "intrinsic",
																	"name": "string"
																}
															}
														],
														"type": {
															"type": "intrinsic",
															"name": "any"
														}
													}
												}
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 618,
										"name": "View"
									}
								}
							]
						},
						{
							"id": 673,
							"name": "translate",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 674,
									"name": "translate",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "得到模板中@符号对应的原始数据"
									},
									"typeParameter": [
										{
											"id": 675,
											"name": "T",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 676,
											"name": "data",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {},
											"comment": {
												"text": "数据对象\n"
											},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"type": {
										"type": "reference",
										"name": "T"
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								619,
								622,
								620,
								621
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								629,
								663,
								665,
								638,
								671,
								699,
								653,
								623,
								647,
								632,
								692,
								684,
								681,
								677,
								626,
								657,
								673
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 708,
							"character": 14
						}
					],
					"extendedTypes": [
						{
							"type": "reference",
							"id": 368,
							"typeArguments": [
								{
									"type": "reference",
									"id": 618,
									"name": "View"
								}
							],
							"name": "Event"
						}
					]
				},
				{
					"id": 704,
					"name": "ViewConstructor",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "View类"
					},
					"children": [
						{
							"id": 716,
							"name": "prototype",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isReadonly": true
							},
							"comment": {
								"shortText": "原型"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 837,
									"character": 17
								}
							],
							"type": {
								"type": "reference",
								"id": 618,
								"name": "View"
							}
						},
						{
							"id": 705,
							"name": "extend",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 706,
									"name": "extend",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "继承Magix.View"
									},
									"typeParameter": [
										{
											"id": 707,
											"name": "TProps",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 708,
											"name": "props",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isOptional": true
											},
											"comment": {
												"text": "包含可选的init和render方法的对象"
											},
											"type": {
												"type": "reference",
												"id": 491,
												"typeArguments": [
													{
														"type": "intersection",
														"types": [
															{
																"type": "reference",
																"name": "TProps"
															},
															{
																"type": "reference",
																"id": 618,
																"name": "View"
															}
														]
													}
												],
												"name": "ExtendPropertyDescriptor"
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 704,
										"name": "ViewConstructor"
									}
								}
							]
						},
						{
							"id": 709,
							"name": "merge",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 710,
									"name": "merge",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "扩展到Magix.View原型上的对象"
									},
									"parameters": [
										{
											"id": 711,
											"name": "args",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isRest": true
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "intrinsic",
													"name": "object"
												}
											}
										}
									],
									"type": {
										"type": "reference",
										"id": 704,
										"name": "ViewConstructor"
									}
								}
							]
						},
						{
							"id": 712,
							"name": "static",
							"kind": 2048,
							"kindString": "Method",
							"flags": {},
							"signatures": [
								{
									"id": 713,
									"name": "static",
									"kind": 4096,
									"kindString": "Call signature",
									"flags": {},
									"comment": {
										"shortText": "静态方法"
									},
									"typeParameter": [
										{
											"id": 714,
											"name": "TStatics",
											"kind": 131072,
											"kindString": "Type parameter",
											"flags": {},
											"type": {
												"type": "intrinsic",
												"name": "object"
											}
										}
									],
									"parameters": [
										{
											"id": 715,
											"name": "args",
											"kind": 32768,
											"kindString": "Parameter",
											"flags": {
												"isRest": true
											},
											"comment": {
												"text": "静态方法对象\n"
											},
											"type": {
												"type": "array",
												"elementType": {
													"type": "reference",
													"name": "TStatics"
												}
											}
										}
									],
									"type": {
										"type": "intersection",
										"types": [
											{
												"type": "reference",
												"id": 704,
												"name": "ViewConstructor"
											},
											{
												"type": "reference",
												"name": "TStatics"
											}
										]
									}
								}
							]
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								716
							]
						},
						{
							"title": "Methods",
							"kind": 2048,
							"children": [
								705,
								709,
								712
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 815,
							"character": 14
						}
					]
				},
				{
					"id": 441,
					"name": "ViewObserveLocation",
					"kind": 256,
					"kindString": "Interface",
					"flags": {},
					"comment": {
						"shortText": "view监听location接口"
					},
					"children": [
						{
							"id": 443,
							"name": "params",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"shortText": "监听参数"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 402,
									"character": 8
								}
							],
							"type": {
								"type": "union",
								"types": [
									{
										"type": "intrinsic",
										"name": "string"
									},
									{
										"type": "array",
										"elementType": {
											"type": "intrinsic",
											"name": "string"
										}
									}
								]
							}
						},
						{
							"id": 442,
							"name": "path",
							"kind": 1024,
							"kindString": "Property",
							"flags": {
								"isOptional": true
							},
							"comment": {
								"shortText": "监听path"
							},
							"sources": [
								{
									"fileName": "types/magix.d.ts",
									"line": 398,
									"character": 8
								}
							],
							"type": {
								"type": "intrinsic",
								"name": "boolean"
							}
						}
					],
					"groups": [
						{
							"title": "Properties",
							"kind": 1024,
							"children": [
								443,
								442
							]
						}
					],
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 394,
							"character": 14
						}
					]
				},
				{
					"id": 271,
					"name": "HTMLElementOrEventTarget",
					"kind": 4194304,
					"kindString": "Type alias",
					"flags": {},
					"comment": {
						"shortText": "html元素或事件对象"
					},
					"sources": [
						{
							"fileName": "types/magix.d.ts",
							"line": 40,
							"character": 9
						}
					],
					"type": {
						"type": "union",
						"types": [
							{
								"type": "reference",
								"name": "HTMLElement"
							},
							{
								"type": "reference",
								"name": "EventTarget"
							}
						]
					}
				}
			],
			"groups": [
				{
					"title": "Interfaces",
					"kind": 256,
					"children": [
						358,
						505,
						522,
						278,
						368,
						491,
						499,
						814,
						87,
						163,
						2,
						444,
						433,
						350,
						347,
						335,
						329,
						272,
						717,
						753,
						487,
						419,
						391,
						431,
						528,
						571,
						502,
						618,
						704,
						441
					]
				},
				{
					"title": "Type aliases",
					"kind": 4194304,
					"children": [
						271
					]
				}
			],
			"sources": [
				{
					"fileName": "types/magix.d.ts",
					"line": 9,
					"character": 18
				}
			]
		}
	],
	"groups": [
		{
			"title": "Namespaces",
			"kind": 2,
			"children": [
				1027,
				1
			]
		}
	],
	"sources": [
		{
			"fileName": "types/magix.d.ts",
			"line": 9,
			"character": 0
		}
	]
}
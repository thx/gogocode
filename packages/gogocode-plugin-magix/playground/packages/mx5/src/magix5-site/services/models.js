
/**
 * @chongzhi @mozhi
 * 来自rap的项目所有接口集合，该文件由 mm models 命令自动生成，请勿手动更改！
 * 新增接口请在rap上添加，然后执行 mm models 会自动更新本文件
 */

module.exports = [

  // 专题详情接口 - 671#5793
  {
    "name": "api_tag_topic_$id_get",
    "method": "GET",
    "url": "/api/tag/topic/"
  },
  // 获取专题列表接口 - 671#5794
  {
    "name": "api_tag_topic_list_get",
    "method": "GET",
    "url": "/api/tag/topic/list"
  },
  // 获取专题推荐接口 - 671#5795
  {
    "name": "api_tag_topic_recommend_get",
    "method": "GET",
    "url": "/api/tag/topic/recommend"
  },
  // 获取可以同步的渠道与用户接口 - 671#5894
  {
    "name": "api_deliverapp_list_get",
    "method": "GET",
    "url": "/api/deliverapp/list"
  },
  // 标签暂存架 - 获取列表 - 671#6157
  {
    "name": "api_tag_cart_get",
    "method": "GET",
    "url": "/api/tag/cart"
  },
  // 标签暂存架 - 维护标签数据 - 671#6158
  {
    "name": "api_tag_cart_post",
    "method": "POST",
    "url": "/api/tag/cart"
  },
  // 当日广告整体报表 - 671#6219
  {
    "name": "api_adreport_get",
    "method": "GET",
    "url": "/api/adreport"
  },
  // 每日广告数据趋势 - 671#6220
  {
    "name": "api_adreport_adreporttrend_get",
    "method": "GET",
    "url": "/api/adreport/adreporttrend"
  },
  // 每日明细数据 - 671#6221
  {
    "name": "api_adreport_adreportdetail_get",
    "method": "GET",
    "url": "/api/adreport/adreportdetail"
  },
  // 每日人群报表 - 671#6327
  {
    "name": "api_crowdreport_get",
    "method": "GET",
    "url": "/api/crowdreport"
  },
  // 单人群渠道明细 - 671#6334
  {
    "name": "api_crowdreport_crowdchannelreport_get",
    "method": "GET",
    "url": "/api/crowdreport/crowdchannelreport"
  },
  // 自定义字段展示 - 671#6337
  {
    "name": "api_adfieldmanage_get",
    "method": "GET",
    "url": "/api/adfieldmanage"
  },
  // 单人群渠道kpi数据趋势 - 671#6426
  {
    "name": "api_crowdreport_crowdchannelkpitrend_get",
    "method": "GET",
    "url": "/api/crowdreport/crowdchannelkpitrend"
  },
  // 单人群渠道资源位明细 - 671#6427
  {
    "name": "api_crowdreport_adresourcedetail_get",
    "method": "GET",
    "url": "/api/crowdreport/adresourcedetail"
  },
  // 单人群渠道广告计划明细 - 671#6428
  {
    "name": "api_crowdreport_adplandetail_get",
    "method": "GET",
    "url": "/api/crowdreport/adplandetail"
  },
  // 推广单元kpi数据明细 - 671#6431
  {
    "name": "api_crowdreport_adunitdetail_get",
    "method": "GET",
    "url": "/api/crowdreport/adunitdetail"
  },
  // 单人群渠道推广单元数据趋势 - 671#6432
  {
    "name": "api_crowdreport_adunitkpitrend_get",
    "method": "GET",
    "url": "/api/crowdreport/adunitkpitrend"
  },
  // 渠道报表总体详情 - 671#6433
  {
    "name": "api_channelreport_get",
    "method": "GET",
    "url": "/api/channelreport"
  },
  // 渠道kpi数据趋势 - 671#6434
  {
    "name": "api_channelreport_adchanneltrend_get",
    "method": "GET",
    "url": "/api/channelreport/adchanneltrend"
  },
  // 渠道每日明细 - 671#6435
  {
    "name": "api_channelreport_adchanneldetail_get",
    "method": "GET",
    "url": "/api/channelreport/adchanneldetail"
  },
  // 获取用户最近的有数据的日期 - 671#6439
  {
    "name": "api_adreport_thelatestdate_get",
    "method": "GET",
    "url": "/api/adreport/thelatestdate"
  },
  // 获取授权页面标签列表接口 - 671#6525
  {
    "name": "api_union_tag_list_get",
    "method": "GET",
    "url": "/api/union/tag_list"
  },
  // 协议确认接口 - 671#6535
  {
    "name": "api_user_data_union_agreement_get",
    "method": "GET",
    "url": "/api/user/data_union_agreement"
  },
  // 获取标签已授权店铺列表接口 - 671#6536
  {
    "name": "api_union_$id_shop_list_get",
    "method": "GET",
    "url": "/api/union/"
  },
  // 批量授权接口 - 671#6537
  {
    "name": "api_union_multi_auth_post",
    "method": "POST",
    "url": "/api/union/multi_auth"
  },
  // 取消店铺授权接口 - 671#6538
  {
    "name": "api_union_cancel_auth_post",
    "method": "POST",
    "url": "/api/union/cancel_auth"
  },
  // 添加店铺授权接口 - 671#6539
  {
    "name": "api_union_auth_post",
    "method": "POST",
    "url": "/api/union/auth"
  },
  // 查询店铺能否授权接口 - 671#6540
  {
    "name": "api_union_shop_get",
    "method": "GET",
    "url": "/api/union/shop"
  },
  // 获取联盟标签列表接口 - 671#6542
  {
    "name": "api_union_auth_tag_list_get",
    "method": "GET",
    "url": "/api/union/auth_tag_list"
  },
  // 获取我的联盟列表接口 - 671#6543
  {
    "name": "api_union_list_get",
    "method": "GET",
    "url": "/api/union/list"
  },
  // 针对店铺级别取消授权接口 - 671#6544
  {
    "name": "api_union_cancel_auth_shop_post",
    "method": "POST",
    "url": "/api/union/cancel_auth_shop"
  },
  // 获取某个店铺下的授权标签列表接口 - 671#6545
  {
    "name": "api_union_auth_shop_tag_list_get",
    "method": "GET",
    "url": "/api/union/auth_shop_tag_list"
  },
  // 获取标签下的授权店铺列表接口 - 671#6575
  {
    "name": "api_tag_shop_list_get",
    "method": "GET",
    "url": "/api/tag/shop_list"
  },
  // 获取报表有权限的渠道 - 671#6700
  {
    "name": "api_adpermission_get",
    "method": "GET",
    "url": "/api/adpermission"
  },
  // 店铺消费者资产接口 - 671#53533
  {
    "name": "api_homepage_customer_asset_get",
    "method": "GET",
    "url": "/api/homepage/customer/asset"
  },
  // 消费者资产趋势数据接口 - 671#53537
  {
    "name": "api_homepage_customer_asset_trend_get",
    "method": "GET",
    "url": "/api/homepage/customer/asset/trend"
  },
  // 购买消费者价值细分 - 671#53538
  {
    "name": "api_homepage_customer_value_level_get",
    "method": "GET",
    "url": "/api/homepage/customer/value/level"
  },
  // 查询消费者流转情况 - 671#53539
  {
    "name": "api_homepage_customer_circulation_get",
    "method": "GET",
    "url": "/api/homepage/customer/circulation"
  },
  // 超级用户来源 - 671#53540
  {
    "name": "api_homepage_super_source_get",
    "method": "GET",
    "url": "/api/homepage/super/source"
  },
  // 购买消费者引入效率排行榜 - 671#53546
  {
    "name": "api_homepage_rank_newcustomer_get",
    "method": "GET",
    "url": "/api/homepage/rank/newcustomer"
  },
  // 超级用户引入效率排行榜---参数与购买消费者引入效率排行榜一致 - 671#53547
  {
    "name": "api_homepage_rank_super_get",
    "method": "GET",
    "url": "/api/homepage/rank/super"
  },
  // 首页-最新标签 - 671#53918
  {
    "name": "api_tag_index_newest_get",
    "method": "GET",
    "url": "/api/tag/index_newest"
  },
  // 首页-同行常用标签 - 671#53919
  {
    "name": "api_tag_industry_common_use_get",
    "method": "GET",
    "url": "/api/tag/industry_common_use"
  },
  // 首页-感兴趣标签 - 671#53920
  {
    "name": "api_tag_recommend_get",
    "method": "GET",
    "url": "/api/tag/recommend"
  },
  // 洞察页/-分析显著特征 - 671#53942
  {
    "name": "api_analysis_insight_feature_post",
    "method": "POST",
    "url": "/api/analysis/insight/feature"
  },
  // 拉新排行榜 - 671#54014
  {
    "name": "api_rpt_rank_newaudience_get",
    "method": "GET",
    "url": "/api/rpt/rank/newaudience"
  },
  // 回报率排行榜 - 671#54015
  {
    "name": "api_rpt_rank_roi_get",
    "method": "GET",
    "url": "/api/rpt/rank/roi"
  },
  // 用户信息 - 671#54099
  {
    "name": "api_login_loginuserinfo_get",
    "method": "GET",
    "url": "/api/login/loginuserinfo"
  },
  // 收藏标签 - 671#54305
  {
    "name": "api_tag_collect_$id_post",
    "method": "POST",
    "url": "/api/tag/collect/"
  },
  // 首页/人群拓展页-最大可拓展人数 - 671#54322
  {
    "name": "api_analysis_lookalike_max_coverage_post",
    "method": "POST",
    "url": "/api/analysis/lookalike/max_coverage"
  },
  // 菜单 - 671#54572
  {
    "name": "api_userconfig_menu_get",
    "method": "GET",
    "url": "/api/userconfig/menu"
  },
  // 获取前端版本号 - 671#54597
  {
    "name": "cdn_version_get",
    "method": "GET",
    "url": "cdn/version"
  },
  // 人群列表 - 671#55556
  {
    "name": "api_crowd__get",
    "method": "GET",
    "url": "/api/crowd/"
  },
  // 洞察--人群价值分析--获取分析模型 - 671#55638
  {
    "name": "api_analysis_crowdvalue_model_get",
    "method": "GET",
    "url": "/api/analysis/crowdvalue/model"
  },
  // 人群价值分析 - 671#55640
  {
    "name": "api_analysis_crowdvalue_post",
    "method": "POST",
    "url": "/api/analysis/crowdvalue"
  },
  // 普通透视结果 - 671#55739
  {
    "name": "api_analysis_tag_$id_post",
    "method": "POST",
    "url": "/api/analysis/tag/"
  },
  // 洞察--画像透视分析--基础画像--自定义画像全量标签列表 - 671#55757
  {
    "name": "api_category_tags_get",
    "method": "GET",
    "url": "/api/category/tags"
  },
  // 洞察页面/默认洞察标签列表 - 671#56058
  {
    "name": "api_analysis_insight_tag_list_post",
    "method": "POST",
    "url": "/api/analysis/insight/tag/list"
  },
  // 获取覆盖人数 - 671#56062
  {
    "name": "api_analysis_coverage_post",
    "method": "POST",
    "url": "/api/analysis/coverage"
  },
  // 人群分组信息 - 671#56082
  {
    "name": "api_crowd_group_get",
    "method": "GET",
    "url": "/api/crowd/group"
  },
  // 修改人群 - 671#56084
  {
    "name": "api_crowd_$id_put",
    "method": "PUT",
    "url": "/api/crowd/"
  },
  // 创建人群 - 671#56085
  {
    "name": "api_crowd__post",
    "method": "POST",
    "url": "/api/crowd/"
  },
  // 显著特征tgi计算 - 671#56305
  {
    "name": "api_analysis_super_tag_$id_post",
    "method": "POST",
    "url": "/api/analysis/super/tag/"
  },
  // 混淆字体接口 - 671#56402
  {
    "name": "api_font_get",
    "method": "GET",
    "url": "/api/font"
  },
  // /api/stationletter/top - 671#56404
  {
    "name": "api_stationletter_top_get",
    "method": "GET",
    "url": "/api/stationletter/top"
  },
  // /api/stationletter/show - 671#56405
  {
    "name": "api_stationletter_show_get",
    "method": "GET",
    "url": "/api/stationletter/show"
  },
  // api/sms/count - 671#56406
  {
    "name": "api_sms_count_get",
    "method": "GET",
    "url": "/api/sms/count"
  },
  // /api/crowd/:id - 671#56407
  {
    "name": "api_crowd_$id_get",
    "method": "GET",
    "url": "/api/crowd/"
  },
  // /api/tag/search - 671#56411
  {
    "name": "api_tag_search_get",
    "method": "GET",
    "url": "/api/tag/search"
  },
  // /api/adkpimanage - 671#56418
  {
    "name": "api_adkpimanage_get",
    "method": "GET",
    "url": "/api/adkpimanage"
  },
  // /api/tag/:id - 671#56499
  {
    "name": "api_tag_$id_get",
    "method": "GET",
    "url": "/api/tag/"
  },
  // /api/deliverapp/deliverapplist - 671#56504
  {
    "name": "api_deliverapp_deliverapplist_get",
    "method": "GET",
    "url": "/api/deliverapp/deliverapplist"
  },
  // 人群流转 - 671#58126
  {
    "name": "api_rpt_crowdflow_get",
    "method": "GET",
    "url": "/api/rpt/crowdflow"
  },
  // /api/code - 671#58130
  {
    "name": "api_code_get",
    "method": "GET",
    "url": "/api/code"
  },
  // /api/tag/:id/attitude - 671#58247
  {
    "name": "api_tag_$id_attitude_get",
    "method": "GET",
    "url": "/api/tag/"
  },
  // /api/tag/:id/tag_relevancy - 671#58248
  {
    "name": "api_tag_$id_tag_relevancy_get",
    "method": "GET",
    "url": "/api/tag/"
  },
  // /api/tag/:id/up_count - 671#58250
  {
    "name": "api_tag_$id_up_count_get",
    "method": "GET",
    "url": "/api/tag/"
  },
  // 云图-获取二级类目列表 - 671#59129
  {
    "name": "api_rpt_yuntu_rptCloudSecondCateList_get",
    "method": "GET",
    "url": "/api/rpt/yuntu/rptCloudSecondCateList"
  },
  // 云图-云图分析（通用） - 671#59132
  {
    "name": "api_rpt_yuntu_rptSearchWordCloudChart_get",
    "method": "GET",
    "url": "/api/rpt/yuntu/rptSearchWordCloudChart"
  },
  // /api/analysis/coverage/rate - 671#59138
  {
    "name": "api_analysis_coverage_rate_get",
    "method": "GET",
    "url": "/api/analysis/coverage/rate"
  },
  // 人群创建页面查看基础画像透视 - 671#59147
  {
    "name": "api_analysis_crowd_insight_$id_post",
    "method": "POST",
    "url": "/api/analysis/crowd/insight/"
  },
  // 人群同步任务数据准备阶段 - 671#59366
  {
    "name": "api_analysis_crowd_dump_task_post",
    "method": "POST",
    "url": "/api/analysis/crowd/dump/task"
  },
  // /api/crowd/maincontext - 671#59483
  {
    "name": "api_crowd_maincontext_get",
    "method": "GET",
    "url": "/api/crowd/maincontext"
  },
  // /api/crowd/:id/childcontext - 671#59486
  {
    "name": "api_crowd_$id_childcontext_get",
    "method": "GET",
    "url": "/api/crowd/"
  },
  // 下载画像 - 671#59578
  {
    "name": "api_analysis_crowd_compare_export_post",
    "method": "POST",
    "url": "/api/analysis/crowd/compare/export"
  },
  // 洞察模块里的人群列表接口 - 671#60147
  {
    "name": "api_crowd_insight_get",
    "method": "GET",
    "url": "/api/crowd/insight"
  },
  // 云图-场景预测分析 - 671#61134
  {
    "name": "api_rpt_yuntu_rptCloudSceneWordChart_get",
    "method": "GET",
    "url": "/api/rpt/yuntu/rptCloudSceneWordChart"
  },
  // 词圈人-词搜索 - 671#61942
  {
    "name": "api_crowd_word_search_post",
    "method": "POST",
    "url": "/api/crowd/word/search"
  },
  // 词圈人-词推荐 - 671#61943
  {
    "name": "api_crowd_word_recommend_post",
    "method": "POST",
    "url": "/api/crowd/word/recommend"
  },
  // 超级新用户-获取标签列表 - 671#62071
  {
    "name": "api_tag_tab_get",
    "method": "GET",
    "url": "/api/tag/tab"
  },
  // 超级新用户-创建人群 - 671#62150
  {
    "name": "api_crowd_post",
    "method": "POST",
    "url": "/api/crowd"
  },
  // /api/crowd/:id - 671#63957
  {
    "name": "api_crowd_$id_delete",
    "method": "DELETE",
    "url": "/api/crowd/"
  },
  // /api/crowd/appUser/ - 671#64117
  {
    "name": "api_crowd_appUser__get",
    "method": "GET",
    "url": "/api/crowd/appUser/"
  },
  // 人群同步渠道 - 671#64129
  {
    "name": "api_crowd_app__post",
    "method": "POST",
    "url": "/api/crowd/app/"
  },
  // /api/crowd/group - 671#64153
  {
    "name": "api_crowd_group_post",
    "method": "POST",
    "url": "/api/crowd/group"
  },
  // /api/crowd/group/ - 671#64155
  {
    "name": "api_crowd_group_$id_delete",
    "method": "DELETE",
    "url": "/api/crowd/group/"
  },
  // /api/crowd/group/ - 671#64156
  {
    "name": "api_crowd_group_$id_put",
    "method": "PUT",
    "url": "/api/crowd/group/"
  },
  // /api/crowd/crowds/ - 671#64183
  {
    "name": "api_crowd_crowds__delete",
    "method": "DELETE",
    "url": "/api/crowd/crowds/"
  },
  // /api/crowd/group - 671#64197
  {
    "name": "api_crowd_group_put",
    "method": "PUT",
    "url": "/api/crowd/group"
  },
  // /api/crowd/multi_app - 671#64219
  {
    "name": "api_crowd_multi_app_post",
    "method": "POST",
    "url": "/api/crowd/multi_app"
  },
  // 人群工厂-标签表达式转换 - 671#65065
  {
    "name": "api_tag_expression_translate_post",
    "method": "POST",
    "url": "/api/tag/expression/translate"
  },
  // dmp活动与新功能浮层-alp数据 - 671#65705
  {
    "name": "dmp_new_guide_get",
    "method": "GET",
    "url": "https://mo.m.taobao.com/dmp_new_guide"
  },
  // 获取覆盖人数-自定义标签工厂 - 671#65903
  {
    "name": "api_analysis_insight_coverage_post",
    "method": "POST",
    "url": "/api/analysis/insight/coverage"
  },
  // /api/tag/group - 671#65924
  {
    "name": "api_tag_group_get",
    "method": "GET",
    "url": "/api/tag/group"
  },
  // /api/tag/own - 671#65968
  {
    "name": "api_tag_own_get",
    "method": "GET",
    "url": "/api/tag/own"
  },
  // /api/user/agreement - 671#66172
  {
    "name": "api_user_agreement_post",
    "method": "POST",
    "url": "/api/user/agreement"
  },
  // api/sms - 671#66276
  {
    "name": "api_sms_get",
    "method": "GET",
    "url": "/api/sms"
  },
  // api/sms/ - 671#66412
  {
    "name": "api_sms__get",
    "method": "GET",
    "url": "/api/sms/"
  },
  // 取消收藏标签 - 671#66413
  {
    "name": "api_tag_collect_$id_delete",
    "method": "DELETE",
    "url": "/api/tag/collect/"
  },
  // 收藏标签列表 - 671#66417
  {
    "name": "api_tag_collect_get",
    "method": "GET",
    "url": "/api/tag/collect"
  },
  // 获取店铺全年收入规划 - 671#67376
  {
    "name": "api_revenue_plan_get",
    "method": "GET",
    "url": "/api/revenue/plan"
  },
  // 渠道触点路径分析 - 671#67380
  {
    "name": "api_revenue_channel_get",
    "method": "GET",
    "url": "/api/revenue/channel"
  },
  // 店铺消费者资产 - 671#67391
  {
    "name": "api_revenue_assert_get",
    "method": "GET",
    "url": "/api/revenue/assert"
  },
  // /api/tag/forthcoming/offline - 671#68035
  {
    "name": "api_tag_forthcoming_offline_get",
    "method": "GET",
    "url": "/api/tag/forthcoming/offline"
  },
  // 人群包推荐(返回参数跟/api/crowd[GET]接口一样，也是返回人群信息，这里就不写出具返回参数了) - 671#68229
  {
    "name": "api_revenue_crowd_get",
    "method": "GET",
    "url": "/api/revenue/crowd"
  },
  // 渠道触点路径分析-行业相似店铺列表 - 671#68602
  {
    "name": "api_revenue_similar_shop_get",
    "method": "GET",
    "url": "/api/revenue/similar/shop"
  },
  // 获取店铺实际完成的GMV金额 - 671#68723
  {
    "name": "api_revenue_alipay_get",
    "method": "GET",
    "url": "/api/revenue/alipay"
  },
  // 编辑店铺年度收入规划目标 - 671#68727
  {
    "name": "api_revenue_plan_post",
    "method": "POST",
    "url": "/api/revenue/plan"
  },
  // 北极星-场景营销人群列表 - 671#69232
  {
    "name": "api_crowd_sceneMarketingCrowds_get",
    "method": "GET",
    "url": "/api/crowd/sceneMarketingCrowds"
  },
  // 达摩盘权益列表（（返回参数跟全部权益列表一致）） - 671#70289
  {
    "name": "api_power_center_all_get",
    "method": "GET",
    "url": "/api/power/center/all"
  },
  // 权益申请 - 671#70531
  {
    "name": "api_power_center_request_post",
    "method": "POST",
    "url": "/api/power/center/request"
  },
  // 准入条件列表（查看列表，当所有的powerStatus都是1时才能申请准入按钮） - 671#70540
  {
    "name": "api_power_center_access_condition_get",
    "method": "GET",
    "url": "/api/power/center/access/condition"
  },
  // 用户信息2 - 671#70543
  {
    "name": "api_setup_userinfo_get",
    "method": "GET",
    "url": "/api/setup/userinfo"
  },
  // api/setup/save - 671#70570
  {
    "name": "api_setup_save_post",
    "method": "POST",
    "url": "api/setup/save"
  },
  // 获取权益申请状态 - 671#70601
  {
    "name": "api_power_center_request_get",
    "method": "GET",
    "url": "/api/power/center/request"
  },
  // 广告主消耗金额值 - 671#70659
  {
    "name": "api_power_center_asset_get",
    "method": "GET",
    "url": "/api/power/center/asset"
  },
  // 是否满足下一层权益 - 671#70668
  {
    "name": "api_power_center_next_get",
    "method": "GET",
    "url": "/api/power/center/next"
  },
  // 最新上线标签接口（跟即将下线接口参数一样，返回值也是一样的） - 671#71646
  {
    "name": "api_tag_new_arrival_get",
    "method": "GET",
    "url": "/api/tag/new/arrival"
  },
  // test - 671#71759
  {
    "name": "openapi_param2_1_gateway.unionpub_report.getTbkOrderDetails_get",
    "method": "GET",
    "url": "/openapi/param2/1/gateway.unionpub/report.getTbkOrderDetails.json"
  },
  // 查询客户账号层级 - 671#71845
  {
    "name": "api_power_center_account_level_get",
    "method": "GET",
    "url": "/api/power/center/account/level"
  },
  // 获取用户渠道预估配置信息 - 671#72286
  {
    "name": "api_deliverpredict_config_get",
    "method": "GET",
    "url": "/api/deliverpredict/config"
  },
  // 更新用户渠道预估配置信息 - 671#72287
  {
    "name": "api_deliverpredict_config_post",
    "method": "POST",
    "url": "/api/deliverpredict/config"
  },
  // 标签市场渠道人数预估 - 671#72289
  {
    "name": "api_deliverpredict_market_post",
    "method": "POST",
    "url": "/api/deliverpredict/market"
  },
  // 洞察页面渠道人数预估（跟标签市场参数一致） - 671#72290
  {
    "name": "api_deliverpredict_insight_post",
    "method": "POST",
    "url": "/api/deliverpredict/insight"
  },
  // 关键词搜索（钻展、直通车、信息流） - 671#72293
  {
    "name": "api_deliverpredict_target_post",
    "method": "POST",
    "url": "/api/deliverpredict/target"
  },
  // 获取直通车推广单元列表 - 671#72294
  {
    "name": "api_deliverpredict_zhitongche_adgroup_get",
    "method": "GET",
    "url": "/api/deliverpredict/zhitongche/adgroup"
  },
  // 获取所有店铺信息 - 671#73671
  {
    "name": "api_user_find_get",
    "method": "GET",
    "url": "/api/user/find"
  },
  // odps创建一方标签 - 671#73687
  {
    "name": "api_data_odps_upload_post",
    "method": "POST",
    "url": "/api/data/odps/upload"
  },
  // odps表权限校验check接口 - 671#73688
  {
    "name": "api_odps_check_get",
    "method": "GET",
    "url": "/api/odps/check"
  },
  // 获取odps表字段信息columns - 671#73689
  {
    "name": "api_odps_columns_get",
    "method": "GET",
    "url": "/api/odps/columns"
  },
  // 查询消费者分布情况 - 671#73763
  {
    "name": "api_homepage_customer_distribution_get",
    "method": "GET",
    "url": "/api/homepage/customer/distribution"
  },
  // 添加人群至追踪列表 - 671#73789
  {
    "name": "api_crowd_track_put",
    "method": "PUT",
    "url": "/api/crowd/track"
  },
  // 查询人群追踪列表 - 671#73792
  {
    "name": "api_crowd_track_list_get",
    "method": "GET",
    "url": "/api/crowd/track/list"
  },
  // 追踪人群操作 - 671#73797
  {
    "name": "api_crowd_track_operate_post",
    "method": "POST",
    "url": "/api/crowd/track/operate"
  },
  // 查看人群追踪报告 - 671#73801
  {
    "name": "api_crowd_track_report_get",
    "method": "GET",
    "url": "/api/crowd/track/report"
  },
  // 查看人群追踪详情 - 671#74234
  {
    "name": "api_crowd_track_detail_get",
    "method": "GET",
    "url": "/api/crowd/track/detail"
  },
  // 查询匹配点位列表 - 671#74516
  {
    "name": "api_lbs_poi_get",
    "method": "GET",
    "url": "/api/lbs/poi"
  },
  // 批量上传查询点位列表 - 671#74533
  {
    "name": "api_lbs_upload_post",
    "method": "POST",
    "url": "/api/lbs/upload"
  },
  // 下载批量上传数据模板 - 671#74537
  {
    "name": "api_lbs_template_get",
    "method": "GET",
    "url": "/api/lbs/template"
  },
  // 下载批量解析出错数据 - 671#74538
  {
    "name": "api_lbs_fail_get",
    "method": "GET",
    "url": "/api/lbs/fail"
  },
  // 具体门店圈人人群预估 - 671#74539
  {
    "name": "api_analysis_coverage_get",
    "method": "GET",
    "url": "/api/analysis/coverage"
  },
  // 获取实时标签 - 671#74697
  {
    "name": "api_tag_realtime_get",
    "method": "GET",
    "url": "/api/tag/realtime"
  },
  // 拿帮助文档的一级目录 数据 - 671#75339
  {
    "name": "api_directory_getTree_get",
    "method": "GET",
    "url": "https://zhitongche.taobao.com/api/directory/getTree.json"
  },
  // 帮助文档的二级文章列表 - 671#75342
  {
    "name": "api_commoncontent_findContents_get",
    "method": "GET",
    "url": "https://zhitongche.taobao.com/api/commoncontent/findContents.json"
  },
  // 拿帮助文档的每篇文章内容 - 671#75343
  {
    "name": "api_commoncontent_getContent_get",
    "method": "GET",
    "url": "https://zhitongche.taobao.com/api/commoncontent/getContent.json"
  },
  // 查询品牌接口 - 671#75512
  {
    "name": "api_puti_report_brand_aipl_brand_get",
    "method": "GET",
    "url": "/api/puti/report_brand_aipl_brand"
  },
  // 查询类目接口 - 671#75513
  {
    "name": "api_puti_report_brand_aipl_brand_cat_get",
    "method": "GET",
    "url": "/api/puti/report_brand_aipl_brand_cat"
  },
  // 人群相似度计算 - 671#77159
  {
    "name": "api_analysis_crowd_similarity_post",
    "method": "POST",
    "url": "/api/analysis/crowd/similarity"
  },
  // 东风品牌代理商 - 671#77856
  {
    "name": "api_deliver_dongfeng_brand_get",
    "method": "GET",
    "url": "/api/deliver/dongfeng/brand"
  },
  // 多分组透视分析 - 671#79365
  {
    "name": "api_analysis_chart_post",
    "method": "POST",
    "url": "/api/analysis/chart"
  },
  // /api/data/csv/upload - 671#79442
  {
    "name": "api_data_csv_upload_post",
    "method": "POST",
    "url": "/api/data/csv/upload"
  },
  // /api/user/extra - 671#79948
  {
    "name": "api_user_extra_get",
    "method": "GET",
    "url": "/api/user/extra"
  },
  // 新手引导alp配置 - 671#79950
  {
    "name": "dmp_newbie_guide_get",
    "method": "GET",
    "url": "https://mo.m.taobao.com/dmp_newbie_guide"
  },
  // 新手引导关闭状态保存 - 671#79954
  {
    "name": "api_user_newbie_guide_2_0_2_post",
    "method": "POST",
    "url": "/api/user/newbie_guide_2_0_2"
  },
  // 获取用户对应的品牌列表 - 671#79999
  {
    "name": "api_databank_aipl_get",
    "method": "GET",
    "url": "/api/databank/aipl"
  },
  // 申请品牌aipl权限 - 671#80000
  {
    "name": "api_databank_aipl_apply_post",
    "method": "POST",
    "url": "/api/databank/aipl/apply"
  },
  // /api/user/tag/private - 671#80420
  {
    "name": "api_user_tag_private_post",
    "method": "POST",
    "url": "/api/user/tag/private"
  },
  // 模板列表接口-获取业务线列表 - 671#81252
  {
    "name": "api_operation_template_business_type_list_get",
    "method": "GET",
    "url": "/api/operation/template/business/type/list"
  },
  // 模板列表接口-模板查询接口 - 671#81253
  {
    "name": "api_operation_template_find_get",
    "method": "GET",
    "url": "/api/operation/template/find"
  },
  // 商家组查询-查询当前小二可见的所有商家组 - 671#81280
  {
    "name": "user_rule_listGroupByEmp_get",
    "method": "GET",
    "url": "https://mama.alibaba-inc.com/user/rule/listGroupByEmp.json"
  },
  // 客户查询-查询小二的关注组列表 - 671#81281
  {
    "name": "user_follow_listGroupByEmp_get",
    "method": "GET",
    "url": "https://mama.alibaba-inc.com/user/follow/listGroupByEmp.json"
  },
  // 模板列表接口-生成人群包 - 671#81282
  {
    "name": "api_operation_crowd_package_create_post",
    "method": "POST",
    "url": "/api/operation/crowd/package/create"
  },
  // 活动管理-上传文件 - 671#81287
  {
    "name": "user_file_upload_post",
    "method": "POST",
    "url": "https://mama.alibaba-inc.com/user/file/upload.json"
  },
  // 人群包管理-查询人群包列表 - 671#81290
  {
    "name": "api_operation_crowd_package_find_get",
    "method": "GET",
    "url": "/api/operation/crowd/package/find"
  },
  // 人群包管理-人群包删除 - 671#81295
  {
    "name": "api_operation_crowd_package_$id_delete_delete",
    "method": "DELETE",
    "url": "/api/operation/crowd/package/"
  },
  // 人群包管理-人群包预跑 - 671#81297
  {
    "name": "api_operation_crowd_package_$id_prerun_get",
    "method": "GET",
    "url": "/api/operation/crowd/package/"
  },
  // 渠道管理-获取所有可用渠道 - 671#81299
  {
    "name": "api_operation_channel_find_get",
    "method": "GET",
    "url": "/api/operation/channel/find"
  },
  // 人群包管理-人群包授权 - 671#81301
  {
    "name": "api_operation_crowd_package_$id_push_put",
    "method": "PUT",
    "url": "/api/operation/crowd/package/"
  },
  // 人群包管理-设置人群包过滤 - 671#81303
  {
    "name": "api_operation_crowd_package_$id_filter_put",
    "method": "PUT",
    "url": "/api/operation/crowd/package/"
  },
  // 人群包管理-人群包详情 - 671#81306
  {
    "name": "api_operation_crowd_package_$id_detail_get",
    "method": "GET",
    "url": "/api/operation/crowd/package/"
  },
  // 人群规则编辑-人群规则查询 - 671#81307
  {
    "name": "api_operation_crowd_rule_get",
    "method": "GET",
    "url": "/api/operation/crowd/rule"
  },
  // 模板列表接口-新建模板 - 671#81308
  {
    "name": "api_operation_template_create_post",
    "method": "POST",
    "url": "/api/operation/template/create"
  },
  // 模板列表接口-模板编辑接口 - 671#81309
  {
    "name": "api_operation_template_edit_put",
    "method": "PUT",
    "url": "/api/operation/template/edit"
  },
  // 人群规则编辑-可使用宏名称列表 - 671#81374
  {
    "name": "api_operation_crowd_rule_macro_get",
    "method": "GET",
    "url": "/api/operation/crowd/rule/macro"
  },
  // 人群规则编辑-创建人群规则 - 671#81380
  {
    "name": "api_operation_crowd_rule_post",
    "method": "POST",
    "url": "/api/operation/crowd/rule"
  },
  // 人群规则编辑-人群规则编辑 - 671#81381
  {
    "name": "api_operation_crowd_rule_put",
    "method": "PUT",
    "url": "/api/operation/crowd/rule"
  },
  // 提交一个人群聚类任务 - 671#81816
  {
    "name": "api_cluster_submitClusterTask_post",
    "method": "POST",
    "url": "/api/cluster/submitClusterTask"
  },
  // 查询特定用户聚类任务执行状态 - 671#81820
  {
    "name": "api_cluster_queryClusterTask_get",
    "method": "GET",
    "url": "/api/cluster/queryClusterTask"
  },
  // 获得一次人群聚类任务的结果概览 - 671#81822
  {
    "name": "api_cluster_queryOverviewResult_get",
    "method": "GET",
    "url": "/api/cluster/queryOverviewResult"
  },
  // 获得某次人群聚类中某个人群子类的详细信息 - 671#81827
  {
    "name": "api_cluster_queryDetailResult_get",
    "method": "GET",
    "url": "/api/cluster/queryDetailResult"
  },
  // 提交一个商品智能推荐任务 - 671#81860
  {
    "name": "api_cluster_recommend_post",
    "method": "POST",
    "url": "/api/cluster/recommend"
  },
  // 查询特定用户所有商品智能推荐任务的状态 - 671#81862
  {
    "name": "api_cluster_queryRecommend_get",
    "method": "GET",
    "url": "/api/cluster/queryRecommend"
  },
  // 提交一个用户扩增任务 - 671#81864
  {
    "name": "api_cluster_userExtension_post",
    "method": "POST",
    "url": "/api/cluster/userExtension"
  },
  // 查询特定用户所有扩增任务的状态 - 671#81868
  {
    "name": "api_cluster_queryExtensionTask_get",
    "method": "GET",
    "url": "/api/cluster/queryExtensionTask"
  },
  // 通过子群篮创建人群&不使用策略创建人群 - 671#82072
  {
    "name": "api_cluster_createCrowd_post",
    "method": "POST",
    "url": "/api/cluster/createCrowd"
  },
  // 计算子群篮的人数 - 671#82074
  {
    "name": "api_cluster_countClusterNumber_get",
    "method": "GET",
    "url": "/api/cluster/countClusterNumber"
  },
  // 行业常用标签=拉新场景标签 - 671#82367
  {
    "name": "api_tag_industry_frequency_get",
    "method": "GET",
    "url": "/api/tag/industry/frequency"
  },
  // 热点标签 - 671#82368
  {
    "name": "api_tag_keyword_hot_get",
    "method": "GET",
    "url": "/api/tag/keyword/hot"
  },
  // 获取服务商授权的商家列表 - 671#82506
  {
    "name": "api_isv_advList_get",
    "method": "GET",
    "url": "/api/isv/advList"
  },
  // 人群包管理-人群包预跑结果查看副本 - 671#82539
  {
    "name": "api_operation_crowd_package_$id_result_get",
    "method": "GET",
    "url": "/api/operation/crowd/package/"
  },
  // 商家版授权人群给小二版 - 671#82548
  {
    "name": "api_crowd_sync_x2_post",
    "method": "POST",
    "url": "/api/crowd/sync_x2"
  },
  // 删除商家版授权小二版 - 671#82550
  {
    "name": "api_crowd_sync_x2_delete",
    "method": "DELETE",
    "url": "/api/crowd/sync_x2"
  },
  // 小二版上获取已授权的人群列表 - 671#82551
  {
    "name": "api_crowd_sync_x2_get",
    "method": "GET",
    "url": "/api/crowd/sync_x2"
  },
  // 商家人群人群转标签 - 671#82553
  {
    "name": "api_data_crowd_upload_post",
    "method": "POST",
    "url": "/api/data/crowd/upload"
  },
  // 店铺常用标签=老客维系标签 - 671#82624
  {
    "name": "api_tag_shop_frequency_get",
    "method": "GET",
    "url": "/api/tag/shop/frequency"
  },
  // 删除模板 - 671#82669
  {
    "name": "api_operation_template_$id_delete",
    "method": "DELETE",
    "url": "/api/operation/template/"
  },
  // 获取可推送主营类目列表 - 671#83029
  {
    "name": "api_operation_category_main_list_get",
    "method": "GET",
    "url": "/api/operation/category/main/list"
  },
  // 人群询量前置同步 - 671#83040
  {
    "name": "api_analysis_crowd_inventory_dump_post",
    "method": "POST",
    "url": "/api/analysis/crowd/inventory/dump"
  },
  // LBS圈楼-查询覆盖楼宇数 - 671#83179
  {
    "name": "api_lbsBuilding_count_post",
    "method": "POST",
    "url": "/api/lbsBuilding/count"
  },
  // LBS圈楼-创建楼宇包 - 671#83182
  {
    "name": "api_lbsBuilding_create_post",
    "method": "POST",
    "url": "/api/lbsBuilding/create"
  },
  // 商家主营类目信息 - 671#83215
  {
    "name": "api_user_shop_cate_get",
    "method": "GET",
    "url": "/api/user/shop/cate"
  },
  // LBS圈楼-修改楼宇包 - 671#83459
  {
    "name": "api_lbsBuilding_modify_$id_put",
    "method": "PUT",
    "url": "/api/lbsBuilding/modify/"
  },
  // 运营编辑接口 - 671#83644
  {
    "name": "dmp__get",
    "method": "GET",
    "url": "https://mo.m.taobao.com/dmp/"
  },
  // 首页/人群拓展页-分析显著特征副本 - 671#84162
  {
    "name": "api_analysis_feature_post",
    "method": "POST",
    "url": "/api/analysis/feature"
  },
  // 显著特征列表副本 - 671#84164
  {
    "name": "api_analysis_tag_list_post",
    "method": "POST",
    "url": "/api/analysis/tag/list"
  },
  // 标签人群绑定 - 671#84261
  {
    "name": "api_tag_crowd_bind_post",
    "method": "POST",
    "url": "/api/tag/crowd/bind"
  },
  // 行业全量 - 671#84581
  {
    "name": "api_analysis_shop_main_cate_get",
    "method": "GET",
    "url": "/api/analysis/shop/main/cate"
  },
  // ISV版协议签署副本 - 671#84684
  {
    "name": "api_user_isvagreement_post",
    "method": "POST",
    "url": "/api/user/isvagreement"
  },
  // 品牌人群是否允许被编辑 - 671#84703
  {
    "name": "api_crowd_$id_edit_check_get",
    "method": "GET",
    "url": "/api/crowd/"
  },
  // 人群加速 - 671#86603
  {
    "name": "api_crowd_$id_accelerate_post",
    "method": "POST",
    "url": "/api/crowd/"
  },
  // 查询优选店铺码表 - 671#88060
  {
    "name": "api_dict_preference_shop_get",
    "method": "GET",
    "url": "/api/dict/preference/shop"
  },
  // 查询优选品牌码表 - 671#88061
  {
    "name": "api_dict_preference_brand_get",
    "method": "GET",
    "url": "/api/dict/preference/brand"
  },
  // 创建优选人群 - 671#88063
  {
    "name": "api_crowd_备用_post",
    "method": "POST",
    "url": "/api/crowd/备用"
  },
  // 首页标签推荐模块动态配置选项 - 671#89046
  {
    "name": "api_tag_homepage_config_get",
    "method": "GET",
    "url": "/api/tag/homepage/config"
  },
  // 标签排行榜 - 671#89071
  {
    "name": "api_tag_rank_list_get",
    "method": "GET",
    "url": "/api/tag/rank/list"
  },
  // 店铺类目信息 - 671#89110
  {
    "name": "api_shop_cate_get",
    "method": "GET",
    "url": "/api/shop/cate"
  },
  // aipl二级类目 - 671#89296
  {
    "name": "api_databank_aipl_cate_get",
    "method": "GET",
    "url": "/api/databank/aipl/cate"
  },
  // 人群加速接口 - 671#89477
  {
    "name": "api_crowd_accelerate_task_post",
    "method": "POST",
    "url": "/api/crowd/accelerate/task"
  },
  // 洞察标签列表 - 671#89509
  {
    "name": "api_tag_analysisTag_get",
    "method": "GET",
    "url": "/api/tag/analysisTag"
  },
  // 查询标签授权信息 - 671#89510
  {
    "name": "api_tag_findTagEmpower_get",
    "method": "GET",
    "url": "/api/tag/findTagEmpower"
  },
  // 标签授权 - 671#89515
  {
    "name": "api_tag_saveTagEmpower_post",
    "method": "POST",
    "url": "/api/tag/saveTagEmpower"
  },
  // 查找小二 - 671#89516
  {
    "name": "api_user_findEmployee_get",
    "method": "GET",
    "url": "/api/user/findEmployee"
  },
  // 标签修改 - 671#89517
  {
    "name": "api_tag_analysisTag_$id_modify_put",
    "method": "PUT",
    "url": "/api/tag/analysisTag/"
  },
  // 标签删除 - 671#89518
  {
    "name": "api_tag_analysisTag_$id_delete_delete",
    "method": "DELETE",
    "url": "/api/tag/analysisTag/"
  },
  // 水印 - 671#92219
  {
    "name": "api_userconfig_waterprint_get",
    "method": "GET",
    "url": "/api/userconfig/waterprint"
  },
  // 标签推荐渠道配置 - 671#92695
  {
    "name": "api_tag_deliver_config_get",
    "method": "GET",
    "url": "/api/tag/deliver/config"
  },
  // 店铺主营类目id - 671#92885
  {
    "name": "api_shop_main_cate_get",
    "method": "GET",
    "url": "/api/shop/main/cate"
  },
  // /api/crowd - 671#93502
  {
    "name": "api_crowd_get",
    "method": "GET",
    "url": "/api/crowd"
  },
  // /api/isv/crowdlist - 671#93503
  {
    "name": "api_isv_crowdlist_get",
    "method": "GET",
    "url": "/api/isv/crowdlist"
  },
  // /api/isv/crowd/app - 671#93838
  {
    "name": "api_isv_crowd_app_post",
    "method": "POST",
    "url": "/api/isv/crowd/app"
  },
  // /api/crowd/appUser/ isv版本 - 671#94131
  {
    "name": "api_isv_crowd_appUser__get",
    "method": "GET",
    "url": "/api/isv/crowd/appUser/"
  },
  // /api/deliverapp/deliverapplist isv版本 - 671#94132
  {
    "name": "api_isv_deliverapp_deliverapplist_get",
    "method": "GET",
    "url": "/api/isv/deliverapp/deliverapplist"
  },
  // 查询优选宝贝码表副本 - 671#98660
  {
    "name": "api_dict_preference_item_get",
    "method": "GET",
    "url": "/api/dict/preference/item"
  },
  // 获取标签分组列表 - 671#99907
  {
    "name": "${appone}_api_dmp_tag_group_list_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/tag/group/list.json"
  },
  // 标签选项搜索查询 - 671#99924
  {
    "name": "${appone}_api_dmp_tag_option_list_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/tag/option/list.json"
  },
  // 创建人群 - 671#99940
  {
    "name": "${appone}_api_dmp_crowd_create_post",
    "method": "POST",
    "url": "/${appone}/api/dmp/crowd/create.json"
  },
  // 人群预估 - 671#99966
  {
    "name": "${appone}_api_dmp_analysis_coverage_post",
    "method": "POST",
    "url": "/${appone}/api/dmp/analysis/coverage.json"
  },
  // /api/tag/:id/option - 671#99995
  {
    "name": "api_tag_$id_option_get",
    "method": "GET",
    "url": "/api/tag/"
  },
  // 获取标签详情 - 671#100011
  {
    "name": "${appone}_api_dmp_tag_get_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/tag/get.json"
  },
  // 达摩盘人群转换业务线人群 - 671#100041
  {
    "name": "${appone}_api_dmp_crowd_convert_post",
    "method": "POST",
    "url": "/${appone}/api/dmp/crowd/convert.json"
  },
  // 获取人群详情 - 671#101107
  {
    "name": "${appone}_api_dmp_crowd_get_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/crowd/get.json"
  },
  // 人群列表 - 671#101596
  {
    "name": "${appone}_api_dmp_crowd_list_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/crowd/list.json"
  },
  // 删除人群 - 671#101598
  {
    "name": "${appone}_api_dmp_crowd_delete_post",
    "method": "POST",
    "url": "/${appone}/api/dmp/crowd/delete.json"
  },
  // 修改人群 - 671#101756
  {
    "name": "${appone}_api_dmp_crowd_modify_post",
    "method": "POST",
    "url": "/${appone}/api/dmp/crowd/modify.json"
  },
  // 圈人界面-广告预估-覆盖数ctr等计算 - 671#101973
  {
    "name": "api_ad_predict__post",
    "method": "POST",
    "url": "/api/ad/predict/"
  },
  // 圈人界面-广告预估-直通车关键词搜索 - 671#102091
  {
    "name": "api_ad_predict_keyword_get",
    "method": "GET",
    "url": "/api/ad/predict/keyword"
  },
  // 返回旧版信息收集 - 671#103095
  {
    "name": "api_user_old_version_post",
    "method": "POST",
    "url": "/api/user/old/version"
  },
  // 提交一个场景圈人任务 - 671#104073
  {
    "name": "api_scenario_cluster_addTask_post",
    "method": "POST",
    "url": "/api/scenario/cluster/addTask"
  },
  // 列出所有场景圈人 - 671#104133
  {
    "name": "api_scenario_cluster_list_get",
    "method": "GET",
    "url": "/api/scenario/cluster/list"
  },
  // 查看一个场景聚类任务结果 - 671#104153
  {
    "name": "api_scenario_cluster_view_get",
    "method": "GET",
    "url": "/api/scenario/cluster/view"
  },
  // 查询权限 - 671#104168
  {
    "name": "${appone}_api_dmp_permission_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/permission.json"
  },
  // 查看显著特征详情 - 671#104170
  {
    "name": "api_scenario_cluster_detail_get",
    "method": "GET",
    "url": "/api/scenario/cluster/detail"
  },
  // 直接生成人群 - 671#104171
  {
    "name": "api_scenario_cluster_createCrowd_post",
    "method": "POST",
    "url": "/api/scenario/cluster/createCrowd"
  },
  // 人群智能扩展 - 671#104176
  {
    "name": "api_scenario_cluster_expand_post",
    "method": "POST",
    "url": "/api/scenario/cluster/expand"
  },
  // 删除一个场景圈人任务 - 671#104293
  {
    "name": "api_scenario_cluster_delete_post",
    "method": "POST",
    "url": "/api/scenario/cluster/delete"
  },
  // 标签推荐 - 671#104321
  {
    "name": "${appone}_api_dmp_tag_recommend_list_post",
    "method": "POST",
    "url": "/${appone}/api/dmp/tag/recommend/list.json"
  },
  // 人群模板 - 671#104358
  {
    "name": "${appone}_api_dmp_crowd_template_list_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/crowd/template/list.json"
  },
  // 广告效果数据预估 - 671#104392
  {
    "name": "${appone}_api_dmp_analysis_adpredict_post",
    "method": "POST",
    "url": "/${appone}/api/dmp/analysis/adpredict.json"
  },
  // 人群覆盖数目 - 671#104394
  {
    "name": "api_scenario_cluster_coverage_post",
    "method": "POST",
    "url": "/api/scenario/cluster/coverage"
  },
  // 广告预估 - 671#104416
  {
    "name": "api_scenario_cluster_predict_post",
    "method": "POST",
    "url": "/api/scenario/cluster/predict"
  },
  // 数据查询工具服务 - 671#104442
  {
    "name": "${appone}_api_dmp_tool_extradata_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/tool/extradata.json"
  },
  // 达摩盘高阶版通用标签推荐 - 671#104519
  {
    "name": "api_tag_common_recommend_post",
    "method": "POST",
    "url": "/api/tag/common/recommend"
  },
  // 获取店铺下所有宝贝列表 - 671#105055
  {
    "name": "api_scenario_cluster_getItems_get",
    "method": "GET",
    "url": "/api/scenario/cluster/getItems"
  },
  // 获取种子人群覆盖数 - 671#105974
  {
    "name": "api_scenario_cluster_seedCoverage_post",
    "method": "POST",
    "url": "/api/scenario/cluster/seedCoverage"
  },
  // 获取用户目前已经消耗的quota - 671#106647
  {
    "name": "api_scenario_cluster_getUsedQuota_get",
    "method": "GET",
    "url": "/api/scenario/cluster/getUsedQuota"
  },
  // 重跑任务 - 671#106876
  {
    "name": "api_scenario_cluster_reRun_post",
    "method": "POST",
    "url": "/api/scenario/cluster/reRun"
  },
  // 获取同步渠道详情 - 671#107077
  {
    "name": "api_deliverapp_xMemberDetail_get",
    "method": "GET",
    "url": "/api/deliverapp/xMemberDetail"
  },
  // 新建洞察计划 - 671#108310
  {
    "name": "api_analysis_plan_post",
    "method": "POST",
    "url": "/api/analysis/plan"
  },
  // 删除洞察计划 - 671#108326
  {
    "name": "api_analysis_plan_$id_delete",
    "method": "DELETE",
    "url": "/api/analysis/plan/"
  },
  // 查询洞察计划 - 671#108328
  {
    "name": "api_analysis_plan_get",
    "method": "GET",
    "url": "/api/analysis/plan"
  },
  // 修改洞察计划 - 671#108329
  {
    "name": "api_analysis_plan_$id_put",
    "method": "PUT",
    "url": "/api/analysis/plan/"
  },
  // 东风品牌代理商接口 - 671#121048
  {
    "name": "api_crowd_dongfeng_brands_get",
    "method": "GET",
    "url": "/api/crowd/dongfeng/brands"
  },
  // ISV版协议签署新 - 671#123992
  {
    "name": "api_user_agreement_2_0_post",
    "method": "POST",
    "url": "/api/user/agreement_2_0"
  },
  // 单品诊断获取文本信息 - 671#125772
  {
    "name": "api_scenario_cluster_insightItem_get",
    "method": "GET",
    "url": "/api/scenario/cluster/insightItem"
  },
  // 人群分类投放效果 - 671#125825
  {
    "name": "api_scenario_cluster_effect_get",
    "method": "GET",
    "url": "/api/scenario/cluster/effect"
  },
  // 新老标签映射关系 - 671#126526
  {
    "name": "api_tag_mapping_get",
    "method": "GET",
    "url": "/api/tag/mapping"
  },
  // 老版下线-标签需求反馈 - 671#126671
  {
    "name": "api_user_tag_requirement_feedback_post",
    "method": "POST",
    "url": "/api/user/tag/requirement/feedback"
  },
  // 商家权益信息概要 - 671#128203
  {
    "name": "api_power_center_user_get",
    "method": "GET",
    "url": "/api/power/center/user"
  },
  // 一键申请全部权益 - 671#128711
  {
    "name": "api_power_center_request_all_post",
    "method": "POST",
    "url": "/api/power/center/request/all"
  },
  // 新老人群总量接口 - 671#129792
  {
    "name": "api_crowd_oldnew_count_get",
    "method": "GET",
    "url": "/api/crowd/oldnew/count"
  },
  // 广告主拥有的权益列表 - 671#130719
  {
    "name": "api_power_center_own_get",
    "method": "GET",
    "url": "/api/power/center/own"
  },
  // 获取店铺一级类目与二级类目 - 671#131859
  {
    "name": "api_scenario_cluster_category_get",
    "method": "GET",
    "url": "/api/scenario/cluster/category"
  },
  // 不再提示升降级提醒 - 671#131863
  {
    "name": "api_power_center_noprompt_post",
    "method": "POST",
    "url": "/api/power/center/noprompt"
  },
  // 人群智能迭代红黑榜 - 671#132737
  {
    "name": "api_scenario_cluster_updateLook_get",
    "method": "GET",
    "url": "/api/scenario/cluster/updateLook"
  },
  // 编辑一个人群有效期和名称 - 671#132830
  {
    "name": "api_scenario_cluster_editCrowd_post",
    "method": "POST",
    "url": "/api/scenario/cluster/editCrowd"
  },
  // 老版人群对应的新版本结构 - 671#133488
  {
    "name": "api_crowd_$id_new_set_get",
    "method": "GET",
    "url": "/api/crowd/"
  },
  // 人群迭代功能打开或者关闭 - 671#134437
  {
    "name": "api_scenario_cluster_updateChange_post",
    "method": "POST",
    "url": "/api/scenario/cluster/updateChange"
  },
  // /api/tag/topic/get - 671#135730
  {
    "name": "api_tag_topic_get_get",
    "method": "GET",
    "url": "/api/tag/topic/get"
  },
  // 行业直播人群覆盖 - 671#136531
  {
    "name": "api_live_industry_info_get",
    "method": "GET",
    "url": "/api/live/industry/info"
  },
  // 行业直播优选圈人-计算扩展方向人群量 - 671#136533
  {
    "name": "api_live_industry_coverage_post",
    "method": "POST",
    "url": "/api/live/industry/coverage"
  },
  // 行业直播优选圈人-实时扩展 - 671#136536
  {
    "name": "api_live_industry_pick_post",
    "method": "POST",
    "url": "/api/live/industry/pick"
  },
  // 单品列表 - 671#136537
  {
    "name": "api_live_item_get",
    "method": "GET",
    "url": "/api/live/item"
  },
  // 店铺直播人群覆盖 - 671#136539
  {
    "name": "api_live_shop_info_get",
    "method": "GET",
    "url": "/api/live/shop/info"
  },
  // 关键人群特征洞察-基础特征模式 - 671#136540
  {
    "name": "api_live_shop_insightBasic_get",
    "method": "GET",
    "url": "/api/live/shop/insightBasic"
  },
  // 智能扩展人群-计算扩展方向人群数 - 671#136595
  {
    "name": "api_live_shop_coverage_post",
    "method": "POST",
    "url": "/api/live/shop/coverage"
  },
  // 智能扩展人群-实时扩展 - 671#136597
  {
    "name": "api_live_shop_pick_post",
    "method": "POST",
    "url": "/api/live/shop/pick"
  },
  // 获取扩展方向的默认选项值 - 671#136681
  {
    "name": "api_live_getExtensionTag_get",
    "method": "GET",
    "url": "/api/live/getExtensionTag"
  },
  // 人群策略分析获取分析维度标签 - 671#137279
  {
    "name": "api_live_industry_feature_get",
    "method": "GET",
    "url": "/api/live/industry/feature"
  },
  // 关键人群特征洞察-对比模式 - 671#137311
  {
    "name": "api_live_shop_insightCompare_get",
    "method": "GET",
    "url": "/api/live/shop/insightCompare"
  },
  // 获取直播分析人群预测 - 671#138603
  {
    "name": "api_live_predict_post",
    "method": "POST",
    "url": "/api/live/predict"
  },
  // 大促人群轮播混动 - 671#139445
  {
    "name": "api_crowd_promotion_roll_get",
    "method": "GET",
    "url": "/api/crowd/promotion/roll"
  },
  // 不同类目下标签使用量汇总数据 - 671#139454
  {
    "name": "api_tag_promotion_profile_get",
    "method": "GET",
    "url": "/api/tag/promotion/profile"
  },
  // 获得一个用户是否为白名单用户 - 671#139918
  {
    "name": "api_scenario_cluster_checkIfWhiteList_get",
    "method": "GET",
    "url": "/api/scenario/cluster/checkIfWhiteList"
  },
  // 达摩盘精选人群榜单，包含榜单下人群模板 - 671#140248
  {
    "name": "${appone}_api_dmp_crowd_findJxTemplateTopics_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/crowd/findJxTemplateTopics.json"
  },
  // 达摩盘精选人群模版预估覆盖人数 - 671#140279
  {
    "name": "${appone}_api_dmp_crowd_countJxTemplateCoverage_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/crowd/countJxTemplateCoverage.json"
  },
  // 使用模版生成人群 - 671#140280
  {
    "name": "${appone}_api_dmp_crowd_applyJxTemplate_post",
    "method": "POST",
    "url": "/${appone}/api/dmp/crowd/applyJxTemplate.json"
  },
  // 达摩盘精选查询已添加人群 - 671#140288
  {
    "name": "${appone}_api_dmp_crowd_findJxCrowd_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/crowd/findJxCrowd.json"
  },
  // 报表-顶部指标 - 671#140338
  {
    "name": "api_promotion_double11_report_get",
    "method": "GET",
    "url": "/api/promotion/double11/report"
  },
  // 报表-顶部指标-趋势图 - 671#140342
  {
    "name": "api_promotion_double11_report_daily_get",
    "method": "GET",
    "url": "/api/promotion/double11/report/daily"
  },
  // 标签集-数据效果 - 671#140389
  {
    "name": "api_promotion_double11_tagGroupReport_get",
    "method": "GET",
    "url": "/api/promotion/double11/tagGroupReport"
  },
  // 标签集-数据效果-趋势图 - 671#140391
  {
    "name": "api_promotion_double11_tagGroupReport_daily_get",
    "method": "GET",
    "url": "/api/promotion/double11/tagGroupReport/daily"
  },
  // 精选人群转换层业务能使用的人群 - 671#141030
  {
    "name": "${appone}_api_dmp_crowd_jxconvert_post",
    "method": "POST",
    "url": "/${appone}/api/dmp/crowd/jxconvert.json"
  },
  // 查询模版使用情况（轮播） - 671#142069
  {
    "name": "${appone}_api_dmp_crowd_findJxTemplateUsage_get",
    "method": "GET",
    "url": "/${appone}/api/dmp/crowd/findJxTemplateUsage.json"
  },
  // 示例接口 - 671#142677
  {
    "name": "example_1600086175066_get",
    "method": "GET",
    "url": "/example/1600086175066"
  },
  // 指标概览 - 671#144530
  {
    "name": "api_report_overview_get",
    "method": "GET",
    "url": "/api/report/overview"
  },
  // 指标趋势图 - 671#144547
  {
    "name": "api_report_indicator_trend_get",
    "method": "GET",
    "url": "/api/report/indicator/trend"
  },
  // 人群周使用数&消费者分层 - 671#144548
  {
    "name": "api_report_usagelayer_get",
    "method": "GET",
    "url": "/api/report/usagelayer"
  },
  // 人群周使用数&消费者分层柱状趋势图 - 671#144552
  {
    "name": "api_report_usagelayer_trend_get",
    "method": "GET",
    "url": "/api/report/usagelayer/trend"
  },
  // 渠道列表 - 671#144554
  {
    "name": "api_report_channel_list_get",
    "method": "GET",
    "url": "/api/report/channel/list"
  },
  // 人群列表 - 671#144555
  {
    "name": "api_report_crowd_list_get",
    "method": "GET",
    "url": "/api/report/crowd/list"
  },
  // 渠道投放计划列表 - 671#144596
  {
    "name": "api_report_campaign_list_get",
    "method": "GET",
    "url": "/api/report/campaign/list"
  },
  // 渠道投放人群列表推荐 - 671#145266
  {
    "name": "api_report_channel_crowdlist_get",
    "method": "GET",
    "url": "/api/report/channel/crowdlist"
  },
  // 检查是否有扩展权限 - 671#145392
  {
    "name": "api_live_checkIfEmpower_get",
    "method": "GET",
    "url": "/api/live/checkIfEmpower"
  },
  // 渠道投放漏斗分析 - 671#145555
  {
    "name": "api_report_channel_funnel_get",
    "method": "GET",
    "url": "/api/report/channel/funnel"
  },
  // 获取最近一个分区时间 - 671#145689
  {
    "name": "api_live_getLatestDS_get",
    "method": "GET",
    "url": "/api/live/getLatestDS"
  },
  // 直播修改人群 - 671#145690
  {
    "name": "api_live_editCrowd_post",
    "method": "POST",
    "url": "/api/live/editCrowd"
  },
  // 通用指标列表 - 671#146184
  {
    "name": "api_report_indicators_get",
    "method": "GET",
    "url": "/api/report/indicators"
  },
  // 用户主营类目 - 671#146526
  {
    "name": "api_report_maincat_get",
    "method": "GET",
    "url": "/api/report/maincat"
  },
  // 获取ADC配置的crossConfigs - 671#147472
  {
    "name": "cdn_version_adc_get",
    "method": "GET",
    "url": "/cdn/version/adc"
  },
  // 获取用户最近的有数据的日期 - 671#148586
  {
    "name": "api_report_thelatestdate_get",
    "method": "GET",
    "url": "/api/report/thelatestdate"
  },
  // 报表首页能获取数据的最大日期 - 671#149574
  {
    "name": "api_homepage_max_date_get",
    "method": "GET",
    "url": "/api/homepage/max/date"
  },
  // 进入大促专题页登记 - 671#150848
  {
    "name": "api_user_promotionpage_post",
    "method": "POST",
    "url": "/api/user/promotionpage"
  },
  // 获取扩展方向列表 - 671#153189
  {
    "name": "api_scenario_cluster_getExtensionTag_get",
    "method": "GET",
    "url": "/api/scenario/cluster/getExtensionTag"
  },
  // 人群列表下载 - 671#154603
  {
    "name": "api_report_crowd_list_download_get",
    "method": "GET",
    "url": "/api/report/crowd/list/download"
  },
  // 创建标签选项夹 - 671#154847
  {
    "name": "api_tag_option_pack_post",
    "method": "POST",
    "url": "/api/tag/option/pack"
  },
  // 获取创建的标签选项夹 - 671#154863
  {
    "name": "api_tag_option_pack_get",
    "method": "GET",
    "url": "/api/tag/option/pack"
  },
  // 删除标签选项夹 - 671#154873
  {
    "name": "api_tag_option_pack_$id_delete",
    "method": "DELETE",
    "url": "/api/tag/option/pack/"
  },
  // 人群列表--触发小二人群同步达摩盘 - 671#156214
  {
    "name": "api_employer_proxy_crowd_sync_dmp_post",
    "method": "POST",
    "url": "/api/employer/proxy/crowd/sync/dmp"
  },
  // 人群列表--小二人群同步到的商家列表查询 - 671#156215
  {
    "name": "api_employer_proxy_crowd_sync_dmp_get",
    "method": "GET",
    "url": "/api/employer/proxy/crowd/sync/dmp"
  },
  // 权限管理-商家权限管理列表 - 671#156216
  {
    "name": "api_employer_proxy_get",
    "method": "GET",
    "url": "/api/employer/proxy"
  },
  // 校验用户是否有权限进行智能扩展 - 671#156419
  {
    "name": "api_scenario_cluster_checkIfEmpower_get",
    "method": "GET",
    "url": "/api/scenario/cluster/checkIfEmpower"
  },
  // 崇志--人群列表--删除同步到的达摩盘商家副本 - 671#156760
  {
    "name": "api_employer_proxy_crowd_sync_dmp_delete",
    "method": "DELETE",
    "url": "/api/employer/proxy/crowd/sync/dmp"
  },
  // 一方上传支持的数据类型 - 671#160041
  {
    "name": "api_data_csv_type_get",
    "method": "GET",
    "url": "/api/data/csv/type"
  },
  // 获取模板列表 - 671#160164
  {
    "name": "api_operation_new_template_find_get",
    "method": "GET",
    "url": "/api/operation/new/template/find"
  },
  // 获取榜单列表 - 671#160165
  {
    "name": "api_operation_new_topic_find_get",
    "method": "GET",
    "url": "/api/operation/new/topic/find"
  },
  // 对模板进行授权 - 671#160166
  {
    "name": "api_operation_template_empower_post",
    "method": "POST",
    "url": "/api/operation/template/empower"
  },
  // 获取模板详情 - 671#160168
  {
    "name": "api_operation_template_$id_detail_get",
    "method": "GET",
    "url": "/api/operation/template/"
  },
  // 奥格-私域列表 - 671#161039
  {
    "name": "api_crowd_augeNamespace_list_get",
    "method": "GET",
    "url": "/api/crowd/augeNamespace/list"
  },
  // 商家拥有的推广单元权限配置列表 - 671#165366
  {
    "name": "api_crowd_adgroup_config_get",
    "method": "GET",
    "url": "/api/crowd/adgroup/config"
  },
  // 人群绑定单元接口 - 671#165379
  {
    "name": "api_crowd_adgroup_bind_post",
    "method": "POST",
    "url": "/api/crowd/adgroup/bind"
  },
  // 直通车计划单元信息查询[自定义+智能匹配] - 671#165380
  {
    "name": "api_crowd_adgroup_ztc_get",
    "method": "GET",
    "url": "/api/crowd/adgroup/ztc"
  },
  // 超推单元计划信息查询[自定义+智能推荐] - 671#165382
  {
    "name": "api_crowd_adgroup_chaotui_get",
    "method": "GET",
    "url": "/api/crowd/adgroup/chaotui"
  },
  // 钻展单元信息查询[自定义+智能匹配] - 671#165386
  {
    "name": "api_crowd_adgroup_zszw_get",
    "method": "GET",
    "url": "/api/crowd/adgroup/zszw"
  },
  // 搜索联想 - 671#168596
  {
    "name": "api_tag_search_association_get",
    "method": "GET",
    "url": "/api/tag/search/association"
  },
  // 人群应用渠道以及渠道应用返回结果建议 - 671#171485
  {
    "name": "api_crowd_adgroup_deliverapp_post",
    "method": "POST",
    "url": "/api/crowd/adgroup/deliverapp"
  },
  // 人群策略-核心人群 - 671#174324
  {
    "name": "api_scenario_cluster_strategy_crowd_post",
    "method": "POST",
    "url": "/api/scenario/cluster/strategy/crowd"
  },
  // 人群策略-店铺人群 - 671#174389
  {
    "name": "api_scenario_cluster_strategy_shop_post",
    "method": "POST",
    "url": "/api/scenario/cluster/strategy/shop"
  },
  // 人群策略-叶子类目细分 - 671#174390
  {
    "name": "api_scenario_cluster_strategy_cate_post",
    "method": "POST",
    "url": "/api/scenario/cluster/strategy/cate"
  },
  // 人群策略-叶子类目关键词 - 671#174394
  {
    "name": "api_scenario_cluster_strategy_keyword_post",
    "method": "POST",
    "url": "/api/scenario/cluster/strategy/keyword"
  },
  // 单品策略-获取人群推荐 - 671#174419
  {
    "name": "api_scenario_cluster_strategy_recommend_post",
    "method": "POST",
    "url": "/api/scenario/cluster/strategy/recommend"
  },
  // 基础特征洞察标签列表 - 671#174587
  {
    "name": "api_scenario_cluster_strategy_tag_get",
    "method": "GET",
    "url": "/api/scenario/cluster/strategy/tag"
  },
  // 基础特征洞察获取主人群 - 671#174588
  {
    "name": "api_scenario_cluster_strategy_baseCrowd_get",
    "method": "GET",
    "url": "/api/scenario/cluster/strategy/baseCrowd"
  },
  // 标签数据权限校验副本 - 671#174626
  {
    "name": "api_tag_check_get",
    "method": "GET",
    "url": "/api/tag/check"
  },
  // 创建达摩盘用户 - 671#180611
  {
    "name": "api_user_create_post",
    "method": "POST",
    "url": "/api/user/create"
  },
  // 获取用户级别 - 671#186578
  {
    "name": "api_scenario_cluster_getUserLevel_get",
    "method": "GET",
    "url": "/api/scenario/cluster/getUserLevel"
  },
  // 检查S4以上用户是否有权限进行单品洞察 - 671#188452
  {
    "name": "api_scenario_cluster_checkS4Status_get",
    "method": "GET",
    "url": "/api/scenario/cluster/checkS4Status"
  },
  // 人群详情页-渠道人群场景指导-单品榜单 - 671#189988
  {
    "name": "api_report_channel_crowdScene_get",
    "method": "GET",
    "url": "/api/report/channel/crowdScene"
  },
  // 写人群extra信息 - 671#190000
  {
    "name": "api_crowdExtra_post",
    "method": "POST",
    "url": "/api/crowdExtra"
  },
  // 列出自定义圈人所有宝贝 - 671#191420
  {
    "name": "api_scenario_cluster_strategy_listAnalyzeItem_get",
    "method": "GET",
    "url": "/api/scenario/cluster/strategy/listAnalyzeItem"
  },
  // 人群策略-店铺渠道数据 - 671#191426
  {
    "name": "api_scenario_cluster_strategy_shopChannel_post",
    "method": "POST",
    "url": "/api/scenario/cluster/strategy/shopChannel"
  },
  // 人群策略-品牌数据 - 671#191742
  {
    "name": "api_scenario_cluster_strategy_brand_post",
    "method": "POST",
    "url": "/api/scenario/cluster/strategy/brand"
  },
  // 新增一个自定义分析单品 - 671#191858
  {
    "name": "api_scenario_cluster_strategy_addAnalyzeItem_post",
    "method": "POST",
    "url": "/api/scenario/cluster/strategy/addAnalyzeItem"
  },
  // 取消自定义分析单品 - 671#191859
  {
    "name": "api_scenario_cluster_strategy_cancelAnalyzeItem_post",
    "method": "POST",
    "url": "/api/scenario/cluster/strategy/cancelAnalyzeItem"
  },
  // 获取当前店铺品牌 - 671#192429
  {
    "name": "api_scenario_cluster_strategy_getBrandInfo_get",
    "method": "GET",
    "url": "/api/scenario/cluster/strategy/getBrandInfo"
  },
  // 获取当前剩余单品额度 - 671#192430
  {
    "name": "api_scenario_cluster_strategy_getAnalyzeQuota_get",
    "method": "GET",
    "url": "/api/scenario/cluster/strategy/getAnalyzeQuota"
  },
  // 获取可以提交自定义分析单品的列表 - 671#192431
  {
    "name": "api_scenario_cluster_strategy_getAnalyzeItemList_get",
    "method": "GET",
    "url": "/api/scenario/cluster/strategy/getAnalyzeItemList"
  },
  // 商家周报列表 - 671#192478
  {
    "name": "api_weekly_report_get",
    "method": "GET",
    "url": "/api/weekly/report"
  },
  // 店铺老客周报--投放人群诊断 - 671#194391
  {
    "name": "api_weekly_report_old_crowd_diagnosis_get",
    "method": "GET",
    "url": "/api/weekly/report/old/crowd/diagnosis"
  },
  // 店铺老客周报--投放人群诊断--人群TOP榜单 - 671#194466
  {
    "name": "api_weekly_report_old_crowd_top_get",
    "method": "GET",
    "url": "/api/weekly/report/old/crowd/top"
  },
  // 店铺老客周报--单品推广小结 - 671#194552
  {
    "name": "api_weekly_report_old_item_summary_get",
    "method": "GET",
    "url": "/api/weekly/report/old/item/summary"
  },
  // 店铺老客周报--单品推广小结--单品TOP排行榜 - 671#194553
  {
    "name": "api_weekly_report_old_item_top_get",
    "method": "GET",
    "url": "/api/weekly/report/old/item/top"
  },
  // 店铺老客周报--单品推广小结--绑定TOP3单品人群投放效果总结 - 671#194554
  {
    "name": "api_weekly_report_old_item_top_crowd_get",
    "method": "GET",
    "url": "/api/weekly/report/old/item/top/crowd"
  },
  // 商家周报状态更新为已读 - 671#195610
  {
    "name": "api_weekly_report_$id_put",
    "method": "PUT",
    "url": "/api/weekly/report/"
  },
  // 万堂书院-课程列表 - 671#199612
  {
    "name": "yx_channel_content_findContent_get",
    "method": "GET",
    "url": "https://sem.taobao.com/yx/channel/content/findContent.json"
  },
  // 万堂书院-课程地址 - 671#199613
  {
    "name": "yx_channel_content_detail_get",
    "method": "GET",
    "url": "https://sem.taobao.com/yx/channel/content/detail.json"
  },
  // 指标概览补充接口(暂时不用) - 671#202437
  {
    "name": "api_report_overview_supplement_get",
    "method": "GET",
    "url": "/api/report/overview/supplement"
  },
  // 人群列表检索条件--提供方人群提示 - 671#209062
  {
    "name": "api_crowd_search_indicator_get",
    "method": "GET",
    "url": "/api/crowd/search/indicator"
  },
  // 崇志-触发小二人群分享-POST - 671#210986
  {
    "name": "api_employer_proxy_crowd_share_post",
    "method": "POST",
    "url": "/api/employer/proxy/crowd/share"
  },
  // 崇志-人群分享给的小二列表查询-GET - 671#210990
  {
    "name": "api_employer_proxy_crowd_share_get",
    "method": "GET",
    "url": "/api/employer/proxy/crowd/share"
  },
  // 崇志--小二信息检索接口 - 671#210994
  {
    "name": "api_user_employee_get",
    "method": "GET",
    "url": "/api/user/employee"
  },
  // 达摩云修改人群有效期 - 671#212262
  {
    "name": "api_crowd_$id_expireDate__put",
    "method": "PUT",
    "url": "/api/crowd/"
  },
  // 渠道沉淀人群列表 - 671#216034
  {
    "name": "api_crowd_channel_property_get",
    "method": "GET",
    "url": "/api/crowd/channel/property"
  },
  // 渠道列表 - 671#216131
  {
    "name": "api_crowd_channel_property_channel_get",
    "method": "GET",
    "url": "/api/crowd/channel/property/channel"
  },
  // 渠道人群检索指标 - 671#216157
  {
    "name": "api_crowd_channel_property_query_index_get",
    "method": "GET",
    "url": "/api/crowd/channel/property/query/index"
  },
  // 定向分类 - 671#216287
  {
    "name": "api_crowd_channel_property_dest_class_get",
    "method": "GET",
    "url": "/api/crowd/channel/property/dest/class"
  },
  // 营销渠道策略-人群资产概览 - 671#218089
  {
    "name": "api_channelStrategy_overview_get",
    "method": "GET",
    "url": "/api/channelStrategy/overview"
  },
  // 营销渠道策略-渠道人群资产分布 - 671#218259
  {
    "name": "api_channelStrategy_distribution_get",
    "method": "GET",
    "url": "/api/channelStrategy/distribution"
  },
  // 营销渠道策略-渠道人群流转漏斗 - 671#218330
  {
    "name": "api_channelStrategy_funnel_get",
    "method": "GET",
    "url": "/api/channelStrategy/funnel"
  },
  // 私域-saas列表副本 - 671#219312
  {
    "name": "api_userconfig_app_saas_get",
    "method": "GET",
    "url": "/api/userconfig/app/saas"
  },
  // 投前诊断详情 - 671#223521
  {
    "name": "api_strategy_crowd_analysis_chart_post",
    "method": "POST",
    "url": "/api/strategy/crowd_analysis/chart"
  },
  // 扩量人群创建接口 - 671#225245
  {
    "name": "${dmp-new}_api_crowd_advice_post",
    "method": "POST",
    "url": "/${dmp-new}/api/crowd/advice"
  },
  // 扩量机会-获取建议 - 671#225578
  {
    "name": "${appone}_api_crowd_whitebox_extend_suggest_get_get",
    "method": "GET",
    "url": "/${appone}/api/crowd/whitebox/extend/suggest/get.json"
  },
  // 扩量机会-采纳建议 - 671#225620
  {
    "name": "${appone}_api_crowd_whitebox_extend_suggest_apply_post",
    "method": "POST",
    "url": "/${appone}/api/crowd/whitebox/extend/suggest/apply.json"
  },
  // 场景机会-获取建议 - 671#225626
  {
    "name": "${appone}_api_crowd_whitebox_scene_suggest_get_get",
    "method": "GET",
    "url": "/${appone}/api/crowd/whitebox/scene/suggest/get.json"
  },
  // 场景机会-采纳建议 - 671#225654
  {
    "name": "${appone}_api_crowd_whitebox_scene_suggest_apply_post",
    "method": "POST",
    "url": "/${appone}/api/crowd/whitebox/scene/suggest/apply.json"
  },
  // 溢价机会-获取建议-备份改动历史-先不要删 - 671#225656
  {
    "name": "${appone}_bak_api_crowd_whitebox_price_suggest_get_get",
    "method": "GET",
    "url": "/${appone}/bak/api/crowd/whitebox/price/suggest/get.json"
  },
  // 溢价机会-采纳建议 - 671#225658
  {
    "name": "${appone}_api_crowd_whitebox_price_suggest_apply_post",
    "method": "POST",
    "url": "/${appone}/api/crowd/whitebox/price/suggest/apply.json"
  },
  // 溢价机会-获取预估曲线 - 671#226077
  {
    "name": "${appone}_api_crowd_whitebox_price_simulator_get_get",
    "method": "GET",
    "url": "/${appone}/api/crowd/whitebox/price/simulator/get.json"
  },
  // 小二精选人群-页面list - 671#226082
  {
    "name": "api_topic_template__get",
    "method": "GET",
    "url": "/api/topic/template/"
  },
  // 详情页-计算覆盖人数 - 671#230036
  {
    "name": "api_topic_template_$id_coverage_get",
    "method": "GET",
    "url": "/api/topic/template/"
  },
  // 推荐人群采纳 - 671#230301
  {
    "name": "api_topic_template_agree_post",
    "method": "POST",
    "url": "/api/topic/template/agree"
  },
  // 创建模板 - 671#231128
  {
    "name": "api_operation_new_template_create_post",
    "method": "POST",
    "url": "/api/operation/new/template/create"
  },
  // 修改模板 - 671#231169
  {
    "name": "api_operation_new_template_edit_put",
    "method": "PUT",
    "url": "/api/operation/new/template/edit"
  },
  // 达摩盘人群优化建议提示 - 671#235181
  {
    "name": "api_crowd_advice_tip_get",
    "method": "GET",
    "url": "/api/crowd/advice/tip"
  },
  // 获取用户信息 - 671#235814
  {
    "name": "${appone}_api_member_getInfo_get",
    "method": "GET",
    "url": "/${appone}/api/member/getInfo.json"
  },
  // 溢价机会-获取建议 - 671#240887
  {
    "name": "${appone}_api_crowd_whitebox_price_suggest_get_get",
    "method": "GET",
    "url": "/${appone}/api/crowd/whitebox/price/suggest/get.json"
  },
  // 智能迭代人群列表查询 - 671#241021
  {
    "name": "api_crowd_iter_get",
    "method": "GET",
    "url": "/api/crowd/iter"
  },
  // 迭代人群报表汇总 - 671#241022
  {
    "name": "api_crowd_iter_$id_rpt_get",
    "method": "GET",
    "url": "/api/crowd/iter/"
  },
  // 暂停人群迭代 - 671#241023
  {
    "name": "api_crowd_iter_$id_pause_put",
    "method": "PUT",
    "url": "/api/crowd/iter/"
  },
  // 移除智能人群迭代 - 671#241024
  {
    "name": "api_crowd_iter_$id_delete_delete",
    "method": "DELETE",
    "url": "/api/crowd/iter/"
  },
  // 开启人群智能迭代 - 671#241025
  {
    "name": "api_crowd_iter_$id_start_post",
    "method": "POST",
    "url": "/api/crowd/iter/"
  },
  // 迭代报表趋势图 - 671#241647
  {
    "name": "api_crowd_iter_$id_rpt_trend_get",
    "method": "GET",
    "url": "/api/crowd/iter/"
  },
  // quota限制 - 671#241686
  {
    "name": "api_crowd_iter_quota_get",
    "method": "GET",
    "url": "/api/crowd/iter/quota"
  },
  // 标签管理-id类型副本 - 671#242151
  {
    "name": "api_odps_idTypeList_get",
    "method": "GET",
    "url": "/api/odps/idTypeList"
  },
  // 查询自定义扩展宝贝拉新码表 - 671#242771
  {
    "name": "api_dict_custom_lookalike_item_get",
    "method": "GET",
    "url": "/api/dict/custom_lookalike/item"
  },
  // 获取扩展人数上下限 - 671#242811
  {
    "name": "api_crowd_extension_coverage_config_get",
    "method": "GET",
    "url": "/api/crowd/extension/coverage_config"
  },
  // 品牌人群资产概览 - 671#242890
  {
    "name": "api_asset_deeplink_overview_get",
    "method": "GET",
    "url": "/api/asset/deeplink/overview"
  },
  // 品牌可分析的最新日期 - 671#242897
  {
    "name": "api_asset_deeplink_maxDate_get",
    "method": "GET",
    "url": "/api/asset/deeplink/maxDate"
  },
  // 品牌人群资产趋势图 - 671#242966
  {
    "name": "api_asset_deeplink_trend_get",
    "method": "GET",
    "url": "/api/asset/deeplink/trend"
  },
  // 洞察标签类目 - 671#243055
  {
    "name": "api_analysis_insight_tagGroup_list_get",
    "method": "GET",
    "url": "/api/analysis/insight/tagGroup/list"
  },
  // 品牌人群资产营销渠道分布 - 671#243334
  {
    "name": "api_asset_deeplink_distribution_get",
    "method": "GET",
    "url": "/api/asset/deeplink/distribution"
  },
  // 品牌人群资产流转概览 - 671#243335
  {
    "name": "api_asset_deeplink_transfer_overview_get",
    "method": "GET",
    "url": "/api/asset/deeplink/transfer/overview"
  },
  // 品牌人群资产流转 - 671#243336
  {
    "name": "api_asset_deeplink_transfer_get",
    "method": "GET",
    "url": "/api/asset/deeplink/transfer"
  },
  // 品牌人群资产渠道流转贡献 - 671#243337
  {
    "name": "api_asset_deeplink_transfer_channel_get",
    "method": "GET",
    "url": "/api/asset/deeplink/transfer/channel"
  },
  // 品牌人群资产-圈选DEEPLINK人群 - 671#243379
  {
    "name": "api_asset_deeplink_createCrowd_post",
    "method": "POST",
    "url": "/api/asset/deeplink/createCrowd"
  },
  // 品牌人群资产-圈选DEEPLINK人群-创建虚拟标签 - 671#243402
  {
    "name": "api_asset_deeplink_createTag_post",
    "method": "POST",
    "url": "/api/asset/deeplink/createTag"
  },
  // 品牌人群资产-人群规模 - 671#243453
  {
    "name": "api_asset_deeplink_coverage_get",
    "method": "GET",
    "url": "/api/asset/deeplink/coverage"
  },
  // DEEPLINK状态分层接口 - 671#243689
  {
    "name": "api_asset_deeplink_statusList_get",
    "method": "GET",
    "url": "/api/asset/deeplink/statusList"
  },
  // DEEPLINK营销渠道接口 - 671#243703
  {
    "name": "api_asset_deeplink_channelList_get",
    "method": "GET",
    "url": "/api/asset/deeplink/channelList"
  }
]

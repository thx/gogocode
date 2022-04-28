import install from './install';
import introduction from './introduction';
import teamplateSyntax from './teamplate-syntax';
import eventHandle from './event-handle';
import router from './router';
import viewBase from './view-base';
import styleSolve from './style-solve';

import lifecycle from './lifecycle';
import viewData from './view-data';
import viewRelation from './view-relation';
import viewCommunication from './view-communication';

import vframe from './vframe';
import service from './service';
import errHandle from './err-handle';
import extend from './extend';
import async from './async';
import slot from './slot';

import publicView from './pubilc-view';

export default {
  install,
  introduction,
  'view-base': viewBase,
  'teamplate-syntax': teamplateSyntax,
  'style-solve': styleSolve,
  'event-handle': eventHandle,
  router,

  lifecycle,
  'view-data': viewData,
  'view-relation': viewRelation,
  'view-communication': viewCommunication,

  vframe,
  service,
  'err-handle': errHandle,
  extend,
  async,
  slot,

  'public-view': publicView,
};

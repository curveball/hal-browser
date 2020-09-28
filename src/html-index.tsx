import { Context } from '@curveball/core';
import { Options } from './types';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import { App } from './components/app';
import { contextToState } from './util';

export default async function generateHtmlIndex(ctx: Context, options: Options) {

  normalizeBody(ctx);
  console.log(ctx.response.body);
  if (!ctx.response.body) {
    return;
  }
  const state = await contextToState(ctx);

  console.log(options);
  ctx.response.type = 'text/html; charset=utf-8';
  ctx.response.body = ReactDOMServer.renderToString(
    <App resourceState={state} options={options} />
  );

}

function normalizeBody(ctx: Context) {

  if (ctx.response.body instanceof Buffer || ctx.response.body === null) {
    return;
  }
  if (typeof ctx.response.body === 'object') {
    ctx.response.body = JSON.stringify(ctx.response.body);
  }

}
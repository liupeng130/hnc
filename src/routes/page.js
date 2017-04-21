

import path from 'path';

import PrettyError from 'pretty-error';
import http from 'http';
import express from 'express';
import reactRender from "./reactRender"

var router = express.Router();

router.get('/swig', function(req, res, next) {
	res.send("oop")
});

router.get('/category/?*', function(req, res, next) {
	const rootReucer = require("../containers/Category/rootReducer");
	const route = require("../containers/Category/route");
	reactRender(req,res,"category",route,rootReucer)
});

router.get('/brand/?*', function(req, res, next) {
	const rootReucer = require("../containers/Brand/rootReducer");
	const route = require("../containers/Brand/route");
	reactRender(req,res,"brand",route,rootReucer)
});

router.get('/specifications/?*', function(req, res, next) {
	const rootReucer = require("../containers/Specifications/rootReducer");
	const route = require("../containers/Specifications/route");
	reactRender(req,res,"specifications",route,rootReucer)
});
//商品发布
router.get('/goods-release/?*', function(req, res, next) {
	const rootReucer = require("../containers/GoodsRlease/rootReducer");
	const route = require("../containers/GoodsRlease/route");
	reactRender(req,res,"goodsrelease",route,rootReucer)
});
//商品编辑
router.get('/edit-goods/?*', function(req, res, next) {
	const rootReucer = require("../containers/EditGoods/rootReducer");
	const route = require("../containers/EditGoods/route");
	reactRender(req,res,"editgoods",route,rootReucer)
});
//供货申请审核
router.get('/supply-audit/?*', function(req, res, next) {
	const rootReucer = require("../containers/SupplyAudit/rootReducer");
	const route = require("../containers/SupplyAudit/route");
	reactRender(req,res,"supplyaudit",route,rootReucer)
});
//商品库管理
router.get('/item-base/?*', function(req, res, next) {
	const rootReucer = require("../containers/ItemBase/rootReducer");
	const route = require("../containers/ItemBase/route");
	reactRender(req,res,"itembase",route,rootReucer)
});
//销售商品管理
router.get('/sale-item/?*', function(req, res, next) {
  const rootReucer = require("../containers/SellGoods/rootReducer");
  const route = require("../containers/SellGoods/route");
  reactRender(req,res,"saleitem",route,rootReucer)
});
//销售商品编辑
router.get('/sale-edit/?*', function(req, res, next) {
  const rootReucer = require("../containers/SaleItemEdit/rootReducer");
  const route = require("../containers/SaleItemEdit/route");
  reactRender(req,res,"saleitemedit",route,rootReucer)
});

router.get('/batch-upload/?*', function(req, res, next) {
  const rootReucer = require("../containers/BatchUpload/rootReducer");
  const route = require("../containers/BatchUpload/route");
  reactRender(req,res,"batchupload",route,rootReucer)
});
module.exports = router;

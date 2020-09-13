var BEMHTML;
(function(global) {
function buildBemXjst(libs) {
var exports;
/* BEM-XJST Runtime Start */
var BEMHTML = function(module, exports) {
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bemhtml = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var inherits = require('inherits');
var Match = require('../bemxjst/match').Match;
var BemxjstEntity = require('../bemxjst/entity').Entity;

/**
 * @class Entity
 * @param {BEMXJST} bemxjst
 * @param {String} block
 * @param {String} elem
 * @param {Array} templates
 */
function Entity(bemxjst) {
  this.bemxjst = bemxjst;

  this.jsClass = null;

  // "Fast modes" about HTML
  this.tag = new Match(this, 'tag');
  this.attrs = new Match(this, 'attrs');
  this.bem = new Match(this, 'bem');
  this.cls = new Match(this, 'cls');

  BemxjstEntity.apply(this, arguments);
}

inherits(Entity, BemxjstEntity);
exports.Entity = Entity;

Entity.prototype.init = function(block, elem) {
  this.block = block;
  this.elem = elem;

  // Class for jsParams
  this.jsClass = this.bemxjst.classBuilder.build(this.block, this.elem);
};

Entity.prototype._keys = {
  tag: 1,
  content: 1,
  attrs: 1,
  mix: 1,
  js: 1,
  mods: 1,
  elemMods: 1,
  cls: 1,
  bem: 1
};

Entity.prototype.defaultBody = function(context) {
  context.mods = this.mods.exec(context);
  if (context.ctx.elem) context.elemMods = this.elemMods.exec(context);

  return this.bemxjst.render(context,
                             this,
                             this.tag.exec(context),
                             this.js.exec(context),
                             this.bem.exec(context),
                             this.cls.exec(context),
                             this.mix.exec(context),
                             this.attrs.exec(context),
                             this.content.exec(context),
                             context.mods,
                             context.elemMods);
};

},{"../bemxjst/entity":5,"../bemxjst/match":8,"inherits":11}],2:[function(require,module,exports){
var inherits = require('inherits');
var utils = require('../bemxjst/utils');
var Entity = require('./entity').Entity;
var BEMXJST = require('../bemxjst');

function BEMHTML(options) {
  BEMXJST.apply(this, arguments);

  this._shortTagCloser = typeof options.xhtml !== 'undefined' &&
                          options.xhtml ? '/>' : '>';

  this._elemJsInstances = options.elemJsInstances;
  this._omitOptionalEndTags = options.omitOptionalEndTags;
  this._singleQuotesForDataAttrs =
    typeof options.singleQuotesForDataAttrs === 'undefined' ?
      false :
      options.singleQuotesForDataAttrs;
  this._unquotedAttrs = typeof options.unquotedAttrs === 'undefined' ?
    false :
    options.unquotedAttrs;
}

inherits(BEMHTML, BEMXJST);
module.exports = BEMHTML;

BEMHTML.prototype.Entity = Entity;

BEMHTML.prototype.runMany = function(arr) {
  var out = '';
  var context = this.context;
  var prevPos = context.position;
  var prevNotNewList = context._notNewList;

  if (prevNotNewList) {
    context._listLength += arr.length - 1;
  } else {
    context.position = 0;
    context._listLength = arr.length;
  }
  context._notNewList = true;

  if (this.canFlush) {
    for (var i = 0; i < arr.length; i++)
      out += context._flush(this._run(arr[i]));
  } else {
    for (var i = 0; i < arr.length; i++)
      out += this._run(arr[i]);
  }

  if (!prevNotNewList)
    context.position = prevPos;

  return out;
};

BEMHTML.prototype.render = function(context, entity, tag, js, bem, cls, mix,
                                           attrs, content, mods, elemMods) {
  if (tag === undefined)
    tag = 'div';
  else if (!tag)
    return (content || content === 0) ? this._run(content) : '';

  var ctx = context.ctx;
  var out = '<' + tag;

  var isBEM = !!(typeof bem !== 'undefined' ?
    bem : entity.block || entity.elem);

  if (!isBEM && !cls)
    return this.renderClose(out, context, tag, attrs, isBEM, ctx, content);

  if (js === true)
    js = {};

  var jsParams;
  if (js) {
    jsParams = {};
    jsParams[entity.jsClass] = js;
  }

  var addJSInitClass = isBEM && jsParams && (
    this._elemJsInstances ?
      entity.block :
      (entity.block && !entity.elem)
  );

  out += ' class=';
  var classValue = '';
  if (isBEM) {
    classValue += entity.jsClass;
    classValue += this.buildModsClasses(entity.block, entity.elem,
                                        entity.elem ? elemMods : mods);

    if (mix) {
      var m = this.renderMix(entity, mix, jsParams, addJSInitClass);
      classValue += m.out;
      jsParams = m.jsParams;
      addJSInitClass = m.addJSInitClass;
    }

    if (cls)
      classValue += ' ' + (typeof cls === 'string' ?
                    utils.attrEscape(cls).trim() : cls);
  } else {
    classValue += typeof cls === 'string' ?
                           utils.attrEscape(cls).trim() : cls;
  }

  if (addJSInitClass)
    classValue += ' i-bem';

  out += this._unquotedAttrs && utils.isUnquotedAttr(classValue) ?
    classValue :
    ('"' + classValue + '"');

  if (isBEM && jsParams)
    out += ' data-bem=\'' + utils.jsAttrEscape(JSON.stringify(jsParams)) + '\'';

  return this.renderClose(out, context, tag, attrs, isBEM, ctx, content);
};

var OPTIONAL_END_TAGS = {
  // https://www.w3.org/TR/html4/index/elements.html
  html: 1, head: 1, body: 1, p: 1, li: 1, dt: 1, dd: 1,
  colgroup: 1, thead: 1, tbody: 1, tfoot: 1, tr: 1, th: 1, td: 1, option: 1,

  // html5 https://www.w3.org/TR/html5/syntax.html#optional-tags
  /* dl — Neither tag is omissible */ rb: 1, rt: 1, rtc: 1, rp: 1, optgroup: 1
};

BEMHTML.prototype.renderClose = function(prefix, context, tag, attrs, isBEM,
                                         ctx, content) {
  var out = prefix;

  out += this.renderAttrs(attrs);

  if (utils.isShortTag(tag)) {
    out += this._shortTagCloser;
    if (this.canFlush)
      out = context._flush(out);
  } else {
    out += '>';
    if (this.canFlush)
      out = context._flush(out);

    // TODO(indutny): skip apply next flags
    if (content || content === 0)
      out += this.renderContent(content, isBEM);

    if (!this._omitOptionalEndTags || !OPTIONAL_END_TAGS.hasOwnProperty(tag))
      out += '</' + tag + '>';
  }

  if (this.canFlush)
    out = context._flush(out);
  return out;
};

BEMHTML.prototype.renderAttrs = function(attrs) {
  var out = '';

  // NOTE: maybe we need to make an array for quicker serialization
  if (utils.isObj(attrs)) {

    /* jshint forin : false */
    for (var name in attrs) {
      var attr = attrs[name];
      if (attr === undefined || attr === false || attr === null)
        continue;

      if (attr === true) {
        out += ' ' + name;
      } else {
        var attrVal = utils.isSimple(attr) ? attr : this.run(attr);
        out += ' ' + name + '=';
        out += (this._singleQuotesForDataAttrs && name.indexOf('data-') === 0) ?
          this.getAttrValue(attrVal, utils.jsAttrEscape(attrVal), '\'') :
          this.getAttrValue(attrVal, utils.attrEscape(attrVal), '"');
      }
    }
  }

  return out;
};

BEMHTML.prototype.getAttrValue = function(attrVal, escapedAttrVal, quote) {
  return this._unquotedAttrs && utils.isUnquotedAttr(attrVal) ?
    attrVal :
    (quote + escapedAttrVal + quote);
};

BEMHTML.prototype.renderMix = function(entity, mix, jsParams, addJSInitClass) {
  var visited = {};
  var context = this.context;
  var js = jsParams;
  var addInit = addJSInitClass;

  visited[entity.jsClass] = true;

  // Transform mix to the single-item array if it's not array
  if (!Array.isArray(mix))
    mix = [ mix ];

  var classBuilder = this.classBuilder;

  var out = '';
  for (var i = 0; i < mix.length; i++) {
    var item = mix[i];
    if (!item)
      continue;
    if (typeof item === 'string')
      item = { block: item, elem: undefined };

    var hasItem = false;

    if (item.elem) {
      hasItem = item.elem !== entity.elem && item.elem !== context.elem ||
        item.block && item.block !== entity.block;
    } else if (item.block) {
      hasItem = !(item.block === entity.block && item.mods) ||
        item.mods && entity.elem;
    }

    var block = item.block || item._block || context.block;
    var elem = item.elem || item._elem || context.elem;
    var key = classBuilder.build(block, elem);

    var classElem = item.elem ||
                    item._elem ||
                    (item.block ? undefined : context.elem);
    if (hasItem)
      out += ' ' + classBuilder.build(block, classElem);

    out += this.buildModsClasses(block, classElem,
      (item.elem || !item.block && (item._elem || context.elem)) ?
        item.elemMods : item.mods);

    if (item.js) {
      if (!js)
        js = {};

      js[classBuilder.build(block, item.elem)] =
          item.js === true ? {} : item.js;
      if (!addInit)
        addInit = this._elemJsInstances ?
          (item.elem || block) :
          (block && !item.elem);
    }

    // Process nested mixes from BEMJSON
    if (item.mix) {
      var nested = this.renderMix(entity, item.mix, js, addInit);
      js = utils.extend(js, nested.jsParams);
      addInit = nested.addJSInitClass;
      out += nested.out;
    }

    // Process nested mixes from templates
    if (!hasItem || visited[key])
      continue;

    visited[key] = true;
    var nestedEntity = this.entities[key];
    if (!nestedEntity)
      continue;

    var oldBlock = context.block;
    var oldElem = context.elem;
    var nestedMix = nestedEntity.mix.exec(context);
    context.elem = oldElem;
    context.block = oldBlock;

    if (!nestedMix)
      continue;

    for (var j = 0; j < nestedMix.length; j++) {
      var nestedItem = nestedMix[j];
      if (!nestedItem) continue;

      if (!nestedItem.block &&
          !nestedItem.elem ||
          !visited[classBuilder.build(nestedItem.block, nestedItem.elem)]) {
        if (nestedItem.block) continue;

        nestedItem._block = block;
        nestedItem._elem = elem;
        // make a copy, do not modify original array
        mix = mix.slice(0, i + 1).concat(
          nestedItem,
          mix.slice(i + 1)
        );
      }
    }
  }

  return {
    out: out,
    jsParams: js,
    addJSInitClass: addInit
  };
};

BEMHTML.prototype.buildModsClasses = function(block, elem, mods) {
  if (!mods)
    return '';

  var res = '';

  var modName;

  /*jshint -W089 */
  for (modName in mods) {
    if (!mods.hasOwnProperty(modName) || modName === '')
      continue;

    var modVal = mods[modName];
    if (!modVal && modVal !== 0) continue;
    if (typeof modVal !== 'boolean')
      modVal += '';

    var builder = this.classBuilder;
    res += ' ' + (elem ?
                  builder.buildElemClass(block, elem, modName, modVal) :
                  builder.buildBlockClass(block, modName, modVal));
  }

  return res;
};

},{"../bemxjst":7,"../bemxjst/utils":10,"./entity":1,"inherits":11}],3:[function(require,module,exports){
function ClassBuilder(options) {
  this.elemDelim = options.elem || '__';

  this.modDelim = typeof options.mod === 'string' ?
    {
      name: options.mod || '_',
      val: options.mod || '_'
    } :
    {
      name: options.mod && options.mod.name || '_',
      val: options.mod && options.mod.val || '_'
    };
}

exports.ClassBuilder = ClassBuilder;

ClassBuilder.prototype.build = function(block, elem) {
  if (!elem)
    return block;
  else
    return block + this.elemDelim + elem;
};

ClassBuilder.prototype.buildModPostfix = function(modName, modVal) {
  var res = this.modDelim.name + modName;
  if (modVal !== true) res += this.modDelim.val + modVal;
  return res;
};

ClassBuilder.prototype.buildBlockClass = function(name, modName, modVal) {
  var res = name;
  if (modVal) res += this.buildModPostfix(modName, modVal);
  return res;
};

ClassBuilder.prototype.buildElemClass = function(block, name, modName, modVal) {
  return this.buildBlockClass(block) +
    this.elemDelim +
    name +
    this.buildModPostfix(modName, modVal);
};

ClassBuilder.prototype.split = function(key) {
  return key.split(this.elemDelim, 2);
};

},{}],4:[function(require,module,exports){
var utils = require('./utils');

function Context(bemxjst) {
  this._bemxjst = bemxjst;

  this.ctx = null;
  this.block = '';

  // Save current block until the next BEM entity
  this._currBlock = '';

  this.elem = null;
  this.mods = {};
  this.elemMods = {};

  this.position = 0;
  this._listLength = 0;
  this._notNewList = false;

  this.escapeContent = bemxjst.options.escapeContent !== false;
}
exports.Context = Context;

Context.prototype._flush = null;

Context.prototype.isSimple = utils.isSimple;

Context.prototype.isShortTag = utils.isShortTag;
Context.prototype.extend = utils.extend;
Context.prototype.identify = utils.identify;

Context.prototype.xmlEscape = utils.xmlEscape;
Context.prototype.attrEscape = utils.attrEscape;
Context.prototype.jsAttrEscape = utils.jsAttrEscape;

Context.prototype.onError = function(context, e) {
  console.error('bem-xjst rendering error:', {
    block: context.ctx.block,
    elem: context.ctx.elem,
    mods: context.ctx.mods,
    elemMods: context.ctx.elemMods
  }, e);
};

Context.prototype.isFirst = function() {
  return this.position === 1;
};

Context.prototype.isLast = function() {
  return this.position === this._listLength;
};

Context.prototype.generateId = function() {
  return utils.identify(this.ctx);
};

Context.prototype.reapply = function(ctx) {
  return this._bemxjst.run(ctx);
};

},{"./utils":10}],5:[function(require,module,exports){
var utils = require('./utils');
var Match = require('./match').Match;
var tree = require('./tree');
var Template = tree.Template;
var PropertyMatch = tree.PropertyMatch;
var CompilerOptions = tree.CompilerOptions;

function Entity(bemxjst, block, elem, templates) {
  this.bemxjst = bemxjst;

  this.block = null;
  this.elem = null;

  // Compiler options via `xjstOptions()`
  this.options = {};

  // `true` if entity has just a default renderer for `def()` mode
  this.canFlush = true;

  // "Fast modes"
  this.def = new Match(this);
  this.mix = new Match(this, 'mix');
  this.js = new Match(this, 'js');
  this.mods = new Match(this, 'mods');
  this.elemMods = new Match(this, 'elemMods');
  this.content = new Match(this, 'content');

  // "Slow modes"
  this.rest = {};

  // Initialize
  this.init(block, elem);
  this.initModes(templates);
}
exports.Entity = Entity;

Entity.prototype.init = function(block, elem) {
  this.block = block;
  this.elem = elem;
};

Entity.prototype._keys = {
  content: 1,
  mix: 1,
  js: 1,
  mods: 1,
  elemMods: 1
};

Entity.prototype._initRest = function(key) {
  if (key === 'default') {
    this.rest[key] = this.def;
  } else if (this._keys[key]) {
    this.rest[key] = this[key];
  } else {
    this.rest[key] = this.rest[key] || new Match(this, key);
  }
};

Entity.prototype.initModes = function(templates) {
  /* jshint maxdepth : false */
  for (var i = 0; i < templates.length; i++) {
    var template = templates[i];

    for (var j = template.predicates.length - 1; j >= 0; j--) {
      var pred = template.predicates[j];
      if (!(pred instanceof PropertyMatch))
        continue;

      if (pred.key !== '_mode')
        continue;

      template.predicates.splice(j, 1);
      this._initRest(pred.value);

      // All templates should go there anyway
      this.rest[pred.value].push(template);
      break;
    }

    if (j === -1)
      this.def.push(template);

    // Merge compiler options
    for (var j = template.predicates.length - 1; j >= 0; j--) {
      var pred = template.predicates[j];
      if (!(pred instanceof CompilerOptions))
        continue;

      this.options = utils.extend(this.options, pred.options);
    }
  }
};

Entity.prototype.prepend = function(other) {
  // Prepend to the slow modes, fast modes are in this hashmap too anyway
  var keys = Object.keys(this.rest);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!other.rest[key])
      continue;

    this.rest[key].prepend(other.rest[key]);
  }

  // Add new slow modes
  keys = Object.keys(other.rest);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (this.rest[key])
      continue;

    this._initRest(key);
    this.rest[key].prepend(other.rest[key]);
  }
};

// NOTE: This could be potentially compiled into inlined invokations
Entity.prototype.run = function(context) {
  if (this.def.count !== 0)
    return this.def.exec(context);

  return this.defaultBody(context);
};


function contentMode() {
  return this.ctx.content;
}

Entity.prototype.setDefaults = function() {
  // Default .content() template for applyNext()
  if (this.content.count !== 0)
    this.content.push(new Template([], contentMode));

  // .def() default
  if (this.def.count !== 0) {
    this.canFlush = this.options.flush || false;
    var self = this;
    this.def.push(new Template([], function defaultBodyProxy() {
      return self.defaultBody(this);
    }));
  }
};

},{"./match":8,"./tree":9,"./utils":10}],6:[function(require,module,exports){
function BEMXJSTError(msg, func) {
  this.name = 'BEMXJSTError';
  this.message = msg;

  if (Error.captureStackTrace)
    Error.captureStackTrace(this, func || this.constructor);
  else
    this.stack = (new Error()).stack;
}

BEMXJSTError.prototype = Object.create(Error.prototype);
BEMXJSTError.prototype.constructor = BEMXJSTError;

exports.BEMXJSTError = BEMXJSTError;

},{}],7:[function(require,module,exports){
var inherits = require('inherits');

var Tree = require('./tree').Tree;
var PropertyMatch = require('./tree').PropertyMatch;
var AddMatch = require('./tree').AddMatch;
var Context = require('./context').Context;
var ClassBuilder = require('./class-builder').ClassBuilder;
var utils = require('./utils');

function BEMXJST(options) {
  this.options = options;

  this.entities = null;
  this.defaultEnt = null;

  // Current tree
  this.tree = null;

  // Current match
  this.match = null;

  // Create new Context constructor for overriding prototype
  this.contextConstructor = function ContextChild(bemxjst) {
    Context.call(this, bemxjst);
  };
  inherits(this.contextConstructor, Context);
  this.context = null;

  this.classBuilder = new ClassBuilder(this.options.naming || {});

  // Execution depth, used to invalidate `applyNext` bitfields
  this.depth = 0;

  // Do not call `_flush` on overridden `def()` mode
  this.canFlush = false;

  // oninit templates
  this.oninit = null;

  // Initialize default entity (no block/elem match)
  this.defaultEnt = new this.Entity(this, '', '', []);
  this.defaultElemEnt = new this.Entity(this, '', '', []);
}
module.exports = BEMXJST;

BEMXJST.prototype.locals = Tree.methods
    .concat('local', 'applyCtx', 'applyNext', 'apply');

BEMXJST.prototype.runOninit = function(oninits, ret) {
  var self = ret || this;

  self.BEMContext = this.contextConstructor;
  for (var i = 0; i < oninits.length; i++) {
    // NOTE: oninit has global context instead of BEMXJST
    var oninit = oninits[i];
    oninit(self, { BEMContext: self.BEMContext });
  }
};

BEMXJST.prototype.compile = function(code) {
  var self = this;

  function applyCtx() {
    return self.run(self.context.ctx);
  }

  function _applyCtx() {
    return self._run(self.context.ctx);
  }

  function applyCtxWrap(ctx, changes) {
    // Fast case
    if (!changes)
      return self.local({ ctx: ctx }, applyCtx);

    return self.local(changes, function() {
      return self.local({ ctx: ctx }, _applyCtx);
    });
  }

  function _applyCtxWrap(ctx, changes) {
    // Fast case
    if (!changes)
      return self.local({ ctx: ctx }, _applyCtx);

    return self.local(changes, function() {
      return self.local({ ctx: ctx }, applyCtx);
    });
  }

  function apply(mode, changes) {
    return self.applyMode(mode, changes);
  }

  function localWrap(changes) {
    return function localBody(body) {
      return self.local(changes, body);
    };
  }

  var tree = new Tree({
    refs: {
      applyCtx: applyCtxWrap,
      _applyCtx: _applyCtxWrap,
      apply: apply
    }
  });

  // Yeah, let people pass functions to us!
  var templates = this.recompileInput(code);

  var out = tree.build(templates, [
    localWrap,
    applyCtxWrap,
    function applyNextWrap(changes) {
      if (changes)
        return self.local(changes, applyNextWrap);
      return self.applyNext();
    },
    apply
  ]);

  // Concatenate templates with existing ones
  // TODO(indutny): it should be possible to incrementally add templates
  if (this.tree) {
    this.runOninit(out.oninit);

    out = {
      templates: out.templates.concat(this.tree.templates),
      oninit: this.tree.oninit.concat(out.oninit)
    };
  }
  this.tree = out;

  // Group block+elem entities into a hashmap
  var ent = this.groupEntities(out.templates);

  // Transform entities from arrays to Entity instances
  ent = this.transformEntities(ent);

  this.entities = ent;
  this.oninit = out.oninit;
};

BEMXJST.prototype.getTemplate = function(code, options) {
  this.compile(code, options);

  return this.exportApply();
};

BEMXJST.prototype.recompileInput = function(code) {
  var args = BEMXJST.prototype.locals;
  // Reuse function if it already has right arguments
  if (typeof code === 'function' && code.length === args.length)
    return code;

  return new Function(args.join(', '), utils.fnToString(code));
};

BEMXJST.prototype.groupEntities = function(tree) {
  var res = {};
  for (var i = 0; i < tree.length; i++) {
    // Make sure to change only the copy, the original is cached in `this.tree`
    var template = tree[i].clone();
    var block = null;
    var elem;

    elem = undefined;
    for (var j = 0; j < template.predicates.length; j++) {
      var pred = template.predicates[j];
      if (!(pred instanceof PropertyMatch) &&
        !(pred instanceof AddMatch))
        continue;

      if (pred.key === 'block')
        block = pred.value;
      else if (pred.key === 'elem')
        elem = pred.value;
      else
        continue;

      // Remove predicate, we won't much against it
      template.predicates.splice(j, 1);
      j--;
    }

    if (block === null) {
      var msg = 'block(…) subpredicate is not found.\n' +
      '    See template with subpredicates:\n     * ';

      for (var j = 0; j < template.predicates.length; j++) {
        var pred = template.predicates[j];

        if (j !== 0)
          msg += '\n     * ';

        if (pred.key === '_mode') {
          msg += pred.value + '()';
        } else {
          if (Array.isArray(pred.key)) {
            msg += pred.key[0].replace('mods', 'mod')
              .replace('elemMods', 'elemMod') +
              '(\'' + pred.key[1] + '\', \'' + pred.value + '\')';
          } else {
            msg += 'match(…)';
          }
        }
      }

      msg += '\n    And template body: \n    (' +
        (typeof template.body === 'function' ?
          template.body :
          JSON.stringify(template.body)) + ')';

      if (typeof BEMXJSTError === 'undefined') {
        BEMXJSTError = require('./error').BEMXJSTError;
      }

      throw new BEMXJSTError(msg);
    }

    var key = this.classBuilder.build(block, elem);

    if (!res[key])
      res[key] = [];
    res[key].push(template);
  }
  return res;
};

BEMXJST.prototype.transformEntities = function(entities) {
  var wildcardElems = [];

  var keys = Object.keys(entities);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    // TODO(indutny): pass this values over
    var parts = this.classBuilder.split(key);
    var block = parts[0];
    var elem = parts[1];

    if (elem === '*')
      wildcardElems.push(block);

    entities[key] = new this.Entity(
      this, block, elem, entities[key]);
  }

  // Merge wildcard block templates
  if (entities.hasOwnProperty('*')) {
    var wildcard = entities['*'];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key === '*')
        continue;

      entities[key].prepend(wildcard);
    }
    this.defaultEnt.prepend(wildcard);
    this.defaultElemEnt.prepend(wildcard);
  }

  // Merge wildcard elem templates
  for (var i = 0; i < wildcardElems.length; i++) {
    var block = wildcardElems[i];
    var wildcardKey = this.classBuilder.build(block, '*');
    var wildcard = entities[wildcardKey];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key === wildcardKey)
        continue;

      var entity = entities[key];
      if (entity.block !== block || entity.elem === undefined)
        continue;

      entities[key].prepend(wildcard);
    }
    this.defaultElemEnt.prepend(wildcard);
  }

  // Set default templates after merging with wildcard
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    entities[key].setDefaults();
    this.defaultEnt.setDefaults();
    this.defaultElemEnt.setDefaults();
  }

  return entities;
};

BEMXJST.prototype._run = function(context) {
  if (context === undefined || context === '' || context === null)
    return this.runEmpty();
  else if (Array.isArray(context))
    return this.runMany(context);
  else if (
    typeof context.html === 'string' &&
    !context.tag &&
    typeof context.block === 'undefined' &&
    typeof context.elem === 'undefined' &&
    typeof context.cls === 'undefined' &&
    typeof context.attrs === 'undefined'
  )
    return this.runUnescaped(context);
  else if (utils.isSimple(context))
    return this.runSimple(context);

  return this.runOne(context);
};

BEMXJST.prototype.run = function(json) {
  var match = this.match;
  var context = this.context;
  var depth = this.depth;

  this.match = null;
  this.context = new this.contextConstructor(this);
  this.canFlush = this.context._flush !== null;
  this.depth = 0;
  var res = this._run(json);

  if (this.canFlush)
    res = this.context._flush(res);

  this.match = match;
  this.context = context;
  this.depth = depth;

  return res;
};

BEMXJST.prototype.runEmpty = function() {
  this.context._listLength--;
  return '';
};

BEMXJST.prototype.runUnescaped = function(context) {
  this.context._listLength--;
  return '' + context.html;
};

BEMXJST.prototype.runSimple = function(simple) {
  this.context._listLength--;
  if (!simple && simple !== 0 || simple === true)
    return '';

  return typeof simple === 'string' && this.context.escapeContent ?
      utils.xmlEscape(simple) :
      simple;
};

BEMXJST.prototype.runOne = function(json) {
  var context = this.context;

  var oldCtx = context.ctx;
  var oldBlock = context.block;
  var oldCurrBlock = context._currBlock;
  var oldElem = context.elem;
  var oldMods = context.mods;
  var oldElemMods = context.elemMods;

  if (json.block || json.elem)
    context._currBlock = '';
  else
    context._currBlock = context.block;

  context.ctx = json;
  if (json.block) {
    context.block = json.block;

    if (json.mods)
      context.mods = json.mods;
    else if (json.block !== oldBlock || !json.elem)
      context.mods = {};
  } else {
    if (!json.elem)
      context.block = '';
    else if (oldCurrBlock)
      context.block = oldCurrBlock;
  }

  context.elem = json.elem;
  context.elemMods = json.elemMods || {};

  var block = context.block || '';
  var elem = context.elem;

  // Control list position
  if (block || elem)
    context.position++;
  else
    context._listLength--;

  // To invalidate `applyNext` flags
  this.depth++;

  var restoreFlush = false;
  var ent = this.entities[this.classBuilder.build(block, elem)];
  if (ent) {
    if (this.canFlush && !ent.canFlush) {
      // Entity does not support flushing, do not flush anything nested
      restoreFlush = true;
      this.canFlush = false;
    }
  } else {
    // No entity - use default one
    ent = this.defaultEnt;
    if (elem !== undefined)
      ent = this.defaultElemEnt;
    ent.init(block, elem);
  }

  var res = this.options.production === true ?
    this.tryRun(context, ent) :
    ent.run(context);

  context.ctx = oldCtx;
  context.block = oldBlock;
  context.elem = oldElem;
  context.mods = oldMods;
  context.elemMods = oldElemMods;
  context._currBlock = oldCurrBlock;
  this.depth--;
  if (restoreFlush)
    this.canFlush = true;

  return res;
};

BEMXJST.prototype.tryRun = function(context, ent) {
  try {
    return ent.run(context);
  } catch (e) {
    return context.onError(context, e) || '';
  }
};

BEMXJST.prototype.renderContent = function(content, isBEM) {
  var context = this.context;
  var oldPos = context.position;
  var oldListLength = context._listLength;
  var oldNotNewList = context._notNewList;

  context._notNewList = false;
  if (isBEM) {
    context.position = 0;
    context._listLength = 1;
  }

  var res = this._run(content);

  context.position = oldPos;
  context._listLength = oldListLength;
  context._notNewList = oldNotNewList;

  return res;
};

BEMXJST.prototype.local = function(changes, body) {
  var keys = Object.keys(changes);
  var restore = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var parts = key.split('.');

    var value = this.context;
    for (var j = 0; j < parts.length - 1; j++)
      value = value[parts[j]];

    restore.push({
      parts: parts,
      value: value[parts[j]]
    });
    value[parts[j]] = changes[key];
  }

  var res = body.call(this.context);

  for (var i = 0; i < restore.length; i++) {
    var parts = restore[i].parts;
    var value = this.context;
    for (var j = 0; j < parts.length - 1; j++)
      value = value[parts[j]];

    value[parts[j]] = restore[i].value;
  }

  return res;
};

BEMXJST.prototype.applyNext = function() {
  return this.match.exec(this.context);
};

BEMXJST.prototype.applyMode = function(mode, changes) {
  var match = this.match;

  if (!match) {
    var key = this.classBuilder.build(this.context.block, this.context.elem);
    match = this.entities[key].rest[mode];
  } else {
    match = match.entity.rest[mode];
  }

  if (!match) {
    if (mode === 'mods')
      return this.context.mods;

    if (mode === 'elemMods')
      return this.context.elemMods;

    return this.context.ctx[mode];
  }

  if (!changes)
    return match.exec(this.context);

  var self = this;

  // Allocate function this way, to prevent allocation at the top of the
  // `applyMode`
  var localBody = function() {
    return match.exec(self.context);
  };
  return this.local(changes, localBody);
};

BEMXJST.prototype.exportApply = function(exports) {
  var self = this;
  var ret = exports || {};

  ret.apply = function(context) {
    return self.run(context);
  };

  // Add templates at run time
  ret.compile = function(templates) {
    self.compile(templates);
    return ret;
  };

  this.runOninit(self.oninit, ret);

  return ret;
};

},{"./class-builder":3,"./context":4,"./error":6,"./tree":9,"./utils":10,"inherits":11}],8:[function(require,module,exports){
var tree = require('./tree');
var PropertyMatch = tree.PropertyMatch;
var AddMatch = tree.AddMatch;
var WrapMatch = tree.WrapMatch;
var ExtendMatch = tree.ExtendMatch;
var CustomMatch = tree.CustomMatch;

function MatchNested(template, pred) {
  this.template = template;
  this.keys = pred.key;
  this.value = pred.value;
}

MatchNested.prototype.exec = function(context) {
  var val = context;
  var keys = this.keys;

  for (var i = 0; i < keys.length - 1; i++) {
    val = val[keys[i]];
    if (!val)
      return false;
  }

  val = val[keys[i]];

  if (this.value === true)
    return val !== undefined && val !== '' && val !== false && val !== null;

  return String(val) === this.value;
};

function MatchCustom(template, pred) {
  this.template = template;
  this.body = pred.body;
}

MatchCustom.prototype.exec = function(context) {
  return this.body.call(context, context, context.ctx);
};

function MatchWrap(template) {
  this.template = template;
  this.wrap = null;
}

MatchWrap.prototype.exec = function(context) {
  var res = this.wrap !== context.ctx;
  this.wrap = context.ctx;
  return res;
};

function MatchExtend(template) {
  this.template = template;
  this.wrap = null;
}

MatchExtend.prototype.exec = function(context) {
  var res = this.ext !== context.ctx;
  this.ext = context.ctx;
  return res;
};

function AddWrap(template, pred) {
  this.template = template;
  this.key = pred.key;
  this.value = pred.value;
}

AddWrap.prototype.exec = function(context) {
  return context[this.key] === this.value;
};

function MatchTemplate(mode, template) {
  this.mode = mode;
  this.predicates = new Array(template.predicates.length);
  this.body = template.body;

  var postpone = [];

  for (var i = 0, j = 0; i < this.predicates.length; i++, j++) {
    var pred = template.predicates[i];
    if (pred instanceof PropertyMatch) {
      this.predicates[j] = new MatchNested(this, pred);
    } else if (pred instanceof ExtendMatch) {
      j--;
      postpone.push(new MatchExtend(this));
    } else if (pred instanceof AddMatch) {
      this.predicates[j] = new AddWrap(this, pred);
    } else if (pred instanceof CustomMatch) {
      this.predicates[j] = new MatchCustom(this, pred);

      // Push MatchWrap later, they should not be executed first.
      // Otherwise they will set flag too early, and body might not be executed
    } else if (pred instanceof WrapMatch) {
      j--;
      postpone.push(new MatchWrap(this));
    } else {
      // Skip
      j--;
    }
  }

  // Insert late predicates
  for (var i = 0; i < postpone.length; i++, j++)
    this.predicates[j] = postpone[i];

  if (this.predicates.length !== j)
    this.predicates.length = j;
}
exports.MatchTemplate = MatchTemplate;

function Match(entity, modeName) {
  this.entity = entity;
  this.modeName = modeName;
  this.bemxjst = this.entity.bemxjst;
  this.templates = [];

  // applyNext mask
  this.mask = [ 0 ];

  // We are going to create copies of mask for nested `applyNext()`
  this.maskSize = 0;
  this.maskOffset = 0;

  this.count = 0;
  this.depth = -1;

  this.thrownError = null;
}
exports.Match = Match;

Match.prototype.prepend = function(other) {
  this.templates = other.templates.concat(this.templates);
  this.count += other.count;

  while (Math.ceil(this.count / 31) > this.mask.length)
    this.mask.push(0);

  this.maskSize = this.mask.length;
};

Match.prototype.push = function(template) {
  this.templates.push(new MatchTemplate(this, template));
  this.count++;

  if (Math.ceil(this.count / 31) > this.mask.length)
    this.mask.push(0);

  this.maskSize = this.mask.length;
};

Match.prototype.tryCatch = function(fn, ctx) {
  try {
    return fn.call(ctx, ctx, ctx.ctx);
  } catch (e) {
    this.thrownError = e;
    if (this.modeName) {
      this.thrownError.ctx = ctx;
      this.thrownError.name = 'BEMXJST ERROR';
      var classBuilder = this.entity.bemxjst.classBuilder;

      var cause = e.stack.split('\n')[1];
      this.thrownError.message = 'Template error in mode ' +
            this.modeName + ' in block ' +
            classBuilder.build(ctx.ctx.block, ctx.ctx.elem) +
            '\n    ' + e.message + '\n';
      this.thrownError.stack = this.thrownError.name + ': ' +
            this.thrownError.message + ' ' + cause + '\n' + e.stack;
    }
  }
};

Match.prototype.exec = function(context) {
  var save = this.checkDepth();

  var template;
  var bitIndex = this.maskOffset;
  var mask = this.mask[bitIndex];
  var bit = 1;
  for (var i = 0; i < this.count; i++) {
    if ((mask & bit) === 0) {
      template = this.templates[i];
      for (var j = 0; j < template.predicates.length; j++) {
        var pred = template.predicates[j];

        /* jshint maxdepth : false */
        if (!pred.exec(context))
          break;
      }

      // All predicates matched!
      if (j === template.predicates.length)
        break;
    }

    if (bit === 0x40000000) {
      bitIndex++;
      mask = this.mask[bitIndex];
      bit = 1;
    } else {
      bit <<= 1;
    }
  }

  if (i === this.count) {
    this.restoreDepth(save);

    if (this.modeName === 'mods')
      return context.mods;

    if (this.modeName === 'elemMods')
      return context.elemMods;

    return context.ctx[this.modeName];
  }

  var oldMask = mask;
  var oldMatch = this.bemxjst.match;
  this.mask[bitIndex] |= bit;
  this.bemxjst.match = this;

  this.thrownError = null;

  var out;
  if (typeof template.body === 'function')
    out = this.tryCatch(template.body, context);
  else
    out = template.body;

  this.mask[bitIndex] = oldMask;
  this.bemxjst.match = oldMatch;
  this.restoreDepth(save);

  var e = this.thrownError;
  if (e !== null) {
    this.thrownError = null;
    throw e;
  }

  return out;
};

Match.prototype.checkDepth = function() {
  if (this.depth === -1) {
    this.depth = this.bemxjst.depth;
    return -1;
  }

  if (this.bemxjst.depth === this.depth)
    return this.depth;

  var depth = this.depth;
  this.depth = this.bemxjst.depth;

  this.maskOffset += this.maskSize;

  while (this.mask.length < this.maskOffset + this.maskSize)
    this.mask.push(0);

  return depth;
};

Match.prototype.restoreDepth = function(depth) {
  if (depth !== -1 && depth !== this.depth)
    this.maskOffset -= this.maskSize;
  this.depth = depth;
};

},{"./tree":9}],9:[function(require,module,exports){
var inherits = require('inherits');
var utils = require('./utils');

function Template(predicates, body) {
  this.predicates = predicates;

  this.body = body;
}
exports.Template = Template;

Template.prototype.wrap = function() {
  var body = this.body;
  for (var i = 0; i < this.predicates.length; i++) {
    var pred = this.predicates[i];
    body = pred.wrapBody(body);
  }
  this.body = body;
};

Template.prototype.clone = function() {
  return new Template(this.predicates.slice(), this.body);
};

function MatchBase() {
}
exports.MatchBase = MatchBase;

MatchBase.prototype.wrapBody = function(body) {
  return body;
};

function Item(tree, children) {
  this.conditions = [];
  this.children = [];

  for (var i = children.length - 1; i >= 0; i--) {
    var arg = children[i];
    if (arg instanceof MatchBase)
      this.conditions.push(arg);
    else if (arg === tree.boundBody)
      this.children[i] = tree.queue.pop();
    else
      this.children[i] = arg;
  }
}

function WrapMatch(refs) {
  MatchBase.call(this);

  this.refs = refs;
}
inherits(WrapMatch, MatchBase);
exports.WrapMatch = WrapMatch;

WrapMatch.prototype.wrapBody = function(body) {
  var _applyCtx = this.refs._applyCtx;

  if (typeof body !== 'function') {
    return function() {
      return _applyCtx(body);
    };
  }

  return function() {
    return _applyCtx(body.call(this, this, this.ctx));
  };
};

function ReplaceMatch(refs) {
  MatchBase.call(this);

  this.refs = refs;
}
inherits(ReplaceMatch, MatchBase);
exports.ReplaceMatch = ReplaceMatch;

ReplaceMatch.prototype.wrapBody = function(body) {
  var applyCtx = this.refs.applyCtx;

  if (typeof body !== 'function') {
    return function() {
      return applyCtx(body, { position: this.position - 1 });
    };
  }

  return function() {
    return applyCtx(body.call(this, this, this.ctx),
                    { position: this.position - 1 });
  };
};

function ExtendMatch(refs) {
  MatchBase.call(this);

  this.refs = refs;
}
inherits(ExtendMatch, MatchBase);
exports.ExtendMatch = ExtendMatch;

ExtendMatch.prototype.wrapBody = function(body) {
  var refs = this.refs;
  var applyCtx = refs.applyCtx;

  if (typeof body !== 'function') {
    return function() {
      var changes = {};

      var keys = Object.keys(body);
      for (var i = 0; i < keys.length; i++)
        changes[keys[i]] = body[keys[i]];

      return applyCtx(this.ctx, changes);
    };
  }

  return function() {
    var changes = {};

    var obj = body.call(this, this, this.ctx);
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++)
      changes[keys[i]] = obj[keys[i]];

    return applyCtx(this.ctx, changes);
  };
};

function AddMatch(mode, refs) {
  MatchBase.call(this);

  this.mode = mode;
  this.refs = refs;
}
inherits(AddMatch, MatchBase);
exports.AddMatch = AddMatch;

AddMatch.prototype.wrapBody = function(body) {
  return this[this.mode + 'WrapBody'](body);
};

AddMatch.prototype.appendContentWrapBody = function(body) {
  var apply = this.refs.apply;

  if (typeof body !== 'function') {
    return function() {
      return [ apply('content') , body ];
    };
  }

  return function() {
    return [ apply('content'), body.call(this, this, this.ctx) ];
  };
};

AddMatch.prototype.prependContentWrapBody = function(body) {
  var apply = this.refs.apply;

  if (typeof body !== 'function') {
    return function() {
      return [ body, apply('content') ];
    };
  }

  return function() {
    return [ body.call(this, this, this.ctx), apply('content') ];
  };
};

AddMatch.prototype.mixWrapBody = function(body) {
  var apply = this.refs.apply;

  if (typeof body !== 'function') {
    return function() {
      var ret = apply('mix');
      /* istanbul ignore else */
      if (!Array.isArray(ret)) ret = [ ret ];
      return ret.concat(body);
    };
  }

  return function() {
    var ret = apply('mix');
    if (!Array.isArray(ret)) ret = [ ret ];
    return ret.concat(body.call(this, this, this.ctx));
  };
};

[ 'attrs', 'js', 'mods', 'elemMods' ].forEach(function(method) {
  AddMatch.prototype[ method + 'WrapBody'] = function(body) {
    var apply = this.refs.apply;

    return typeof body !== 'function' ?
      function() {
        return (this[method] = utils.extend(apply(method) || {}, body));
      } :
      function() {
        return (this[method] = utils.extend(apply(method) || {},
                               body.call(this, this, this.ctx)));
      };
  };
});

function CompilerOptions(options) {
  MatchBase.call(this);
  this.options = options;
}
inherits(CompilerOptions, MatchBase);
exports.CompilerOptions = CompilerOptions;

function PropertyMatch(key, value) {
  MatchBase.call(this);

  this.key = key;
  this.value = value;
}
inherits(PropertyMatch, MatchBase);
exports.PropertyMatch = PropertyMatch;

function CustomMatch(body) {
  MatchBase.call(this);

  this.body = body;
}
inherits(CustomMatch, MatchBase);
exports.CustomMatch = CustomMatch;

function Tree(options) {
  this.options = options;
  this.refs = this.options.refs;

  this.boundBody = this.body.bind(this);

  var methods = this.methods('body');
  for (var i = 0; i < methods.length; i++) {
    var method = methods[i];
    // NOTE: method.name is empty because of .bind()
    this.boundBody[Tree.methods[i]] = method;
  }

  this.queue = [];
  this.templates = [];
  this.initializers = [];
}
exports.Tree = Tree;

Tree.methods = [
  // Subpredicates:
  'match', 'block', 'elem', 'mod', 'elemMod',
  // Runtime related:
  'oninit', 'xjstOptions',
  // Output generators:
  'wrap', 'replace', 'extend', 'mode', 'def',
  'content', 'appendContent', 'prependContent',
  'attrs', 'addAttrs', 'js', 'addJs', 'mix', 'addMix',
  'mods', 'addMods', 'addElemMods', 'elemMods',
  'tag', 'cls', 'bem'
];

Tree.prototype.build = function(templates, apply) {
  var methods = this.methods('global').concat(apply);
  methods[0] = this.match.bind(this);

  templates.apply({}, methods);

  return {
    templates: this.templates.slice().reverse(),
    oninit: this.initializers
  };
};

function methodFactory(self, kind, name) {
  var method = self[name];
  var boundBody = self.boundBody;

  if (kind !== 'body') {
    if (name === 'replace' || name === 'extend' || name === 'wrap') {
      return function() {
        return method.apply(self, arguments);
      };
    }

    return function() {
      method.apply(self, arguments);
      return boundBody;
    };
  }

  return function() {
    var res = method.apply(self, arguments);

    // Insert body into last item
    var child = self.queue.pop();
    var last = self.queue[self.queue.length - 1];
    last.conditions = last.conditions.concat(child.conditions);
    last.children = last.children.concat(child.children);

    if (name === 'replace' || name === 'extend' || name === 'wrap')
      return res;
    return boundBody;
  };
}

Tree.prototype.methods = function(kind) {
  var out = new Array(Tree.methods.length);

  for (var i = 0; i < out.length; i++) {
    var name = Tree.methods[i];
    out[i] = methodFactory(this, kind, name);
  }

  return out;
};

// Called after all matches
Tree.prototype.flush = function(conditions, item) {
  var subcond = item.conditions ?
    conditions.concat(item.conditions) :
    item.conditions;

  for (var i = 0; i < item.children.length; i++) {
    var arg = item.children[i];

    // Go deeper
    if (arg instanceof Item) {
      this.flush(subcond, item.children[i]);

    // Body
    } else {
      if (this.isShortcutAllowed(arg, conditions)) {
        var keys = Object.keys(arg);
        for (var n = 0; n < keys.length; n++)
          this.addTemplate(
            conditions.concat(this.createMatch(keys[n])),
            arg[keys[n]]
          );
      } else {
        this.addTemplate(conditions, arg);
      }
    }
  }
};

Tree.prototype.createMatch = function(modeName) {
  switch (modeName) {
    case 'addAttrs':
      return [
        new PropertyMatch('_mode', 'attrs'),
        new AddMatch('attrs', this.refs)
      ];
    case 'addJs':
      return [
        new PropertyMatch('_mode', 'js'),
        new AddMatch('js', this.refs)
      ];
    case 'addMix':
      return [
        new PropertyMatch('_mode', 'mix'),
        new AddMatch('mix', this.refs)
      ];
    case 'addMods':
      return [
        new PropertyMatch('_mode', 'mods'),
        new AddMatch('mods', this.refs)
      ];
    case 'addElemMods':
      return [
        new PropertyMatch('_mode', 'elemMods'),
        new AddMatch('elemMods', this.refs)
      ];
    case 'appendContent':
    case 'prependContent':
      return [
        new PropertyMatch('_mode', 'content'),
        new AddMatch(modeName, this.refs)
      ];

    case 'wrap':
      return new WrapMatch(this.refs);

    case 'replace':
      return new ReplaceMatch(this.refs);

    case 'extend':
      return new ExtendMatch(this.refs);

    case 'def':
      return new PropertyMatch('_mode', 'default');

    default:
      return new PropertyMatch('_mode', modeName);
  }
};

Tree.prototype.addTemplate = function(conditions, arg) {
  var template = new Template(conditions, arg);
  template.wrap();
  this.templates.push(template);
};

Tree.prototype.body = function() {
  var children = new Array(arguments.length);
  for (var i = 0; i < arguments.length; i++)
    children[i] = arguments[i];

  var child = new Item(this, children);
  this.queue[this.queue.length - 1].children.push(child);

  if (this.queue.length === 1)
    this.flush([], this.queue.shift());

  return this.boundBody;
};

Tree.modsCheck = { mods: 1, elemMods: 1 };

Tree.checkConditions = function(conditions) {
  for (var i = 0; i < conditions.length; i++) {
    var condition = conditions[i];
    if (condition.key === 'block' ||
      condition.key === 'elem' ||
      (Array.isArray(condition.key) && Tree.modsCheck[condition.key[0]]) ||
      condition instanceof CustomMatch) continue;
    return false;
  }

  return true;
};

Tree.prototype.isShortcutAllowed = function(arg, conditions) {
  return typeof arg === 'object' &&
    arg !== null &&
    !Array.isArray(arg) &&
    Tree.checkConditions(conditions);
};

Tree.prototype.match = function() {
  var children = new Array(arguments.length);

  if (!arguments.length)
    throw new Error('.match() must have argument');

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (typeof arg === 'function')
      arg = new CustomMatch(arg);

    if (!(arg instanceof MatchBase))
      throw new Error('Wrong .match() argument');

    children[i] = arg;
  }

  this.queue.push(new Item(this, children));

  return this.boundBody;
};

Tree.prototype.applyMode = function(args, mode) {
  if (args.length) {
    throw new Error('Predicate should not have arguments but ' +
      JSON.stringify(args) + ' passed');
  }

  return this.mode(mode);
};

Tree.prototype.xjstOptions = function(options) {
  this.queue.push(new Item(this, [
    new CompilerOptions(options)
  ]));
  return this.boundBody;
};

[ 'mode', 'elem', 'block' ].forEach(function(method) {
  Tree.prototype[method] = function(name) {
    return this.match(new PropertyMatch(
      method === 'mode' ? '_mode' : method, name));
  };
});

[ 'mod', 'elemMod' ].forEach(function(method) {
  Tree.prototype[method] = function(name, value) {
    return this.match(new PropertyMatch([ method + 's', name ],
                                  value === undefined ? true : String(value)));
  };
});

Tree.prototype.def = function() {
  return this.applyMode(arguments, 'default');
};

[
  'content', 'mix', 'bem', 'js', 'cls', 'attrs', 'tag', 'elemMods', 'mods'
].forEach(function(method) {
  Tree.prototype[method] = function() {
    return this.applyMode(arguments, method);
  };
});

[ 'appendContent', 'prependContent' ].forEach(function(method) {
  Tree.prototype[method] = function() {
    return this.content.apply(this, arguments)
      .match(new AddMatch(method, this.refs));
  };
});

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

[ 'mods', 'elemMods', 'attrs', 'js', 'mix' ].forEach(function(method) {
  Tree.prototype['add' + capitalize(method)] = function() {
    return this[method].apply(this, arguments)
      .match(new AddMatch(method, this.refs));
  };
});

Tree.prototype.wrap = function() {
  return this.def.apply(this, arguments).match(new WrapMatch(this.refs));
};

Tree.prototype.replace = function() {
  return this.def.apply(this, arguments).match(new ReplaceMatch(this.refs));
};

Tree.prototype.extend = function() {
  return this.def.apply(this, arguments).match(new ExtendMatch(this.refs));
};

Tree.prototype.oninit = function(fn) {
  this.initializers.push(fn);
};

},{"./utils":10,"inherits":11}],10:[function(require,module,exports){
var amp = '&amp;';
var lt = '&lt;';
var gt = '&gt;';
var quot = '&quot;';
var singleQuot = '&#39;';

var matchXmlRegExp = /[&<>]/;

function isEmpty(string) {
  return typeof string === 'undefined' ||
     string === null ||
     (typeof string === 'number' && isNaN(string));
}

exports.xmlEscape = function(string) {
  if (isEmpty(string))
    return '';

  var str = '' + string;
  var match = matchXmlRegExp.exec(str);

  if (!match)
    return str;

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 38: // &
        escape = amp;
        break;
      case 60: // <
        escape = lt;
        break;
      case 62: // >
        escape = gt;
        break;
      default:
        continue;
    }

    if (lastIndex !== index)
      html += str.substring(lastIndex, index);

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ?
    html + str.substring(lastIndex, index) :
    html;
};

var matchAttrRegExp = /["&<>]/;

exports.attrEscape = function(string) {
  if (isEmpty(string))
    return '';

  var str = '' + string;
  var match = matchAttrRegExp.exec(str);

  if (!match)
    return str;

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = quot;
        break;
      case 38: // &
        escape = amp;
        break;
      case 60: // <
        escape = lt;
        break;
      case 62: // >
        escape = gt;
        break;
      default:
        continue;
    }

    if (lastIndex !== index)
      html += str.substring(lastIndex, index);

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ?
    html + str.substring(lastIndex, index) :
    html;
};

var matchJsAttrRegExp = /['&]/;

exports.jsAttrEscape = function(string) {
  if (isEmpty(string))
    return '';

  var str = '' + string;
  var match = matchJsAttrRegExp.exec(str);

  if (!match)
    return str;

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 38: // &
        escape = amp;
        break;
      case 39: // '
        escape = singleQuot;
        break;
      default:
        continue;
    }

    if (lastIndex !== index)
      html += str.substring(lastIndex, index);

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ?
    html + str.substring(lastIndex, index) :
    html;
};

exports.extend = function(o1, o2) {
  if (!o1 || !o2)
    return o1 || o2;

  var res = {};
  var n;

  for (n in o1)
    /* istanbul ignore else */
    if (o1.hasOwnProperty(n))
      res[n] = o1[n];
  for (n in o2)
    /* istanbul ignore else */
    if (o2.hasOwnProperty(n))
      res[n] = o2[n];
  return res;
};

var SHORT_TAGS = { // hash for quick check if tag short
  area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1,
  input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, wbr: 1
};

exports.isShortTag = function(t) {
  return SHORT_TAGS.hasOwnProperty(t);
};

exports.isSimple = function isSimple(obj) {
  if (!obj ||
      obj === true ||
      typeof obj === 'string' ||
      typeof obj === 'number')
    return true;

  if (!obj.block &&
      !obj.elem &&
      !obj.tag &&
      !obj.cls &&
      !obj.attrs &&
      obj.hasOwnProperty('html') &&
      isSimple(obj.html))
    return true;

  return false;
};

exports.isObj = function(val) {
  return val && typeof val === 'object' && !Array.isArray(val) &&
    val !== null;
};

var uniqCount = 0;
var uniqId = +new Date();
var uniqExpando = '__' + uniqId;
var uniqPrefix = 'uniq' + uniqId;

function getUniq() {
  return uniqPrefix + (++uniqCount);
}
exports.getUniq = getUniq;

exports.identify = function(obj, onlyGet) {
  if (!obj)
    return getUniq();
  if (onlyGet || obj[uniqExpando])
    return obj[uniqExpando];

  var u = getUniq();
  obj[uniqExpando] = u;
  return u;
};

exports.fnToString = function(code) {
  // It is fine to compile without templates at first
  if (!code)
    return '';

  if (typeof code === 'function') {
    // Examples for regular function
    //   function () { … }
    //   function name() { … }
    //   function (a, b) { … }
    //   function name(a, b) { … }
    //
    // Examples for arrow function
    //   () => { … }
    //   (a, b) => { … }
    //   _ => { … }

    code = code.toString();
    code = code.replace(
      code.indexOf('function') === 0 ?
      /^function\s*[^{]+{|}$/g :
      /^(_|\(\w|[^=>]+\))\s=>\s{|}$/g,
    '');
  }

  return code;
};

/**
 * regexp for check may attribute be unquoted
 *
 * https://www.w3.org/TR/html4/intro/sgmltut.html#h-3.2.2
 * https://www.w3.org/TR/html5/syntax.html#attributes
 */
var UNQUOTED_ATTR_REGEXP = /^[:\w.-]+$/;

exports.isUnquotedAttr = function(str) {
  return str && UNQUOTED_ATTR_REGEXP.exec(str);
};

},{}],11:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}]},{},[2])(2)
});;
return module.exports || exports.BEMHTML;
}({}, {});
var api = new BEMHTML({"elemJsInstances":true,"exportName":"BEMHTML","sourceMap":{"from":"price.bemhtml.js"},"to":"/Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru"});
api.compile(function(match, block, elem, mod, elemMod, oninit, xjstOptions, wrap, replace, extend, mode, def, content, appendContent, prependContent, attrs, addAttrs, js, addJs, mix, addMix, mods, addMods, addElemMods, elemMods, tag, cls, bem, local, applyCtx, applyNext, apply) {
/* BEM-XJST User code here: */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-core/common.blocks/page/page.bemhtml.js */
block('page')(

    mode('doctype')(function() {
        return { html : this.ctx.doctype || '<!DOCTYPE html>' };
    }),

    wrap()(function() {
        var ctx = this.ctx;
        this._nonceCsp = ctx.nonce;

        return [
            apply('doctype'),
            {
                tag : 'html',
                attrs : { lang : ctx.lang },
                cls : 'ua_js_no',
                content : [
                    {
                        elem : 'head',
                        content : [
                            { tag : 'meta', attrs : { charset : 'utf-8' } },
                            ctx.uaCompatible === false? '' : {
                                tag : 'meta',
                                attrs : {
                                    'http-equiv' : 'X-UA-Compatible',
                                    content : ctx.uaCompatible || 'IE=edge'
                                }
                            },
                            { tag : 'title', content : ctx.title },
                            { block : 'ua', attrs : { nonce : ctx.nonce } },
                            ctx.head,
                            ctx.styles,
                            ctx.favicon? { elem : 'favicon', url : ctx.favicon } : ''
                        ]
                    },
                    ctx
                ]
            }
        ];
    }),

    tag()('body'),

    content()(function() {
        return [
            applyNext(),
            this.ctx.scripts
        ];
    }),

    elem('head')(
        bem()(false),
        tag()('head')
    ),

    elem('meta')(
        bem()(false),
        tag()('meta')
    ),

    elem('link')(
        bem()(false),
        tag()('link')
    ),

    elem('favicon')(
        bem()(false),
        tag()('link'),
        attrs()(function() {
            return this.extend(applyNext() || {}, { rel : 'shortcut icon', href : this.ctx.url });
        })
    )

);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-core/common.blocks/page/page.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-core/common.blocks/ua/ua.bemhtml.js */
block('ua')(
    tag()('script'),
    bem()(false),
    content()([
        '(function(e,c){',
            'e[c]=e[c].replace(/(ua_js_)no/g,"$1yes");',
        '})(document.documentElement,"className");'
    ])
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-core/common.blocks/ua/ua.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-core/common.blocks/page/__css/page__css.bemhtml.js */
block('page').elem('css')(
    bem()(false),
    tag()('style'),
    match(function() { return this.ctx.url; })(
        tag()('link'),
        attrs()(function() {
            return this.extend(applyNext() || {}, { rel : 'stylesheet', href : this.ctx.url });
        })
    )
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-core/common.blocks/page/__css/page__css.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-core/common.blocks/page/__js/page__js.bemhtml.js */
block('page').elem('js')(
    bem()(false),
    tag()('script'),
    attrs()(function() {
        var attrs = {};
        if(this.ctx.url) {
            attrs.src = this.ctx.url;
        } else if(this._nonceCsp) {
            attrs.nonce = this._nonceCsp;
        }

        return this.extend(applyNext() || {}, attrs);
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-core/common.blocks/page/__js/page__js.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/header/header.bemhtml.js */
block('header').content()(function() {

    return [{
        elem: 'container',
        elemMods: { border: 'radius' },
        content: [{
                elem: 'logo',
                content: [{
                    block: 'link',
                    url: '/',
                    content: [{ block: 'logo' }, ]
                }]
            },
            {
                elem: 'header-text',
                elemMods: { width: '300', 'padding-right': '15', 'padding-left': '20' },
                content: [{
                    block: 'text',
                    mods: { color: 'gray' },
                    // mix: [{ block: 'page_hide_mob' }, { block: 'text_color_grey' }],
                    content: 'Шелкография на изделиях в Москве с доставкой по России и СНГ'
                }]
            },
            {
                elem: 'header-text',
                elemMods: { width: '250', 'padding-right': '15', 'padding-left': '20' },
                content: [{
                        block: 'image',
                        url: '../../img/map-point.jpg',
                        mods: { 'padding-right': '15' }
                    },
                    {
                        block: 'text',
                        mods: { color: 'gray' },
                        content: 'г.Москва, Павелецкая наб. д.2'
                    }
                ]
            },
            {
                elem: 'mode',
                content: [{
                        block: 'text',
                        mods: { color: 'gray' },
                        content: 'Ежедневно: 09:00 - 20:00'
                    },
                    {
                        elem: 'header-text',
                        content: [{
                                block: 'image',
                                url: '../../img/icons/icon-mail.png',
                                mods: { 'padding-right': '10' }
                            },
                            {
                                block: 'link',
                                mods: { color: 'blue', decoration: 'none' },
                                url: 'mailto:order@rf-print.ru',
                                content: [{
                                    block: 'text',
                                    content: 'order@rf-print.ru'
                                }]
                            }
                        ]
                    }
                ]
            },
            {
                elem: 'mode',
                content: [{
                        block: 'text',
                        mods: { size: 'xl' },
                        content: '8 (495) 189-73-96'
                    },
                    {
                        elem: 'header-text',
                        content: [{
                            block: 'link',
                            mods: { color: 'blue', decoration: 'none' },
                            mix: [{ block: 'text_size_xl' }],
                            url: '#',
                            content: [{
                                block: 'text',
                                content: 'Заказать звонок'
                            }]
                        }]
                    }
                ]
            }

        ]
    }]
})


/*
block: 'row',
            mods: { vam: 'l' },
            content: [{
                    elem: 'col',
                    elemMods: { lw: 2, s: true },
                    mix: [{ block: 'text_mob_center-center' }, { block: 'header_border-right' }, { block: 'header_flex_content-row-center' }],
                    content: [{
                            elem: 'logo',
                            mix: { block: 'page_hide_mob' },
                            content: {
                                block: 'link',
                                url: '/',
                                content: [
                                    { block: 'logo' },
                                ]
                            }
                        },
                        {
                            block: 'link',
                            mix: [{ block: 'pushy-link' }, { block: 'page_hide_pc' }],
                            content: {
                                block: 'icon',
                                mods: { size: 'm', glyph: 'bars', color: 'white', 'margin-svg': 'off' }
                            }
                        }
                    ]
                },
                {
                    elem: 'col',
                    elemMods: { lw: 2, s: true },
                    mix: [{ block: 'text_mob_center-center' }, { block: 'text_pc_center-center' }, { block: 'header_border-right' }],
                    content: [{
                        block: 'text',
                        mix: { block: 'page_hide_mob' },
                        content: 'Шелкография на изделиях в Москве с доставкой по России и СНГ'
                    }]
                },
                {
                    elem: 'col',
                    elemMods: { lw: 2, s: true },
                    mix: [{ block: 'text_mob_center-center' }, { block: 'text_pc_center-center' }, { block: 'header_border-right' }],
                    content: [{
                            elem: 'address',
                            mix: { block: 'page_hide_mob' },
                            content: {
                                block: 'link',
                                url: '/contacts',
                                content: 'г.Москва, Павелецкая наб. д.2'
                            }
                        },
                        {
                            block: 'link',
                            mix: { block: 'page_hide_pc' },
                            url: '/calculator.html',
                            content: {
                                block: 'icon',
                                mods: { size: 'm', glyph: 'calculator', color: 'white', 'margin-svg': 'off' }
                            }
                        }
                    ]
                },
                {
                    elem: 'col',
                    elemMods: { lw: 2, s: true },
                    mix: [{ block: 'text_mob_center-center' }, { block: 'text_pc_center-center' }, { block: 'header_border-right' }],
                    content: [{
                            elem: 'email',
                            mix: { block: 'page_hide_mob' },
                            content: {
                                block: 'link',
                                url: 'mailto:order@rf-print.ru',
                                content: 'Email для заказов: order@rf-print.ru'
                            }
                        },
                        {
                            block: 'link',
                            url: 'mailto:order@rf-print.ru',
                            content: {
                                block: 'icon',
                                mix: { block: 'page_hide_pc' },
                                mods: { size: 'm', glyph: 'envelope-o', color: 'white', 'margin-svg': 'off' }
                            }
                        }
                    ]
                },
                {
                    elem: 'col',
                    elemMods: { lw: 2, s: true },
                    mix: [{ block: 'text_mob_center-center' }, { block: 'text_pc_center-right' }],
                    content: [{
                            elem: 'phone',
                            mix: { block: 'page_hide_mob' },
                            content: [{
                                    block: 'link',
                                    url: 'tel:+74951086935',
                                    mods: { color: 'black' },
                                    mix: { block: 'text_size_xxl' },
                                    content: '+7 (495)108 69 35'
                                },

                                { tag: 'br' },
                                { tag: 'br' },

                                {
                                    block: 'text',
                                    content: [{
                                            block: 'icon',
                                            mods: { size: 's', glyph: 'phone', color: 'black', 'mr-r': '15', 'margin-svg': 'off' }
                                        },
                                        { block: 'text', tag: 'span', mods: { cursor: 'pointer' }, mix: { block: 'js-call-order' }, content: 'Заказать звонок' }
                                    ]
                                }
                            ]
                        },
                        {
                            block: 'link',
                            mods: { padding: '20' },
                            mix: { block: 'page_hide_pc' },
                            url: 'tel:+74951086935',
                            content: {
                                block: 'icon',
                                mods: { size: 'm', glyph: 'phone', color: 'white', 'margin-svg': 'off' }
                            }
                        }
                    ]
                },
            ]
        }
*/
/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/header/header.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/image/image.bemhtml.js */
block('image')(
    addAttrs()({ role : 'img' }),

    tag()('span'),

    match(function() { return typeof this.ctx.content === 'undefined'; })(
        tag()('img'),
        addAttrs()(function() {
            var ctx = this.ctx;
            return this.extend(applyNext(),
                {
                    role : undefined,
                    src : ctx.url,
                    width : ctx.width,
                    height : ctx.height,
                    alt : ctx.alt,
                    title : ctx.title
                });
        })
    )
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/image/image.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/icon/icon.bemhtml.js */
block('icon')(
    tag()('span'),
    addAttrs()(function() {
        var attrs = {},
            url = this.ctx.url;
        if(url) attrs.style = 'background-image:url(' + url + ')';
        return attrs;
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/icon/icon.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/logo/logo.bemhtml.js */
block('logo').content()(function() {
    return [{
        block: 'image',
        url: '../../img/rf-print__log.png',
        title: 'РФ Принт',
        mods: { padding: '10' },
        width: 140,
        height: 39
    }]
});
/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/logo/logo.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_envelope-o.bemhtml.js */
block('icon').mod('glyph', 'envelope-o').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M1664 1504v-768q-32 36-69 66-268 206-426 338-51 43-83 67t-86.5 48.5-102.5 24.5h-2q-48 0-102.5-24.5t-86.5-48.5-83-67q-158-132-426-338-37-30-69-66v768q0 13 9.5 22.5t22.5 9.5h1472q13 0 22.5-9.5t9.5-22.5zm0-1051v-24.5l-.5-13-3-12.5-5.5-9-9-7.5-14-2.5h-1472q-13 0-22.5 9.5t-9.5 22.5q0 168 147 284 193 152 401 317 6 5 35 29.5t46 37.5 44.5 31.5 50.5 27.5 43 9h2q20 0 43-9t50.5-27.5 44.5-31.5 46-37.5 35-29.5q208-165 401-317 54-43 100.5-115.5t46.5-131.5zm128-37v1088q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1472q66 0 113 47t47 113z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_envelope-o.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_phone.bemhtml.js */
block('icon').mod('glyph', 'phone').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1408 1792"><path d="M1408 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-53-3.5t-57.5-12.5-47-14.5-55.5-20.5-49-18q-98-35-175-83-127-79-264-216t-216-264q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47-12.5-57.5-3.5-53q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_phone.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_calculator.bemhtml.js */
block('icon').mod('glyph', 'calculator').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M384 1536q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm384 0q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm-384-384q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm768 384q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm-384-384q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm-384-384q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm768 384q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm-384-384q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm768 768v-384q0-52-38-90t-90-38-90 38-38 90v384q0 52 38 90t90 38 90-38 38-90zm-384-768q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm384-320v-256q0-26-19-45t-45-19h-1280q-26 0-45 19t-19 45v256q0 26 19 45t45 19h1280q26 0 45-19t19-45zm0 320q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm128-640v1536q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1536q0-52 38-90t90-38h1408q52 0 90 38t38 90z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_calculator.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/footer/footer.bemhtml.js */
block('footer').content()(function() {
    return [{
        elem: 'container',
        content: [{
                elem: 'plate-text',
                content: [{
                        block: 'text',
                        mods: { color: 'white', weight: '400', size: '5xl', pc: 'left-top', 'line-height': 'xl' },
                        content: 'Печать на одежде и текстильных изделиях'

                    },
                    {
                        block: 'text',
                        mods: { color: 'white', weight: '300', size: 'ml', pc: 'left-top' },
                        content: 'Профессиональное оборудование: любой тираж, качественные краски, доступные цены.'

                    },
                ]
            },
            {
                elem: 'form',
                content: [{
                        block: 'text',
                        mods: { color: 'white', weight: '300', size: '2xl', pc: 'left-top' },
                        content: 'Расчитать заказ'

                    },
                    {
                        block: 'input',
                        mods: { theme: 'rfprint' },
                        content: ''

                    },
                    {
                        block: 'input',
                        mods: { theme: 'rfprint' },
                        content: ''

                    },
                    {
                        block: 'textarea',
                        mods: { theme: 'rfprint' },
                        content: ''

                    },
                    {
                        block: 'text',
                        mods: { color: 'white', weight: '300', size: 'sl', pc: 'left-top' },
                        content: 'Принимаю пользовательское соглашение и политику конфиденциальности'

                    },
                    {
                        block: 'button',
                        mods: { theme: 'rfprint' },
                        content: ''
                    }

                ]
            }
        ]
    }]
})
/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/footer/footer.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/how-working/how-working.bemhtml.js */
block('how-working').content()(function() {
  return [{
    elem: 'wrapp',

    content:[
      {
          block: 'title',
          tag: 'h2',
          attrs: { name: 'howworking'} ,
          mods: { 'text-align': 'center' },
          content:'Как мы работаем'
      },
      {
        elem: 'swiper',
        mix: [{ block: 'swiper-container' } ],
        content:[
            { block: 'swiper-wrapper',
              content:
              [
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'phone', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Звоните нам или пишите на Email' }
                    ]
                  }
                },
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'user', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Наш менеджер свяжется с Вами в течении 10—15 мин' }
                    ]
                  }
                },
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'commenting-o', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Озвучиваете интересующий Вас вопрос или задачу' }
                    ]
                  }
                },
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'info-circle', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Мы производим расчет по стоимости' }
                    ]
                  }
                },
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'file-text-o', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Затем оплачиваете заказ удобным способом и ожидаете поставку ' }
                    ]
                  }
                },
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'thumbs-o-up', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Далее мы запускаем заказ в производство по готовности доставляем его после утверждения финального образца' }
                    ]
                  }
                }

              ]
            },
            { elem: 'swiper-pagination', content: ''}
          ]
      }
    ]

  }]
})

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/how-working/how-working.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/link/link.bemhtml.js */
block('link')(
    def()(function() {
        var ctx = this.ctx;
        typeof ctx.url === 'object' && // url could contain bemjson
            (ctx.url = this.reapply(ctx.url));
        return applyNext();
    }),

    tag()('a'),

    addJs()(true),

    // NOTE: mix below is to satisfy interface of `control`
    addMix()([{ elem : 'control' }]),

    addAttrs()(function() {
        var ctx = this.ctx,
            attrs = { role : 'link' },
            tabIndex;

        if(!this.mods.disabled) {
            if(ctx.url) {
                attrs.href = ctx.url;
                tabIndex = ctx.tabIndex;
            } else {
                tabIndex = ctx.tabIndex || 0;
            }
        } else {
            attrs['aria-disabled'] = 'true';
        }

        typeof tabIndex === 'undefined' || (attrs.tabindex = tabIndex);

        ctx.title && (attrs.title = ctx.title);
        ctx.target && (attrs.target = ctx.target);

        return attrs;
    }),

    mod('disabled', true)
        .js()(function() {
            return this.extend(applyNext(), { url : this.ctx.url });
        })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/link/link.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_commenting-o.bemhtml.js */
block('icon').mod('glyph', 'commenting-o').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M640 896q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm384 0q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm384 0q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-512-512q-204 0-381.5 69.5t-282 187.5-104.5 255q0 112 71.5 213.5t201.5 175.5l87 50-27 96q-24 91-70 172 152-63 275-171l43-38 57 6q69 8 130 8 204 0 381.5-69.5t282-187.5 104.5-255-104.5-255-282-187.5-381.5-69.5zm896 512q0 174-120 321.5t-326 233-450 85.5q-70 0-145-8-198 175-460 242-49 14-114 22h-5q-15 0-27-10.5t-16-27.5v-1q-3-4-.5-12t2-10 4.5-9.5l6-9 7-8.5 8-9q7-8 31-34.5t34.5-38 31-39.5 32.5-51 27-59 26-76q-157-89-247.5-220t-90.5-281q0-130 71-248.5t191-204.5 286-136.5 348-50.5 348 50.5 286 136.5 191 204.5 71 248.5z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_commenting-o.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_thumbs-o-up.bemhtml.js */
block('icon').mod('glyph', 'thumbs-o-up').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792"><path d="M256 1344q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm1152-576q0-51-39-89.5t-89-38.5h-352q0-58 48-159.5t48-160.5q0-98-32-145t-128-47q-26 26-38 85t-30.5 125.5-59.5 109.5q-22 23-77 91-4 5-23 30t-31.5 41-34.5 42.5-40 44-38.5 35.5-40 27-35.5 9h-32v640h32q13 0 31.5 3t33 6.5 38 11 35 11.5 35.5 12.5 29 10.5q211 73 342 73h121q192 0 192-167 0-26-5-56 30-16 47.5-52.5t17.5-73.5-18-69q53-50 53-119 0-25-10-55.5t-25-47.5q32-1 53.5-47t21.5-81zm128-1q0 89-49 163 9 33 9 69 0 77-38 144 3 21 3 43 0 101-60 178 1 139-85 219.5t-227 80.5h-129q-96 0-189.5-22.5t-216.5-65.5q-116-40-138-40h-288q-53 0-90.5-37.5t-37.5-90.5v-640q0-53 37.5-90.5t90.5-37.5h274q36-24 137-155 58-75 107-128 24-25 35.5-85.5t30.5-126.5 62-108q39-37 90-37 84 0 151 32.5t102 101.5 35 186q0 93-48 192h176q104 0 180 76t76 179z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_thumbs-o-up.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_info-circle.bemhtml.js */
block('icon').mod('glyph', 'info-circle').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792"><path d="M1024 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_info-circle.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_user.bemhtml.js */
block('icon').mod('glyph', 'user').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 1792"><path d="M1280 1399q0 109-62.5 187t-150.5 78h-854q-88 0-150.5-78t-62.5-187q0-85 8.5-160.5t31.5-152 58.5-131 94-89 134.5-34.5q131 128 313 128t313-128q76 0 134.5 34.5t94 89 58.5 131 31.5 152 8.5 160.5zm-256-887q0 159-112.5 271.5t-271.5 112.5-271.5-112.5-112.5-271.5 112.5-271.5 271.5-112.5 271.5 112.5 112.5 271.5z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_user.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_file-text-o.bemhtml.js */
block('icon').mod('glyph', 'file-text-o').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792"><path d="M1468 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-1024-864q0-14 9-23t23-9h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64zm736 224q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704zm0 256q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_file-text-o.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/form/form.bemhtml.js */
block('form')(
  tag()('form'),
  addAttrs()(
    {
      name:'form_order',
      id:'form_order',
      action: '#fogm-go',
      enctype: 'multipart/form-data',
      method: 'post'
    }
  ),
  content()(function() {
    return [{
      elem: 'wrapp',
      content: [
        { elem: 'relContainer',
          content: [
            { tag: 'label',
              attrs: { for: 'typeprint' },
              content: [
              { block: 'text', mods: { size: 'xxl', color: 'gray' }, content: ['Тип печати', { block: 'req', tag: 'span', content: '*'}] },
              { block: 'dropdown',
                mods: { switcher: 'button', theme: 'islands', size: 's' },
                switcher: {
                  block: 'button',
                  mods: { togglable: 'check', clear: true },
                  text: { block: 'icon', mods: { size: 'q', glyph: 'question-circle', color:'gray', 'margin-svg':'off' } }
                },
                popup: ' Вид нанесения на материал '
              }]
            },
            { block: 'selected',
              mods: {
                   mode: 'radio',
                   theme: 'rfprint',
                   size: 'm'
               },
              tag: 'select',
              attrs: { name: 'typeprint' },
              content: [
                { tag: 'option', attrs: { value: 'Шелкография' }, content: 'Шелкография' },
                { tag: 'option', attrs: { value: 'Трафаретная' }, content: 'Трафаретная печать' }
              ]
            }
          ]
        },
        { elem: 'relContainer',
          content: [{
            tag: 'input',
            attrs: { type: 'file', name: 'file_image' }
          }]
        },
        { elem: 'relContainer',
          content: [
            {
              tag: 'label',
              attrs: {
                for: 'typeizdelia'
              },
              content: [
                { block: 'text', mods: { size: 'xxl', color: 'gray' }, content: ['Тип Изделия', { block: 'req', tag: 'span', content: '*'}] },
                { block: 'dropdown', mods: { switcher: 'button', theme: 'islands', size: 'm' },
                  switcher: {
                    block: 'button',
                    mods: { togglable: 'check', clear: true },
                    text: { block: 'icon', mods: { size: 'q', glyph: 'question-circle', color:'gray', 'margin-svg':'off' } }
                  },
                  popup: ' Важно знать материал на котором будет печать, для точного определения наилучшего типа печати '
                }]
            },
            {
              block: 'selected',
              mods: {
                   mode: 'radio',
                   theme: 'rfprint',
                   size: 'm'
               },
              tag: 'select',
              attrs: { name: 'typeizdelia' },
              content: [
                { tag: 'option', attrs: { value: 'Хлопчатые' }, content: 'Хлопчатые' },
                { tag: 'option', attrs: { value: 'Кожанные' }, content: 'Кожанные' }
              ]
            }
          ]
        },
        { elem: 'relContainer',
          content: [
            { tag: 'label',
              attrs: { for: 'typeprint' },
              content: { block: 'text', mods: { size: 'xxl', color: 'gray' }, content: ['Контакты', { block: 'req', tag: 'span', content: '*'}] },
            },
            {
              block: 'input',
              mods: {
                  theme: 'rfprint',
                  size: 'm'
              },
              attrs: { required: true },
              placeholder: 'Ваше имя',
              name: 'name',
              val: '',
            },
            {
              block: 'input',
              mods: {
                  theme: 'rfprint',
                  size: 'm'
              },
              attrs: { required: true },
              placeholder: '+7 (___) ___ __ __*',
              name: 'phone',
              val: '',
            },
            {
              block: 'input',
              mods: {
                  theme: 'rfprint',
                  size: 'm'
              },
              attrs: { required: true },
              placeholder: 'Ваш E-mail',
              name: 'email',
              val: '',
            }]
        },
        { elem: 'relContainer',
          content: [{
            block: 'textarea',
            tag: 'textarea',
            mods: {
                theme: 'rfprint',
                size: 'm'
            },
            placeholder: 'Комментарии к заказу',
            name: 'message',
            val: '',
            // attrs: { name: 'message', placeholder: 'Комментарии к заказу' }
          }]
        },
        { elem: 'buttons',
          content:[
            {
              block: 'checkbox',
              mods: {
                  theme: 'islands',
                  size: 'm',
                  checked: true
              },
              attrs: {id: 'agree' },
              name: 'agree',
              val: 'agree',
              text: 'Я согласен на обработку данных'
            },
            {
              block: 'button',
              mods: { position: 'middle', theme: 'rfprint', order: 'blue'},
              id: 'form_order_btn_send',
              content: [{
                  block: 'text',
                  mods: { color: 'white', padding: 'right'},
                  tag: 'span',
                  content: { block: 'text', mods: { size: 'xl', text: 'bold' }, content: 'Отправить' }
              }]
            }
          ]
        }
      ]
    }]
  })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/form/form.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_arrow-right.bemhtml.js */
block('icon').mod('glyph', 'arrow-right').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792"><path d="M1472 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_arrow-right.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_question-circle.bemhtml.js */
block('icon').mod('glyph', 'question-circle').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792"><path d="M896 1376v-192q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v192q0 14 9 23t23 9h192q14 0 23-9t9-23zm256-672q0-88-55.5-163t-138.5-116-170-41q-243 0-371 213-15 24 8 42l132 100q7 6 19 6 16 0 25-12 53-68 86-92 34-24 86-24 48 0 85.5 26t37.5 59q0 38-20 61t-68 45q-63 28-115.5 86.5t-52.5 125.5v36q0 14 9 23t23 9h192q14 0 23-9t9-23q0-19 21.5-49.5t54.5-49.5q32-18 49-28.5t46-35 44.5-48 28-60.5 12.5-81zm384 192q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_question-circle.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_paper-plane-o.bemhtml.js */
block('icon').mod('glyph', 'paper-plane-o').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-527-215-298 327q-18 21-47 21-14 0-23-4-19-7-30-23.5t-11-36.5v-452l-472-193q-37-14-40-55-3-39 32-59l1664-960q35-21 68 2zm-342 1499l221-1323-1434 827 336 137 863-639-478 797z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_paper-plane-o.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/textarea/textarea.bemhtml.js */
block('textarea')(
    addJs()(true),
    tag()('textarea'),

    // NOTE: mix below is to satisfy interface of `control`
    addMix()({ elem : 'control' }),

    addAttrs()(function() {
        var ctx = this.ctx,
            attrs = {
                id : ctx.id,
                name : ctx.name,
                tabindex : ctx.tabIndex,
                placeholder : ctx.placeholder
            };

        ctx.autocomplete === false && (attrs.autocomplete = 'off');
        this.mods.disabled && (attrs.disabled = 'disabled');

        return attrs;
    }),
    content()(function() {
        return this.ctx.val;
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/textarea/textarea.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/input/input.bemhtml.js */
block('input')(
    tag()('span'),
    addJs()(true),
    def()(function() {
        return applyNext({ _input : this.ctx });
    }),
    content()({ elem : 'box', content : { elem : 'control' } })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/input/input.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/input/__box/input__box.bemhtml.js */
block('input').elem('box').tag()('span');

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/input/__box/input__box.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/input/__control/input__control.bemhtml.js */
block('input').elem('control')(
    tag()('input'),

    addAttrs()(function() {
        var input = this._input,
            attrs = {
                id : input.id,
                name : input.name,
                value : input.val,
                maxlength : input.maxLength,
                tabindex : input.tabIndex,
                placeholder : input.placeholder
            };

        input.autocomplete === false && (attrs.autocomplete = 'off');
        this.mods.disabled && (attrs.disabled = 'disabled');

        return attrs;
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/input/__control/input__control.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/button/button.bemhtml.js */
block('button')(
    def()(function() {
        var tag = apply('tag'),
            isRealButton = (tag === 'button') && (!this.mods.type || this.mods.type === 'submit');

        return applyNext({ _isRealButton : isRealButton });
    }),

    tag()(function() {
        return this.ctx.tag || 'button';
    }),

    addJs()(true),

    // NOTE: mix below is to satisfy interface of `control`
    addMix()({ elem : 'control' }),

    addAttrs()(
        // Common attributes
        function() {
            var ctx = this.ctx,
                a = applyNext(),
                attrs = {
                    role : (a && a.role) || 'button',
                    tabindex : ctx.tabIndex,
                    id : ctx.id,
                    title : ctx.title
                };

            this.mods.disabled &&
                !this._isRealButton && (attrs['aria-disabled'] = 'true');

            return attrs;
        },

        // Attributes for button variant
        match(function() { return this._isRealButton; })(function() {
            var ctx = this.ctx,
                attrs = {
                    type : this.mods.type || 'button',
                    name : ctx.name,
                    value : ctx.val
                };

            this.mods.disabled && (attrs.disabled = 'disabled');

            return attrs;
        })
    ),

    content()(
        function() {
            var ctx = this.ctx,
                content = [ctx.icon];
            // NOTE: wasn't moved to separate template for optimization
            /* jshint eqnull: true */
            ctx.text != null && content.push({ elem : 'text', content : ctx.text });
            return content;
        },
        match(function() { return typeof this.ctx.content !== 'undefined'; })(function() {
            return this.ctx.content;
        })
    )
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/button/button.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/button/_focused/button_focused.bemhtml.js */
block('button').mod('focused', true).js()(function() {
    return this.extend(applyNext(), { lazyInit : false });
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/button/_focused/button_focused.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/button/__text/button__text.bemhtml.js */
block('button').elem('text').tag()('span');

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/button/__text/button__text.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/select.bemhtml.js */
block('select')(
    def().match(function() { return !this._select; })(function() { // TODO: check BEM-XJST for proper applyNext
        if(!this.mods.mode) throw Error('Can\'t build select without mode modifier');

        var _this = this,
            ctx = this.ctx,
            isValDef = typeof ctx.val !== 'undefined',
            isModeCheck = this.mods.mode === 'check',
            firstOption, checkedOptions = [],
            optionIds = [],
            containsVal = function(val) {
                return isValDef &&
                    (isModeCheck?
                        ctx.val.indexOf(val) > -1 :
                        ctx.val === val);
            },
            iterateOptions = function(content) {
                var i = 0, option;
                while(option = content[i++]) {
                    if(option.group) {
                        iterateOptions(option.group);
                    } else {
                        firstOption || (firstOption = option);
                        optionIds.push(option.id = _this.identify(option));
                        if(containsVal(option.val)) {
                            option.checked = true;
                            checkedOptions.push(option);
                        }
                    }
                }
            };

        iterateOptions(ctx.options);

        return applyNext({
            _select : ctx,
            _checkedOptions : checkedOptions,
            _firstOption : firstOption,
            _optionIds : optionIds
        });
    }),

    addJs()(function() {
        var ctx = this.ctx;
        return {
            name : ctx.name,
            optionsMaxHeight : ctx.optionsMaxHeight
        };
    }),

    content()(function() {
        return [
            { elem : 'button' },
            {
                block : 'popup',
                mods : { target : 'anchor', theme : this.mods.theme, autoclosable : true },
                directions : ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
                content : { block : this.block, mods : this.mods, elem : 'menu' }
            }
        ];
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/select.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/_focused/select_focused.bemhtml.js */
block('select').mod('focused', true).js()(function() {
    return this.extend(applyNext(), { lazyInit : false });
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/_focused/select_focused.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/__control/select__control.bemhtml.js */
block('select').elem('control')(
    tag()('input'),
    addAttrs()(function() {
        return {
            type : 'hidden',
            name : this._select.name,
            value : this.ctx.val,
            disabled : this.mods.disabled? 'disabled' : undefined,
            autocomplete : 'off'
        };
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/__control/select__control.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/__button/select__button.bemhtml.js */
block('select').elem('button')(
    replace()(function() {
        var select = this._select,
            mods = this.mods;

        return {
            block : 'button',
            mix : { block : this.block, elem : this.elem },
            mods : {
                size : mods.size,
                theme : mods.theme,
                view : mods.view,
                focused : mods.focused,
                disabled : mods.disabled,
                checked : mods.mode !== 'radio' && !!this._checkedOptions.length
            },
            attrs : {
                role : 'listbox',
                'aria-owns' : this._optionIds.join(' '),
                'aria-multiselectable' : mods.mode === 'check'? 'true' : undefined,
                'aria-labelledby' : this._selectTextId
            },
            id : select.id,
            tabIndex : select.tabIndex,
            content : [
                apply('content'),
                { block : 'icon', mix : { block : 'select', elem : 'tick' } }
            ]
        };
    }),
    def()(function() {
        return applyNext({ _selectTextId : this.generateId() });
    })
);

block('button').elem('text').match(function() { return this._select; })(
    addAttrs()(function() {
        return { id : this._selectTextId };
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/__button/select__button.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/__menu/select__menu.bemhtml.js */
block('select').elem('menu')(
    replace()(function() {
        var mods = this.mods,
            optionToMenuItem = function(option) {
                var res = {
                        block : 'menu',
                        elem : 'item',
                        elemMods : { disabled : mods.disabled || option.disabled },
                        attrs : { role : 'option' },
                        id : option.id,
                        val : option.val,
                        js : { checkedText : option.checkedText },
                        content : option.text
                    };

                if(option.icon) {
                    res.js.text = option.text;
                    res.content = [
                        option.icon,
                        res.content
                    ];
                }

                return res;
            };

        return {
            block : 'menu',
            mix : { block : this.block, elem : this.elem },
            mods : {
                size : mods.size,
                theme : mods.theme,
                disabled : mods.disabled,
                mode : mods.mode
            },
            val : this._select.val,
            attrs : { role : undefined, tabindex : undefined },
            content : this._select.options.map(function(optionOrGroup) {
                return optionOrGroup.group?
                    {
                        elem : 'group',
                        title : optionOrGroup.title,
                        content : optionOrGroup.group.map(optionToMenuItem)
                    } :
                    optionToMenuItem(optionOrGroup);
            })
        };
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/__menu/select__menu.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/menu/menu.bemhtml.js */
block('menu')(
    def()(function() {
        var ctx = this.ctx,
            mods = this.mods,
            firstItem,
            checkedItems = [];

        if(ctx.content) {
            var isValDef = typeof ctx.val !== 'undefined',
                containsVal = function(val) {
                    return isValDef &&
                        (mods.mode === 'check'?
                            ctx.val.indexOf(val) > -1 :
                            ctx.val === val);
                },
                iterateItems = function(content) {
                    var i = 0, itemOrGroup;
                    while(itemOrGroup = content[i++]) {
                        if(itemOrGroup.elem === 'item') {
                            firstItem || (firstItem = itemOrGroup);
                            if(containsVal(itemOrGroup.val)) {
                                (itemOrGroup.elemMods = itemOrGroup.elemMods || {}).checked = true;
                                checkedItems.push(itemOrGroup);
                            }
                        } else if(itemOrGroup.content) { // menu__group
                            iterateItems(itemOrGroup.content);
                        }
                    }
                };

            if(!Array.isArray(ctx.content)) throw Error('menu: content must be an array of the menu items');

            iterateItems(ctx.content);
        }

        return applyNext({
            _firstItem : firstItem,
            _checkedItems : checkedItems,
            _menuMods : mods
        });
    }),
    attrs()(function() {
        var attrs = { role : 'menu' };

        this.mods.disabled?
            attrs['aria-disabled'] = 'true' :
            attrs.tabindex = 0;

        // extend in backwards order:
        // bemjson has more priority
        return this.extend(attrs, applyNext());
    }),
    addJs()(true),
    addMix()({ elem : 'control' }),
    mod('disabled', true)
        .js()(function() {
            return this.extend(applyNext(), { tabIndex : 0 });
        })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/menu/menu.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/menu/_focused/menu_focused.bemhtml.js */
block('menu').mod('focused', true).js()(function() {
    return this.extend(applyNext(), { lazyInit : false });
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/menu/_focused/menu_focused.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/menu/__item/menu__item.bemhtml.js */
block('menu').elem('item')(
    def().match(function() { return this._menuMods; })(function() {
        var elemMods = this.elemMods;
        elemMods.theme = elemMods.theme || this._menuMods.theme;
        elemMods.disabled = elemMods.disabled || this._menuMods.disabled;
        return applyNext();
    }),
    addJs()(function() {
        return { val : this.ctx.val };
    }),
    addAttrs()(function(){
        var elemMods = this.elemMods,
            menuMode = this._menuMods && this._menuMods.mode,
            a = applyNext(),
            role = (a && a.role) || (menuMode?
                        (menuMode === 'check'? 'menuitemcheckbox' : 'menuitemradio') :
                        'menuitem'),
            attrs = {
                role : role,
                id : this.ctx.id || this.generateId(),
                'aria-disabled' : elemMods.disabled && 'true',
                'aria-checked' : menuMode && String(!!elemMods.checked)
            };

        return attrs;
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/menu/__item/menu__item.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/menu/__group/menu__group.bemhtml.js */
block('menu').elem('group')(
    addAttrs()({ role : 'group' }),
    match(function() { return typeof this.ctx.title !== 'undefined'; })(
        addAttrs()(function() {
            return this.extend(applyNext(), {
                'aria-label' : undefined,
                'aria-labelledby' : this.generateId()
            });
        }),
        content()(function() {
            return [
                {
                    elem : 'group-title',
                    attrs : {
                        role : 'presentation',
                        id : this.generateId()
                    },
                    content : this.ctx.title
                },
                applyNext()
            ];
        })
    )
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/menu/__group/menu__group.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/popup/popup.bemhtml.js */
block('popup')(
    addJs()(function() {
        var ctx = this.ctx;
        return {
            mainOffset : ctx.mainOffset,
            secondaryOffset : ctx.secondaryOffset,
            viewportOffset : ctx.viewportOffset,
            directions : ctx.directions,
            zIndexGroupLevel : ctx.zIndexGroupLevel
        };
    }),
    addAttrs()({ 'aria-hidden' : 'true' })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/popup/popup.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/attach/__button/attach__button.bemhtml.js */
block('button').match(function() { return this._attach; })(
    tag()('span'),
    content()(function() {
        return [
            { block : 'attach', elem : 'control' },
            applyNext()
        ];
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/attach/__button/attach__button.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/attach/__control/attach__control.bemhtml.js */
block('attach').elem('control')(

    tag()('input'),

    addAttrs()(function() {
        var attrs = { type : 'file' },
            attach = this._attach;

        // в js генерим html для attach__control без самого attach
        if(attach) {
            attrs.name = attach.name;
            attach.mods && attach.mods.disabled && (attrs.disabled = 'disabled');
            attach.tabIndex && (attrs.tabindex = attach.tabIndex);
        }

        return attrs;
    })

);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/attach/__control/attach__control.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/attach/__no-file/attach__no-file.bemhtml.js */
block('attach').elem('no-file').tag()('span');

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/attach/__no-file/attach__no-file.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/checkbox/checkbox.bemhtml.js */
block('checkbox')(
    tag()('label'),

    addJs()(true),

    content()(function() {
        var ctx = this.ctx,
            mods = this.mods;

        return [
            {
                elem : 'box',
                content : {
                    elem : 'control',
                    checked : mods.checked,
                    disabled : mods.disabled,
                    name : ctx.name,
                    val : ctx.val
                }
            },
            ctx.text && {
                elem : 'text',
                content : ctx.text
            }
        ];
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/checkbox/checkbox.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/checkbox/__box/checkbox__box.bemhtml.js */
block('checkbox').elem('box').tag()('span');

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/checkbox/__box/checkbox__box.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/checkbox/__control/checkbox__control.bemhtml.js */
block('checkbox').elem('control')(
    tag()('input'),

    addAttrs()(function() {
        // NOTE: don't remove autocomplete attribute, otherwise js and DOM may be desynced
        var attrs = { type : 'checkbox', autocomplete : 'off' },
            ctx = this.ctx;

        attrs.name = ctx.name;
        attrs.value = ctx.val;
        ctx.checked && (attrs.checked = 'checked');
        ctx.disabled && (attrs.disabled = 'disabled');

        return attrs;
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/checkbox/__control/checkbox__control.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/checkbox/__text/checkbox__text.bemhtml.js */
block('checkbox').elem('text')(
    tag()('span'),
    addAttrs()({ role : 'presentation' })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/checkbox/__text/checkbox__text.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/dropdown/dropdown.bemhtml.js */
block('dropdown')(
    replace()(function() {
        return [{ elem : 'popup' }, { elem : 'switcher' }];
    }),
    def()(function() {
        var ctx = this.ctx;

        ctx.js = this.extend(apply('js'), ctx.js);
        return applyNext({ _dropdown : ctx, _popupId : this.generateId() });
    }),
    addJs()(function() {
        return { id : this.generateId() };
    }),
    elem('switcher').replace()(function() {
        var dropdown = this._dropdown,
            switcher = dropdown.switcher;

        switcher.block && (switcher.mix = apply('mix'));

        return switcher;
    }),
    elem('switcher').mix()(function() {
        var dropdown = this._dropdown;

        return [dropdown].concat(dropdown.switcher.mix || [], dropdown.mix || [], {
            block : this.block,
            elem : this.elem,
            elemMods : { switcher : this.mods.switcher },
            js : true
        });
    }),
    elem('popup').replace()(function() {
        var dropdown = this._dropdown,
            popup = dropdown.popup;

        if(this.isSimple(popup) || popup.block !== 'popup') {
            popup = { block : 'popup', content : popup };
        }

        var popupMods = popup.mods || (popup.mods = {}),
            popupAttrs = popup.attrs || (popup.attrs = {});
        popupMods.theme || (popupMods.theme = this.mods.theme);
        popupMods.hasOwnProperty('autoclosable') || (popupMods.autoclosable = true);

        popupMods.target = 'anchor';
        popupAttrs.id = this._popupId;

        popup.mix = [dropdown].concat(popup.mix || []);

        return popup;
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/dropdown/dropdown.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/link/_pseudo/link_pseudo.bemhtml.js */
block('link').mod('pseudo', true).match(function() { return !this.ctx.url; })(
    tag()('span'),
    addAttrs()(function() {
        return this.extend(applyNext(), { role : 'button' });
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/link/_pseudo/link_pseudo.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/dropdown/_switcher/dropdown_switcher_button.bemhtml.js */
block('dropdown').mod('switcher', 'button').elem('switcher').replace()(function() {
    var dropdown = this._dropdown,
        switcher = dropdown.switcher;

    if(Array.isArray(switcher)) return switcher;

    var res = this.isSimple(switcher)?
        { block : 'button', text : switcher } :
        switcher;

    if(res.block === 'button') {
        var resMods = res.mods || (res.mods = {}),
            resAttrs = res.attrs || (res.attrs = {}),
            dropdownMods = this.mods;
        resMods.size || (resMods.size = dropdownMods.size);
        resMods.theme || (resMods.theme = dropdownMods.theme);
        resMods.disabled = dropdownMods.disabled;

        resAttrs['aria-haspopup'] = 'true';
        resAttrs['aria-controls'] = this._popupId;
        resAttrs['aria-expanded'] = 'false';

        res.mix = apply('mix');
    }

    return res;
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/dropdown/_switcher/dropdown_switcher_button.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/tabs/tabs.bemhtml.js */
block('tabs')(
  addAttrs()({ id:'tabs'}),
  content()(function() {
    return [
        { block: 'titles text_size_xl', content:'Примеры заказов:' },
          { block: 'tab whiteborder', content:'Футболки' },
          { block: 'tab', content:'Свитшоты' },
          { block: 'tab', content:'Толстовки' },
          { block: 'tab', content:'Поло' },

          { block: 'tabContent', content: 'Предложения по футболкам скоро появятся' },
          { block: 'tabContent', content: 'Предложения по свитшотам скоро появятся' },
          { block: 'tabContent', content: 'Предложения по толстовкам скоро появятся' },
          { block: 'tabContent', content: 'Предложения по поло скоро появятся' }
  ]
})
)

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/tabs/tabs.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/form-fast/form-fast.bemhtml.js */
block('form-fast')(
  tag()('form'),
  addAttrs()(
    {
      name: 'form-fast',
      id: 'form-fast',
      action: '/form-fast/',
      enctype: 'multipart/form-data',
      method: 'post'
    }
  ),
  content()(function() {

  return [
    {
      elem: 'wrapp',
      content: [
        { block: 'title',
          mods: { color: 'white', h3: true },
          mix: {block: 'text', mods: { align: 'center' }},
          content: 'Не нашли что искали?'
        },
        { block: 'text',
          mods: { color: 'white', align: 'center' },
          content: 'Задайте вопрос, и мы ответим в ближайшее время!'
        },
        { elem: 'content',
          content: [
          { elem: 'section1', content: [
            {
              block: 'input',
              mods: {
                  theme: 'rfprint',
                  size: 'm'
              },
              attrs: { required: true },
              placeholder: 'Имя *',
              name: 'phone',
              val: '',
            },
            {
              block: 'input',
              mods: {
                  theme: 'rfprint',
                  size: 'm'
              },
              attrs: { required: true },
              placeholder: 'E-mail *',
              name: 'email',
              val: '',
            }
          ] },
          { elem: 'section2' , content: [
            {
              block: 'textarea',
              tag: 'textarea',
              mods: {
                  theme: 'rfprint',
                  size: 'm',
                  'form-fast-textarea': true
              },
              placeholder: 'Напишите, что вы искали?',
              name: 'message',
              val: '',
            }
          ]},
          { elem: 'section3' , content: [
            {
              block: 'button',
              mods: { position: 'middle', theme: 'rfprint', 'fast-form': 'blue'},
              id: 'form-fast-btn-send',
              content: [{
                  block: 'text',
                  mods: { color: 'white', padding: 'right', size: 'xl', weight: 300},
                  tag: 'span',
                  content: 'Отправить'
              }]
            },
            { block: 'text',
              mods: { color: 'white', weight: 300, size: 'm' },
              content: { html: 'Нажимая кнопку &laquo;Отправить&raquo;, Вы автоматически принимаете условия Пользовательского соглашения' }
            }
          ] }
          ]
        }
      ]
    }
  ]
}))

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/form-fast/form-fast.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/menu-top/menu-top.bemhtml.js */
block('menu-top').content()(function() {
    return [{
        elem: 'container',
        content: [{
            block: 'ul',
            mods: { flex: 'gorizont', 'list-style': 'none', 'pad-marg': 'none' },
            tag: 'ul',
            content: [{
                    elem: 'li',
                    tag: 'li',
                    content: [{
                        block: 'link',
                        url: '#',
                        mods: { decoration: 'none' },
                        content: [{
                            block: 'text',
                            mods: { color: 'white', weight: '300', size: 'xl', pc: 'center-center' },
                            content: 'Главная'
                        }]
                    }]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    content: [{
                        block: 'link',
                        url: '#',
                        mods: { decoration: 'none' },
                        content: [{
                            block: 'text',
                            mods: { color: 'white', weight: '300', size: 'xl', pc: 'center-center' },
                            content: 'Услуги и цены'
                        }]
                    }]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    content: [{
                        block: 'link',
                        url: '#',
                        mods: { decoration: 'none' },
                        content: [{
                            block: 'text',
                            mods: { color: 'white', weight: '300', size: 'xl', pc: 'center-center' },
                            content: 'Доставка и оплата'
                        }]
                    }]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    content: [{
                        block: 'link',
                        url: '#',
                        mods: { decoration: 'none' },
                        content: [{
                            block: 'text',
                            mods: { color: 'white', weight: '300', size: 'xl', pc: 'center-center' },
                            content: 'Собственное производство'
                        }]
                    }]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    elemMods: { position: 'relateve', drop: 'down' },
                    content: [{
                            block: 'link',
                            url: '#',
                            mods: { flex: 'cente-center' },
                            content: [
                                { block: 'text', content: 'Виды печати' },
                                {
                                    block: 'icon',
                                    mods: { size: 'xs', glyph: 'chevron-down', color: 'white', margin: 'correct' }
                                }
                            ]
                        },
                        {
                            block: 'ul',
                            tag: 'ul',
                            mods: { drop: 'down' },
                            content: [
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на жилетах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на пакетах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на свитшотах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на сумках' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на ткани' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'active' }, content: 'Печать на толстовках' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'last' }, content: 'Печать на футболках' } }
                            ]
                        }
                    ]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    elemMods: { position: 'relateve', drop: 'down' },
                    content: [{
                            block: 'link',
                            url: '#',
                            mods: { flex: 'cente-center' },
                            content: [
                                { block: 'text', content: 'На чем печатаем' },
                                { block: 'icon', mods: { size: 'xs', glyph: 'chevron-down', color: 'white', margin: 'correct' } }
                            ]
                        },
                        {
                            block: 'ul',
                            tag: 'ul',
                            mods: { drop: 'down' },
                            content: [
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на жилетах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на пакетах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на свитшотах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на сумках' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на ткани' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на толстовках' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'last' }, content: 'Печать на футболках' } }
                            ]
                        }
                    ]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    content: [{
                        block: 'link',
                        url: '#',
                        mods: { decoration: 'none' },
                        content: [{
                            block: 'text',
                            mods: { color: 'white', weight: '300', size: 'xl', pc: 'center-center' },
                            content: 'Контакты'
                        }]
                    }]
                }
            ]
        }]
    }]
})





/*
{
    elem: 'wrapp',
    elemMods: { theme: 'blue' },
    content:
          { block: 'ul',
            mods: { flex: 'gorizont', 'list-style': 'none', 'pad-marg': 'none' },
            tag: 'ul',
            content:[
              { elem: 'li',
                tag: 'li',
                content: { block: 'link', url: '#', mix: { block: 'active'}, content: 'Главная'}
              },
              { elem: 'li',
                tag: 'li',
                content: { block: 'link', url: '#', content: 'Услуги и цены'}
              },
              { elem: 'li',
                tag: 'li',
                content: { block: 'link', url: '#', content: 'Доставка и оплата'}
              },
              { elem: 'li',
                tag: 'li',
                content: { block: 'link', url: '#', content: 'Собственное производство'}
              },
              { elem: 'li',
                tag: 'li',
                elemMods: { position: 'relateve', drop: 'down' },
                content: [
                  { block: 'link', url: '#', mods: { flex: 'cente-center' }, content: [
                   { block: 'text', content: 'Виды печати' },
                   {
                      block: 'icon',
                      mods: { size: 'xs', glyph: 'chevron-down', color:'white', margin: 'correct' }
                  }
                 ]
                  },
                  { block: 'ul', tag: 'ul', mods: { drop: 'down' }, content:[
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на жилетах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на пакетах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на свитшотах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на сумках'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на ткани'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'active'}, content: 'Печать на толстовках'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'last'}, content: 'Печать на футболках'} }]
                  }
                ]
              },
              { elem: 'li',
                tag: 'li',
                elemMods: { position: 'relateve', drop: 'down' },
                content: [
                  { block: 'link', url: '#',  mods: { flex: 'cente-center' }, content: [
                    { block: 'text', content: 'На чем печатаем' },
                    { block: 'icon', mods: { size: 'xs', glyph: 'chevron-down', color:'white', margin: 'correct' }}
                    ]
                  },
                  { block: 'ul', tag: 'ul', mods: { drop: 'down' }, content:[
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на жилетах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на пакетах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на свитшотах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на сумках'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на ткани'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на толстовках'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'last'}, content: 'Печать на футболках'} }
                  ]}
                ]
              },
              { elem: 'li',
                tag: 'li',
                content: { block: 'link', url: '#', content: 'Контакты'}
              }
            ]
          }
  }
*/


/********************/

// <ul class="menu__links"><li class="menu__link menu__link1 active"><a href="https://rf-print.ru/" title="Шелкография, трафаретная, прямая и шелкотрафаретная печати в Москве">Главная</a></li>
// <li class="menu__link menu__link1"><a href="/prices.html" title="Услуги и цены на печать и продукцию ">Услуги и цены</a></li>
// <li class="menu__link menu__link1"><a href="/shipping-and-payment.html" title="Доставка и оплата">Доставка и оплата</a></li>
// <li class="menu__link menu__link1"><a href="/own-production.html" title="Собственное производство">Собственное производство</a></li>
// <li class="menu__link menu__link1"><a href="/types-printing/" title="Печать методом шелкографии, трафаретной печатью, прямой печатью, экосольвентной печатью, вытравленой печатью, вышивка на ткани">Виды печати 	⇓</a>
//   <ul class="header__menu-dropdown" style="display: none;">
//   <li class="menu__link menu__link2"><a href="/silk-screen-printing.html" title="Шелкография">Шелкография</a></li>
// <li class="menu__link menu__link2"><a href="/screen-printing.html" title="Трафаретная печать">Трафаретная печать</a></li>
// <li class="menu__link menu__link2"><a href="/eco-solvent-printing.html" title="Экосольвентная печать">Экосольвентная печать</a></li>
// <li class="menu__link menu__link2"><a href="/vetravnaya-print.html" title="Вытравная печать">Вытравная печать</a></li>
// <li class="menu__link menu__link2"><a href="/plastisol-seal.html" title="Пластизолевая печать">Пластизолевая печать</a></li>
// <li class="menu__link menu__link2"><a href="/thermal-transfer-printing.html" title="Термотрансферная печать">Термотрансферная печать</a></li>
// <li class="menu__link menu__link2"><a href="/direct-printing.html" title="Прямая печать">Прямая печать</a></li>
// <li class="menu__link menu__link2"><a href="/silk-screen-printing-type-2.html" title="Шелкотрафаретная печать">Шелкотрафаретная печать</a></li>
// <li class="menu__link last menu__link2"><a href="/water-based-printing.html" title="Печать водными красками">Печать водными красками</a></li>
// </ul></li>

// <li class="menu__link menu__link1"><a href="/what-we-print/" title="Печать на футболках, толстовках, свитшотах, сумках, ткани">На чем печатаем 	⇓</a>
// <ul class="header__menu-dropdown" style="display: none;"><li class="menu__link menu__link2"><a href="/vest-printing.html" title="Печать на жилетах"></a></li>
// <li class="menu__link menu__link2"><a href="/package-printing.html" title="Печать на пакетах">Печать на пакетах</a></li>
// <li class="menu__link menu__link2"><a href="/print-on-sweatshirts.html" title="Печать на свитшотах">Печать на свитшотах</a></li>
// <li class="menu__link menu__link2"><a href="/bag-printing.html" title="Печать на сумках">Печать на сумках</a></li>
// <li class="menu__link menu__link2"><a href="/fabric-printing.html" title="Печать на ткани">Печать на ткани</a></li>
// <li class="menu__link menu__link2"><a href="/print-on-hoodies.html" title="Печать на толстовках">Печать на толстовках</a></li>
// <li class="menu__link last menu__link2"><a href="/t-shirt-printing.html" title="Печать на футболках">Печать на футболках</a></li>
// </ul></li>
// <li class="menu__link last menu__link1"><a href="/contacts.html" title="Контакты">Контакты</a></li>
// </ul>
/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/common.blocks/menu-top/menu-top.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_chevron-down.bemhtml.js */
block('icon').mod('glyph', 'chevron-down').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_chevron-down.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_bars.bemhtml.js */
block('icon').mod('glyph', 'bars').content()({
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792"><path d="M1536 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"/></svg>'
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-font-awesome-icons/icon/_glyph/icon_glyph_bars.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/_mode/select_mode_radio.bemhtml.js */
block('select').mod('mode', 'radio')(
    def().match(function() { return this._checkedOptions; })(function() {
        var checkedOptions = this._checkedOptions,
            firstOption = this._firstOption;
        if(firstOption && !checkedOptions.length) {
            firstOption.checked = true;
            checkedOptions = [firstOption];
        }
        return applyNext({ _checkedOption : checkedOptions[0] });
    }),

    content()(function() {
        return [
            {
                elem : 'control',
                val : this._checkedOption.val
            },
            applyNext()
        ];
    }),

    elem('button').content()(function() {
        return [
            { elem : 'text', content : this._checkedOption.text }
            // TODO: with icons
        ];
    })
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/select/_mode/select_mode_radio.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/menu/_mode/menu_mode_radio.bemhtml.js */
block('menu')
    .mod('mode', 'radio')
    .match(function() {
        return this._firstItem && this._checkedItems && !this._checkedItems.length;
    })
    .def()(function() {
        (this._firstItem.elemMods || (this._firstItem.elemMods = {})).checked = true;
        return applyNext();
    });

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/menu/_mode/menu_mode_radio.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/attach/attach.bemhtml.js */
block('attach')(
    def()(function() { return applyNext({ _attach : this.ctx }); }),

    tag()('span'),

    addJs()(true),

    content()(
        function() {
            var ctx = this.ctx,
                button = ctx.button;

            this.isSimple(button) && (button = {
                block : 'button',
                tag : 'span',
                text : button
            });

            var attachMods = this.mods,
                buttonMods = button.mods || (button.mods = {});
            ['size', 'theme', 'disabled', 'focused'].forEach(function(mod) {
                buttonMods[mod] || (buttonMods[mod] = attachMods[mod]);
            });

            return [
                button,
                {
                    elem : 'no-file',
                    content : this.ctx.noFileText
                }
            ];
        }
    )
);

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/attach/attach.bemhtml.js */
/* begin: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/dropdown/_switcher/dropdown_switcher_link.bemhtml.js */
block('dropdown').mod('switcher', 'link').elem('switcher').replace()(function() {
    var dropdown = this._dropdown,
        switcher = dropdown.switcher;

    if(Array.isArray(switcher)) return switcher;

    var res = this.isSimple(switcher)?
        { block : 'link', mods : { pseudo : true }, content : switcher } :
        switcher;

    if(res.block === 'link') {
        var resMods = res.mods || (res.mods = {}),
            resAttrs = res.attrs || (res.attrs = {}),
            dropdownMods = this.mods;
        resMods.theme || (resMods.theme = dropdownMods.theme);
        resMods.disabled = dropdownMods.disabled;

        resAttrs['aria-haspopup'] = 'true';
        resAttrs['aria-controls'] = this._popupId;
        resAttrs['aria-expanded'] = 'false';

        res.mix = apply('mix');
    }

    return res;
});

/* end: /Applications/MAMP/htdocs/rf-print/04092020/rf-print.ru/node_modules/bem-components/common.blocks/dropdown/_switcher/dropdown_switcher_link.bemhtml.js */

;oninit(function(exports, context) {
var BEMContext = exports.BEMContext || context.BEMContext;
BEMContext.prototype.require = function(lib) {
return this._libs[lib];
};
});
;});
exports = api.exportApply(exports);
if (libs) exports.BEMContext.prototype._libs = libs;
return exports;
};

var glob = this.window || this.global || this;
var exp = typeof exports !== "undefined" ? exports : global;
if (typeof modules === "object") {



modules.define("BEMHTML",[],function(provide) { var engine = buildBemXjst({});provide(engine);});
} else {
var _libs = {};


if (Object.keys(_libs).length) {
BEMHTML = buildBemXjst(_libs);
exp["BEMHTML"] = BEMHTML;
exp["BEMHTML"].libs = _libs;
} else {
BEMHTML= buildBemXjst(glob);
exp["BEMHTML"] = BEMHTML;exp["BEMHTML"].libs = glob;
}
}
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaWNlLmJlbWh0bWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwcmljZS5iZW1odG1sLmpzIn0=
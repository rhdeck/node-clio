(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('stream'), require('http'), require('url'), require('https'), require('zlib'), require('crypto'), require('fs'), require('util')) :
  typeof define === 'function' && define.amd ? define(['exports', 'stream', 'http', 'url', 'https', 'zlib', 'crypto', 'fs', 'util'], factory) :
  (global = global || self, factory(global.index = {}, global.Stream, global.http, global.Url, global.https, global.zlib, global.crypto, global.fs, global.util));
}(this, function (exports, Stream, http, Url, https, zlib, crypto, fs, util) { 'use strict';

  Stream = Stream && Stream.hasOwnProperty('default') ? Stream['default'] : Stream;
  http = http && http.hasOwnProperty('default') ? http['default'] : http;
  var Url__default = 'default' in Url ? Url['default'] : Url;
  https = https && https.hasOwnProperty('default') ? https['default'] : https;
  zlib = zlib && zlib.hasOwnProperty('default') ? zlib['default'] : zlib;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  var iterableToArrayLimit = _iterableToArrayLimit;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var objectWithoutProperties = _objectWithoutProperties;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
     module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  });

  var regenerator = runtime_1;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var asyncToGenerator = _asyncToGenerator;

  // Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

  // fix for "Readable" isn't a named export issue
  const Readable = Stream.Readable;

  const BUFFER = Symbol('buffer');
  const TYPE = Symbol('type');

  class Blob {
  	constructor() {
  		this[TYPE] = '';

  		const blobParts = arguments[0];
  		const options = arguments[1];

  		const buffers = [];
  		let size = 0;

  		if (blobParts) {
  			const a = blobParts;
  			const length = Number(a.length);
  			for (let i = 0; i < length; i++) {
  				const element = a[i];
  				let buffer;
  				if (element instanceof Buffer) {
  					buffer = element;
  				} else if (ArrayBuffer.isView(element)) {
  					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
  				} else if (element instanceof ArrayBuffer) {
  					buffer = Buffer.from(element);
  				} else if (element instanceof Blob) {
  					buffer = element[BUFFER];
  				} else {
  					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
  				}
  				size += buffer.length;
  				buffers.push(buffer);
  			}
  		}

  		this[BUFFER] = Buffer.concat(buffers);

  		let type = options && options.type !== undefined && String(options.type).toLowerCase();
  		if (type && !/[^\u0020-\u007E]/.test(type)) {
  			this[TYPE] = type;
  		}
  	}
  	get size() {
  		return this[BUFFER].length;
  	}
  	get type() {
  		return this[TYPE];
  	}
  	text() {
  		return Promise.resolve(this[BUFFER].toString());
  	}
  	arrayBuffer() {
  		const buf = this[BUFFER];
  		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  		return Promise.resolve(ab);
  	}
  	stream() {
  		const readable = new Readable();
  		readable._read = function () {};
  		readable.push(this[BUFFER]);
  		readable.push(null);
  		return readable;
  	}
  	toString() {
  		return '[object Blob]';
  	}
  	slice() {
  		const size = this.size;

  		const start = arguments[0];
  		const end = arguments[1];
  		let relativeStart, relativeEnd;
  		if (start === undefined) {
  			relativeStart = 0;
  		} else if (start < 0) {
  			relativeStart = Math.max(size + start, 0);
  		} else {
  			relativeStart = Math.min(start, size);
  		}
  		if (end === undefined) {
  			relativeEnd = size;
  		} else if (end < 0) {
  			relativeEnd = Math.max(size + end, 0);
  		} else {
  			relativeEnd = Math.min(end, size);
  		}
  		const span = Math.max(relativeEnd - relativeStart, 0);

  		const buffer = this[BUFFER];
  		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
  		const blob = new Blob([], { type: arguments[2] });
  		blob[BUFFER] = slicedBuffer;
  		return blob;
  	}
  }

  Object.defineProperties(Blob.prototype, {
  	size: { enumerable: true },
  	type: { enumerable: true },
  	slice: { enumerable: true }
  });

  Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
  	value: 'Blob',
  	writable: false,
  	enumerable: false,
  	configurable: true
  });

  /**
   * fetch-error.js
   *
   * FetchError interface for operational errors
   */

  /**
   * Create FetchError instance
   *
   * @param   String      message      Error message for human
   * @param   String      type         Error type for machine
   * @param   String      systemError  For Node.js system error
   * @return  FetchError
   */
  function FetchError(message, type, systemError) {
    Error.call(this, message);

    this.message = message;
    this.type = type;

    // when err.type is `system`, err.code contains system error code
    if (systemError) {
      this.code = this.errno = systemError.code;
    }

    // hide custom error implementation details from end-users
    Error.captureStackTrace(this, this.constructor);
  }

  FetchError.prototype = Object.create(Error.prototype);
  FetchError.prototype.constructor = FetchError;
  FetchError.prototype.name = 'FetchError';

  let convert;
  try {
  	convert = require('encoding').convert;
  } catch (e) {}

  const INTERNALS = Symbol('Body internals');

  // fix an issue where "PassThrough" isn't a named export for node <10
  const PassThrough = Stream.PassThrough;

  /**
   * Body mixin
   *
   * Ref: https://fetch.spec.whatwg.org/#body
   *
   * @param   Stream  body  Readable stream
   * @param   Object  opts  Response options
   * @return  Void
   */
  function Body(body) {
  	var _this = this;

  	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
  	    _ref$size = _ref.size;

  	let size = _ref$size === undefined ? 0 : _ref$size;
  	var _ref$timeout = _ref.timeout;
  	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

  	if (body == null) {
  		// body is undefined or null
  		body = null;
  	} else if (isURLSearchParams(body)) {
  		// body is a URLSearchParams
  		body = Buffer.from(body.toString());
  	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
  		// body is ArrayBuffer
  		body = Buffer.from(body);
  	} else if (ArrayBuffer.isView(body)) {
  		// body is ArrayBufferView
  		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
  	} else if (body instanceof Stream) ; else {
  		// none of the above
  		// coerce to string then buffer
  		body = Buffer.from(String(body));
  	}
  	this[INTERNALS] = {
  		body,
  		disturbed: false,
  		error: null
  	};
  	this.size = size;
  	this.timeout = timeout;

  	if (body instanceof Stream) {
  		body.on('error', function (err) {
  			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
  			_this[INTERNALS].error = error;
  		});
  	}
  }

  Body.prototype = {
  	get body() {
  		return this[INTERNALS].body;
  	},

  	get bodyUsed() {
  		return this[INTERNALS].disturbed;
  	},

  	/**
    * Decode response as ArrayBuffer
    *
    * @return  Promise
    */
  	arrayBuffer() {
  		return consumeBody.call(this).then(function (buf) {
  			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  		});
  	},

  	/**
    * Return raw response as Blob
    *
    * @return Promise
    */
  	blob() {
  		let ct = this.headers && this.headers.get('content-type') || '';
  		return consumeBody.call(this).then(function (buf) {
  			return Object.assign(
  			// Prevent copying
  			new Blob([], {
  				type: ct.toLowerCase()
  			}), {
  				[BUFFER]: buf
  			});
  		});
  	},

  	/**
    * Decode response as json
    *
    * @return  Promise
    */
  	json() {
  		var _this2 = this;

  		return consumeBody.call(this).then(function (buffer) {
  			try {
  				return JSON.parse(buffer.toString());
  			} catch (err) {
  				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
  			}
  		});
  	},

  	/**
    * Decode response as text
    *
    * @return  Promise
    */
  	text() {
  		return consumeBody.call(this).then(function (buffer) {
  			return buffer.toString();
  		});
  	},

  	/**
    * Decode response as buffer (non-spec api)
    *
    * @return  Promise
    */
  	buffer() {
  		return consumeBody.call(this);
  	},

  	/**
    * Decode response as text, while automatically detecting the encoding and
    * trying to decode to UTF-8 (non-spec api)
    *
    * @return  Promise
    */
  	textConverted() {
  		var _this3 = this;

  		return consumeBody.call(this).then(function (buffer) {
  			return convertBody(buffer, _this3.headers);
  		});
  	}
  };

  // In browsers, all properties are enumerable.
  Object.defineProperties(Body.prototype, {
  	body: { enumerable: true },
  	bodyUsed: { enumerable: true },
  	arrayBuffer: { enumerable: true },
  	blob: { enumerable: true },
  	json: { enumerable: true },
  	text: { enumerable: true }
  });

  Body.mixIn = function (proto) {
  	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
  		// istanbul ignore else: future proof
  		if (!(name in proto)) {
  			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
  			Object.defineProperty(proto, name, desc);
  		}
  	}
  };

  /**
   * Consume and convert an entire Body to a Buffer.
   *
   * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
   *
   * @return  Promise
   */
  function consumeBody() {
  	var _this4 = this;

  	if (this[INTERNALS].disturbed) {
  		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
  	}

  	this[INTERNALS].disturbed = true;

  	if (this[INTERNALS].error) {
  		return Body.Promise.reject(this[INTERNALS].error);
  	}

  	let body = this.body;

  	// body is null
  	if (body === null) {
  		return Body.Promise.resolve(Buffer.alloc(0));
  	}

  	// body is blob
  	if (isBlob(body)) {
  		body = body.stream();
  	}

  	// body is buffer
  	if (Buffer.isBuffer(body)) {
  		return Body.Promise.resolve(body);
  	}

  	// istanbul ignore if: should never happen
  	if (!(body instanceof Stream)) {
  		return Body.Promise.resolve(Buffer.alloc(0));
  	}

  	// body is stream
  	// get ready to actually consume the body
  	let accum = [];
  	let accumBytes = 0;
  	let abort = false;

  	return new Body.Promise(function (resolve, reject) {
  		let resTimeout;

  		// allow timeout on slow response body
  		if (_this4.timeout) {
  			resTimeout = setTimeout(function () {
  				abort = true;
  				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
  			}, _this4.timeout);
  		}

  		// handle stream errors
  		body.on('error', function (err) {
  			if (err.name === 'AbortError') {
  				// if the request was aborted, reject with this Error
  				abort = true;
  				reject(err);
  			} else {
  				// other errors, such as incorrect content-encoding
  				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
  			}
  		});

  		body.on('data', function (chunk) {
  			if (abort || chunk === null) {
  				return;
  			}

  			if (_this4.size && accumBytes + chunk.length > _this4.size) {
  				abort = true;
  				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
  				return;
  			}

  			accumBytes += chunk.length;
  			accum.push(chunk);
  		});

  		body.on('end', function () {
  			if (abort) {
  				return;
  			}

  			clearTimeout(resTimeout);

  			try {
  				resolve(Buffer.concat(accum, accumBytes));
  			} catch (err) {
  				// handle streams that have accumulated too much data (issue #414)
  				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
  			}
  		});
  	});
  }

  /**
   * Detect buffer encoding and convert to target encoding
   * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
   *
   * @param   Buffer  buffer    Incoming buffer
   * @param   String  encoding  Target encoding
   * @return  String
   */
  function convertBody(buffer, headers) {
  	if (typeof convert !== 'function') {
  		throw new Error('The package `encoding` must be installed to use the textConverted() function');
  	}

  	const ct = headers.get('content-type');
  	let charset = 'utf-8';
  	let res, str;

  	// header
  	if (ct) {
  		res = /charset=([^;]*)/i.exec(ct);
  	}

  	// no charset in content type, peek at response body for at most 1024 bytes
  	str = buffer.slice(0, 1024).toString();

  	// html5
  	if (!res && str) {
  		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
  	}

  	// html4
  	if (!res && str) {
  		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

  		if (res) {
  			res = /charset=(.*)/i.exec(res.pop());
  		}
  	}

  	// xml
  	if (!res && str) {
  		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
  	}

  	// found charset
  	if (res) {
  		charset = res.pop();

  		// prevent decode issues when sites use incorrect encoding
  		// ref: https://hsivonen.fi/encoding-menu/
  		if (charset === 'gb2312' || charset === 'gbk') {
  			charset = 'gb18030';
  		}
  	}

  	// turn raw buffers into a single utf-8 buffer
  	return convert(buffer, 'UTF-8', charset).toString();
  }

  /**
   * Detect a URLSearchParams object
   * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
   *
   * @param   Object  obj     Object to detect by type or brand
   * @return  String
   */
  function isURLSearchParams(obj) {
  	// Duck-typing as a necessary condition.
  	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
  		return false;
  	}

  	// Brand-checking and more duck-typing as optional condition.
  	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
  }

  /**
   * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
   * @param  {*} obj
   * @return {boolean}
   */
  function isBlob(obj) {
  	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
  }

  /**
   * Clone body given Res/Req instance
   *
   * @param   Mixed  instance  Response or Request instance
   * @return  Mixed
   */
  function clone(instance) {
  	let p1, p2;
  	let body = instance.body;

  	// don't allow cloning a used body
  	if (instance.bodyUsed) {
  		throw new Error('cannot clone body after it is used');
  	}

  	// check that body is a stream and not form-data object
  	// note: we can't clone the form-data object without having it as a dependency
  	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
  		// tee instance body
  		p1 = new PassThrough();
  		p2 = new PassThrough();
  		body.pipe(p1);
  		body.pipe(p2);
  		// set instance body to teed body and return the other teed body
  		instance[INTERNALS].body = p1;
  		body = p2;
  	}

  	return body;
  }

  /**
   * Performs the operation "extract a `Content-Type` value from |object|" as
   * specified in the specification:
   * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
   *
   * This function assumes that instance.body is present.
   *
   * @param   Mixed  instance  Any options.body input
   */
  function extractContentType(body) {
  	if (body === null) {
  		// body is null
  		return null;
  	} else if (typeof body === 'string') {
  		// body is string
  		return 'text/plain;charset=UTF-8';
  	} else if (isURLSearchParams(body)) {
  		// body is a URLSearchParams
  		return 'application/x-www-form-urlencoded;charset=UTF-8';
  	} else if (isBlob(body)) {
  		// body is blob
  		return body.type || null;
  	} else if (Buffer.isBuffer(body)) {
  		// body is buffer
  		return null;
  	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
  		// body is ArrayBuffer
  		return null;
  	} else if (ArrayBuffer.isView(body)) {
  		// body is ArrayBufferView
  		return null;
  	} else if (typeof body.getBoundary === 'function') {
  		// detect form data input from form-data module
  		return `multipart/form-data;boundary=${body.getBoundary()}`;
  	} else if (body instanceof Stream) {
  		// body is stream
  		// can't really do much about this
  		return null;
  	} else {
  		// Body constructor defaults other things to string
  		return 'text/plain;charset=UTF-8';
  	}
  }

  /**
   * The Fetch Standard treats this as if "total bytes" is a property on the body.
   * For us, we have to explicitly get it with a function.
   *
   * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
   *
   * @param   Body    instance   Instance of Body
   * @return  Number?            Number of bytes, or null if not possible
   */
  function getTotalBytes(instance) {
  	const body = instance.body;


  	if (body === null) {
  		// body is null
  		return 0;
  	} else if (isBlob(body)) {
  		return body.size;
  	} else if (Buffer.isBuffer(body)) {
  		// body is buffer
  		return body.length;
  	} else if (body && typeof body.getLengthSync === 'function') {
  		// detect form data input from form-data module
  		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
  		body.hasKnownLength && body.hasKnownLength()) {
  			// 2.x
  			return body.getLengthSync();
  		}
  		return null;
  	} else {
  		// body is stream
  		return null;
  	}
  }

  /**
   * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
   *
   * @param   Body    instance   Instance of Body
   * @return  Void
   */
  function writeToStream(dest, instance) {
  	const body = instance.body;


  	if (body === null) {
  		// body is null
  		dest.end();
  	} else if (isBlob(body)) {
  		body.stream().pipe(dest);
  	} else if (Buffer.isBuffer(body)) {
  		// body is buffer
  		dest.write(body);
  		dest.end();
  	} else {
  		// body is stream
  		body.pipe(dest);
  	}
  }

  // expose Promise
  Body.Promise = global.Promise;

  /**
   * headers.js
   *
   * Headers class offers convenient helpers
   */

  const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
  const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

  function validateName(name) {
  	name = `${name}`;
  	if (invalidTokenRegex.test(name) || name === '') {
  		throw new TypeError(`${name} is not a legal HTTP header name`);
  	}
  }

  function validateValue(value) {
  	value = `${value}`;
  	if (invalidHeaderCharRegex.test(value)) {
  		throw new TypeError(`${value} is not a legal HTTP header value`);
  	}
  }

  /**
   * Find the key in the map object given a header name.
   *
   * Returns undefined if not found.
   *
   * @param   String  name  Header name
   * @return  String|Undefined
   */
  function find(map, name) {
  	name = name.toLowerCase();
  	for (const key in map) {
  		if (key.toLowerCase() === name) {
  			return key;
  		}
  	}
  	return undefined;
  }

  const MAP = Symbol('map');
  class Headers {
  	/**
    * Headers class
    *
    * @param   Object  headers  Response headers
    * @return  Void
    */
  	constructor() {
  		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

  		this[MAP] = Object.create(null);

  		if (init instanceof Headers) {
  			const rawHeaders = init.raw();
  			const headerNames = Object.keys(rawHeaders);

  			for (const headerName of headerNames) {
  				for (const value of rawHeaders[headerName]) {
  					this.append(headerName, value);
  				}
  			}

  			return;
  		}

  		// We don't worry about converting prop to ByteString here as append()
  		// will handle it.
  		if (init == null) ; else if (typeof init === 'object') {
  			const method = init[Symbol.iterator];
  			if (method != null) {
  				if (typeof method !== 'function') {
  					throw new TypeError('Header pairs must be iterable');
  				}

  				// sequence<sequence<ByteString>>
  				// Note: per spec we have to first exhaust the lists then process them
  				const pairs = [];
  				for (const pair of init) {
  					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
  						throw new TypeError('Each header pair must be iterable');
  					}
  					pairs.push(Array.from(pair));
  				}

  				for (const pair of pairs) {
  					if (pair.length !== 2) {
  						throw new TypeError('Each header pair must be a name/value tuple');
  					}
  					this.append(pair[0], pair[1]);
  				}
  			} else {
  				// record<ByteString, ByteString>
  				for (const key of Object.keys(init)) {
  					const value = init[key];
  					this.append(key, value);
  				}
  			}
  		} else {
  			throw new TypeError('Provided initializer must be an object');
  		}
  	}

  	/**
    * Return combined header value given name
    *
    * @param   String  name  Header name
    * @return  Mixed
    */
  	get(name) {
  		name = `${name}`;
  		validateName(name);
  		const key = find(this[MAP], name);
  		if (key === undefined) {
  			return null;
  		}

  		return this[MAP][key].join(', ');
  	}

  	/**
    * Iterate over all headers
    *
    * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
    * @param   Boolean   thisArg   `this` context for callback function
    * @return  Void
    */
  	forEach(callback) {
  		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  		let pairs = getHeaders(this);
  		let i = 0;
  		while (i < pairs.length) {
  			var _pairs$i = pairs[i];
  			const name = _pairs$i[0],
  			      value = _pairs$i[1];

  			callback.call(thisArg, value, name, this);
  			pairs = getHeaders(this);
  			i++;
  		}
  	}

  	/**
    * Overwrite header values given name
    *
    * @param   String  name   Header name
    * @param   String  value  Header value
    * @return  Void
    */
  	set(name, value) {
  		name = `${name}`;
  		value = `${value}`;
  		validateName(name);
  		validateValue(value);
  		const key = find(this[MAP], name);
  		this[MAP][key !== undefined ? key : name] = [value];
  	}

  	/**
    * Append a value onto existing header
    *
    * @param   String  name   Header name
    * @param   String  value  Header value
    * @return  Void
    */
  	append(name, value) {
  		name = `${name}`;
  		value = `${value}`;
  		validateName(name);
  		validateValue(value);
  		const key = find(this[MAP], name);
  		if (key !== undefined) {
  			this[MAP][key].push(value);
  		} else {
  			this[MAP][name] = [value];
  		}
  	}

  	/**
    * Check for header name existence
    *
    * @param   String   name  Header name
    * @return  Boolean
    */
  	has(name) {
  		name = `${name}`;
  		validateName(name);
  		return find(this[MAP], name) !== undefined;
  	}

  	/**
    * Delete all header values given name
    *
    * @param   String  name  Header name
    * @return  Void
    */
  	delete(name) {
  		name = `${name}`;
  		validateName(name);
  		const key = find(this[MAP], name);
  		if (key !== undefined) {
  			delete this[MAP][key];
  		}
  	}

  	/**
    * Return raw headers (non-spec api)
    *
    * @return  Object
    */
  	raw() {
  		return this[MAP];
  	}

  	/**
    * Get an iterator on keys.
    *
    * @return  Iterator
    */
  	keys() {
  		return createHeadersIterator(this, 'key');
  	}

  	/**
    * Get an iterator on values.
    *
    * @return  Iterator
    */
  	values() {
  		return createHeadersIterator(this, 'value');
  	}

  	/**
    * Get an iterator on entries.
    *
    * This is the default iterator of the Headers object.
    *
    * @return  Iterator
    */
  	[Symbol.iterator]() {
  		return createHeadersIterator(this, 'key+value');
  	}
  }
  Headers.prototype.entries = Headers.prototype[Symbol.iterator];

  Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
  	value: 'Headers',
  	writable: false,
  	enumerable: false,
  	configurable: true
  });

  Object.defineProperties(Headers.prototype, {
  	get: { enumerable: true },
  	forEach: { enumerable: true },
  	set: { enumerable: true },
  	append: { enumerable: true },
  	has: { enumerable: true },
  	delete: { enumerable: true },
  	keys: { enumerable: true },
  	values: { enumerable: true },
  	entries: { enumerable: true }
  });

  function getHeaders(headers) {
  	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

  	const keys = Object.keys(headers[MAP]).sort();
  	return keys.map(kind === 'key' ? function (k) {
  		return k.toLowerCase();
  	} : kind === 'value' ? function (k) {
  		return headers[MAP][k].join(', ');
  	} : function (k) {
  		return [k.toLowerCase(), headers[MAP][k].join(', ')];
  	});
  }

  const INTERNAL = Symbol('internal');

  function createHeadersIterator(target, kind) {
  	const iterator = Object.create(HeadersIteratorPrototype);
  	iterator[INTERNAL] = {
  		target,
  		kind,
  		index: 0
  	};
  	return iterator;
  }

  const HeadersIteratorPrototype = Object.setPrototypeOf({
  	next() {
  		// istanbul ignore if
  		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
  			throw new TypeError('Value of `this` is not a HeadersIterator');
  		}

  		var _INTERNAL = this[INTERNAL];
  		const target = _INTERNAL.target,
  		      kind = _INTERNAL.kind,
  		      index = _INTERNAL.index;

  		const values = getHeaders(target, kind);
  		const len = values.length;
  		if (index >= len) {
  			return {
  				value: undefined,
  				done: true
  			};
  		}

  		this[INTERNAL].index = index + 1;

  		return {
  			value: values[index],
  			done: false
  		};
  	}
  }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

  Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
  	value: 'HeadersIterator',
  	writable: false,
  	enumerable: false,
  	configurable: true
  });

  /**
   * Export the Headers object in a form that Node.js can consume.
   *
   * @param   Headers  headers
   * @return  Object
   */
  function exportNodeCompatibleHeaders(headers) {
  	const obj = Object.assign({ __proto__: null }, headers[MAP]);

  	// http.request() only supports string as Host header. This hack makes
  	// specifying custom Host header possible.
  	const hostHeaderKey = find(headers[MAP], 'Host');
  	if (hostHeaderKey !== undefined) {
  		obj[hostHeaderKey] = obj[hostHeaderKey][0];
  	}

  	return obj;
  }

  /**
   * Create a Headers object from an object of headers, ignoring those that do
   * not conform to HTTP grammar productions.
   *
   * @param   Object  obj  Object of headers
   * @return  Headers
   */
  function createHeadersLenient(obj) {
  	const headers = new Headers();
  	for (const name of Object.keys(obj)) {
  		if (invalidTokenRegex.test(name)) {
  			continue;
  		}
  		if (Array.isArray(obj[name])) {
  			for (const val of obj[name]) {
  				if (invalidHeaderCharRegex.test(val)) {
  					continue;
  				}
  				if (headers[MAP][name] === undefined) {
  					headers[MAP][name] = [val];
  				} else {
  					headers[MAP][name].push(val);
  				}
  			}
  		} else if (!invalidHeaderCharRegex.test(obj[name])) {
  			headers[MAP][name] = [obj[name]];
  		}
  	}
  	return headers;
  }

  const INTERNALS$1 = Symbol('Response internals');

  // fix an issue where "STATUS_CODES" aren't a named export for node <10
  const STATUS_CODES = http.STATUS_CODES;

  /**
   * Response class
   *
   * @param   Stream  body  Readable stream
   * @param   Object  opts  Response options
   * @return  Void
   */
  class Response {
  	constructor() {
  		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  		Body.call(this, body, opts);

  		const status = opts.status || 200;
  		const headers = new Headers(opts.headers);

  		if (body != null && !headers.has('Content-Type')) {
  			const contentType = extractContentType(body);
  			if (contentType) {
  				headers.append('Content-Type', contentType);
  			}
  		}

  		this[INTERNALS$1] = {
  			url: opts.url,
  			status,
  			statusText: opts.statusText || STATUS_CODES[status],
  			headers,
  			counter: opts.counter
  		};
  	}

  	get url() {
  		return this[INTERNALS$1].url || '';
  	}

  	get status() {
  		return this[INTERNALS$1].status;
  	}

  	/**
    * Convenience property representing if the request ended normally
    */
  	get ok() {
  		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  	}

  	get redirected() {
  		return this[INTERNALS$1].counter > 0;
  	}

  	get statusText() {
  		return this[INTERNALS$1].statusText;
  	}

  	get headers() {
  		return this[INTERNALS$1].headers;
  	}

  	/**
    * Clone this response
    *
    * @return  Response
    */
  	clone() {
  		return new Response(clone(this), {
  			url: this.url,
  			status: this.status,
  			statusText: this.statusText,
  			headers: this.headers,
  			ok: this.ok,
  			redirected: this.redirected
  		});
  	}
  }

  Body.mixIn(Response.prototype);

  Object.defineProperties(Response.prototype, {
  	url: { enumerable: true },
  	status: { enumerable: true },
  	ok: { enumerable: true },
  	redirected: { enumerable: true },
  	statusText: { enumerable: true },
  	headers: { enumerable: true },
  	clone: { enumerable: true }
  });

  Object.defineProperty(Response.prototype, Symbol.toStringTag, {
  	value: 'Response',
  	writable: false,
  	enumerable: false,
  	configurable: true
  });

  const INTERNALS$2 = Symbol('Request internals');

  // fix an issue where "format", "parse" aren't a named export for node <10
  const parse_url = Url__default.parse;
  const format_url = Url__default.format;

  const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

  /**
   * Check if a value is an instance of Request.
   *
   * @param   Mixed   input
   * @return  Boolean
   */
  function isRequest(input) {
  	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
  }

  function isAbortSignal(signal) {
  	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
  	return !!(proto && proto.constructor.name === 'AbortSignal');
  }

  /**
   * Request class
   *
   * @param   Mixed   input  Url or Request instance
   * @param   Object  init   Custom options
   * @return  Void
   */
  class Request {
  	constructor(input) {
  		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  		let parsedURL;

  		// normalize input
  		if (!isRequest(input)) {
  			if (input && input.href) {
  				// in order to support Node.js' Url objects; though WHATWG's URL objects
  				// will fall into this branch also (since their `toString()` will return
  				// `href` property anyway)
  				parsedURL = parse_url(input.href);
  			} else {
  				// coerce input to a string before attempting to parse
  				parsedURL = parse_url(`${input}`);
  			}
  			input = {};
  		} else {
  			parsedURL = parse_url(input.url);
  		}

  		let method = init.method || input.method || 'GET';
  		method = method.toUpperCase();

  		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
  			throw new TypeError('Request with GET/HEAD method cannot have body');
  		}

  		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

  		Body.call(this, inputBody, {
  			timeout: init.timeout || input.timeout || 0,
  			size: init.size || input.size || 0
  		});

  		const headers = new Headers(init.headers || input.headers || {});

  		if (inputBody != null && !headers.has('Content-Type')) {
  			const contentType = extractContentType(inputBody);
  			if (contentType) {
  				headers.append('Content-Type', contentType);
  			}
  		}

  		let signal = isRequest(input) ? input.signal : null;
  		if ('signal' in init) signal = init.signal;

  		if (signal != null && !isAbortSignal(signal)) {
  			throw new TypeError('Expected signal to be an instanceof AbortSignal');
  		}

  		this[INTERNALS$2] = {
  			method,
  			redirect: init.redirect || input.redirect || 'follow',
  			headers,
  			parsedURL,
  			signal
  		};

  		// node-fetch-only options
  		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
  		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
  		this.counter = init.counter || input.counter || 0;
  		this.agent = init.agent || input.agent;
  	}

  	get method() {
  		return this[INTERNALS$2].method;
  	}

  	get url() {
  		return format_url(this[INTERNALS$2].parsedURL);
  	}

  	get headers() {
  		return this[INTERNALS$2].headers;
  	}

  	get redirect() {
  		return this[INTERNALS$2].redirect;
  	}

  	get signal() {
  		return this[INTERNALS$2].signal;
  	}

  	/**
    * Clone this request
    *
    * @return  Request
    */
  	clone() {
  		return new Request(this);
  	}
  }

  Body.mixIn(Request.prototype);

  Object.defineProperty(Request.prototype, Symbol.toStringTag, {
  	value: 'Request',
  	writable: false,
  	enumerable: false,
  	configurable: true
  });

  Object.defineProperties(Request.prototype, {
  	method: { enumerable: true },
  	url: { enumerable: true },
  	headers: { enumerable: true },
  	redirect: { enumerable: true },
  	clone: { enumerable: true },
  	signal: { enumerable: true }
  });

  /**
   * Convert a Request to Node.js http request options.
   *
   * @param   Request  A Request instance
   * @return  Object   The options object to be passed to http.request
   */
  function getNodeRequestOptions(request) {
  	const parsedURL = request[INTERNALS$2].parsedURL;
  	const headers = new Headers(request[INTERNALS$2].headers);

  	// fetch step 1.3
  	if (!headers.has('Accept')) {
  		headers.set('Accept', '*/*');
  	}

  	// Basic fetch
  	if (!parsedURL.protocol || !parsedURL.hostname) {
  		throw new TypeError('Only absolute URLs are supported');
  	}

  	if (!/^https?:$/.test(parsedURL.protocol)) {
  		throw new TypeError('Only HTTP(S) protocols are supported');
  	}

  	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
  		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
  	}

  	// HTTP-network-or-cache fetch steps 2.4-2.7
  	let contentLengthValue = null;
  	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
  		contentLengthValue = '0';
  	}
  	if (request.body != null) {
  		const totalBytes = getTotalBytes(request);
  		if (typeof totalBytes === 'number') {
  			contentLengthValue = String(totalBytes);
  		}
  	}
  	if (contentLengthValue) {
  		headers.set('Content-Length', contentLengthValue);
  	}

  	// HTTP-network-or-cache fetch step 2.11
  	if (!headers.has('User-Agent')) {
  		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
  	}

  	// HTTP-network-or-cache fetch step 2.15
  	if (request.compress && !headers.has('Accept-Encoding')) {
  		headers.set('Accept-Encoding', 'gzip,deflate');
  	}

  	let agent = request.agent;
  	if (typeof agent === 'function') {
  		agent = agent(parsedURL);
  	}

  	if (!headers.has('Connection') && !agent) {
  		headers.set('Connection', 'close');
  	}

  	// HTTP-network fetch step 4.2
  	// chunked encoding is handled by Node.js

  	return Object.assign({}, parsedURL, {
  		method: request.method,
  		headers: exportNodeCompatibleHeaders(headers),
  		agent
  	});
  }

  /**
   * abort-error.js
   *
   * AbortError interface for cancelled requests
   */

  /**
   * Create AbortError instance
   *
   * @param   String      message      Error message for human
   * @return  AbortError
   */
  function AbortError(message) {
    Error.call(this, message);

    this.type = 'aborted';
    this.message = message;

    // hide custom error implementation details from end-users
    Error.captureStackTrace(this, this.constructor);
  }

  AbortError.prototype = Object.create(Error.prototype);
  AbortError.prototype.constructor = AbortError;
  AbortError.prototype.name = 'AbortError';

  // fix an issue where "PassThrough", "resolve" aren't a named export for node <10
  const PassThrough$1 = Stream.PassThrough;
  const resolve_url = Url__default.resolve;

  /**
   * Fetch function
   *
   * @param   Mixed    url   Absolute url or Request instance
   * @param   Object   opts  Fetch options
   * @return  Promise
   */
  function fetch(url, opts) {

  	// allow custom promise
  	if (!fetch.Promise) {
  		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
  	}

  	Body.Promise = fetch.Promise;

  	// wrap http.request into fetch
  	return new fetch.Promise(function (resolve, reject) {
  		// build request object
  		const request = new Request(url, opts);
  		const options = getNodeRequestOptions(request);

  		const send = (options.protocol === 'https:' ? https : http).request;
  		const signal = request.signal;

  		let response = null;

  		const abort = function abort() {
  			let error = new AbortError('The user aborted a request.');
  			reject(error);
  			if (request.body && request.body instanceof Stream.Readable) {
  				request.body.destroy(error);
  			}
  			if (!response || !response.body) return;
  			response.body.emit('error', error);
  		};

  		if (signal && signal.aborted) {
  			abort();
  			return;
  		}

  		const abortAndFinalize = function abortAndFinalize() {
  			abort();
  			finalize();
  		};

  		// send request
  		const req = send(options);
  		let reqTimeout;

  		if (signal) {
  			signal.addEventListener('abort', abortAndFinalize);
  		}

  		function finalize() {
  			req.abort();
  			if (signal) signal.removeEventListener('abort', abortAndFinalize);
  			clearTimeout(reqTimeout);
  		}

  		if (request.timeout) {
  			req.once('socket', function (socket) {
  				reqTimeout = setTimeout(function () {
  					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
  					finalize();
  				}, request.timeout);
  			});
  		}

  		req.on('error', function (err) {
  			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
  			finalize();
  		});

  		req.on('response', function (res) {
  			clearTimeout(reqTimeout);

  			const headers = createHeadersLenient(res.headers);

  			// HTTP fetch step 5
  			if (fetch.isRedirect(res.statusCode)) {
  				// HTTP fetch step 5.2
  				const location = headers.get('Location');

  				// HTTP fetch step 5.3
  				const locationURL = location === null ? null : resolve_url(request.url, location);

  				// HTTP fetch step 5.5
  				switch (request.redirect) {
  					case 'error':
  						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
  						finalize();
  						return;
  					case 'manual':
  						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
  						if (locationURL !== null) {
  							// handle corrupted header
  							try {
  								headers.set('Location', locationURL);
  							} catch (err) {
  								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
  								reject(err);
  							}
  						}
  						break;
  					case 'follow':
  						// HTTP-redirect fetch step 2
  						if (locationURL === null) {
  							break;
  						}

  						// HTTP-redirect fetch step 5
  						if (request.counter >= request.follow) {
  							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
  							finalize();
  							return;
  						}

  						// HTTP-redirect fetch step 6 (counter increment)
  						// Create a new Request object.
  						const requestOpts = {
  							headers: new Headers(request.headers),
  							follow: request.follow,
  							counter: request.counter + 1,
  							agent: request.agent,
  							compress: request.compress,
  							method: request.method,
  							body: request.body,
  							signal: request.signal,
  							timeout: request.timeout
  						};

  						// HTTP-redirect fetch step 9
  						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
  							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
  							finalize();
  							return;
  						}

  						// HTTP-redirect fetch step 11
  						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
  							requestOpts.method = 'GET';
  							requestOpts.body = undefined;
  							requestOpts.headers.delete('content-length');
  						}

  						// HTTP-redirect fetch step 15
  						resolve(fetch(new Request(locationURL, requestOpts)));
  						finalize();
  						return;
  				}
  			}

  			// prepare response
  			res.once('end', function () {
  				if (signal) signal.removeEventListener('abort', abortAndFinalize);
  			});
  			let body = res.pipe(new PassThrough$1());

  			const response_options = {
  				url: request.url,
  				status: res.statusCode,
  				statusText: res.statusMessage,
  				headers: headers,
  				size: request.size,
  				timeout: request.timeout,
  				counter: request.counter
  			};

  			// HTTP-network fetch step 12.1.1.3
  			const codings = headers.get('Content-Encoding');

  			// HTTP-network fetch step 12.1.1.4: handle content codings

  			// in following scenarios we ignore compression support
  			// 1. compression support is disabled
  			// 2. HEAD request
  			// 3. no Content-Encoding header
  			// 4. no content response (204)
  			// 5. content not modified response (304)
  			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
  				response = new Response(body, response_options);
  				resolve(response);
  				return;
  			}

  			// For Node v6+
  			// Be less strict when decoding compressed responses, since sometimes
  			// servers send slightly invalid responses that are still accepted
  			// by common browsers.
  			// Always using Z_SYNC_FLUSH is what cURL does.
  			const zlibOptions = {
  				flush: zlib.Z_SYNC_FLUSH,
  				finishFlush: zlib.Z_SYNC_FLUSH
  			};

  			// for gzip
  			if (codings == 'gzip' || codings == 'x-gzip') {
  				body = body.pipe(zlib.createGunzip(zlibOptions));
  				response = new Response(body, response_options);
  				resolve(response);
  				return;
  			}

  			// for deflate
  			if (codings == 'deflate' || codings == 'x-deflate') {
  				// handle the infamous raw deflate response from old servers
  				// a hack for old IIS and Apache servers
  				const raw = res.pipe(new PassThrough$1());
  				raw.once('data', function (chunk) {
  					// see http://stackoverflow.com/questions/37519828
  					if ((chunk[0] & 0x0F) === 0x08) {
  						body = body.pipe(zlib.createInflate());
  					} else {
  						body = body.pipe(zlib.createInflateRaw());
  					}
  					response = new Response(body, response_options);
  					resolve(response);
  				});
  				return;
  			}

  			// for br
  			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
  				body = body.pipe(zlib.createBrotliDecompress());
  				response = new Response(body, response_options);
  				resolve(response);
  				return;
  			}

  			// otherwise, use response as-is
  			response = new Response(body, response_options);
  			resolve(response);
  		});

  		writeToStream(req, request);
  	});
  }
  /**
   * Redirect code matching
   *
   * @param   Number   code  Status code
   * @return  Boolean
   */
  fetch.isRedirect = function (code) {
  	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
  };

  // expose Promise
  fetch.Promise = global.Promise;

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

  var baseHost = "https://app.clio.com";
  var baseUrl = baseHost + "/api/v4";

  var getResult =
  /*#__PURE__*/
  function () {
    var _ref = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee(ret) {
      var text, obj;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(ret.status === 204)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", null);

            case 2:
              _context.next = 4;
              return ret.text();

            case 4:
              text = _context.sent;
              _context.prev = 5;
              obj = JSON.parse(text);

              if (!obj.error) {
                _context.next = 9;
                break;
              }

              throw JSON.stringify(obj.error);

            case 9:
              return _context.abrupt("return", obj);

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](5);
              console.log("Hit error parsing result in getResult, probable error message");
              console.log(text);
              throw text;

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 12]]);
    }));

    return function getResult(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var _authorize =
  /*#__PURE__*/
  function () {
    var _ref3 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee2(_ref2) {
      var clientId, clientSecret, code, redirectUri, body, res, text, obj, access_token, refresh_token, expires_in;
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              clientId = _ref2.clientId, clientSecret = _ref2.clientSecret, code = _ref2.code, redirectUri = _ref2.redirectUri;
              body = new Url.URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                redirect_uri: redirectUri,
                grant_type: "authorization_code"
              });
              _context2.next = 4;
              return fetch(baseHost + "/oauth/token", {
                method: "post",
                body: body
              });

            case 4:
              res = _context2.sent;
              _context2.next = 7;
              return res.text();

            case 7:
              text = _context2.sent;
              _context2.prev = 8;
              obj = JSON.parse(text);
              access_token = obj.access_token, refresh_token = obj.refresh_token, expires_in = obj.expires_in;
              return _context2.abrupt("return", {
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresIn: expires_in
              });

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](8);
              console.log("Hit error parsing result in authorize, probable error message");
              console.log(text);
              throw text;

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[8, 14]]);
    }));

    return function authorize(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  var _deauthorize =
  /*#__PURE__*/
  function () {
    var _ref5 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee3(_ref4) {
      var accessToken, headers, url;
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              accessToken = _ref4.accessToken;
              headers = {
                Authorization: "Bearer ".concat(accessToken)
              };
              url = new URL(baseHost + "/oauth/deauthorize");
              _context3.next = 5;
              return fetch(url, {
                headers: headers
              });

            case 5:
              return _context3.abrupt("return", true);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function deauthorize(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var _getAccessToken =
  /*#__PURE__*/
  function () {
    var _ref7 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee4(_ref6) {
      var clientId, clientSecret, refreshToken, body, res, text, _JSON$parse, access_token, refresh_token, expires_in;

      return regenerator.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              clientId = _ref6.clientId, clientSecret = _ref6.clientSecret, refreshToken = _ref6.refreshToken;
              body = new Url.URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: "refresh_token"
              });
              _context4.next = 4;
              return fetch(baseHost + "/oauth/token", {
                method: "post",
                body: body
              });

            case 4:
              res = _context4.sent;
              _context4.next = 7;
              return res.text();

            case 7:
              text = _context4.sent;
              _context4.prev = 8;
              _JSON$parse = JSON.parse(text), access_token = _JSON$parse.access_token, refresh_token = _JSON$parse.refresh_token, expires_in = _JSON$parse.expires_in;
              return _context4.abrupt("return", {
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresIn: expires_in
              });

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](8);
              console.log("Hit error parsing result, probable error message");
              console.log(text);
              throw text;

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[8, 13]]);
    }));

    return function getAccessToken(_x4) {
      return _ref7.apply(this, arguments);
    };
  }();

  var makeFields = function makeFields(fields) {
    return fields && fields.map(function (field) {
      if (typeof field === "string") return field;

      if (_typeof_1(field) === "object") {
        var fieldName = field.field,
            _fields = field.fields;
        return "".concat(fieldName, "{").concat(_fields, "}");
      }
    }).join(",");
  };

  var _gets =
  /*#__PURE__*/
  function () {
    var _ref9 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee5(_ref8) {
      var path, fields, accessToken, headers, args, url, ret;
      return regenerator.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              path = _ref8.path, fields = _ref8.fields, accessToken = _ref8.accessToken, headers = _ref8.headers, args = objectWithoutProperties(_ref8, ["path", "fields", "accessToken", "headers"]);
              headers = _objectSpread({}, headers || {}, {
                Authorization: "Bearer ".concat(accessToken)
              });
              url = new URL(baseUrl);
              url.pathname = "".concat(url.pathname, "/").concat(path, ".json");
              if (fields) url.searchParams.append("fields", makeFields(fields));
              Object.entries(args).forEach(function (_ref10) {
                var _ref11 = slicedToArray(_ref10, 2),
                    k = _ref11[0],
                    v = _ref11[1];

                return url.searchParams.append(k, v);
              });
              _context5.next = 8;
              return fetch(url, {
                method: "get",
                headers: headers
              });

            case 8:
              ret = _context5.sent;
              return _context5.abrupt("return", getResult(ret));

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function gets(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  var bulkGetRaw =
  /*#__PURE__*/
  function () {
    var _ref13 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee6(_ref12) {
      var path, fields, accessToken, onProgress, args, headers, url, ret, pollCheckURL, doCheck, _ret, text, obj;

      return regenerator.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              path = _ref12.path, fields = _ref12.fields, accessToken = _ref12.accessToken, onProgress = _ref12.onProgress, args = objectWithoutProperties(_ref12, ["path", "fields", "accessToken", "onProgress"]);
              headers = {
                "X-BULK": "true",
                Authorization: "Bearer ".concat(accessToken)
              }; //Kick off the bulk fetch

              url = new URL(baseUrl);
              url.pathname = "".concat(url.pathname, "/").concat(path, ".json");
              if (fields) url.searchParams.append("fields", makeFields(fields));
              Object.entries(args).forEach(function (_ref14) {
                var _ref15 = slicedToArray(_ref14, 2),
                    k = _ref15[0],
                    v = _ref15[1];

                return url.searchParams.append(k, v);
              });
              _context6.next = 8;
              return fetch(url, {
                method: "get",
                headers: headers
              });

            case 8:
              ret = _context6.sent;
              pollCheckURL = ret.headers.get("Location");
              doCheck = true;

            case 11:
              if (!doCheck) {
                _context6.next = 29;
                break;
              }

              _context6.next = 14;
              return fetch(pollCheckURL, {
                method: "get",
                headers: headers
              });

            case 14:
              _ret = _context6.sent;
              _context6.t0 = _ret.code;
              _context6.next = _context6.t0 === 200 ? 18 : _context6.t0 === 303 ? 26 : 27;
              break;

            case 18:
              if (!onProgress) {
                _context6.next = 25;
                break;
              }

              _context6.next = 21;
              return _ret.text();

            case 21:
              text = _context6.sent;
              obj = JSON.parse(text);
              _context6.next = 25;
              return onProgress(obj);

            case 25:
              return _context6.abrupt("break", 27);

            case 26:
              return _context6.abrupt("return", fetch(_ret.headers.get("Location")));

            case 27:
              _context6.next = 11;
              break;

            case 29:
              throw "Failed to download bulk";

            case 30:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function bulkGetRaw(_x6) {
      return _ref13.apply(this, arguments);
    };
  }();

  var bulkGetText =
  /*#__PURE__*/
  function () {
    var _ref17 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee7(_ref16) {
      var path, fields, accessToken, onProgress, outPath, ret;
      return regenerator.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              path = _ref16.path, fields = _ref16.fields, accessToken = _ref16.accessToken, onProgress = _ref16.onProgress, outPath = _ref16.outPath;

              if (!outPath) {
                _context7.next = 9;
                break;
              }

              _context7.next = 4;
              return _bulkGetFile({
                path: path,
                fields: fields,
                accessToken: accessToken,
                onProgress: onProgress,
                outPath: outPath
              });

            case 4:
              _context7.next = 6;
              return util.promisify(fs.readFile)(outPath);

            case 6:
              return _context7.abrupt("return", _context7.sent);

            case 9:
              _context7.next = 11;
              return bulkGetRaw({
                path: path,
                fields: fields,
                accessToken: accessToken,
                onProgress: onProgress
              });

            case 11:
              ret = _context7.sent;
              _context7.next = 14;
              return ret.text();

            case 14:
              return _context7.abrupt("return", _context7.sent);

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function bulkGetText(_x7) {
      return _ref17.apply(this, arguments);
    };
  }();

  var _bulkGetFile =
  /*#__PURE__*/
  function () {
    var _ref19 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee8(_ref18) {
      var path, fields, accessToken, onProgress, outPath, ret;
      return regenerator.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              path = _ref18.path, fields = _ref18.fields, accessToken = _ref18.accessToken, onProgress = _ref18.onProgress, outPath = _ref18.outPath;
              _context8.next = 3;
              return bulkGetRaw({
                path: path,
                fields: fields,
                accessToken: accessToken,
                onProgress: onProgress
              });

            case 3:
              ret = _context8.sent;
              _context8.next = 6;
              return new Promise(function (r) {
                ret.body.pipe(fs.createWriteStream(outPath));
                ret.body.on("end", function () {
                  return r();
                });
              });

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function bulkGetFile(_x8) {
      return _ref19.apply(this, arguments);
    };
  }();

  var _bulkGetObj =
  /*#__PURE__*/
  function () {
    var _ref21 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee9(_ref20) {
      var path, fields, accessToken, onProgress, outPath, text;
      return regenerator.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              path = _ref20.path, fields = _ref20.fields, accessToken = _ref20.accessToken, onProgress = _ref20.onProgress, outPath = _ref20.outPath;
              text = bulkGetText({
                path: path,
                fields: fields,
                accessToken: accessToken,
                onProgress: onProgress,
                outPath: outPath
              });
              return _context9.abrupt("return", JSON.parse(text));

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function bulkGetObj(_x9) {
      return _ref21.apply(this, arguments);
    };
  }();

  var _makeWebHook =
  /*#__PURE__*/
  function () {
    var _ref23 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee10(_ref22) {
      var url, fields, events, model, expires, accessToken, headers, whUrl, data, bodyObj, body, ret, text, obj;
      return regenerator.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              url = _ref22.url, fields = _ref22.fields, events = _ref22.events, model = _ref22.model, expires = _ref22.expires, accessToken = _ref22.accessToken;
              headers = defineProperty({
                Authorization: "Bearer ".concat(accessToken)
              }, "Content-Type", "application/json");
              whUrl = new URL(baseUrl + "/webhooks.json");

              if (model) {
                _context10.next = 5;
                break;
              }

              throw "Model is required";

            case 5:
              data = {
                model: model
              };

              if (url) {
                _context10.next = 8;
                break;
              }

              throw "url is required";

            case 8:
              data.url = url;
              if (events) data.events = events;

              if (fields) {
                _context10.next = 12;
                break;
              }

              throw "fields are required";

            case 12:
              data.fields = makeFields(fields);
              if (expires && !(expires instanceof Date)) expires = new Date(expires);
              if (expires) data.expires_at = expires.toISOString();
              bodyObj = {
                data: data
              };
              body = JSON.stringify(bodyObj);
              _context10.next = 19;
              return fetch(whUrl, {
                method: "post",
                headers: headers,
                body: body
              });

            case 19:
              ret = _context10.sent;
              _context10.next = 22;
              return ret.text();

            case 22:
              text = _context10.sent;
              _context10.prev = 23;
              obj = JSON.parse(text);

              if (!obj.error) {
                _context10.next = 27;
                break;
              }

              throw obj;

            case 27:
              console.log("I am giving you object now!!!");
              console.log(text);
              return _context10.abrupt("return", obj);

            case 32:
              _context10.prev = 32;
              _context10.t0 = _context10["catch"](23);
              console.log("Hit error parsing result in makewebhook, probable error message");
              console.log(text);
              throw text;

            case 37:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[23, 32]]);
    }));

    return function makeWebHook(_x10) {
      return _ref23.apply(this, arguments);
    };
  }();

  var validateSignature = function validateSignature(_ref24) {
    var signature = _ref24.signature,
        secret = _ref24.secret,
        body = _ref24.body;
    var cipher = crypto.createHmac("sha256", secret);
    cipher.update(body);
    var calculatedSignature = cipher.digest("hex");
    console.log("Received signature", signature);
    console.log("Body");
    console.log(body);
    console.log("Calculated signature", calculatedSignature);
    return signature !== calculatedSignature;
  };

  var _create =
  /*#__PURE__*/
  function () {
    var _ref26 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee11(_ref25) {
      var path, fields, data, tempBody, accessToken, args, url, headers, body, ret;
      return regenerator.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              path = _ref25.path, fields = _ref25.fields, data = _ref25.data, tempBody = _ref25.body, accessToken = _ref25.accessToken, args = objectWithoutProperties(_ref25, ["path", "fields", "data", "body", "accessToken"]);
              url = new URL(baseUrl);
              headers = {
                Authorization: "Bearer ".concat(accessToken),
                "Content-Type": "application/json"
              };
              url.pathname = "".concat(url.pathname, "/").concat(path, ".json");
              if (fields) url.searchParams.append("fields", makeFields(fields));
              Object.entries(args).forEach(function (_ref27) {
                var _ref28 = slicedToArray(_ref27, 2),
                    k = _ref28[0],
                    v = _ref28[1];

                return url.searchParams.append(k, v);
              });
              body = JSON.stringify(_objectSpread({
                data: data
              }, tempBody || {}));
              _context11.next = 9;
              return fetch(url, {
                method: "post",
                headers: headers,
                body: body
              });

            case 9:
              ret = _context11.sent;
              return _context11.abrupt("return", getResult(ret));

            case 11:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function create(_x11) {
      return _ref26.apply(this, arguments);
    };
  }();

  var _get =
  /*#__PURE__*/
  function () {
    var _ref30 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee12(_ref29) {
      var path, id, fields, accessToken, args, headers, url, ret;
      return regenerator.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              path = _ref29.path, id = _ref29.id, fields = _ref29.fields, accessToken = _ref29.accessToken, args = objectWithoutProperties(_ref29, ["path", "id", "fields", "accessToken"]);
              headers = {
                Authorization: "Bearer ".concat(accessToken)
              };
              url = new URL(baseUrl);
              url.pathname = "".concat(url.pathname, "/").concat(path, "/").concat(id, ".json");
              url.searchParams.append("fields", makeFields(fields));
              Object.entries(args).forEach(function (_ref31) {
                var _ref32 = slicedToArray(_ref31, 2),
                    k = _ref32[0],
                    v = _ref32[1];

                return url.searchParams.append(k, v);
              });
              _context12.next = 8;
              return fetch(url, {
                method: "get",
                headers: headers
              });

            case 8:
              ret = _context12.sent;
              return _context12.abrupt("return", getResult(ret));

            case 10:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function get(_x12) {
      return _ref30.apply(this, arguments);
    };
  }();

  var _update =
  /*#__PURE__*/
  function () {
    var _ref34 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee13(_ref33) {
      var etag, path, id, fields, data, accessToken, args, headers, url, body, ret;
      return regenerator.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              etag = _ref33.etag, path = _ref33.path, id = _ref33.id, fields = _ref33.fields, data = _ref33.data, accessToken = _ref33.accessToken, args = objectWithoutProperties(_ref33, ["etag", "path", "id", "fields", "data", "accessToken"]);
              if (!etag) etag = data.etag;
              headers = {
                Authorization: "Bearer ".concat(accessToken),
                "IF-MATCH": etag,
                "Content-Type": "application/json"
              };
              url = new URL(baseUrl);
              url.pathname = "".concat(url.pathname, "/").concat(path, "/").concat(id, ".json");
              url.searchParams.append("fields", makeFields(fields));
              Object.entries(args).forEach(function (_ref35) {
                var _ref36 = slicedToArray(_ref35, 2),
                    k = _ref36[0],
                    v = _ref36[1];

                return url.searchParams.append(k, v);
              });
              body = JSON.stringify({
                data: data
              });
              _context13.next = 10;
              return fetch(url, {
                method: "patch",
                body: body,
                headers: headers
              });

            case 10:
              ret = _context13.sent;
              return _context13.abrupt("return", getResult(ret));

            case 12:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function update(_x13) {
      return _ref34.apply(this, arguments);
    };
  }();

  var _remove =
  /*#__PURE__*/
  function () {
    var _ref38 = asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee14(_ref37) {
      var path, id, accessToken, args, headers, url, ret;
      return regenerator.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              path = _ref37.path, id = _ref37.id, accessToken = _ref37.accessToken, args = objectWithoutProperties(_ref37, ["path", "id", "accessToken"]);
              headers = {
                Authorization: "Bearer ".concat(accessToken)
              };
              url = new URL(baseUrl);
              url.pathname = "".concat(url.pathname, "/").concat(path, "/").concat(id, ".json");
              Object.entries(args).forEach(function (_ref39) {
                var _ref40 = slicedToArray(_ref39, 2),
                    k = _ref40[0],
                    v = _ref40[1];

                return url.searchParams.append(k, v);
              });
              _context14.next = 7;
              return fetch(url, {
                method: "delete",
                headers: headers
              });

            case 7:
              ret = _context14.sent;
              return _context14.abrupt("return", getResult(ret));

            case 9:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function remove(_x14) {
      return _ref38.apply(this, arguments);
    };
  }(); //#endregion
  //#region Clio class


  var Clio =
  /*#__PURE__*/
  function () {
    function Clio(_ref41) {
      var clientId = _ref41.clientId,
          clientSecret = _ref41.clientSecret,
          refreshToken = _ref41.refreshToken,
          accessToken = _ref41.accessToken,
          onNewRefreshToken = _ref41.onNewRefreshToken;

      classCallCheck(this, Clio);

      // if (!clientId || !clientSecret)
      //   throw "Clio must be initialized with a clientId and a clientSecret";
      this.clientId = clientId;
      this.clientSecret = clientSecret;
      this.refreshToken = refreshToken;
      this.accessToken = accessToken;
      if (onNewRefreshToken) this.onNewRefreshToken = onNewRefreshToken;
    }

    createClass(Clio, [{
      key: "load",
      value: function () {
        var _load = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee15() {
          return regenerator.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  return _context15.abrupt("return", this);

                case 1:
                case "end":
                  return _context15.stop();
              }
            }
          }, _callee15, this);
        }));

        function load() {
          return _load.apply(this, arguments);
        }

        return load;
      }()
    }, {
      key: "authorize",
      value: function () {
        var _authorize2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee16(_ref42) {
          var code, redirectUri, _ref43, refreshToken, accessToken;

          return regenerator.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  code = _ref42.code, redirectUri = _ref42.redirectUri;

                  if (!(!code || !redirectUri)) {
                    _context16.next = 3;
                    break;
                  }

                  throw "Authorize requires a code and the redirectUri passed in the initial authorization request";

                case 3:
                  _context16.next = 5;
                  return _authorize({
                    clientId: this.clientId,
                    clientSecret: this.clientSecret,
                    code: code,
                    redirectUri: redirectUri
                  });

                case 5:
                  _ref43 = _context16.sent;
                  refreshToken = _ref43.refreshToken;
                  accessToken = _ref43.accessToken;

                  if (!accessToken) {
                    _context16.next = 17;
                    break;
                  }

                  this.accessToken = accessToken;
                  this.refreshToken = refreshToken;

                  if (!(refreshToken && this.onNewRefreshToken)) {
                    _context16.next = 14;
                    break;
                  }

                  _context16.next = 14;
                  return this.onNewRefreshToken(refreshToken);

                case 14:
                  return _context16.abrupt("return", {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                  });

                case 17:
                  throw "could not authorize with these credentials";

                case 18:
                case "end":
                  return _context16.stop();
              }
            }
          }, _callee16, this);
        }));

        function authorize(_x15) {
          return _authorize2.apply(this, arguments);
        }

        return authorize;
      }()
    }, {
      key: "deauthorize",
      value: function () {
        var _deauthorize2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee17() {
          var accessToken;
          return regenerator.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.next = 2;
                  return this.getAccessToken();

                case 2:
                  accessToken = _context17.sent;
                  _context17.next = 5;
                  return _deauthorize({
                    accessToken: accessToken
                  });

                case 5:
                  return _context17.abrupt("return", this.onNewRefreshToken(null));

                case 6:
                case "end":
                  return _context17.stop();
              }
            }
          }, _callee17, this);
        }));

        function deauthorize() {
          return _deauthorize2.apply(this, arguments);
        }

        return deauthorize;
      }()
    }, {
      key: "getRefreshToken",
      value: function () {
        var _getRefreshToken2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee18() {
          return regenerator.wrap(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  return _context18.abrupt("return", this.refreshToken);

                case 1:
                case "end":
                  return _context18.stop();
              }
            }
          }, _callee18, this);
        }));

        function getRefreshToken() {
          return _getRefreshToken2.apply(this, arguments);
        }

        return getRefreshToken;
      }()
    }, {
      key: "_getRefreshToken",
      value: function () {
        var _getRefreshToken3 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee19() {
          return regenerator.wrap(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  if (!this.refreshToken) {
                    _context19.next = 2;
                    break;
                  }

                  return _context19.abrupt("return", this.refreshToken);

                case 2:
                  _context19.next = 4;
                  return this.getRefreshToken();

                case 4:
                  this.refreshToken = _context19.sent;
                  return _context19.abrupt("return", this.refreshToken);

                case 6:
                case "end":
                  return _context19.stop();
              }
            }
          }, _callee19, this);
        }));

        function _getRefreshToken() {
          return _getRefreshToken3.apply(this, arguments);
        }

        return _getRefreshToken;
      }()
    }, {
      key: "getAccessToken",
      value: function () {
        var _getAccessToken2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee20() {
          var refreshToken, _ref44, accessToken, newToken;

          return regenerator.wrap(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  if (!this.accessToken) {
                    _context20.next = 2;
                    break;
                  }

                  return _context20.abrupt("return", this.accessToken);

                case 2:
                  _context20.next = 4;
                  return this._getRefreshToken();

                case 4:
                  refreshToken = _context20.sent;

                  if (refreshToken) {
                    _context20.next = 7;
                    break;
                  }

                  throw "Cannot get an access token without a refresh token";

                case 7:
                  _context20.next = 9;
                  return _getAccessToken({
                    clientId: this.clientId,
                    clientSecret: this.clientSecret,
                    refreshToken: refreshToken
                  });

                case 9:
                  _ref44 = _context20.sent;
                  accessToken = _ref44.accessToken;
                  newToken = _ref44.refreshToken;
                  this.accessToken = accessToken;

                  if (newToken) {
                    this.refreshToken = newToken;
                    if (this.onNewRefreshToken) this.onNewRefreshToken(newToken);
                  }

                  return _context20.abrupt("return", this.accessToken);

                case 15:
                case "end":
                  return _context20.stop();
              }
            }
          }, _callee20, this);
        }));

        function getAccessToken() {
          return _getAccessToken2.apply(this, arguments);
        }

        return getAccessToken;
      }()
    }, {
      key: "get",
      value: function () {
        var _get2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee21(_ref45) {
          var path, id, fields, accessToken;
          return regenerator.wrap(function _callee21$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  path = _ref45.path, id = _ref45.id, fields = _ref45.fields;
                  _context21.next = 3;
                  return this.getAccessToken();

                case 3:
                  accessToken = _context21.sent;
                  return _context21.abrupt("return", _get({
                    path: path,
                    id: id,
                    fields: fields,
                    accessToken: accessToken
                  }));

                case 5:
                case "end":
                  return _context21.stop();
              }
            }
          }, _callee21, this);
        }));

        function get(_x16) {
          return _get2.apply(this, arguments);
        }

        return get;
      }()
    }, {
      key: "gets",
      value: function () {
        var _gets2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee22(_ref46) {
          var path, fields, accessToken;
          return regenerator.wrap(function _callee22$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  path = _ref46.path, fields = _ref46.fields;
                  _context22.next = 3;
                  return this.getAccessToken();

                case 3:
                  accessToken = _context22.sent;
                  return _context22.abrupt("return", _gets({
                    path: path,
                    fields: fields,
                    accessToken: accessToken
                  }));

                case 5:
                case "end":
                  return _context22.stop();
              }
            }
          }, _callee22, this);
        }));

        function gets(_x17) {
          return _gets2.apply(this, arguments);
        }

        return gets;
      }()
    }, {
      key: "create",
      value: function () {
        var _create2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee23(_ref47) {
          var path, fields, data, accessToken;
          return regenerator.wrap(function _callee23$(_context23) {
            while (1) {
              switch (_context23.prev = _context23.next) {
                case 0:
                  path = _ref47.path, fields = _ref47.fields, data = _ref47.data;
                  _context23.next = 3;
                  return this.getAccessToken();

                case 3:
                  accessToken = _context23.sent;
                  return _context23.abrupt("return", _create({
                    path: path,
                    fields: fields,
                    data: data,
                    accessToken: accessToken
                  }));

                case 5:
                case "end":
                  return _context23.stop();
              }
            }
          }, _callee23, this);
        }));

        function create(_x18) {
          return _create2.apply(this, arguments);
        }

        return create;
      }()
    }, {
      key: "update",
      value: function () {
        var _update2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee24(_ref48) {
          var path, id, fields, etag, data, accessToken;
          return regenerator.wrap(function _callee24$(_context24) {
            while (1) {
              switch (_context24.prev = _context24.next) {
                case 0:
                  path = _ref48.path, id = _ref48.id, fields = _ref48.fields, etag = _ref48.etag, data = _ref48.data;
                  _context24.next = 3;
                  return this.getAccessToken();

                case 3:
                  accessToken = _context24.sent;
                  return _context24.abrupt("return", _update({
                    path: path,
                    id: id,
                    fields: fields,
                    data: data,
                    etag: etag,
                    accessToken: accessToken
                  }));

                case 5:
                case "end":
                  return _context24.stop();
              }
            }
          }, _callee24, this);
        }));

        function update(_x19) {
          return _update2.apply(this, arguments);
        }

        return update;
      }()
    }, {
      key: "remove",
      value: function () {
        var _remove2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee25(_ref49) {
          var path, id, accessToken;
          return regenerator.wrap(function _callee25$(_context25) {
            while (1) {
              switch (_context25.prev = _context25.next) {
                case 0:
                  path = _ref49.path, id = _ref49.id;
                  _context25.next = 3;
                  return this.getAccessToken();

                case 3:
                  accessToken = _context25.sent;
                  return _context25.abrupt("return", _remove({
                    path: path,
                    id: id,
                    accessToken: accessToken
                  }));

                case 5:
                case "end":
                  return _context25.stop();
              }
            }
          }, _callee25, this);
        }));

        function remove(_x20) {
          return _remove2.apply(this, arguments);
        }

        return remove;
      }()
    }, {
      key: "getEntity",
      value: function () {
        var _getEntity = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee26(type, id) {
          var fields,
              properties,
              _args26 = arguments;
          return regenerator.wrap(function _callee26$(_context26) {
            while (1) {
              switch (_context26.prev = _context26.next) {
                case 0:
                  fields = _args26.length > 2 && _args26[2] !== undefined ? _args26[2] : null;
                  _context26.next = 3;
                  return this.get({
                    path: type,
                    id: id,
                    fields: fields
                  });

                case 3:
                  properties = _context26.sent;
                  return _context26.abrupt("return", new ClioEntity(this, {
                    properties: properties,
                    fields: fields,
                    id: id,
                    type: type
                  }));

                case 5:
                case "end":
                  return _context26.stop();
              }
            }
          }, _callee26, this);
        }));

        function getEntity(_x21, _x22) {
          return _getEntity.apply(this, arguments);
        }

        return getEntity;
      }()
    }, {
      key: "withAccessToken",
      value: function () {
        var _withAccessToken = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee27(request) {
          var accessToken, headers;
          return regenerator.wrap(function _callee27$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  _context27.next = 2;
                  return this.getAccessToken();

                case 2:
                  accessToken = _context27.sent;
                  headers = {
                    Authorization: "Bearer ".concat(accessToken)
                  };
                  request.headers = request.headers ? _objectSpread({}, request.headers, {}, headers) : headers;
                  return _context27.abrupt("return", request);

                case 6:
                case "end":
                  return _context27.stop();
              }
            }
          }, _callee27, this);
        }));

        function withAccessToken(_x23) {
          return _withAccessToken.apply(this, arguments);
        }

        return withAccessToken;
      }()
    }, {
      key: "getPage",
      value: function () {
        var _getPage = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee28(_ref50) {
          var _this = this;

          var url, path, fields, args, promise, _ref51, _ref51$meta, _ref51$meta$paging, next, previous, data;

          return regenerator.wrap(function _callee28$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  url = _ref50.url, path = _ref50.path, fields = _ref50.fields, args = objectWithoutProperties(_ref50, ["url", "path", "fields"]);
                  promise = url ? this.getUrl({
                    url: url
                  }) : this.gets(_objectSpread({
                    path: path,
                    fields: fields
                  }, args));
                  _context28.next = 4;
                  return promise;

                case 4:
                  _ref51 = _context28.sent;
                  _ref51$meta = _ref51.meta;
                  _ref51$meta = _ref51$meta === void 0 ? {} : _ref51$meta;
                  _ref51$meta$paging = _ref51$meta.paging;
                  _ref51$meta$paging = _ref51$meta$paging === void 0 ? {} : _ref51$meta$paging;
                  next = _ref51$meta$paging.next, previous = _ref51$meta$paging.previous, data = _ref51.data;
                  return _context28.abrupt("return", {
                    page: data,
                    getNext: next && function () {
                      return _this.getPage({
                        url: next,
                        path: path,
                        fields: fields
                      });
                    },
                    getPrevious: previous && function () {
                      return _this.getPage({
                        url: previous,
                        path: path,
                        fields: fields
                      });
                    }
                  });

                case 11:
                case "end":
                  return _context28.stop();
              }
            }
          }, _callee28, this);
        }));

        function getPage(_x24) {
          return _getPage.apply(this, arguments);
        }

        return getPage;
      }()
    }, {
      key: "map",
      value: function () {
        var _map = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee29(_ref52, f) {
          var path, fields, isSequential, args, obj, out, _obj, page, getNext, temp, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, o, t;

          return regenerator.wrap(function _callee29$(_context29) {
            while (1) {
              switch (_context29.prev = _context29.next) {
                case 0:
                  path = _ref52.path, fields = _ref52.fields, isSequential = _ref52.isSequential, args = objectWithoutProperties(_ref52, ["path", "fields", "isSequential"]);

                  if (path) {
                    _context29.next = 3;
                    break;
                  }

                  throw "Path is required for map";

                case 3:
                  _context29.next = 5;
                  return this.getPage(_objectSpread({
                    path: path,
                    fields: fields
                  }, args));

                case 5:
                  obj = _context29.sent;
                  out = [];

                case 7:
                  if (!obj) {
                    _context29.next = 54;
                    break;
                  }

                  _obj = obj, page = _obj.page, getNext = _obj.getNext;
                  temp = [];

                  if (!isSequential) {
                    _context29.next = 41;
                    break;
                  }

                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context29.prev = 14;
                  _iterator = page[Symbol.iterator]();

                case 16:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context29.next = 25;
                    break;
                  }

                  o = _step.value;
                  _context29.next = 20;
                  return f(o);

                case 20:
                  t = _context29.sent;
                  temp.push(t);

                case 22:
                  _iteratorNormalCompletion = true;
                  _context29.next = 16;
                  break;

                case 25:
                  _context29.next = 31;
                  break;

                case 27:
                  _context29.prev = 27;
                  _context29.t0 = _context29["catch"](14);
                  _didIteratorError = true;
                  _iteratorError = _context29.t0;

                case 31:
                  _context29.prev = 31;
                  _context29.prev = 32;

                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }

                case 34:
                  _context29.prev = 34;

                  if (!_didIteratorError) {
                    _context29.next = 37;
                    break;
                  }

                  throw _iteratorError;

                case 37:
                  return _context29.finish(34);

                case 38:
                  return _context29.finish(31);

                case 39:
                  _context29.next = 44;
                  break;

                case 41:
                  _context29.next = 43;
                  return Promise.all(page.map(f));

                case 43:
                  temp = _context29.sent;

                case 44:
                  out = [].concat(toConsumableArray(out), toConsumableArray(temp));

                  if (!getNext) {
                    _context29.next = 51;
                    break;
                  }

                  _context29.next = 48;
                  return getNext();

                case 48:
                  obj = _context29.sent;
                  _context29.next = 52;
                  break;

                case 51:
                  obj = null;

                case 52:
                  _context29.next = 7;
                  break;

                case 54:
                  return _context29.abrupt("return", out);

                case 55:
                case "end":
                  return _context29.stop();
              }
            }
          }, _callee29, this, [[14, 27, 31, 39], [32,, 34, 38]]);
        }));

        function map(_x25, _x26) {
          return _map.apply(this, arguments);
        }

        return map;
      }()
    }, {
      key: "getAll",
      value: function () {
        var _getAll = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee30(_ref53) {
          var path, fields, args;
          return regenerator.wrap(function _callee30$(_context30) {
            while (1) {
              switch (_context30.prev = _context30.next) {
                case 0:
                  path = _ref53.path, fields = _ref53.fields, args = objectWithoutProperties(_ref53, ["path", "fields"]);

                  if (path) {
                    _context30.next = 3;
                    break;
                  }

                  throw "Path is required for getAll";

                case 3:
                  return _context30.abrupt("return", this.map(_objectSpread({
                    path: path,
                    fields: fields
                  }, args), function (o) {
                    return o;
                  }));

                case 4:
                case "end":
                  return _context30.stop();
              }
            }
          }, _callee30, this);
        }));

        function getAll(_x27) {
          return _getAll.apply(this, arguments);
        }

        return getAll;
      }()
    }, {
      key: "bulkGetFile",
      value: function () {
        var _bulkGetFile2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee31(_ref54) {
          var path, fields, outPath, onProgress, accessToken;
          return regenerator.wrap(function _callee31$(_context31) {
            while (1) {
              switch (_context31.prev = _context31.next) {
                case 0:
                  path = _ref54.path, fields = _ref54.fields, outPath = _ref54.outPath, onProgress = _ref54.onProgress;

                  if (path) {
                    _context31.next = 3;
                    break;
                  }

                  throw "Path is required for bulkGetFile";

                case 3:
                  _context31.next = 5;
                  return this.getAccessToken();

                case 5:
                  accessToken = _context31.sent;
                  return _context31.abrupt("return", _bulkGetFile({
                    path: path,
                    fields: fields,
                    accessToken: accessToken,
                    outPath: outPath,
                    onProgress: onProgress
                  }));

                case 7:
                case "end":
                  return _context31.stop();
              }
            }
          }, _callee31, this);
        }));

        function bulkGetFile(_x28) {
          return _bulkGetFile2.apply(this, arguments);
        }

        return bulkGetFile;
      }()
    }, {
      key: "bulkGetObj",
      value: function () {
        var _bulkGetObj2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee32(_ref55) {
          var path, fields, onProgress, outPath, accessToken;
          return regenerator.wrap(function _callee32$(_context32) {
            while (1) {
              switch (_context32.prev = _context32.next) {
                case 0:
                  path = _ref55.path, fields = _ref55.fields, onProgress = _ref55.onProgress, outPath = _ref55.outPath;

                  if (path) {
                    _context32.next = 3;
                    break;
                  }

                  throw "Path is required for bulkGetFile";

                case 3:
                  _context32.next = 5;
                  return this.getAccessToken();

                case 5:
                  accessToken = _context32.sent;
                  return _context32.abrupt("return", _bulkGetObj({
                    path: path,
                    fields: fields,
                    accessToken: accessToken,
                    outPath: outPath,
                    onProgress: onProgress
                  }));

                case 7:
                case "end":
                  return _context32.stop();
              }
            }
          }, _callee32, this);
        }));

        function bulkGetObj(_x29) {
          return _bulkGetObj2.apply(this, arguments);
        }

        return bulkGetObj;
      }()
    }, {
      key: "mapEntities",
      value: function () {
        var _mapEntities = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee33(_ref56, f) {
          var path, fields, getNextPage, _getNextPage, page, getNext;

          return regenerator.wrap(function _callee33$(_context33) {
            while (1) {
              switch (_context33.prev = _context33.next) {
                case 0:
                  path = _ref56.path, fields = _ref56.fields;
                  _context33.next = 3;
                  return this.getPageEntities({
                    path: path,
                    fields: fields
                  });

                case 3:
                  getNextPage = _context33.sent;

                case 4:
                  if (!getNextPage) {
                    _context33.next = 11;
                    break;
                  }

                  _getNextPage = getNextPage(), page = _getNextPage.page, getNext = _getNextPage.getNext;
                  _context33.next = 8;
                  return Promise.all(page.map(f));

                case 8:
                  getNextPage = getNext;
                  _context33.next = 4;
                  break;

                case 11:
                case "end":
                  return _context33.stop();
              }
            }
          }, _callee33, this);
        }));

        function mapEntities(_x30, _x31) {
          return _mapEntities.apply(this, arguments);
        }

        return mapEntities;
      }()
    }, {
      key: "mapEntities2",
      value: function () {
        var _mapEntities2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee34(_ref57, f) {
          var _this2 = this;

          var path, fields, args;
          return regenerator.wrap(function _callee34$(_context34) {
            while (1) {
              switch (_context34.prev = _context34.next) {
                case 0:
                  path = _ref57.path, fields = _ref57.fields, args = objectWithoutProperties(_ref57, ["path", "fields"]);
                  return _context34.abrupt("return", this.map(_objectSpread({
                    fields: fields,
                    path: path
                  }, args), function (properties) {
                    var entity = new ClioEntity(_this2, {
                      fields: fields,
                      type: path,
                      properties: properties
                    });
                    return f(entity);
                  }));

                case 2:
                case "end":
                  return _context34.stop();
              }
            }
          }, _callee34, this);
        }));

        function mapEntities2(_x32, _x33) {
          return _mapEntities2.apply(this, arguments);
        }

        return mapEntities2;
      }()
    }, {
      key: "getPageEntities",
      value: function () {
        var _getPageEntities = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee35(_ref58) {
          var url, path, fields, _ref59, page, getNext, getPrevious;

          return regenerator.wrap(function _callee35$(_context35) {
            while (1) {
              switch (_context35.prev = _context35.next) {
                case 0:
                  url = _ref58.url, path = _ref58.path, fields = _ref58.fields;
                  _context35.next = 3;
                  return this.getPage({
                    url: url,
                    path: path,
                    fields: fields
                  });

                case 3:
                  _ref59 = _context35.sent;
                  page = _ref59.page;
                  getNext = _ref59.getNext;
                  getPrevious = _ref59.getPrevious;
                  return _context35.abrupt("return", this.withEntities({
                    page: page,
                    getNext: getNext,
                    getPrevious: getPrevious,
                    path: path,
                    fields: fields
                  }));

                case 8:
                case "end":
                  return _context35.stop();
              }
            }
          }, _callee35, this);
        }));

        function getPageEntities(_x34) {
          return _getPageEntities.apply(this, arguments);
        }

        return getPageEntities;
      }()
    }, {
      key: "withEntities",
      value: function () {
        var _withEntities = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee38(_ref60) {
          var _this3 = this;

          var page, getNext, getPrevious, path, fields, entities;
          return regenerator.wrap(function _callee38$(_context38) {
            while (1) {
              switch (_context38.prev = _context38.next) {
                case 0:
                  page = _ref60.page, getNext = _ref60.getNext, getPrevious = _ref60.getPrevious, path = _ref60.path, fields = _ref60.fields;
                  //convert page elements to entities
                  entities = page.map(function (properties) {
                    return _this3.makeEntity(_this3, {
                      fields: fields,
                      properties: properties,
                      type: path
                    });
                  });
                  return _context38.abrupt("return", {
                    page: entities,
                    raw: page,
                    getNext: getNext &&
                    /*#__PURE__*/
                    asyncToGenerator(
                    /*#__PURE__*/
                    regenerator.mark(function _callee36() {
                      var _ref62, page, getNext, getPrevious;

                      return regenerator.wrap(function _callee36$(_context36) {
                        while (1) {
                          switch (_context36.prev = _context36.next) {
                            case 0:
                              _context36.next = 2;
                              return getNext();

                            case 2:
                              _ref62 = _context36.sent;
                              page = _ref62.page;
                              getNext = _ref62.getNext;
                              getPrevious = _ref62.getPrevious;
                              return _context36.abrupt("return", _this3.withEntities({
                                page: page,
                                getNext: getNext,
                                getPrevious: getPrevious,
                                path: path,
                                fields: fields
                              }));

                            case 7:
                            case "end":
                              return _context36.stop();
                          }
                        }
                      }, _callee36);
                    })),
                    getPrevious: getPrevious &&
                    /*#__PURE__*/
                    asyncToGenerator(
                    /*#__PURE__*/
                    regenerator.mark(function _callee37() {
                      var _ref64, page, getNext, getPrevious;

                      return regenerator.wrap(function _callee37$(_context37) {
                        while (1) {
                          switch (_context37.prev = _context37.next) {
                            case 0:
                              _context37.next = 2;
                              return getPrevious();

                            case 2:
                              _ref64 = _context37.sent;
                              page = _ref64.page;
                              getNext = _ref64.getNext;
                              getPrevious = _ref64.getPrevious;
                              return _context37.abrupt("return", _this3.withEntities({
                                page: page,
                                getNext: getNext,
                                getPrevious: getPrevious,
                                path: path,
                                fields: fields
                              }));

                            case 7:
                            case "end":
                              return _context37.stop();
                          }
                        }
                      }, _callee37);
                    }))
                  });

                case 3:
                case "end":
                  return _context38.stop();
              }
            }
          }, _callee38);
        }));

        function withEntities(_x35) {
          return _withEntities.apply(this, arguments);
        }

        return withEntities;
      }()
    }, {
      key: "getUrl",
      value: function () {
        var _getUrl = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee39(_ref65) {
          var url, request, res;
          return regenerator.wrap(function _callee39$(_context39) {
            while (1) {
              switch (_context39.prev = _context39.next) {
                case 0:
                  url = _ref65.url, request = _ref65.request;
                  if (!request) request = {};
                  _context39.next = 4;
                  return this.withAccessToken(request);

                case 4:
                  request = _context39.sent;
                  _context39.next = 7;
                  return fetch(url, request);

                case 7:
                  res = _context39.sent;
                  return _context39.abrupt("return", getResult(res));

                case 9:
                case "end":
                  return _context39.stop();
              }
            }
          }, _callee39, this);
        }));

        function getUrl(_x36) {
          return _getUrl.apply(this, arguments);
        }

        return getUrl;
      }()
    }, {
      key: "makeCustomAction",
      value: function () {
        var _makeCustomAction = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee40(_ref66) {
          var label, targetUrl, uiReference, type, _ref67, _ref67$data, id, etag, created_at, updated_at, newLabel, target_url, ui_reference;

          return regenerator.wrap(function _callee40$(_context40) {
            while (1) {
              switch (_context40.prev = _context40.next) {
                case 0:
                  label = _ref66.label, targetUrl = _ref66.targetUrl, uiReference = _ref66.uiReference, type = _ref66.type;
                  if (type) uiReference = "".concat(type, "/show");

                  if (uiReference) {
                    _context40.next = 4;
                    break;
                  }

                  throw "uiReference is required";

                case 4:
                  if (label) {
                    _context40.next = 6;
                    break;
                  }

                  throw "label is required";

                case 6:
                  if (targetUrl) {
                    _context40.next = 8;
                    break;
                  }

                  throw "targeUrl is required";

                case 8:
                  _context40.next = 10;
                  return this.create({
                    path: "custom_actions",
                    fields: ["label", "target_url", "ui_reference", "id", "etag", "created_at", "updated_at"],
                    data: {
                      label: label,
                      target_url: targetUrl,
                      ui_reference: uiReference
                    }
                  });

                case 10:
                  _ref67 = _context40.sent;
                  _ref67$data = _ref67.data;
                  id = _ref67$data.id;
                  etag = _ref67$data.etag;
                  created_at = _ref67$data.created_at;
                  updated_at = _ref67$data.updated_at;
                  newLabel = _ref67$data.label;
                  target_url = _ref67$data.target_url;
                  ui_reference = _ref67$data.ui_reference;
                  return _context40.abrupt("return", {
                    id: id,
                    etag: etag,
                    createdAt: created_at,
                    updatedAt: updated_at,
                    label: newLabel,
                    targetUrl: target_url,
                    uiReference: ui_reference
                  });

                case 20:
                case "end":
                  return _context40.stop();
              }
            }
          }, _callee40, this);
        }));

        function makeCustomAction(_x37) {
          return _makeCustomAction.apply(this, arguments);
        }

        return makeCustomAction;
      }()
    }, {
      key: "makeWebHook",
      value: function () {
        var _makeWebHook2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee41(_ref68) {
          var url, fields, events, model, expires, accessToken;
          return regenerator.wrap(function _callee41$(_context41) {
            while (1) {
              switch (_context41.prev = _context41.next) {
                case 0:
                  url = _ref68.url, fields = _ref68.fields, events = _ref68.events, model = _ref68.model, expires = _ref68.expires;
                  _context41.next = 3;
                  return this.getAccessToken();

                case 3:
                  accessToken = _context41.sent;
                  _context41.next = 6;
                  return _makeWebHook({
                    url: url,
                    fields: fields,
                    events: events,
                    model: model,
                    expires: expires,
                    accessToken: accessToken
                  });

                case 6:
                  return _context41.abrupt("return", _context41.sent);

                case 7:
                case "end":
                  return _context41.stop();
              }
            }
          }, _callee41, this);
        }));

        function makeWebHook(_x38) {
          return _makeWebHook2.apply(this, arguments);
        }

        return makeWebHook;
      }()
    }, {
      key: "makeEntity",
      value: function () {
        var _makeEntity = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee42(_ref69) {
          var type, id, fields, properties;
          return regenerator.wrap(function _callee42$(_context42) {
            while (1) {
              switch (_context42.prev = _context42.next) {
                case 0:
                  type = _ref69.type, id = _ref69.id, fields = _ref69.fields, properties = _ref69.properties;
                  return _context42.abrupt("return", new ClioEntity(this, {
                    type: type,
                    id: id,
                    fields: fields,
                    properties: properties
                  }));

                case 2:
                case "end":
                  return _context42.stop();
              }
            }
          }, _callee42, this);
        }));

        function makeEntity(_x39) {
          return _makeEntity.apply(this, arguments);
        }

        return makeEntity;
      }()
    }, {
      key: "clear",
      value: function () {
        var _clear = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee43(path) {
          var os, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, id;

          return regenerator.wrap(function _callee43$(_context43) {
            while (1) {
              switch (_context43.prev = _context43.next) {
                case 0:
                  console.log("I am starting clear", path);
                  _context43.next = 3;
                  return this.getAll({
                    path: path
                  });

                case 3:
                  os = _context43.sent;
                  console.log("I got my os");
                  console.log(os);
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  _context43.prev = 9;
                  _iterator2 = os[Symbol.iterator]();

                case 11:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    _context43.next = 25;
                    break;
                  }

                  id = _step2.value.id;
                  console.log("Removing", id);
                  _context43.prev = 14;
                  _context43.next = 17;
                  return this.remove({
                    path: path,
                    id: id
                  });

                case 17:
                  _context43.next = 22;
                  break;

                case 19:
                  _context43.prev = 19;
                  _context43.t0 = _context43["catch"](14);
                  console.log(_context43.t0);

                case 22:
                  _iteratorNormalCompletion2 = true;
                  _context43.next = 11;
                  break;

                case 25:
                  _context43.next = 31;
                  break;

                case 27:
                  _context43.prev = 27;
                  _context43.t1 = _context43["catch"](9);
                  _didIteratorError2 = true;
                  _iteratorError2 = _context43.t1;

                case 31:
                  _context43.prev = 31;
                  _context43.prev = 32;

                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                  }

                case 34:
                  _context43.prev = 34;

                  if (!_didIteratorError2) {
                    _context43.next = 37;
                    break;
                  }

                  throw _iteratorError2;

                case 37:
                  return _context43.finish(34);

                case 38:
                  return _context43.finish(31);

                case 39:
                  console.log("Done with clear");

                case 40:
                case "end":
                  return _context43.stop();
              }
            }
          }, _callee43, this, [[9, 27, 31, 39], [14, 19], [32,, 34, 38]]);
        }));

        function clear(_x40) {
          return _clear.apply(this, arguments);
        }

        return clear;
      }()
    }]);

    return Clio;
  }(); //#endregion
  //#region ClioEntity Class


  var ClioEntity =
  /*#__PURE__*/
  function () {
    function ClioEntity(clio, _ref70) {
      var etag = _ref70.etag,
          id = _ref70.id,
          properties = _ref70.properties,
          fields = _ref70.fields,
          type = _ref70.type;

      classCallCheck(this, ClioEntity);

      this.clio = clio;
      this.properties = properties;
      if (fields) this.fields = fields;
      this.type = type;
      this.id = id ? id : properties.id;
      this.etag = etag ? etag : properties.etag;
    }

    createClass(ClioEntity, [{
      key: "load",
      value: function () {
        var _load2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee44() {
          var _ref71, etag, properties;

          return regenerator.wrap(function _callee44$(_context44) {
            while (1) {
              switch (_context44.prev = _context44.next) {
                case 0:
                  _context44.next = 2;
                  return this.clio.get({
                    type: this.type,
                    id: this.id,
                    fields: this.fields
                  });

                case 2:
                  _ref71 = _context44.sent;
                  etag = _ref71.etag;
                  properties = objectWithoutProperties(_ref71, ["etag"]);
                  this.etag = etag;
                  this.properties = properties;
                  return _context44.abrupt("return", this);

                case 8:
                case "end":
                  return _context44.stop();
              }
            }
          }, _callee44, this);
        }));

        function load() {
          return _load2.apply(this, arguments);
        }

        return load;
      }()
    }, {
      key: "update",
      value: function () {
        var _update3 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee45(changes) {
          var ret;
          return regenerator.wrap(function _callee45$(_context45) {
            while (1) {
              switch (_context45.prev = _context45.next) {
                case 0:
                  _context45.next = 2;
                  return this.clio.update({
                    path: this.type,
                    id: this.id,
                    data: changes,
                    etag: this.etag
                  });

                case 2:
                  ret = _context45.sent;
                  this.properties = _objectSpread({}, this.properties, {
                    ret: ret
                  });
                  this.etag = ret.etag;

                case 5:
                case "end":
                  return _context45.stop();
              }
            }
          }, _callee45, this);
        }));

        function update(_x41) {
          return _update3.apply(this, arguments);
        }

        return update;
      }()
    }, {
      key: "delete",
      value: function () {
        var _delete2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee46() {
          return regenerator.wrap(function _callee46$(_context46) {
            while (1) {
              switch (_context46.prev = _context46.next) {
                case 0:
                  return _context46.abrupt("return", this.clio.remove({
                    path: this.type,
                    id: this.id
                  }));

                case 1:
                case "end":
                  return _context46.stop();
              }
            }
          }, _callee46, this);
        }));

        function _delete() {
          return _delete2.apply(this, arguments);
        }

        return _delete;
      }()
    }]);

    return ClioEntity;
  }(); //#endregion

  exports.Clio = Clio;
  exports.ClioEntity = ClioEntity;
  exports.authorize = _authorize;
  exports.baseHost = baseHost;
  exports.create = _create;
  exports.deauthorize = _deauthorize;
  exports.get = _get;
  exports.getAccessToken = _getAccessToken;
  exports.gets = _gets;
  exports.makeFields = makeFields;
  exports.makeWebHook = _makeWebHook;
  exports.remove = _remove;
  exports.update = _update;
  exports.validateSignature = validateSignature;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map

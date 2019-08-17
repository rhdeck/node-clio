import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _typeof from '@babel/runtime/helpers/typeof';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { createHmac } from 'crypto';
import { createWriteStream, readFile } from 'fs';
import { promisify } from 'util';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

var baseHost = "https://app.clio.com";
var baseUrl = baseHost + "/api/v4";

var getResult =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(ret) {
    var text, obj;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(_ref2) {
    var clientId, clientSecret, code, redirectUri, body, res, text, obj, access_token, refresh_token, expires_in;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            clientId = _ref2.clientId, clientSecret = _ref2.clientSecret, code = _ref2.code, redirectUri = _ref2.redirectUri;
            body = new URLSearchParams({
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
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(_ref4) {
    var accessToken, headers, url;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
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
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee4(_ref6) {
    var clientId, clientSecret, refreshToken, body, res, text, _JSON$parse, access_token, refresh_token, expires_in;

    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            clientId = _ref6.clientId, clientSecret = _ref6.clientSecret, refreshToken = _ref6.refreshToken;
            body = new URLSearchParams({
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

    if (_typeof(field) === "object") {
      var fieldName = field.field,
          _fields = field.fields;
      return "".concat(fieldName, "{").concat(_fields, "}");
    }
  }).join(",");
};

var _gets =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee5(_ref8) {
    var path, fields, accessToken, headers, args, url, ret;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            path = _ref8.path, fields = _ref8.fields, accessToken = _ref8.accessToken, headers = _ref8.headers, args = _objectWithoutProperties(_ref8, ["path", "fields", "accessToken", "headers"]);
            headers = _objectSpread({}, headers || {}, {
              Authorization: "Bearer ".concat(accessToken)
            });
            url = new URL(baseUrl);
            url.pathname = "".concat(url.pathname, "/").concat(path, ".json");
            if (fields) url.searchParams.append("fields", makeFields(fields));
            Object.entries(args).forEach(function (_ref10) {
              var _ref11 = _slicedToArray(_ref10, 2),
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
  var _ref13 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee6(_ref12) {
    var path, fields, accessToken, onProgress, args, headers, url, ret, pollCheckURL, doCheck, _ret, text, obj;

    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            path = _ref12.path, fields = _ref12.fields, accessToken = _ref12.accessToken, onProgress = _ref12.onProgress, args = _objectWithoutProperties(_ref12, ["path", "fields", "accessToken", "onProgress"]);
            headers = {
              "X-BULK": "true",
              Authorization: "Bearer ".concat(accessToken)
            }; //Kick off the bulk fetch

            url = new URL(baseUrl);
            url.pathname = "".concat(url.pathname, "/").concat(path, ".json");
            if (fields) url.searchParams.append("fields", makeFields(fields));
            Object.entries(args).forEach(function (_ref14) {
              var _ref15 = _slicedToArray(_ref14, 2),
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
  var _ref17 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee7(_ref16) {
    var path, fields, accessToken, onProgress, outPath, ret;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
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
            return promisify(readFile)(outPath);

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
  var _ref19 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee8(_ref18) {
    var path, fields, accessToken, onProgress, outPath, ret;
    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
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
              ret.body.pipe(createWriteStream(outPath));
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
  var _ref21 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee9(_ref20) {
    var path, fields, accessToken, onProgress, outPath, text;
    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
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
  var _ref23 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee10(_ref22) {
    var url, fields, events, model, expires, accessToken, headers, whUrl, data, bodyObj, body, ret, text, obj;
    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            url = _ref22.url, fields = _ref22.fields, events = _ref22.events, model = _ref22.model, expires = _ref22.expires, accessToken = _ref22.accessToken;
            headers = _defineProperty({
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
  var cipher = createHmac("sha256", secret);
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
  var _ref26 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee11(_ref25) {
    var path, fields, data, tempBody, accessToken, args, url, headers, body, ret;
    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            path = _ref25.path, fields = _ref25.fields, data = _ref25.data, tempBody = _ref25.body, accessToken = _ref25.accessToken, args = _objectWithoutProperties(_ref25, ["path", "fields", "data", "body", "accessToken"]);
            url = new URL(baseUrl);
            headers = {
              Authorization: "Bearer ".concat(accessToken),
              "Content-Type": "application/json"
            };
            url.pathname = "".concat(url.pathname, "/").concat(path, ".json");
            if (fields) url.searchParams.append("fields", makeFields(fields));
            Object.entries(args).forEach(function (_ref27) {
              var _ref28 = _slicedToArray(_ref27, 2),
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
  var _ref30 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee12(_ref29) {
    var path, id, fields, accessToken, args, headers, url, ret;
    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            path = _ref29.path, id = _ref29.id, fields = _ref29.fields, accessToken = _ref29.accessToken, args = _objectWithoutProperties(_ref29, ["path", "id", "fields", "accessToken"]);
            headers = {
              Authorization: "Bearer ".concat(accessToken)
            };
            url = new URL(baseUrl);
            url.pathname = "".concat(url.pathname, "/").concat(path, "/").concat(id, ".json");
            url.searchParams.append("fields", makeFields(fields));
            Object.entries(args).forEach(function (_ref31) {
              var _ref32 = _slicedToArray(_ref31, 2),
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
  var _ref34 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee13(_ref33) {
    var etag, path, id, fields, data, accessToken, args, headers, url, body, ret;
    return _regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            etag = _ref33.etag, path = _ref33.path, id = _ref33.id, fields = _ref33.fields, data = _ref33.data, accessToken = _ref33.accessToken, args = _objectWithoutProperties(_ref33, ["etag", "path", "id", "fields", "data", "accessToken"]);
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
              var _ref36 = _slicedToArray(_ref35, 2),
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
  var _ref38 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee14(_ref37) {
    var path, id, accessToken, args, headers, url, ret;
    return _regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            path = _ref37.path, id = _ref37.id, accessToken = _ref37.accessToken, args = _objectWithoutProperties(_ref37, ["path", "id", "accessToken"]);
            headers = {
              Authorization: "Bearer ".concat(accessToken)
            };
            url = new URL(baseUrl);
            url.pathname = "".concat(url.pathname, "/").concat(path, "/").concat(id, ".json");
            Object.entries(args).forEach(function (_ref39) {
              var _ref40 = _slicedToArray(_ref39, 2),
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

    _classCallCheck(this, Clio);

    // if (!clientId || !clientSecret)
    //   throw "Clio must be initialized with a clientId and a clientSecret";
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    if (onNewRefreshToken) this.onNewRefreshToken = onNewRefreshToken;
  }

  _createClass(Clio, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15() {
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
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
      var _authorize2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee16(_ref42) {
        var code, redirectUri, _ref43, refreshToken, accessToken;

        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
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
      var _deauthorize2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee17() {
        var accessToken;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
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
      var _getRefreshToken2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee18() {
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
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
      var _getRefreshToken3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee19() {
        return _regeneratorRuntime.wrap(function _callee19$(_context19) {
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
      var _getAccessToken2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee20() {
        var refreshToken, _ref44, accessToken, newToken;

        return _regeneratorRuntime.wrap(function _callee20$(_context20) {
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
      var _get2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee21(_ref45) {
        var path, id, fields, accessToken;
        return _regeneratorRuntime.wrap(function _callee21$(_context21) {
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
      var _gets2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee22(_ref46) {
        var path, fields, accessToken;
        return _regeneratorRuntime.wrap(function _callee22$(_context22) {
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
      var _create2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee23(_ref47) {
        var path, fields, data, accessToken;
        return _regeneratorRuntime.wrap(function _callee23$(_context23) {
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
      var _update2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee24(_ref48) {
        var path, id, fields, etag, data, accessToken;
        return _regeneratorRuntime.wrap(function _callee24$(_context24) {
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
      var _remove2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee25(_ref49) {
        var path, id, accessToken;
        return _regeneratorRuntime.wrap(function _callee25$(_context25) {
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
      var _getEntity = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee26(type, id) {
        var fields,
            properties,
            _args26 = arguments;
        return _regeneratorRuntime.wrap(function _callee26$(_context26) {
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
      var _withAccessToken = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee27(request) {
        var accessToken, headers;
        return _regeneratorRuntime.wrap(function _callee27$(_context27) {
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
      var _getPage = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee28(_ref50) {
        var _this = this;

        var url, path, fields, args, promise, _ref51, _ref51$meta, _ref51$meta$paging, next, previous, data;

        return _regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                url = _ref50.url, path = _ref50.path, fields = _ref50.fields, args = _objectWithoutProperties(_ref50, ["url", "path", "fields"]);
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
      var _map = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee29(_ref52, f) {
        var path, fields, isSequential, args, obj, out, _obj, page, getNext, temp, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, o, t;

        return _regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                path = _ref52.path, fields = _ref52.fields, isSequential = _ref52.isSequential, args = _objectWithoutProperties(_ref52, ["path", "fields", "isSequential"]);

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
                out = [].concat(_toConsumableArray(out), _toConsumableArray(temp));

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
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee30(_ref53) {
        var path, fields, args;
        return _regeneratorRuntime.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                path = _ref53.path, fields = _ref53.fields, args = _objectWithoutProperties(_ref53, ["path", "fields"]);

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
      var _bulkGetFile2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee31(_ref54) {
        var path, fields, outPath, onProgress, accessToken;
        return _regeneratorRuntime.wrap(function _callee31$(_context31) {
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
      var _bulkGetObj2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee32(_ref55) {
        var path, fields, onProgress, outPath, accessToken;
        return _regeneratorRuntime.wrap(function _callee32$(_context32) {
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
      var _mapEntities = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee33(_ref56, f) {
        var path, fields, getNextPage, _getNextPage, page, getNext;

        return _regeneratorRuntime.wrap(function _callee33$(_context33) {
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
      var _mapEntities2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee34(_ref57, f) {
        var _this2 = this;

        var path, fields, args;
        return _regeneratorRuntime.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                path = _ref57.path, fields = _ref57.fields, args = _objectWithoutProperties(_ref57, ["path", "fields"]);
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
      var _getPageEntities = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee35(_ref58) {
        var url, path, fields, _ref59, page, getNext, getPrevious;

        return _regeneratorRuntime.wrap(function _callee35$(_context35) {
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
      var _withEntities = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee38(_ref60) {
        var _this3 = this;

        var page, getNext, getPrevious, path, fields, entities;
        return _regeneratorRuntime.wrap(function _callee38$(_context38) {
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
                  _asyncToGenerator(
                  /*#__PURE__*/
                  _regeneratorRuntime.mark(function _callee36() {
                    var _ref62, page, getNext, getPrevious;

                    return _regeneratorRuntime.wrap(function _callee36$(_context36) {
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
                  _asyncToGenerator(
                  /*#__PURE__*/
                  _regeneratorRuntime.mark(function _callee37() {
                    var _ref64, page, getNext, getPrevious;

                    return _regeneratorRuntime.wrap(function _callee37$(_context37) {
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
      var _getUrl = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee39(_ref65) {
        var url, request, res;
        return _regeneratorRuntime.wrap(function _callee39$(_context39) {
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
      var _makeCustomAction = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee40(_ref66) {
        var label, targetUrl, uiReference, type, _ref67, _ref67$data, id, etag, created_at, updated_at, newLabel, target_url, ui_reference;

        return _regeneratorRuntime.wrap(function _callee40$(_context40) {
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
      var _makeWebHook2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee41(_ref68) {
        var url, fields, events, model, expires, accessToken;
        return _regeneratorRuntime.wrap(function _callee41$(_context41) {
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
      var _makeEntity = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee42(_ref69) {
        var type, id, fields, properties;
        return _regeneratorRuntime.wrap(function _callee42$(_context42) {
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
      var _clear = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee43(path) {
        var os, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, id;

        return _regeneratorRuntime.wrap(function _callee43$(_context43) {
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

    _classCallCheck(this, ClioEntity);

    this.clio = clio;
    this.properties = properties;
    if (fields) this.fields = fields;
    this.type = type;
    this.id = id ? id : properties.id;
    this.etag = etag ? etag : properties.etag;
  }

  _createClass(ClioEntity, [{
    key: "load",
    value: function () {
      var _load2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee44() {
        var _ref71, etag, properties;

        return _regeneratorRuntime.wrap(function _callee44$(_context44) {
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
                properties = _objectWithoutProperties(_ref71, ["etag"]);
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
      var _update3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee45(changes) {
        var ret;
        return _regeneratorRuntime.wrap(function _callee45$(_context45) {
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
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee46() {
        return _regeneratorRuntime.wrap(function _callee46$(_context46) {
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

export { Clio, ClioEntity, _authorize as authorize, baseHost, _create as create, _deauthorize as deauthorize, _get as get, _getAccessToken as getAccessToken, _gets as gets, makeFields, _makeWebHook as makeWebHook, _remove as remove, _update as update, validateSignature };
//# sourceMappingURL=index.esm.js.map

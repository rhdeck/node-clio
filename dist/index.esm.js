import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _typeof from '@babel/runtime/helpers/typeof';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import fetch from 'node-fetch';
import 'form-data';
import { URLSearchParams } from 'url';
import { createHmac } from 'crypto';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }


var baseUrl = "https://app.clio.com/api/v4";

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
            _context.next = 2;
            return ret.text();

          case 2:
            text = _context.sent;
            _context.prev = 3;
            obj = JSON.parse(text);

            if (!obj.error) {
              _context.next = 7;
              break;
            }

            throw JSON.stringify(obj.error);

          case 7:
            return _context.abrupt("return", obj);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            console.log("Hit error parsing result in getResult, probable error message");
            console.log(text);
            throw text;

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 10]]);
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
            return fetch("https://app.clio.com/oauth/token", {
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
            url = new URL("https://app.clio.com/oauth/deauthorize");
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
            return fetch("https://app.clio.com/oauth/token", {
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
      var fieldString = makeFields(_fields);
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
    var path, fields, accessToken, args, headers, url, ret;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            path = _ref8.path, fields = _ref8.fields, accessToken = _ref8.accessToken, args = _objectWithoutProperties(_ref8, ["path", "fields", "accessToken"]);
            headers = {
              Authorization: "Bearer ".concat(accessToken)
            };
            url = new URL(baseUrl);
            url.pathname = "".concat(url.pathname, "/").concat(path, ".json");
            url.searchParams.append("fields", makeFields(fields));
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

var _makeWebHook =
/*#__PURE__*/
function () {
  var _ref13 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee6(_ref12) {
    var url, fields, events, model, expires, accessToken, headers, whUrl, body, ret, text, obj;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            url = _ref12.url, fields = _ref12.fields, events = _ref12.events, model = _ref12.model, expires = _ref12.expires, accessToken = _ref12.accessToken;
            headers = {
              Authorization: "Bearer ".concat(accessToken)
            };
            whUrl = new URL("https://app.clio.com/api/v4/webhooks.json");
            body = {
              model: model
            };

            if (url) {
              _context6.next = 6;
              break;
            }

            throw "url is required";

          case 6:
            body.url = url;
            if (events) body.events = events;
            if (fields) body.fields = makeFields(fields);
            if (expires && !(expires instanceof Date)) expires = new Date(expires);
            if (expires) body.expires_at = expires.toISOString();
            _context6.next = 13;
            return fetch(whUrl, {
              method: "post",
              headers: headers,
              body: JSON.stringify(body)
            });

          case 13:
            ret = _context6.sent;
            _context6.next = 16;
            return ret.text();

          case 16:
            text = _context6.sent;
            _context6.prev = 17;
            obj = JSON.parse(text);
            return _context6.abrupt("return", obj);

          case 22:
            _context6.prev = 22;
            _context6.t0 = _context6["catch"](17);
            console.log("Hit error parsing result in makewebhook, probable error message");
            console.log(text);
            throw text;

          case 27:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[17, 22]]);
  }));

  return function makeWebHook(_x6) {
    return _ref13.apply(this, arguments);
  };
}();

var validateSignature = function validateSignature(_ref14) {
  var signature = _ref14.signature,
      secret = _ref14.secret,
      body = _ref14.body;
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
  var _ref16 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee7(_ref15) {
    var path, fields, data, tempBody, accessToken, args, url, headers, body, ret;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            path = _ref15.path, fields = _ref15.fields, data = _ref15.data, tempBody = _ref15.body, accessToken = _ref15.accessToken, args = _objectWithoutProperties(_ref15, ["path", "fields", "data", "body", "accessToken"]);
            url = new URL(baseUrl);
            headers = {
              Authorization: "Bearer ".concat(accessToken),
              "Content-Type": "application/json"
            };
            url.pathname = "".concat(url.pathname, "/").concat(path, ".json");
            if (fields) url.searchParams.append("fields", makeFields(fields));
            Object.entries(args).forEach(function (_ref17) {
              var _ref18 = _slicedToArray(_ref17, 2),
                  k = _ref18[0],
                  v = _ref18[1];

              return url.searchParams.append(k, v);
            });
            body = JSON.stringify(_objectSpread({
              data: data
            }, tempBody || {}));
            _context7.next = 9;
            return fetch(url, {
              method: "post",
              headers: headers,
              body: body
            });

          case 9:
            ret = _context7.sent;
            return _context7.abrupt("return", getResult(ret));

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function create(_x7) {
    return _ref16.apply(this, arguments);
  };
}();

var _get =
/*#__PURE__*/
function () {
  var _ref20 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee8(_ref19) {
    var path, id, fields, accessToken, args, headers, url, ret;
    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            path = _ref19.path, id = _ref19.id, fields = _ref19.fields, accessToken = _ref19.accessToken, args = _objectWithoutProperties(_ref19, ["path", "id", "fields", "accessToken"]);
            headers = {
              Authorization: "Bearer ".concat(accessToken)
            };
            url = new URL(baseUrl);
            url.pathname = "".concat(url.pathname, "/").concat(path, "/").concat(id, ".json");
            url.searchParams.append("fields", makeFields(fields));
            Object.entries(args).forEach(function (_ref21) {
              var _ref22 = _slicedToArray(_ref21, 2),
                  k = _ref22[0],
                  v = _ref22[1];

              return url.searchParams.append(k, v);
            });
            _context8.next = 8;
            return fetch(url, {
              method: "get",
              headers: headers
            });

          case 8:
            ret = _context8.sent;
            return _context8.abrupt("return", getResult(ret));

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function get(_x8) {
    return _ref20.apply(this, arguments);
  };
}();

var _update =
/*#__PURE__*/
function () {
  var _ref24 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee9(_ref23) {
    var etag, path, id, fields, data, accessToken, args, headers, url, body, ret;
    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            etag = _ref23.etag, path = _ref23.path, id = _ref23.id, fields = _ref23.fields, data = _ref23.data, accessToken = _ref23.accessToken, args = _objectWithoutProperties(_ref23, ["etag", "path", "id", "fields", "data", "accessToken"]);
            if (!etag) etag = data.etag;
            headers = {
              Authorization: "Bearer ".concat(accessToken),
              "IF-MATCH": etag,
              "Content-Type": "application/json"
            };
            url = new URL(baseUrl);
            url.pathname = "".concat(url.pathname, "/").concat(path, "/").concat(id, ".json");
            url.searchParams.append("fields", makeFields(fields));
            Object.entries(args).forEach(function (_ref25) {
              var _ref26 = _slicedToArray(_ref25, 2),
                  k = _ref26[0],
                  v = _ref26[1];

              return url.searchParams.append(k, v);
            });
            body = JSON.stringify({
              data: data
            });
            _context9.next = 10;
            return fetch(url, {
              method: "patch",
              body: body,
              headers: headers
            });

          case 10:
            ret = _context9.sent;
            return _context9.abrupt("return", getResult(ret));

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function update(_x9) {
    return _ref24.apply(this, arguments);
  };
}();

var _remove =
/*#__PURE__*/
function () {
  var _ref28 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee10(_ref27) {
    var path, id, accessToken, args, headers, url, ret;
    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            path = _ref27.path, id = _ref27.id, accessToken = _ref27.accessToken, args = _objectWithoutProperties(_ref27, ["path", "id", "accessToken"]);
            headers = {
              Authorization: "Bearer ".concat(accessToken)
            };
            url = new URL(baseUrl);
            url.pathname = "".concat(url.pathname, "/").concat(path, "/").concat(id, ".json");
            Object.entries(args).forEach(function (_ref29) {
              var _ref30 = _slicedToArray(_ref29, 2),
                  k = _ref30[0],
                  v = _ref30[1];

              return url.searchParams.append(k, v);
            });
            _context10.next = 7;
            return fetch(url, {
              method: "delete",
              headers: headers
            });

          case 7:
            ret = _context10.sent;
            return _context10.abrupt("return", getResult(ret));

          case 9:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function remove(_x10) {
    return _ref28.apply(this, arguments);
  };
}(); //#endregion
//#region Clio class


var Clio =
/*#__PURE__*/
function () {
  function Clio(_ref31) {
    var clientId = _ref31.clientId,
        clientSecret = _ref31.clientSecret,
        refreshToken = _ref31.refreshToken,
        accessToken = _ref31.accessToken,
        onNewRefreshToken = _ref31.onNewRefreshToken;

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
      _regeneratorRuntime.mark(function _callee11() {
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", this);

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
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
      _regeneratorRuntime.mark(function _callee12(_ref32) {
        var code, redirectUri, _ref33, refreshToken, accessToken;

        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                code = _ref32.code, redirectUri = _ref32.redirectUri;

                if (!(!code || !redirectUri)) {
                  _context12.next = 3;
                  break;
                }

                throw "Authorize requires a code and the redirectUri passed in the initial authorization request";

              case 3:
                _context12.next = 5;
                return _authorize({
                  clientId: this.clientId,
                  clientSecret: this.clientSecret,
                  code: code,
                  redirectUri: redirectUri
                });

              case 5:
                _ref33 = _context12.sent;
                refreshToken = _ref33.refreshToken;
                accessToken = _ref33.accessToken;

                if (!accessToken) {
                  _context12.next = 15;
                  break;
                }

                this.accessToken = accessToken;
                this.refreshToken = refreshToken;
                if (refreshToken && this.onNewRefreshToken) this.onNewRefreshToken(refreshToken);
                return _context12.abrupt("return", {
                  accessToken: accessToken,
                  refreshToken: refreshToken
                });

              case 15:
                throw "could not authorize with these credentials";

              case 16:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function authorize(_x11) {
        return _authorize2.apply(this, arguments);
      }

      return authorize;
    }()
  }, {
    key: "deauthorize",
    value: function () {
      var _deauthorize2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13() {
        var accessToken;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.getAccessToken();

              case 2:
                accessToken = _context13.sent;
                _context13.next = 5;
                return _deauthorize({
                  accessToken: accessToken
                });

              case 5:
                return _context13.abrupt("return", this.onNewRefreshToken(null));

              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
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
      _regeneratorRuntime.mark(function _callee14() {
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                return _context14.abrupt("return", this.refreshToken);

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
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
      _regeneratorRuntime.mark(function _callee15() {
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!this.refreshToken) {
                  _context15.next = 2;
                  break;
                }

                return _context15.abrupt("return", this.refreshToken);

              case 2:
                _context15.next = 4;
                return this.getRefreshToken();

              case 4:
                this.refreshToken = _context15.sent;
                return _context15.abrupt("return", this.refreshToken);

              case 6:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
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
      _regeneratorRuntime.mark(function _callee16() {
        var refreshToken, _ref34, accessToken, newToken;

        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (!this.accessToken) {
                  _context16.next = 2;
                  break;
                }

                return _context16.abrupt("return", this.accessToken);

              case 2:
                _context16.next = 4;
                return this._getRefreshToken();

              case 4:
                refreshToken = _context16.sent;

                if (refreshToken) {
                  _context16.next = 7;
                  break;
                }

                throw "Cannot get an access token without a refresh token";

              case 7:
                _context16.next = 9;
                return _getAccessToken({
                  clientId: this.clientId,
                  clientSecret: this.clientSecret,
                  refreshToken: refreshToken
                });

              case 9:
                _ref34 = _context16.sent;
                accessToken = _ref34.accessToken;
                newToken = _ref34.refreshToken;
                this.accessToken = accessToken;

                if (newToken) {
                  this.refreshToken = newToken;
                  if (this.onNewRefreshToken) this.onNewRefreshToken(newToken);
                }

                return _context16.abrupt("return", this.accessToken);

              case 15:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
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
      _regeneratorRuntime.mark(function _callee17(_ref35) {
        var path, id, fields, accessToken;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                path = _ref35.path, id = _ref35.id, fields = _ref35.fields;
                _context17.next = 3;
                return this.getAccessToken();

              case 3:
                accessToken = _context17.sent;
                return _context17.abrupt("return", _get({
                  path: path,
                  id: id,
                  fields: fields,
                  accessToken: accessToken
                }));

              case 5:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function get(_x12) {
        return _get2.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "gets",
    value: function () {
      var _gets2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee18(_ref36) {
        var path, fields, accessToken;
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                path = _ref36.path, fields = _ref36.fields;
                _context18.next = 3;
                return this.getAccessToken();

              case 3:
                accessToken = _context18.sent;
                return _context18.abrupt("return", _gets({
                  path: path,
                  fields: fields,
                  accessToken: accessToken
                }));

              case 5:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function gets(_x13) {
        return _gets2.apply(this, arguments);
      }

      return gets;
    }()
  }, {
    key: "create",
    value: function () {
      var _create2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee19(_ref37) {
        var path, fields, data, accessToken;
        return _regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                path = _ref37.path, fields = _ref37.fields, data = _ref37.data;
                _context19.next = 3;
                return this.getAccessToken();

              case 3:
                accessToken = _context19.sent;
                return _context19.abrupt("return", _create({
                  path: path,
                  fields: fields,
                  data: data,
                  accessToken: accessToken
                }));

              case 5:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function create(_x14) {
        return _create2.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee20(_ref38) {
        var path, id, fields, etag, data, accessToken;
        return _regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                path = _ref38.path, id = _ref38.id, fields = _ref38.fields, etag = _ref38.etag, data = _ref38.data;
                _context20.next = 3;
                return this.getAccessToken();

              case 3:
                accessToken = _context20.sent;
                return _context20.abrupt("return", _update({
                  path: path,
                  id: id,
                  fields: fields,
                  data: data,
                  etag: etag,
                  accessToken: accessToken
                }));

              case 5:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function update(_x15) {
        return _update2.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee21(_ref39) {
        var path, id, accessToken;
        return _regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                path = _ref39.path, id = _ref39.id;
                _context21.next = 3;
                return this.getAccessToken();

              case 3:
                accessToken = _context21.sent;
                return _context21.abrupt("return", _remove({
                  path: path,
                  id: id,
                  accessToken: accessToken
                }));

              case 5:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function remove(_x16) {
        return _remove2.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: "getEntity",
    value: function () {
      var _getEntity = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee22(type, id) {
        var fields,
            properties,
            _args22 = arguments;
        return _regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                fields = _args22.length > 2 && _args22[2] !== undefined ? _args22[2] : null;
                _context22.next = 3;
                return this.get({
                  path: type,
                  id: id,
                  fields: fields
                });

              case 3:
                properties = _context22.sent;
                return _context22.abrupt("return", new ClioEntity(this, {
                  properties: properties,
                  fields: fields,
                  id: id,
                  type: type
                }));

              case 5:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function getEntity(_x17, _x18) {
        return _getEntity.apply(this, arguments);
      }

      return getEntity;
    }()
  }, {
    key: "withAccessToken",
    value: function () {
      var _withAccessToken = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee23(request) {
        var accessToken, headers;
        return _regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return this.getAccessToken();

              case 2:
                accessToken = _context23.sent;
                headers = {
                  Authorization: "Bearer ".concat(accessToken)
                };
                request.headers = request.headers ? _objectSpread({}, request.headers, {}, headers) : headers;
                return _context23.abrupt("return", request);

              case 6:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function withAccessToken(_x19) {
        return _withAccessToken.apply(this, arguments);
      }

      return withAccessToken;
    }()
  }, {
    key: "getPage",
    value: function () {
      var _getPage = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee24(_ref40) {
        var _this = this;

        var url, path, fields, args, promise, _ref41, _ref41$meta, _ref41$meta$paging, next, previous, data;

        return _regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                url = _ref40.url, path = _ref40.path, fields = _ref40.fields, args = _objectWithoutProperties(_ref40, ["url", "path", "fields"]);
                promise = url ? this.getUrl({
                  url: url
                }) : this.gets(_objectSpread({
                  path: path,
                  fields: fields
                }, args));
                _context24.next = 4;
                return promise;

              case 4:
                _ref41 = _context24.sent;
                _ref41$meta = _ref41.meta;
                _ref41$meta = _ref41$meta === void 0 ? {} : _ref41$meta;
                _ref41$meta$paging = _ref41$meta.paging;
                _ref41$meta$paging = _ref41$meta$paging === void 0 ? {} : _ref41$meta$paging;
                next = _ref41$meta$paging.next, previous = _ref41$meta$paging.previous, data = _ref41.data;
                return _context24.abrupt("return", {
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
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function getPage(_x20) {
        return _getPage.apply(this, arguments);
      }

      return getPage;
    }()
  }, {
    key: "map",
    value: function () {
      var _map = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee25(_ref42, f) {
        var path, fields, args, obj, _obj, page, getNext;

        return _regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                path = _ref42.path, fields = _ref42.fields, args = _objectWithoutProperties(_ref42, ["path", "fields"]);
                _context25.next = 3;
                return this.getPage(_objectSpread({
                  path: path,
                  fields: fields
                }, args));

              case 3:
                obj = _context25.sent;

              case 4:
                if (!obj) {
                  _context25.next = 17;
                  break;
                }

                _obj = obj, page = _obj.page, getNext = _obj.getNext;
                _context25.next = 8;
                return Promise.all(page.map(f));

              case 8:
                if (!getNext) {
                  _context25.next = 14;
                  break;
                }

                _context25.next = 11;
                return getNext();

              case 11:
                obj = _context25.sent;
                _context25.next = 15;
                break;

              case 14:
                obj = null;

              case 15:
                _context25.next = 4;
                break;

              case 17:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function map(_x21, _x22) {
        return _map.apply(this, arguments);
      }

      return map;
    }()
  }, {
    key: "mapEntities",
    value: function () {
      var _mapEntities = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee26(_ref43, f) {
        var path, fields, _getNextPage, page, getNext;

        return _regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                path = _ref43.path, fields = _ref43.fields;
                _context26.next = 3;
                return getPageEntities({
                  path: path,
                  fields: fields
                });

              case 3:
                getNextPage = _context26.sent;

              case 4:
                if (!getNextPage) {
                  _context26.next = 11;
                  break;
                }

                _getNextPage = getNextPage(), page = _getNextPage.page, getNext = _getNextPage.getNext;
                _context26.next = 8;
                return Promise.all(page.map(f));

              case 8:
                getNextPage = getNext;
                _context26.next = 4;
                break;

              case 11:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26);
      }));

      function mapEntities(_x23, _x24) {
        return _mapEntities.apply(this, arguments);
      }

      return mapEntities;
    }()
  }, {
    key: "mapEntities2",
    value: function () {
      var _mapEntities2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee27(_ref44, f) {
        var _this2 = this;

        var path, fields, args;
        return _regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                path = _ref44.path, fields = _ref44.fields, args = _objectWithoutProperties(_ref44, ["path", "fields"]);
                return _context27.abrupt("return", this.map(_objectSpread({
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
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function mapEntities2(_x25, _x26) {
        return _mapEntities2.apply(this, arguments);
      }

      return mapEntities2;
    }()
  }, {
    key: "getPageEntities",
    value: function () {
      var _getPageEntities = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee28(_ref45) {
        var url, path, fields, _ref46, page, getNext, getPrevious;

        return _regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                url = _ref45.url, path = _ref45.path, fields = _ref45.fields;
                _context28.next = 3;
                return this.getPage({
                  url: url,
                  path: path,
                  fields: fields
                });

              case 3:
                _ref46 = _context28.sent;
                page = _ref46.page;
                getNext = _ref46.getNext;
                getPrevious = _ref46.getPrevious;
                return _context28.abrupt("return", this.withEntities({
                  page: page,
                  getNext: getNext,
                  getPrevious: getPrevious,
                  path: path,
                  fields: fields
                }));

              case 8:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function getPageEntities(_x27) {
        return _getPageEntities.apply(this, arguments);
      }

      return getPageEntities;
    }()
  }, {
    key: "withEntities",
    value: function () {
      var _withEntities = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee31(_ref47) {
        var _this3 = this;

        var page, getNext, getPrevious, path, fields, entities;
        return _regeneratorRuntime.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                page = _ref47.page, getNext = _ref47.getNext, getPrevious = _ref47.getPrevious, path = _ref47.path, fields = _ref47.fields;
                //convert page elements to entities
                entities = page.map(function (properties) {
                  var entity = new ClioEntity(_this3, {
                    fields: fields,
                    properties: properties,
                    type: path
                  });
                  return entity;
                });
                return _context31.abrupt("return", {
                  page: entities,
                  raw: page,
                  getNext: getNext &&
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  _regeneratorRuntime.mark(function _callee29() {
                    var _ref49, page, getNext, getPrevious;

                    return _regeneratorRuntime.wrap(function _callee29$(_context29) {
                      while (1) {
                        switch (_context29.prev = _context29.next) {
                          case 0:
                            _context29.next = 2;
                            return getNext();

                          case 2:
                            _ref49 = _context29.sent;
                            page = _ref49.page;
                            getNext = _ref49.getNext;
                            getPrevious = _ref49.getPrevious;
                            return _context29.abrupt("return", _this3.withEntities({
                              page: page,
                              getNext: getNext,
                              getPrevious: getPrevious,
                              path: path,
                              fields: fields
                            }));

                          case 7:
                          case "end":
                            return _context29.stop();
                        }
                      }
                    }, _callee29);
                  })),
                  getPrevious: getPrevious &&
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  _regeneratorRuntime.mark(function _callee30() {
                    var _ref51, page, getNext, getPrevious;

                    return _regeneratorRuntime.wrap(function _callee30$(_context30) {
                      while (1) {
                        switch (_context30.prev = _context30.next) {
                          case 0:
                            _context30.next = 2;
                            return getPrevious();

                          case 2:
                            _ref51 = _context30.sent;
                            page = _ref51.page;
                            getNext = _ref51.getNext;
                            getPrevious = _ref51.getPrevious;
                            return _context30.abrupt("return", _this3.withEntities({
                              page: page,
                              getNext: getNext,
                              getPrevious: getPrevious,
                              path: path,
                              fields: fields
                            }));

                          case 7:
                          case "end":
                            return _context30.stop();
                        }
                      }
                    }, _callee30);
                  }))
                });

              case 3:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31);
      }));

      function withEntities(_x28) {
        return _withEntities.apply(this, arguments);
      }

      return withEntities;
    }()
  }, {
    key: "getUrl",
    value: function () {
      var _getUrl = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee32(_ref52) {
        var url, request, res;
        return _regeneratorRuntime.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                url = _ref52.url, request = _ref52.request;
                if (!request) request = {};
                _context32.next = 4;
                return this.withAccessToken(request);

              case 4:
                request = _context32.sent;
                _context32.next = 7;
                return fetch(url, request);

              case 7:
                res = _context32.sent;
                return _context32.abrupt("return", getResult(res));

              case 9:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      function getUrl(_x29) {
        return _getUrl.apply(this, arguments);
      }

      return getUrl;
    }()
  }, {
    key: "makeCustomAction",
    value: function () {
      var _makeCustomAction = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee33(_ref53) {
        var label, targetUrl, uiReference, type, _ref54, _ref54$data, id, etag, created_at, updated_at, newLabel, target_url, ui_reference;

        return _regeneratorRuntime.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                label = _ref53.label, targetUrl = _ref53.targetUrl, uiReference = _ref53.uiReference, type = _ref53.type;
                if (type) uiReference = "".concat(type, "/show");
                _context33.next = 4;
                return this.create({
                  path: "custom_actions",
                  fields: ["label", "target_url", "ui_reference", "id", "etag", "created_at", "updated_at"],
                  data: {
                    label: label,
                    target_url: targetUrl,
                    ui_reference: uiReference
                  }
                });

              case 4:
                _ref54 = _context33.sent;
                _ref54$data = _ref54.data;
                id = _ref54$data.id;
                etag = _ref54$data.etag;
                created_at = _ref54$data.created_at;
                updated_at = _ref54$data.updated_at;
                newLabel = _ref54$data.label;
                target_url = _ref54$data.target_url;
                ui_reference = _ref54$data.ui_reference;
                return _context33.abrupt("return", {
                  id: id,
                  etag: etag,
                  createdAt: created_at,
                  updatedAt: updated_at,
                  label: newLabel,
                  targetUrl: target_url,
                  uiReference: ui_reference
                });

              case 14:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));

      function makeCustomAction(_x30) {
        return _makeCustomAction.apply(this, arguments);
      }

      return makeCustomAction;
    }()
  }, {
    key: "makeWebHook",
    value: function () {
      var _makeWebHook2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee34(_ref55) {
        var url, fields, events, model, expires, accessToken;
        return _regeneratorRuntime.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                url = _ref55.url, fields = _ref55.fields, events = _ref55.events, model = _ref55.model, expires = _ref55.expires;
                _context34.next = 3;
                return this.getAccessToken();

              case 3:
                accessToken = _context34.sent;
                _context34.next = 6;
                return _makeWebHook({
                  url: url,
                  fields: fields,
                  events: events,
                  model: model,
                  expires: expires,
                  accessToken: accessToken
                });

              case 6:
                return _context34.abrupt("return", _context34.sent);

              case 7:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));

      function makeWebHook(_x31) {
        return _makeWebHook2.apply(this, arguments);
      }

      return makeWebHook;
    }()
  }]);

  return Clio;
}(); //#endregion
//#region ClioEntity Class


var ClioEntity =
/*#__PURE__*/
function () {
  function ClioEntity(clio, _ref56) {
    var etag = _ref56.etag,
        id = _ref56.id,
        properties = _ref56.properties,
        fields = _ref56.fields,
        type = _ref56.type;

    _classCallCheck(this, ClioEntity);

    this.clio = clio;
    this.properties = properties;
    if (fields) this.fields = fields;
    this.type = path;
    this.id = id ? id : properties.id;
    this.etag = etag ? etag : properties.etag;
  }

  _createClass(ClioEntity, [{
    key: "update",
    value: function () {
      var _update3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee35(changes) {
        var ret;
        return _regeneratorRuntime.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                _context35.next = 2;
                return this.clio.update({
                  path: this.type,
                  id: this.id,
                  data: changes
                });

              case 2:
                ret = _context35.sent;
                this.properties = _objectSpread({}, this.properties, {
                  ret: ret
                });
                this.etag = ret.etag;

              case 5:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));

      function update(_x32) {
        return _update3.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee36() {
        return _regeneratorRuntime.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                return _context36.abrupt("return", this.clio.remove({
                  path: this.type,
                  id: this.id
                }));

              case 1:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));

      function _delete() {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return ClioEntity;
}(); //#endregion

export { Clio, ClioEntity, _authorize as authorize, _create as create, _deauthorize as deauthorize, _get as get, _getAccessToken as getAccessToken, _gets as gets, makeFields, _makeWebHook as makeWebHook, _remove as remove, _update as update, validateSignature };
//# sourceMappingURL=index.esm.js.map

import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _typeof from '@babel/runtime/helpers/typeof';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { URLSearchParams } from 'url';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

var _authorize =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var clientId, clientSecret, code, redirectUri, body, res, text, obj, access_token, refresh_token, expires_in;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            clientId = _ref.clientId, clientSecret = _ref.clientSecret, code = _ref.code, redirectUri = _ref.redirectUri;
            body = new URLSearchParams({
              client_id: clientId,
              client_secret: clientSecret,
              code: code,
              redirect_uri: redirectUri,
              grant_type: "authorization_code"
            });
            console.log("sending authorize request");
            console.log(body.toString());
            _context.next = 6;
            return fetch("https://app.clio.com/oauth/token", {
              method: "post",
              body: body
            });

          case 6:
            res = _context.sent;
            _context.next = 9;
            return res.text();

          case 9:
            text = _context.sent;
            console.log("I got text");
            console.log(text);
            obj = JSON.parse(text);
            console.log("Obj result is ", obj);
            access_token = obj.access_token, refresh_token = obj.refresh_token, expires_in = obj.expires_in;
            return _context.abrupt("return", {
              accessToken: access_token,
              refreshToken: refresh_token,
              expiresIn: expires_in
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function authorize(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _getAccessToken =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(_ref3) {
    var clientId, clientSecret, refreshToken, body, res, _ref5, access_token, refresh_token, expires_in;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            clientId = _ref3.clientId, clientSecret = _ref3.clientSecret, refreshToken = _ref3.refreshToken;
            body = new URLSearchParams({
              client_id: clientId,
              client_secret: clientSecret,
              refresh_token: refreshToken,
              grant_type: "refresh_token"
            });
            console.log("sending authorize request wih ");
            console.log(body);
            _context2.next = 6;
            return fetch("https://app.clio.com/oauth/token", {
              method: "post",
              body: body
            });

          case 6:
            res = _context2.sent;
            console.log("got res from my request");
            console.log(res);
            _context2.next = 11;
            return res.json();

          case 11:
            _ref5 = _context2.sent;
            access_token = _ref5.access_token;
            refresh_token = _ref5.refresh_token;
            expires_in = _ref5.expires_in;
            return _context2.abrupt("return", {
              accessToken: access_token,
              refreshToken: refresh_token,
              expiresIn: expires_in
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAccessToken(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var makeFields = function makeFields(fields) {
  return fields.map(function (field) {
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
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(_ref6) {
    var path, fields, accessToken, args, headers, url, ret, _text, obj;

    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            path = _ref6.path, fields = _ref6.fields, accessToken = _ref6.accessToken, args = _objectWithoutProperties(_ref6, ["path", "fields", "accessToken"]);
            headers = {
              Authorization: "Bearer ".concat(accessToken)
            };
            url = new URL("https://app.clio.com/api/v4");
            url.pathname = "".concat(url.pathname, "/").concat(path, ".json");
            url.searchParams.append("fields", makeFields(fields));
            Object.entries(args).forEach(function (_ref8) {
              var _ref9 = _slicedToArray(_ref8, 2),
                  k = _ref9[0],
                  v = _ref9[1];

              return url.searchParams.append(k, v);
            });
            _context3.next = 8;
            return fetch(url, {
              method: "get",
              headers: headers
            });

          case 8:
            ret = _context3.sent;
            _context3.prev = 9;
            _context3.next = 12;
            return ret.text();

          case 12:
            _text = _context3.sent;
            obj = JSON.parse(_text);
            return _context3.abrupt("return", obj);

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](9);
            console.log("Hit error parsing result, probable error message");
            console.log(text);
            throw text;

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[9, 17]]);
  }));

  return function gets(_x3) {
    return _ref7.apply(this, arguments);
  };
}();

var _create =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee4(_ref10) {
    var path, fields, data, accessToken, headers, url, body, ret, _text2, obj;

    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            path = _ref10.path, fields = _ref10.fields, data = _ref10.data, accessToken = _ref10.accessToken;
            headers = {
              Authorization: "Bearer ".concat(accessToken)
            };
            url = new URL("https://app.clio.com/api/v4");
            body = new FormData();
            body.append("data", data);
            url.pathname = "".concat(url.pathname, "/").concat(path, ".json");
            url.searchParams.append("fields", makeFields(fields));
            _context4.next = 9;
            return fetch(url, {
              method: "post",
              headers: headers,
              body: body
            });

          case 9:
            ret = _context4.sent;
            _context4.prev = 10;
            _context4.next = 13;
            return ret.text();

          case 13:
            _text2 = _context4.sent;
            obj = JSON.parse(_text2);
            return _context4.abrupt("return", obj);

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](10);
            console.log("Hit error parsing result, probable error message");
            console.log(text);
            throw text;

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[10, 18]]);
  }));

  return function create(_x4) {
    return _ref11.apply(this, arguments);
  };
}();

var _get =
/*#__PURE__*/
function () {
  var _ref13 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee5(_ref12) {
    var path, id, fields, accessToken, headers, url, ret, _text3, obj;

    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            path = _ref12.path, id = _ref12.id, fields = _ref12.fields, accessToken = _ref12.accessToken;
            headers = {
              Authorization: "Bearer ".concat(accessToken)
            };
            url = new URL("https://app.clio.com/api/v4");
            url.pathname = "".concat(url.pathname, "/").concat(path, "/").concat(id, ".json");
            url.searchParams.append("fields", makeFields(fields));
            _context5.next = 7;
            return fetch(url, {
              method: "get",
              headers: headers
            });

          case 7:
            ret = _context5.sent;
            _context5.prev = 8;
            _context5.next = 11;
            return ret.text();

          case 11:
            _text3 = _context5.sent;
            obj = JSON.parse(_text3);
            return _context5.abrupt("return", obj);

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](8);
            console.log("Hit error parsing result, probable error message");
            console.log(text);
            throw text;

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[8, 16]]);
  }));

  return function get(_x5) {
    return _ref13.apply(this, arguments);
  };
}();

var _update =
/*#__PURE__*/
function () {
  var _ref15 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee6(_ref14) {
    var etag, path, id, fields, data, accessToken, body, headers, url, ret, _text4, obj;

    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            etag = _ref14.etag, path = _ref14.path, id = _ref14.id, fields = _ref14.fields, data = _ref14.data, accessToken = _ref14.accessToken;
            if (!etag) etag = data.etag;
            body = new FormData();
            Object.entries(data).map(function (_ref16) {
              var _ref17 = _slicedToArray(_ref16, 2),
                  k = _ref17[0],
                  v = _ref17[1];

              return body.append(k, v);
            });
            headers = _objectSpread({
              Authorization: "Bearer ".concat(accessToken),
              "IF-MATCH": etag
            }, body.getHeaders());
            url = new URL("https://app.clio.com/api/v4");
            url.pathname = "".concat(url.pathname, "/").concat(path, "/").concat(id, ".json");
            url.searchParams.append("fields", makeFields(fields));
            _context6.next = 10;
            return fetch(url, {
              method: "patch",
              body: body,
              headers: headers
            });

          case 10:
            ret = _context6.sent;
            _context6.prev = 11;
            _context6.next = 14;
            return ret.text();

          case 14:
            _text4 = _context6.sent;
            obj = JSON.parse(_text4);
            return _context6.abrupt("return", obj);

          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](11);
            console.log("Hit error parsing result, probable error message");
            console.log(text);
            throw text;

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[11, 19]]);
  }));

  return function update(_x6) {
    return _ref15.apply(this, arguments);
  };
}();

var _remove =
/*#__PURE__*/
function () {
  var _ref19 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee7(_ref18) {
    var path, id, accessToken, headers, url, ret, _text5, obj;

    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            path = _ref18.path, id = _ref18.id, accessToken = _ref18.accessToken;
            headers = {
              Authorization: "Bearer ".concat(accessToken)
            };
            url = new URL("https://app.clio.com/api/v4");
            url.pathname = "".concat(url.pathname, "/").concat(path, "/").concat(id, ".json");
            _context7.next = 6;
            return fetch(url, {
              method: "delete",
              headers: headers
            });

          case 6:
            ret = _context7.sent;
            _context7.prev = 7;
            _context7.next = 10;
            return ret.text();

          case 10:
            _text5 = _context7.sent;
            obj = JSON.parse(_text5);
            return _context7.abrupt("return", obj);

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](7);
            console.log("Hit error parsing result, probable error message");
            console.log(text);
            throw text;

          case 20:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[7, 15]]);
  }));

  return function remove(_x7) {
    return _ref19.apply(this, arguments);
  };
}(); //#endregion
//#region Clio class


var Clio =
/*#__PURE__*/
function () {
  function Clio(_ref20) {
    var clientId = _ref20.clientId,
        clientSecret = _ref20.clientSecret,
        refreshToken = _ref20.refreshToken,
        accessToken = _ref20.accessToken,
        onNewRefreshToken = _ref20.onNewRefreshToken;

    _classCallCheck(this, Clio);

    if (!clientId || !clientSecret) throw "Clio must be initialized with a clientId and a clientSecret";
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    this.onNewRefreshToken = onNewRefreshToken;
  }

  _createClass(Clio, [{
    key: "authorize",
    value: function () {
      var _authorize2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(_ref21) {
        var code, redirectUri, _ref22, refreshToken, accessToken;

        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                code = _ref21.code, redirectUri = _ref21.redirectUri;

                if (!(!code || !redirectUri)) {
                  _context8.next = 3;
                  break;
                }

                throw "Authorize requires a code and the redirectUri passed in the initial authorization request";

              case 3:
                _context8.next = 5;
                return _authorize({
                  clientId: this.clientId,
                  clientSecret: this.clientSecret,
                  code: code,
                  redirectUri: redirectUri
                });

              case 5:
                _ref22 = _context8.sent;
                refreshToken = _ref22.refreshToken;
                accessToken = _ref22.accessToken;

                if (!accessToken) {
                  _context8.next = 15;
                  break;
                }

                this.accessToken = accessToken;
                this.refreshToken = refreshToken;
                if (refreshToken && this.onNewRefreshToken) this.onNewRefreshToken(refreshToken);
                return _context8.abrupt("return", {
                  accessToken: accessToken,
                  refreshToken: refreshToken
                });

              case 15:
                throw "could not authorize with these credentials";

              case 16:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function authorize(_x8) {
        return _authorize2.apply(this, arguments);
      }

      return authorize;
    }()
  }, {
    key: "getRefreshToken",
    value: function () {
      var _getRefreshToken2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9() {
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", this.refreshToken());

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      _regeneratorRuntime.mark(function _callee10() {
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!this.refreshToken) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return", this.refreshToken);

              case 2:
                _context10.next = 4;
                return this.getRefreshToken();

              case 4:
                this.refreshToken = _context10.sent;
                return _context10.abrupt("return", this.refreshToken);

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
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
      _regeneratorRuntime.mark(function _callee11() {
        var refreshToken, _ref23, accessToken, newToken;

        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!this.accessToken) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt("return", this.accessToken());

              case 2:
                _context11.next = 4;
                return _getRefreshToken();

              case 4:
                refreshToken = _context11.sent;

                if (refreshToken) {
                  _context11.next = 7;
                  break;
                }

                throw "Cannot get an access token without a refresh token";

              case 7:
                _context11.next = 9;
                return _getAccessToken({
                  clientId: this.clientId,
                  clientSecret: this.clientSecret,
                  refreshToken: refreshToken
                });

              case 9:
                _ref23 = _context11.sent;
                accessToken = _ref23.accessToken;
                newToken = _ref23.refreshToken;
                this.accessToken = accessToken;

                if (newToken) {
                  this.refreshToken = newToken;
                  if (this.onNewRefreshToken) this.onNewRefreshToken(newToken);
                }

                return _context11.abrupt("return", history.accessToken);

              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
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
      _regeneratorRuntime.mark(function _callee12(_ref24) {
        var path, id, fields, accessToken;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                path = _ref24.path, id = _ref24.id, fields = _ref24.fields;
                _context12.next = 3;
                return this.getAccessToken();

              case 3:
                accessToken = _context12.sent;
                return _context12.abrupt("return", _get({
                  path: path,
                  id: id,
                  fields: fields,
                  accessToken: accessToken
                }));

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function get(_x9) {
        return _get2.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "gets",
    value: function () {
      var _gets2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13(_ref25) {
        var path, fields, accessToken;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                path = _ref25.path, fields = _ref25.fields;
                _context13.next = 3;
                return this.getAccessToken();

              case 3:
                accessToken = _context13.sent;
                return _context13.abrupt("return", _gets({
                  path: path,
                  fields: fields,
                  accessToken: accessToken
                }));

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function gets(_x10) {
        return _gets2.apply(this, arguments);
      }

      return gets;
    }()
  }, {
    key: "create",
    value: function () {
      var _create2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee14(_ref26) {
        var path, fields, data, accessToken;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                path = _ref26.path, fields = _ref26.fields, data = _ref26.data;
                _context14.next = 3;
                return this.getAccessToken();

              case 3:
                accessToken = _context14.sent;
                return _context14.abrupt("return", _create({
                  path: path,
                  fields: fields,
                  data: data,
                  accessToken: accessToken
                }));

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function create(_x11) {
        return _create2.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15(_ref27) {
        var path, id, fields, etag, data, accessToken;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                path = _ref27.path, id = _ref27.id, fields = _ref27.fields, etag = _ref27.etag, data = _ref27.data;
                _context15.next = 3;
                return this.getAccessToken();

              case 3:
                accessToken = _context15.sent;
                return _context15.abrupt("return", _update({
                  path: path,
                  id: id,
                  fields: fields,
                  data: data,
                  etag: etag,
                  accessToken: accessToken
                }));

              case 5:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function update(_x12) {
        return _update2.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee16(_ref28) {
        var path, id, accessToken;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                path = _ref28.path, id = _ref28.id;
                _context16.next = 3;
                return this.getAccessToken();

              case 3:
                accessToken = _context16.sent;
                return _context16.abrupt("return", _remove({
                  path: path,
                  id: id,
                  accessToken: accessToken
                }));

              case 5:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function remove(_x13) {
        return _remove2.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: "getEntity",
    value: function () {
      var _getEntity = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee17(type, id) {
        var fields,
            properties,
            _args17 = arguments;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                fields = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : null;
                _context17.next = 3;
                return this.get({
                  path: type,
                  id: id,
                  fields: fields
                });

              case 3:
                properties = _context17.sent;
                return _context17.abrupt("return", new ClioEntity(this, {
                  properties: properties,
                  fields: fields,
                  id: id,
                  type: type
                }));

              case 5:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function getEntity(_x14, _x15) {
        return _getEntity.apply(this, arguments);
      }

      return getEntity;
    }()
  }]);

  return Clio;
}(); //#endregion
//#region ClioEntity Class


var ClioEntity =
/*#__PURE__*/
function () {
  function ClioEntity(clio, _ref29) {
    var etag = _ref29.etag,
        id = _ref29.id,
        properties = _ref29.properties,
        fields = _ref29.fields,
        type = _ref29.type;

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
      _regeneratorRuntime.mark(function _callee18(changes) {
        var ret;
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return this.clio.update({
                  path: this.type,
                  id: this.id,
                  data: changes
                });

              case 2:
                ret = _context18.sent;
                this.properties = _objectSpread({}, this.properties, {
                  ret: ret
                });
                this.etag = ret.etag;

              case 5:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function update(_x16) {
        return _update3.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee19() {
        return _regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                return _context19.abrupt("return", this.clio.remove({
                  path: this.type,
                  id: this.id
                }));

              case 1:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function _delete() {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return ClioEntity;
}(); //#endregion

export { Clio, ClioEntity, _authorize as authorize, _create as create, _get as get, _getAccessToken as getAccessToken, _gets as gets, makeFields, _remove as remove, _update as update };
//# sourceMappingURL=index.esm.js.map

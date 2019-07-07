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
    var clientId, clientSecret, code, redirectUri, body, res, _ref3, access_token, refresh_token, expires_in;

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
            console.log(body.toString());
            _context.next = 5;
            return fetch("https://app.clio.com/oauth/token", {
              method: "post",
              body: body
            });

          case 5:
            res = _context.sent;
            _context.next = 8;
            return res.json();

          case 8:
            _ref3 = _context.sent;
            access_token = _ref3.access_token;
            refresh_token = _ref3.refresh_token;
            expires_in = _ref3.expires_in;
            return _context.abrupt("return", {
              accessToken: access_token,
              refreshToken: refresh_token,
              expiresIn: expires_in
            });

          case 13:
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
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(_ref4) {
    var clientId, clientSecret, refreshToken, body, res, _ref6, access_token, refresh_token, expires_in;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            clientId = _ref4.clientId, clientSecret = _ref4.clientSecret, refreshToken = _ref4.refreshToken;
            body = new URLSearchParams({
              client_id: clientId,
              client_secret: clientSecret,
              refresh_token: refreshToken,
              grant_type: "refresh_token"
            });
            _context2.next = 4;
            return fetch("https://app.clio.com/oauth/token", {
              method: "post",
              body: body
            });

          case 4:
            res = _context2.sent;
            _context2.next = 7;
            return res.json();

          case 7:
            _ref6 = _context2.sent;
            access_token = _ref6.access_token;
            refresh_token = _ref6.refresh_token;
            expires_in = _ref6.expires_in;
            return _context2.abrupt("return", {
              accessToken: access_token,
              refreshToken: refresh_token,
              expiresIn: expires_in
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAccessToken(_x2) {
    return _ref5.apply(this, arguments);
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
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(_ref7) {
    var path, fields, accessToken, args, headers, url, ret, _text, obj;

    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            path = _ref7.path, fields = _ref7.fields, accessToken = _ref7.accessToken, args = _objectWithoutProperties(_ref7, ["path", "fields", "accessToken"]);
            headers = {
              Authorization: "Bearer ".concat(accessToken)
            };
            url = new URL("https://app.clio.com/api/v4");
            url.pathname = "".concat(url.pathname, "/").concat(path, ".json");
            url.searchParams.append("fields", makeFields(fields));
            Object.entries(args).forEach(function (_ref9) {
              var _ref10 = _slicedToArray(_ref9, 2),
                  k = _ref10[0],
                  v = _ref10[1];

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
    return _ref8.apply(this, arguments);
  };
}();

var _create =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee4(_ref11) {
    var path, fields, data, accessToken, headers, url, body, ret, _text2, obj;

    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            path = _ref11.path, fields = _ref11.fields, data = _ref11.data, accessToken = _ref11.accessToken;
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
    return _ref12.apply(this, arguments);
  };
}();

var _get =
/*#__PURE__*/
function () {
  var _ref14 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee5(_ref13) {
    var path, id, fields, accessToken, headers, url, ret, _text3, obj;

    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            path = _ref13.path, id = _ref13.id, fields = _ref13.fields, accessToken = _ref13.accessToken;
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
    return _ref14.apply(this, arguments);
  };
}();

var _update =
/*#__PURE__*/
function () {
  var _ref16 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee6(_ref15) {
    var etag, path, id, fields, data, accessToken, body, headers, url, ret, _text4, obj;

    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            etag = _ref15.etag, path = _ref15.path, id = _ref15.id, fields = _ref15.fields, data = _ref15.data, accessToken = _ref15.accessToken;
            if (!etag) etag = data.etag;
            body = new FormData();
            Object.entries(data).map(function (_ref17) {
              var _ref18 = _slicedToArray(_ref17, 2),
                  k = _ref18[0],
                  v = _ref18[1];

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
    return _ref16.apply(this, arguments);
  };
}();

var _remove =
/*#__PURE__*/
function () {
  var _ref20 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee7(_ref19) {
    var path, id, accessToken, headers, url, ret, _text5, obj;

    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            path = _ref19.path, id = _ref19.id, accessToken = _ref19.accessToken;
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
    return _ref20.apply(this, arguments);
  };
}();

var Clio =
/*#__PURE__*/
function () {
  function Clio(_ref21) {
    var clientId = _ref21.clientId,
        clientSecret = _ref21.clientSecret,
        refreshToken = _ref21.refreshToken,
        accessToken = _ref21.accessToken,
        onNewRefreshToken = _ref21.onNewRefreshToken;

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
      _regeneratorRuntime.mark(function _callee8(_ref22) {
        var code, redirectUri, _ref23, refreshToken, accessToken;

        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                code = _ref22.code, redirectUri = _ref22.redirectUri;

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
                _ref23 = _context8.sent;
                refreshToken = _ref23.refreshToken;
                accessToken = _ref23.accessToken;
                this.accessToken = accessToken;
                this.refreshToken = refreshToken;
                if (this.onNewRefreshToken) this.onNewRefreshToken(refreshToken);

              case 11:
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
    key: "getAccessToken",
    value: function () {
      var _getAccessToken2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9() {
        var _ref24, accessToken, newToken;

        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this.refreshToken) {
                  _context9.next = 2;
                  break;
                }

                throw "Cannot get an access token without a refresh token";

              case 2:
                _context9.next = 4;
                return _getAccessToken({
                  clientId: this.clientId,
                  clientSecret: this.clientSecret,
                  refreshToken: this.refreshToken
                });

              case 4:
                _ref24 = _context9.sent;
                accessToken = _ref24.accessToken;
                newToken = _ref24.refreshToken;
                this.accessToken = accessToken;

                if (newToken) {
                  this.refreshToken = newToken;
                  if (this.onNewRefreshToken) this.onNewRefreshToken(newToken);
                }

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      _regeneratorRuntime.mark(function _callee10(_ref25) {
        var path, id, fields;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                path = _ref25.path, id = _ref25.id, fields = _ref25.fields;

                if (this.accessToken) {
                  _context10.next = 4;
                  break;
                }

                _context10.next = 4;
                return this.getAccessToken();

              case 4:
                return _context10.abrupt("return", _get({
                  path: path,
                  id: id,
                  fields: fields,
                  accessToken: this.accessToken
                }));

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
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
      _regeneratorRuntime.mark(function _callee11(_ref26) {
        var path, fields;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                path = _ref26.path, fields = _ref26.fields;

                if (this.accessToken) {
                  _context11.next = 4;
                  break;
                }

                _context11.next = 4;
                return this.getAccessToken();

              case 4:
                return _context11.abrupt("return", _gets({
                  path: path,
                  fields: fields,
                  accessToken: this.accessToken
                }));

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
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
      _regeneratorRuntime.mark(function _callee12(_ref27) {
        var path, fields, data;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                path = _ref27.path, fields = _ref27.fields, data = _ref27.data;

                if (this.accessToken) {
                  _context12.next = 4;
                  break;
                }

                _context12.next = 4;
                return this.getAccessToken();

              case 4:
                return _context12.abrupt("return", _create({
                  path: path,
                  fields: fields,
                  data: data,
                  accessToken: this.accessToken
                }));

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
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
      _regeneratorRuntime.mark(function _callee13(_ref28) {
        var path, fields, etag, data;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                path = _ref28.path, fields = _ref28.fields, etag = _ref28.etag, data = _ref28.data;

                if (this.accessToken) {
                  _context13.next = 4;
                  break;
                }

                _context13.next = 4;
                return this.getAccessToken();

              case 4:
                return _context13.abrupt("return", _update({
                  path: path,
                  id: id,
                  fields: fields,
                  data: data,
                  etag: etag,
                  accessToken: this.accessToken
                }));

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
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
      _regeneratorRuntime.mark(function _callee14(_ref29) {
        var path, id;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                path = _ref29.path, id = _ref29.id;

                if (this.accessToken) {
                  _context14.next = 4;
                  break;
                }

                _context14.next = 4;
                return this.getAccessToken();

              case 4:
                return _context14.abrupt("return", _remove({
                  path: path,
                  id: id,
                  accessToken: this.accessToken
                }));

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
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
      _regeneratorRuntime.mark(function _callee15(type, id) {
        var fields,
            properties,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                fields = _args15.length > 2 && _args15[2] !== undefined ? _args15[2] : null;
                _context15.next = 3;
                return _get({
                  path: type,
                  id: id,
                  fields: fields
                });

              case 3:
                properties = _context15.sent;
                return _context15.abrupt("return", new ClioEntity(this, {
                  properties: properties,
                  fields: fields,
                  id: id,
                  type: type
                }));

              case 5:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function getEntity(_x14, _x15) {
        return _getEntity.apply(this, arguments);
      }

      return getEntity;
    }()
  }]);

  return Clio;
}();

var ClioEntity =
/*#__PURE__*/
function () {
  function ClioEntity(clio, _ref30) {
    var etag = _ref30.etag,
        id = _ref30.id,
        properties = _ref30.properties,
        fields = _ref30.fields,
        type = _ref30.type;

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
      _regeneratorRuntime.mark(function _callee16(changes) {
        var ret;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return this.clio.update({
                  path: this.type,
                  id: this.id,
                  data: changes
                });

              case 2:
                ret = _context16.sent;
                this.properties = _objectSpread({}, this.properties, {
                  ret: ret
                });
                this.etag = ret.etag;

              case 5:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
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
      _regeneratorRuntime.mark(function _callee17() {
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                return _context17.abrupt("return", this.clio.remove({
                  path: this.type,
                  id: this.id
                }));

              case 1:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function _delete() {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return ClioEntity;
}();

export { Clio, ClioEntity, _authorize as authorize, _create as create, _get as get, _getAccessToken as getAccessToken, _gets as gets, makeFields, _remove as remove, _update as update };
//# sourceMappingURL=index.esm.js.map

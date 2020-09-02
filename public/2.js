(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/layouts/auth/Registro.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/layouts/auth/Registro.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Registro',
  mounted: function mounted() {
    this.title = 'Registrate es gratis!!!';
  },
  data: function data() {
    return {
      data: {
        name: '',
        email: '',
        password: ''
      },
      confirm_password: '',
      hidePassword: true,
      validation: {
        user: null,
        email: null
      },
      rules: {
        required: function required(value) {
          return !!value || 'Introduzca un E-mail.';
        },
        email: function email(value) {
          var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'E-mail Invalido.';
        }
      }
    };
  },
  methods: {
    registrar: function registrar() {
      var _this = this;

      if (this.$refs.registro.resetValidation()) {
        return;
      }

      this.$store.commit('AUTH/LOADING'); // llamamos a esta mutacion que activa el loading

      this.$store.dispatch('AUTH/STORE_USER', this.data).then(function (res) {
        if (res.validation === undefined) {
          // comprobamos si hay errores de validacion
          _this.$store.commit('AUTH/LOADING_FALSE');

          sweetalert2__WEBPACK_IMPORTED_MODULE_0___default.a.fire({
            position: 'center',
            icon: 'success',
            title: 'Su registro fue exitoso',
            showConfirmButton: false,
            timer: 1500
          });

          _this.reset();

          _this.$router.push({
            name: 'login_in'
          });
        } else {
          // si hay errores  veremos cual es
          _this.validacion(res.validation);

          _this.$store.commit('AUTH/LOADING_FALSE');
        }
      })["catch"](function (err) {
        return console.log(err);
      });
      this.$store.commit('AUTH/LOADING_FALSE');
    },
    reset: function reset() {
      this.$refs.registro.reset();
    },
    resetValidation: function resetValidation() {
      return this.$refs.registro.resetValidation();
    },
    validacion: function validacion(datos) {
      if (datos.name !== undefined) {
        // primero el usuario
        this.validation.user = datos.name[0];
      } else {
        this.validation.user = null;
      }

      if (datos.email !== undefined) {
        // segundo el email
        this.validation.email = datos.email[0];
      } else {
        this.validation.email = null;
      }

      if (!this.$refs.registro.validate()) {
        // verificar la validacion
        return;
      }
    }
  },
  computed: {
    title: {
      set: function set(value) {
        return this.$store.commit('AUTH/TITLE', value);
      },
      get: function get() {
        return this.$store.state.AUTH.title;
      }
    },
    loading: function loading() {
      return this.$store.state.AUTH.loading;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/layouts/auth/Registro.vue?vue&type=template&id=bb69d6ce&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/layouts/auth/Registro.vue?vue&type=template&id=bb69d6ce& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-card-text",
        [
          _c(
            "v-form",
            { ref: "registro" },
            [
              _c("v-text-field", {
                attrs: {
                  "append-icon": "mdi-account",
                  counter: 10,
                  rules: [
                    _vm.validation.user === null || _vm.validation.user,
                    function(v) {
                      return !!v || "Introduzaca el nombre del usuario"
                    },
                    function(v) {
                      return (
                        (v && v.length <= 10) ||
                        "No puedes tener un usuario con mas de 10 caracteres"
                      )
                    }
                  ],
                  label: "usuario",
                  required: ""
                },
                model: {
                  value: _vm.data.name,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "name", $$v)
                  },
                  expression: "data.name"
                }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: {
                  "append-icon": "mdi-email",
                  rules: [
                    _vm.validation.email === null || _vm.validation.email,
                    _vm.rules.required,
                    _vm.rules.email
                  ],
                  label: "E-mail",
                  required: ""
                },
                model: {
                  value: _vm.data.email,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "email", $$v)
                  },
                  expression: "data.email"
                }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: {
                  "append-icon": "mdi-lock",
                  type: "password",
                  name: "Password",
                  label: "nueva contraseña",
                  id: "Password",
                  rules: [
                    function(v) {
                      return !!v || "Contraseña requerida"
                    }
                  ]
                },
                model: {
                  value: _vm.data.password,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "password", $$v)
                  },
                  expression: "data.password"
                }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: {
                  type: _vm.hidePassword ? "password" : "text",
                  "append-icon": _vm.hidePassword ? "mdi-eye" : "mdi-eye-off",
                  name: "confirm_password",
                  label: "confirma la contraseña",
                  id: "confirm_password",
                  rules: [
                    _vm.data.password === _vm.confirm_password ||
                      "contraseña no coinciden"
                  ]
                },
                on: {
                  "click:append": function($event) {
                    _vm.hidePassword = !_vm.hidePassword
                  }
                },
                model: {
                  value: _vm.confirm_password,
                  callback: function($$v) {
                    _vm.confirm_password = $$v
                  },
                  expression: "confirm_password"
                }
              }),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c(
                    "v-btn",
                    { attrs: { color: "warning" }, on: { click: _vm.reset } },
                    [_vm._v(" clear ")]
                  ),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "secondary", loading: _vm.loading },
                      on: { click: _vm.registrar }
                    },
                    [_vm._v(" registrar ")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "text-center" },
        [
          _c(
            "v-btn",
            {
              attrs: { text: "", color: "secondary", to: { name: "login_in" } }
            },
            [_vm._v("login")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/layouts/auth/Registro.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/layouts/auth/Registro.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Registro_vue_vue_type_template_id_bb69d6ce___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Registro.vue?vue&type=template&id=bb69d6ce& */ "./resources/js/components/layouts/auth/Registro.vue?vue&type=template&id=bb69d6ce&");
/* harmony import */ var _Registro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Registro.vue?vue&type=script&lang=js& */ "./resources/js/components/layouts/auth/Registro.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VForm */ "./node_modules/vuetify/lib/components/VForm/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Registro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Registro_vue_vue_type_template_id_bb69d6ce___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Registro_vue_vue_type_template_id_bb69d6ce___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */







_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardActions"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardText"],VForm: vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_6__["VForm"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VSpacer"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_8__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/layouts/auth/Registro.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/layouts/auth/Registro.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/layouts/auth/Registro.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Registro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Registro.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/layouts/auth/Registro.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Registro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/layouts/auth/Registro.vue?vue&type=template&id=bb69d6ce&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/layouts/auth/Registro.vue?vue&type=template&id=bb69d6ce& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Registro_vue_vue_type_template_id_bb69d6ce___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vuetify-loader/lib/loader.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Registro.vue?vue&type=template&id=bb69d6ce& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/layouts/auth/Registro.vue?vue&type=template&id=bb69d6ce&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Registro_vue_vue_type_template_id_bb69d6ce___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Registro_vue_vue_type_template_id_bb69d6ce___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
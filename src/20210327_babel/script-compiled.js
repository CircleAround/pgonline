'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Profile = function () {
  function Profile(data) {
    _classCallCheck(this, Profile);

    this.name = data.name;
    this.age = data.age;
    this.text = data.text;
  }

  _createClass(Profile, [{
    key: 'printStr',
    value: function printStr() {
      console.log('name: ' + this.name + ', age: ' + this.age + ', text: ' + this.text);
    }
  }]);

  return Profile;
}();

var profiles = [{ name: '一郎', age: 20, text: 'hogefuge' }, { name: '二郎', age: 25, text: 'hogefuge' }, { name: '三郎', age: 30, text: 'hogefuge' }];

profiles.forEach(function (data) {
  var profile = new Profile(data);
  profile.printStr();
});

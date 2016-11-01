# ng-inline

Faster template inclusion in AngularJS for simple usecases; see <http://zachsnow.com/blog/2014/angularjs-faster-ng-include/>
or check out this [demo](http://plnkr.co/edit/dTUUPhsVrCbeSIjZzqmx?p=preview).

## Dependencies

1. AngularJS (duh).

## Installation

* Load `inline.js`.

* Add `inline` as a dependency to your Angular module.

  ```javascript
    angular.module('yourModule', [
      // ... other dependencies ...
      'inline'
    ]);
  ```

* Use `ng-inline` in your templates.

## Description

While there are many ways to compose templates in AngularJS, a common
and straightforward approach is to use `ng-include`.  However, if your goal
is *only* to break up templates in order to make your code more manageable,
and not to introduce any additional dynamism (in the form of dynamic template
names, say), `ng-include` can be needlessly slow.

The purpose of `ng-inline` is to simply remove these additional (useful)
features so that you can break up your code into simple, reusable components
that can be composed fast enough to be used wherever and however you want --
in particular, you can fearlessly use `ng-inline` in an `ng-repeat` without
melting your computer.

## Usage

1. Add a template to `$templateCache`.

  The easiest way is to use a `<script />` tag:

  ```html
    <script type="text/ng-template" id="some-template-name">
      It's a template!
    </script>
  ```

2. Inline the template elsewhere in your code.

  Note that we write the name of the template directly, and
  not as an Angular template expression (that is, not wrapped in quotes).

  ```html
    <div>
      It's a container.
      <div ng-inline="some-template-name"></div>
    </div>
  ```

  If you use a `<script />` tag to add the template to `$templateCache`,
  the `<script /`> tag  will need to come *before* the usage of `ng-inline`.
  Otherwise `ng-inline` will raise an error, as the template will not
  be available in the cache at compile time.

3. That's it.

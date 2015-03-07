# Stompie

If you're planning to [stomp](http://jmesnil.net/stomp-websocket/doc/) all over some [sockets](https://github.com/sockjs/sockjs-client) this little [angularity](https://angularjs.org) to deal with STOMP queues is
just the thing for you.

## Installation

Install via Bower:
```bash
bower install -save beevelop/stompie
```

Add SockJS + STOMP + (minified) Stompie:
```html
<script src="/bower_components/sockjs/sockjs.min.js"></script>
<script src="/bower_components/stomp-websocket/lib/stomp.min.js"></script>
<script src="/bower_components/stompie/stompie.min.js"></script>
```

Declare the module as a dependency in your application:
```js
angular.module('yourApplication', ['stompie']);
```

## Usage

Inject it in your controller:
```js
angular.module('yourApplication')
    .controller('YourCtrl', ['$stompie', '$scope', function ($stompie, $scope) {
        // ...
    }
```

Use and subscribe:
```js
//frame = CONNECTED headers
$stompie.using('/your/stomp/endpoint', function (frame) {
    // The $scope bindings are updated for you so no need to $scope.$apply.
    // The subscription object is returned by the method.
    var subscription = $stompie.subscribe('/your/topic', function (data) {
        $scope.foo = data;
    });

    // Unsubscribe using said subscription object.
    subscription.unsubscribe();

    // Send messages to a STOMP broker.
    $stompie.send('/some/queue', {
        message: 'some message'
    }, {
        priority: 9,
        custom: 42 //Custom Headers
    });

    // Disconnect from the socket.
    $stompie.disconnect(function () {
        // Called once you're out...
    });
});
```

## Helpful information

* You can call `$stompie.using()` as many times as you want, it will reuse the same socket connection.
* The underlying libraries also mean that you can register multiple subscribers.
* The `$stompie.subscribe()` callback will attempt to parse the response.
* Objects you pass to `$stompie.send()` will be stringified.

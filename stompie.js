/**
 * Stompie 0.0.8
 * Angular module for managing connection and subscribing to STOMP
 * @author mrolafsson
 */
angular.module('stompie', [])
    .factory('$stompie', [
        '$rootScope', '$timeout',
        function ($rootScope, $timeout) {

        var _stompie = {},
            _endpoint = null,
            _socket = {};

        var onError = function () {
            $timeout(function () {
                using(_endpoint, _onConnect);
            }, 3000);
        };

        _stompie.connect = function (endpoint, onConnect, headers) {
            _endpoint = endpoint;
            _onConnect = onConnect;

            headers = headers || {};

            _socket.client = new SockJS(_endpoint);
            _socket.stomp = Stomp.over(_socket.client);
            _socket.stomp.connect(headers, onConnect, onError);
        };

        _stompie.disconnect = function (callback) {
            _socket.stomp.disconnect(callback);
        };

        _stompie.subscribe = function (channel, callback) {
            return _socket.stomp.subscribe(channel, function (data) {
                var payload = null;
                try {
                    payload = JSON.parse(data.body);
                } finally {
                    $rootScope.$digest(callback(payload));
                }
            });
        };

        _stompie.send = function (queue, obj, headers) {
            try {
                var json = JSON.stringify(obj);
                headers = headers || {};
                _socket.stomp.send(queue, headers, json);
            } catch (e) {
                throw e;
            }

            return this;
        };

        return _stompie;
    }]
);
var chromePassGen;

(function() {
    'use strict';
    
    chromePassGen = function(chrome, config) {
        this.chrome = chrome;
        
        if(config !== undefined) {
            this.config = config;
        }
    };
    var proto = chromePassGen.prototype;
    
    proto.chrome = null;
    proto.config = {};
    
    proto.initialize = function() {
        var self = this;
        var chrome = this.chrome;
        
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            switch(message.sender) {
                case 'options':
                    self.handleOptionsMessage(message, sender, sendResponse);
                    break;
            }
            
            return true;
        });
    };
    
    proto.handleOptionsMessage = function(message, sender, sendResponse) {
        switch(message.method) {
            case 'save-option':
                this.setOption(message.data, function() {
                    sendResponse({});
                });
                break;
            case 'get-option':
                this.getOption(message.data, function(data) {
                    sendResponse(data);
                });
                break;
        }
    };
    
    proto.setOption = function(store, callback) {
        this.chrome.storage.async.set(store, callback);
    };
    
    proto.getOption = function(retrieval, callback) {
        this.chrome.storage.async.get(retrieval, callback);
    };
}) ();

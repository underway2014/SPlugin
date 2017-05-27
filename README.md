# SPlugin

### roll.js
- 实现数字自由滚动的效果

#### example
  ```javascript
var roll = $(".roll").roll({
		duration: 1000,
    lineHeight: 20,
    installNumber: 10000,
    finish: null
	});
  
  setTimeout(function(){
		roll.changeNumber("128964", 1000);
	}, 2000);

```

### tab.js
- tab选项卡，及回调

#### example
  ```javascript
$(".tab1").tab({
        callback: function (index) {
        	console.log(index);
        },
        selectedIndex: 0,
        activeClass: "on",
        childSelector: ".item"
    });
```

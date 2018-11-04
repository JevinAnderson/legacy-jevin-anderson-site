function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    var listener = function() {
      document.removeEventListener('DOMContentLoaded', listener);
      fn();
    };

    document.addEventListener('DOMContentLoaded', listener);
  }
}

function addHandlers(){
  var nodeList = document.querySelectorAll('.faq-question');
        
  for (var i = nodeList.length - 1; i >= 0; i--) {
    var node = nodeList[i];
    
    node.addEventListener('click', function(event) {
      var item = event.target.parentNode;
      var classes = item.className;
      classes = classes === 'faq-item' ? 'faq-item expanded' : 'faq-item';
      item.className = classes;
    });
  }
}

ready(addHandlers);
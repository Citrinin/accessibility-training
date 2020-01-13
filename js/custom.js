(function() {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('#' + burger.dataset.target);
  burger.addEventListener('click', burgerToggler);

  function burgerToggler() {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  }
})();

document.querySelectorAll('#nav li').forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll('#nav li');

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add('is-active');
    } else {
      if (navEl.classList.contains('is-active')) {
        navEl.classList.remove('is-active');
      }
    }
  });

  var tabs = document.querySelectorAll('.tab-pane');

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = 'block';
    } else {
      tab.style.display = 'none';
    }
  });
}

var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});

// hometask 3
(function() {
  var liveElement = document.querySelector('#live-region');
  liveElement.innerHTML = new Date().toLocaleTimeString();
  setInterval(() => {
    liveElement.innerHTML = new Date().toLocaleTimeString();
  }, 60000);
})();

// hometask 4
(function() {
  const ARROW_LEFT = 'ArrowLeft';
  const ARROW_RIGHT = 'ArrowRight';
  const HOME = 'Home';
  const END = 'End';
  const KEYS = [ARROW_LEFT, ARROW_RIGHT, HOME, END];

  let tabList = document.querySelector('[role="tablist"]');
  let tabButtons = Array.from(tabList.querySelectorAll('button'));
  let tabPanels = document.querySelector('[role="tabpanel"]');

  activateTab(tabButtons, tabButtons[0], false);

  tabList.addEventListener('keydown', event => {
    if (event.target.matches('button') && KEYS.includes(event.key)) {
      event.preventDefault();
      let activeTab = getActiveElement(event, tabButtons);
      activateTab(tabButtons, activeTab);

      console.log(event);
    }
  });

  function getActiveElement(event, elements) {
    switch (event.key) {
      case ARROW_LEFT: {
        return getPreviousElement(elements, event.target);
      }
      case ARROW_RIGHT: {
        return getNextElement(elements, event.target);
      }
      case HOME: {
        return elements[0];
      }
      case END: {
        return elements[elements.length - 1];
      }
      default:
        return;
    }
  }

  function getNextElement(elementList, currentElement) {
    let cuttentIndex = elementList.indexOf(currentElement);
    if (cuttentIndex >= elementList.length - 1) {
      return elementList[0];
    }
    return elementList[cuttentIndex + 1];
  }

  function getPreviousElement(elementList, currentElement) {
    let cuttentIndex = elementList.indexOf(currentElement);
    if (cuttentIndex <= 0) {
      return elementList[elementList.length - 1];
    }
    return elementList[cuttentIndex - 1];
  }

  function activateTab(tabList, tab, setFocus = true) {
    deactivateTabs(tabList);
    tab.removeAttribute('tabindex');
    tab.setAttribute('aria-selected', 'true');

    if (setFocus) {
      tab.focus();
    }
    tab.click();
  }

  function deactivateTabs(tabList) {
    tabList.forEach(tab => {
      tab.setAttribute('tabindex', '-1');
      tab.setAttribute('aria-selected', 'false');
    });
  }
})();

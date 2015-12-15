((doc, root) => {

  Craft.newComponent('crafter-tabs', {
    created() {
        let element = this,
          activeTab = 0,
          tabViews = queryAll('tab-view', this);
        this.tabs = [];

        queryEach('tab-handle', this, (el, i) => {
          if (!is.Null(tabViews[i], el)) {
            this.tabs.push({
              handle: el,
              view: tabViews[i]
            });
            el.view = tabViews[i];
          } else console.error(`tab-handles inconsistant with tab-views in ${this}`);
        });

        this.handleClick = On('click', this, e => {
          if (is.Node(e.target) && e.target.tagName === 'TAB-HANDLE') {
            queryEach('[active]', element, el => el.removeAttribute('active'));
            e.target.setActive();
            activeTab = this.tabs.indexOf(e.target);
          }
        });

        if (this.hasAttribute('selected')) {
          activeTab = parseInt(element.getAttribute('selected'), 10);
          this.tabs[activeTab].handle.setAttribute('active', '');
          this.tabs[activeTab].view.setAttribute('active', '');
        } else {
          this.tabs[0].handle.setAttribute('active', '');
          this.tabs[0].view.setAttribute('active', '');
        }

        this.scrollHandle = On('wheel', query('tab-handles', this), e => {
          forEach(queryAll('[active]', element), el => el.removeAttribute('active'));
          (e.deltaY < 1) ? activeTab-- : activeTab++;
          if (activeTab >= this.tabs.length) activeTab = 0;
          else if (activeTab < 0) activeTab = this.tabs.length - 1;

          this.tabs[activeTab].handle.setAttribute('active', '');
          this.tabs[activeTab].view.setAttribute('active', '');
        });

      },
      destroyed() {
        this.scrollHandle.Off();
        this.handleClick.Off();
      },
      attr(attrName, oldVal, newVal) {
        if (attrName === 'selected') {
          if (this.hasAttribute('selected')) {
            let activeTab = parseInt(element.getAttribute('selected'), 10);
            this.tabs[activeTab].handle.setAttribute('active', '');
            this.tabs[activeTab].view.setAttribute('active', '');
          } else {
            this.tabs[0].handle.setAttribute('active', '');
            this.tabs[0].view.setAttribute('active', '');
          }
        }
      }
  });

  Craft.newComponent('tab-handle', {
    created() {
      this.parentNode.parentNode.tabs.forEach(tab => {
        if (tab.handle === this) this.view = tab.view;
      });
      if (is.Undef(this.view) || this.view === null) console.error('No view found for tab-handle');
      if (this.hasAttribute('color-accent')) this.style.borderColor = this.getAttribute('color-accent');
    },
    setActive() {
      this.setAttribute('active', '');
      this.view.setAttribute('active', '');
    },
    attr(attrName) {
      if (attrName === 'color-accent' && this.hasAttribute('color-accent')) this.style.borderColor = this.getAttribute('color-accent');
    }
  });

  Craft.newComponent('tab-view', {
    created() {
      this.manageAttributes('src');
    },
    attr(attrName, oldVal, newVal) {
      this.manageAttributes(attrName);
    },
    manageAttributes(...args) {
      if (args.includes('src') && this.hasAttribute('src')) {
        let element = this;

        if (this.hasAttribute('cache-view')) {
          if (localStorage.getItem('craft-tabs:' + this.getAttribute('cache-view')) !== null) {
            let cachedView = JSON.parse(localStorage.getItem('craft-tabs:' + this.getAttribute('cache-view')));
            if (element.hasAttribute('pre')) {
              let fixhtml = cachedView.source.replace(/&/g, '&amp;').replace(/</g, '&lt;');
              (element.hasAttribute('code')) ? element.innerHTML = "<pre><code>" + fixhtml + "</code></pre>": element.innerHTML = "<pre>" + fixhtml + "</pre>";
            } else element.innerHTML = cachedView.source;
          } else this.getAttribute('cache-view').length >= 2 ? fetch(this.getAttribute('src')).then(res => {
                res.text().then(txt => {
                  if (element.hasAttribute('pre')) {
                    let fixhtml = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;');
                    (element.hasAttribute('code')) ? element.innerHTML = "<pre><code>" + fixhtml + "</code></pre>": element.innerHTML = "<pre>" + fixhtml + "</pre>";
                  } else element.innerHTML = txt;
                  let saveView = JSON.stringify({
                    url: this.getAttribute('src'),
                    source: txt
                  });
                  localStorage.setItem('craft-tabs:' + this.getAttribute('cache-view'), saveView);
                });
              }).catch(res => log('warn', 'Could not fetch view for tab-view element -> ' + res)) : console.error('cache-view must have value longer than 2 characters');
        } else {
          fetch(this.getAttribute('src')).then(res => res.text().then(txt => {
              if (element.hasAttribute('pre')) {
                let fixhtml = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;');
                (element.hasAttribute('code')) ? element.innerHTML = "<pre><code>" + fixhtml + "</code></pre>": element.innerHTML = "<pre>" + fixhtml + "</pre>";
              } else element.innerHTML = txt;
            })).catch(res => console.warn(`Could not fetch view for tab-view element -> ${res}`));
          for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes('craft-tabs:')) {
              if (this.getAttribute('src') === JSON.parse(localStorage.getItem(localStorage.key(i))).url) localStorage.removeItem(localStorage.key(i));
            }
          }
        }
      }
    }
  });

  Craft.newComponent('tab-handles', {
    extends: 'div'
  });
  Craft.newComponent('tab-views', {
    extends: 'div'
  });


})(document, self);

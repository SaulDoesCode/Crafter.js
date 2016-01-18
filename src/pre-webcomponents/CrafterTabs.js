"use strict";
((doc, root) => {

  Craft.newComponent('crafter-tabs', {
    created() {
        let element = dom(this),
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

        this.handleClick = On(this).Click(e => {
          if (is.Node(e.target) && e.target.tagName === 'TAB-HANDLE') {
            queryEach('[active]', element, el => el.removeAttribute('active'));
            e.target.setActive();
            activeTab = this.tabs.indexOf(e.target);
          }
        });

        if (this.hasAttribute('selected')) {
          activeTab = parseInt(element.getAttr('selected'), 10);
          this.tabs[activeTab].handle.setAttribute('active', '');
          this.tabs[activeTab].view.setAttribute('active', '');
        } else {
          this.tabs[0].handle.setAttribute('active', '');
          this.tabs[0].view.setAttribute('active', '');
        }

        this.scrollHandle = On('wheel', 'tab-handles', this, e => {
          queryEach('[active]', element, el => el.removeAttribute('active'));
          (e.deltaY < 1) ? activeTab-- : activeTab++;
          e.preventDefault();
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
            let activeTab = parseInt(this.getAttribute('selected'), 10);
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
      manageAttributes(name) {
        if (name === 'src' && this.hasAttribute('src')) {
          let element = dom(this);
          if (element.hasAttr('cache-view')) {
            if (localStorage.getItem('craft-tabs:' + element.getAttr('cache-view')) !== null) {
              let cachedView = JSON.parse(localStorage.getItem('craft-tabs:' + element.getAttr('cache-view')));
              if (element.hasAttr('pre')) {
                let html = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;');
                element.html(element.hasAttr('code') ? `<pre><code>${html}</code></pre>` : `<pre>${html}</pre>`);
              } else element.html(cachedView.source);
            } else element.getAttr('cache-view').length > 2 ? fetch(element.getAttr('src')).then(res => res.text().then(txt => {
              if (element.hasAttr('pre')) {
                let fixhtml = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;');
                element.html(element.hasAttr('code') ? `<pre><code>${fixhtml}</code></pre>` : `<pre>${fixhtml}</pre>`);
              } else element.html(txt);
              localStorage.setItem('craft-tabs:' + element.getAttr('cache-view'), JSON.stringify({
                url: element.getAttr('src'),
                source: txt
              }));
            })).catch(res => console.warn(`Couldn't fetch tab-view src -> ${res}`)) : console.error('cache-view must have longer value');
          } else {
            fetch(element.getAttr('src')).then(res => res.text().then(txt => {
              if (element.hasAttr('pre')) {
                let fixhtml = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;');
                element.html(element.hasAttr('code') ? `<pre><code>${fixhtml}</code></pre>` : `<pre>${fixhtml}</pre>`);
              } else element.html(txt);
            })).catch(res => console.warn(`Couldn't fetch tab-view src -> ${res}`));
            for (let i = 0; i < localStorage.length; i++)
              if (localStorage.key(i).includes('craft-tabs:')) {
                if (element.getAttr('src') === JSON.parse(localStorage.getItem(localStorage.key(i))).url) localStorage.removeItem(localStorage.key(i));
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

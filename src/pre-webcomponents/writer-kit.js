((doc, root) => {

  hljs.initHighlighting();

  let md = new Remarkable('full', {
    html: true,
    linkify: true,
    typographer: true,
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }
      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}
      return '';
    }
  });

  Craft.newComponent('writing-block', {
    inserted() {
        let id = this.getAttribute('writer-id') , theme = this.getAttribute('writer-theme') , writerLanguage = this.getAttribute('writer-lang');
        Craft.newBind(id, '', (oldval, newval) => Craft.setBind('pre-' + id, md.render(newval)));
        this.codemirror = CodeMirror(this, {
          value: "### start writing",
          mode: this.hasAttribute('writer-lang') ? writerLanguage : "markdown",
          theme: this.hasAttribute('writer-theme') ? theme : 'monokai',
          lineNumbers: true,
          breaks: true,
          fixedGutter: true,
          dragDrop: true
        });
        setTimeout(() => {
          Craft.setBind(id, this.codemirror.getValue());
          this.Oninput = On('input', 'textarea', this, e => Craft.setBind(id, this.codemirror.getValue()));
          this.Onkey = On('keydown', 'textarea', this, e => Craft.setBind(id, this.codemirror.getValue()));
          this.Onclick = On('click','*', this,e => Craft.setBind(id, this.codemirror.getValue()));
        }, 50);
      },
      destroyed() {
        this.Oninput.Off();
        this.Onkey.Off();
        this.Onclick.Off();
      }
  });

  Craft.newComponent('writer-preview', {
    inserted() {
        this.setAttribute('view-bind', 'pre-' + this.getAttribute('writer-id'));
      },
      destroyed() {

      }
  });

})(document, window);

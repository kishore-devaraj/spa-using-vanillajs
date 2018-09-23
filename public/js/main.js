window.addEventListener('load', () => {
    const el = $('#app');
  
    // Compile Handlebar Templates
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const ratesTemplate = Handlebars.compile($('#rates-template').html());
    const exchangeTemplate = Handlebars.compile($('#exchange-template').html());
    const historicalTemplate = Handlebars.compile($('#historical-template').html());
  
    const router = new Router({
        mode: 'history',
        page404: (path) => {
          const html = errorTemplate({
            color: 'yellow',
            title: 'Error 404 - Page NOT Found!',
            message: `The path '/${path}' does not exist on this site`,
          });
          el.html(html);
        },
      });

      router.add('/', () => {
          const html = ratesTemplate()
          el.html(html)
      })

      router.add('/exchange', () => {
          const html = exchangeTemplate()
          el.html(html)
      })

      router.add('/historical', () => {
          const html = historicalTemplate()
          el.html(html)
      })

      // Navigate the current url on the load of the path (Initial)
      router.navigateTo(window.location.pathname)

      const link =  $(`a[href$='${window.location.pathnam}']`)
      link.addClass('active')

      $('a').on('click', (event) => {
          // Block browser reload behavious on reload
        event.preventDefault()
        const target = $(event.target)
        $('.item').removeClass('active') 
        target.addClass('active')  
     
        const href = target.attr('href')
        const path  = href.substring(href.lastIndexOf('/'))
        router.navigateTo(path)
    })
  });
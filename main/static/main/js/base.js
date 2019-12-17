function enable_menu_soft_scrolling() {
  // http://www.paitadesign.com/blog/jquery-smooth-scroll-scorrimento-morbido/

  $('a[href*=\\#]').click(function() {
    if (
      location.pathname.replace(
        /^\//,'') == this.pathname.replace(/^\//,''
      ) && location.hostname == this.hostname
    ) {
      var $target = $(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body').animate({scrollTop: targetOffset}, 500);
        return false;
      }
    }
  });
}


class PrismicClient {
  static BASE_URL = `https://${PRISMIC_REPO}.cdn.prismic.io/api/v2`;

  static callApi(url, reqData, callback, async = true) {
    let data_to_return = null;

    $.ajax({
      url: PrismicClient.BASE_URL + url,
      data: reqData,
      async: async,
    })
      .done((data, textStatus, jqXHR) => {
        if (callback) {
          callback(data);
        }
        if (!async) {
          data_to_return = data;
        }
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.log(`Prismic call failed: ${textStatus}`);
      });

    if (!async) {
      return data_to_return;
    }
  }

  static getRef() {
    let data = this.callApi("", null, null, false);

    for(let ref of data.refs) {
      if (ref.isMasterRef) {
        return ref.ref;
      }
    }
  }

  static getDocument(type, graphQuery, callback, ref = null) {
    this.callApi(
      "/documents/search",
      {
        q: `[[at(document.type,"${type}")]]`,
        graphQuery: graphQuery,
        ref: ref ? ref : this.getRef(),
      },
      callback,
    )
  }
}


function distribute_cms_scaffolding(data) {
  let data_ = data.results[0].data;

  for(let x of data_.navbar) {
    let item = $(`
			<li class="nav-item"><a class="nav-link" href="${x.item.data.path}">${x.item.data.label}</a></li>
		`);

    $(".navbar-nav").append(item);
  }

  enable_menu_soft_scrolling();

  $("#footer .watermark").html(`${data_.watermark}<br>${data_.year}`);
  $("#footer .cookie_policy").html(`${data_.cookie_policy}`);
}

$(function() {

  PrismicClient.getDocument(
    "scaffolding",
    `
		{
			scaffolding {
				...scaffoldingFields
				navbar {
					item {
						...itemFields
					}
				}
			}
		}
		`,
    distribute_cms_scaffolding
  );

});

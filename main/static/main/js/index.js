class EclecticBunnyLeftEar {
  static ROTATION_CENTER_X = 27;
  static ROTATION_CENTER_Y = 30.6322;

  static ROTATION_MIN_ANGLE = 195;
  static ROTATION_MAX_ANGLE = 248;
  static ROTATION_HEAD_ANGLE = 203.17;

  constructor(bunny, container) {
    this.bunny = bunny;
    this.element = container.find(".bunny_left_ear").first();

    this.isMoving = false;
    this.halt = false;
    this.moves = 0;
  }

  startMove() {
    this.halt = false;

    let ear = this;
    let cls = EclecticBunnyLeftEar;

    let transform_origin = `${cls.ROTATION_CENTER_X}% ${cls.ROTATION_CENTER_Y}%`;

    this.element
      .css("-ms-transform-origin", transform_origin)
      .css("-webkit-transform-origin", transform_origin)
      .css("transform-origin", transform_origin)
      .animate({
          "_angle": _.random(0, 44),
        }, {
          duration: _.random(400, 2000),
          easing: "easeOutExpo",
          start: function(now, fx) {
            ear.isMoving = true;
          },
          step: function(now, fx) {
            if(!ear.halt) {
              let transform = `rotate(${now}deg)`;
              $(this)
                .css("-ms-transform", transform)
                .css("-webkit-transform", transform)
                .css("transform", transform);
            } else {
              fx.options.complete(now, fx);
            }
          },
          complete: function(now, fx) {
            ear.isMoving = false;
            ear.moves++;

            if(!ear.halt) {
              let moveLeftEarIntervalWait = setInterval(function() {
                clearInterval(moveLeftEarIntervalWait);
                if(!ear.halt) {
                  ear.startMove();
                }
              }, _.random(0, ear.moves < 5 ? 500 : 4000));
            }
          },
        }
      );

    this.element.cursorSpy({
      head: cls.ROTATION_HEAD_ANGLE,
      rotationCenterX: cls.ROTATION_CENTER_X,
      rotationCenterY: cls.ROTATION_CENTER_Y,
      step: function(meSpy, deg, distance) {
        if(deg < cls.ROTATION_MIN_ANGLE || deg > cls.ROTATION_MAX_ANGLE) {
          ear.startMove();
          return false;
        }

        ear.stopMove();
        return deg;
      }
    });

  }

  stopMove() {
    this.halt = true;
  }
}


class EclecticBunny {

  static STATIC_PATH = `${STATIC_ROOT}main/img/bunny/`;
  static COMPONENTS = {
    // <class-name>: <file-name>,
    bunny_body: 'eclectic_bunny_body',
    bunny_left_ear: 'eclectic_bunny_left_ear',
    bunny_right_ear: 'eclectic_bunny_right_ear',
  };

  constructor(container) {

    for (let class_name in EclecticBunny.COMPONENTS) {
      let name = EclecticBunny.COMPONENTS[class_name];
      let component = $(`<img class="bunny_component ${class_name}">`);
      component.prop("src", `${EclecticBunny.STATIC_PATH}${name}.svg`);

      container.append(component);
    }

    this.leftEar = new EclecticBunnyLeftEar(this, container);
  }

  startMove() {
    this.leftEar.startMove()
  }
}


function distribute_cms_index(data) {
  let data_ = data.results[0].data;

  $('#me').html(richTextAsHtml(data_.description_body));

  for(let x of data_.contacts) {
    let html = $(`
        <span class="icon">
            <a href="${x.item.data.link.data.link.url}" target=_blank><i class="fa ${x.item.data.fa_class}"></i></a>
        </span>
    `);

    $('#contacts').append(html);
  }

  for(let [i, x] of data_.projects.entries()) {
    let prjData = x.project.data;
    let html = $(`
        <div class="exp container inset-block">
            <div class="row">
              <div class="col-lg-12">
                  <h2>${prjData.name}</h2>
              </div>

              <div class="col-lg-6 image" style="background-image: url(${prjData.image.url})"></div>

              <div class="col-lg-6 description">
                  <p>${richTextAsHtml(prjData.description)}</p>
                  <a href="${prjData.demo_link.url}" class="demo-link" target=_blank>
                      <i class="fa fa-external-link-square">&nbsp;</i>${data_.demo_cta}
                  </a><br>
                  <a href="${prjData.repo_link.url}" class="repo-link" target=_blank>
                      <i class="fa fa-github-square">&nbsp;</i>${data_.repo_cta}
                  </a>
              </div>
              <div class="clear"></div>
            </div>
        </div>
    `);

    if (i % 2) {
      $('.projects_right_column').append(html);
    } else {
      $('.projects_left_column').append(html);
    }
  }
}


$(function() {

  let daddyBunny = new EclecticBunny($("#daddy_bunny"));
  daddyBunny.startMove();

  let leftKidBunny = new EclecticBunny($("#left_kid_bunny"));
  leftKidBunny.startMove();

  let rightKidBunny = new EclecticBunny($("#right_kid_bunny"));
  rightKidBunny.startMove();

  PrismicClient.getDocument(
    "index",
    `
		{
			index {
				...indexFields
				contacts {
					item {
						...itemFields
						link {
							...linkFields
						}
					}
				}
				projects {
					project {
						...projectFields
					}
				}
			}
		}
		`,
    distribute_cms_index
  );

});

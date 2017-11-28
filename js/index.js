$(function () {
  var $innerWrap = $('.innerWrap')
  var pageHeight = parseInt($innerWrap.children().css('height'))
  console.log(pageHeight);
  var $lis = $('.nav>li')
  var $pointWrap = $('.point')
  var $points = $('.point>li')
  var $nav = $('.nav')
  var $pics = $('.pics')
  var $move = $('.move')

  var pageIndex = 0
  var isLast = false
  $('body').on('mousewheel DOMMouseScroll', function (event) {
    event = event || window.event
    if (isLast) {
      return
    }
    if (pageIndex === 4) {
      hide()
      isLast = true
    }

    if (event.originalEvent.wheelDelta > 0) {
      pageIndex = --pageIndex
      if (pageIndex < 0) {
        pageIndex = 0
      }
    } else {
      pageIndex = ++pageIndex
      if (pageIndex > 4) {
        pageIndex = 4
      }

    }
    console.log(pageIndex);
    $lis.removeClass('active')
    $points.removeClass('active')
    $lis[pageIndex].setAttribute('class', 'active')
    $points[pageIndex].setAttribute('class', 'active')
    $innerWrap.css('top', -pageIndex * pageHeight + 'px')
    // animation(pageIndex)
    if (pageIndex > 0) {
      var num = 0
      var timer = setInterval(function () {
        $pics.eq(pageIndex - 1).children().eq(num).removeClass('hide')
        num++
        if (!$pics.eq(pageIndex - 1).children().eq(num)) {
          clearInterval(timer)
        }
      }, 500)
    }
    isLast = false
  })

  $lis.map(function (index, item) {
    $(this).click(function () {
      if (isLast) {
        return
      }
      if (pageIndex === 4) {
        hide()
        isLast = true
      }
      $lis.removeClass('active')
      $points.removeClass('active')
      $innerWrap.css('top', -index * pageHeight + 'px')
      $(this).addClass('active')
      $points[index].setAttribute('class', 'active')
      // animation(index)
      if (index > 0) {
        var num = 0
        var timer = setInterval(function () {
          $pics.eq(index - 1).children().eq(num).removeClass('hide')
          num++
          if (!$pics.eq(index - 1).children().eq(num)) {
            clearInterval(timer)
          }
        }, 500)
      }

      isLast = false
    })

  })

  $points.map(function (index, item) {
    $(this).click(function () {
      if (isLast) {
        return
      }
      if (pageIndex === 4) {
        hide()
        isLast = false
        return
      }
      $lis.removeClass('active')
      $points.removeClass('active')
      $innerWrap.css('top', -index * pageHeight + 'px')
      $(this).addClass('active')
      $lis[index].setAttribute('class', 'active')
      // animation(index)
      if (index > 0) {
        var num = 0
        var timer = setInterval(function () {
          $pics.eq(index - 1).children().eq(num).removeClass('hide')
          num++
          if (!$pics.eq(index - 1).children().eq(num)) {
            clearInterval(timer)
          }
        }, 500)
      }

    })

  })

  function hide () {
    $move.addClass('hide')
  }
})
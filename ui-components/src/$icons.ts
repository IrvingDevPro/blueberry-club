import { $svg, attr } from "@aelea/dom"
import { TOKEN_SYMBOL } from "@gambitdao/gmx-middleware"

export const $path = $svg('path')



export const $check = $path(
  attr({
    d: 'M21 11.086v.92a8.966 8.966 0 01-2.64 6.362A8.965 8.965 0 0111.995 21a8.968 8.968 0 01-6.362-2.64A8.973 8.973 0 013 11.995a8.965 8.965 0 012.64-6.362A8.97 8.97 0 0112.005 3a8.844 8.844 0 013.649.775 1 1 0 10.83-1.819A10.849 10.849 0 0012.007 1a10.97 10.97 0 00-7.78 3.217A10.97 10.97 0 001 11.994a10.97 10.97 0 003.217 7.78A10.963 10.963 0 0011.993 23a10.974 10.974 0 007.78-3.217A10.969 10.969 0 0023 12.006v-.92a1 1 0 00-2 0zm.293-7.787L12 12.601l-2.293-2.292a.999.999 0 10-1.414 1.414l3 3c.39.391 1.024.39 1.415 0l10-10.01A1 1 0 1021.293 3.3v-.001z'
  })
)()

export const $target = $path(
  attr({
    d: 'M27.907 14.5A12.006 12.006 0 0017.5 4.093V1h-3v3.093A12.006 12.006 0 004.093 14.5H1v3h3.093A12.006 12.006 0 0014.5 27.907V31h3v-3.093A12.006 12.006 0 0027.907 17.5H31v-3h-3.093zM16 7a9 9 0 110 18 9 9 0 010-18zm0 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z'
  })
)()

export const $share = $path(
  attr({
    d: 'M25.333 22.177c1.264 0 2.334.435 3.209 1.305.875.87 1.312 1.895 1.312 3.07 0 1.224-.45 2.271-1.349 3.142-.9.87-1.956 1.306-3.172 1.306-1.215 0-2.272-.435-3.171-1.306-.9-.87-1.35-1.918-1.35-3.141 0-.47.025-.8.073-.988l-11.01-6.212c-.924.8-1.993 1.2-3.208 1.2-1.264 0-2.358-.447-3.282-1.341C2.462 18.318 2 17.259 2 16.035c0-1.223.462-2.282 1.385-3.176.924-.894 2.018-1.341 3.282-1.341 1.215 0 2.284.4 3.208 1.2l10.938-6.142c-.098-.47-.146-.823-.146-1.058 0-1.224.461-2.283 1.385-3.177C22.976 1.447 24.07 1 25.333 1c1.264 0 2.358.447 3.282 1.341C29.538 3.235 30 4.294 30 5.518c0 1.223-.462 2.282-1.385 3.176-.924.894-2.018 1.341-3.282 1.341-1.166 0-2.236-.423-3.208-1.27l-10.938 6.211c.098.471.146.824.146 1.06 0 .235-.048.587-.146 1.058l11.084 6.212c.875-.753 1.896-1.13 3.062-1.13z'
  })
)()

export const $moreDots = $path(
  attr({
    d: 'M19.333 16c0-.828-.375-1.58-.976-2.121A3.522 3.522 0 0016 13c-.92 0-1.755.338-2.357.879-.601.542-.976 1.293-.976 2.121 0 .828.375 1.58.976 2.121A3.522 3.522 0 0016 19c.92 0 1.755-.337 2.357-.879.601-.541.976-1.293.976-2.121zM31 16c0-.828-.375-1.58-.977-2.121A3.521 3.521 0 0027.667 13c-.92 0-1.755.338-2.357.879-.602.542-.977 1.293-.977 2.121 0 .828.375 1.58.977 2.121a3.522 3.522 0 002.357.879c.92 0 1.755-.337 2.356-.879.602-.541.977-1.293.977-2.121zM7.667 16c0-.828-.375-1.58-.977-2.121A3.522 3.522 0 004.333 13c-.92 0-1.755.338-2.356.879C1.375 14.421 1 15.172 1 16c0 .828.375 1.58.977 2.121A3.522 3.522 0 004.333 19c.92 0 1.755-.337 2.357-.879.602-.541.977-1.293.977-2.121z'
  })
)()

export const $arrowsFlip = $path(
  attr({
    d: 'M8.774 14.2h9.414c.448 0 .812-.313.812-.7 0-.387-.364-.7-.813-.7H8.774l1.863-1.605a.634.634 0 000-.99.908.908 0 00-1.15 0l-3.25 2.8a.76.76 0 00-.053.051l-.022.025-.025.03-.022.03-.02.03-.017.03-.016.031-.014.032c-.004.01-.01.022-.013.033l-.01.032-.01.034-.006.037-.005.03a.608.608 0 000 .14l.005.03.007.037c.002.012.006.023.01.034.003.011.005.022.009.032l.013.034.014.03.016.031.018.032.02.028.02.03.026.03.022.026a.736.736 0 00.054.05v.001l3.25 2.8a.908.908 0 001.149 0 .634.634 0 000-.99L8.774 14.2zM25.816 18.507l.022-.029.025-.034.022-.035.02-.032.017-.036.016-.035.014-.036c.004-.012.01-.025.013-.038l.01-.036.01-.04.006-.042.005-.035a.801.801 0 000-.158l-.005-.035-.007-.042c-.002-.014-.006-.027-.01-.04l-.009-.036-.014-.038-.013-.036-.016-.035-.018-.036-.02-.032-.02-.035-.026-.034-.022-.03a.78.78 0 00-.053-.057l-3.25-3.2a.822.822 0 00-1.15 0 .791.791 0 000 1.13l1.863 1.835h-9.413A.806.806 0 0013 18c0 .442.364.8.813.8h9.413l-1.863 1.834a.791.791 0 000 1.132.822.822 0 001.15 0l3.25-3.2v-.001a.824.824 0 00.053-.058z'
  })
)()

export const $xCross = $path(
  attr({
    d: 'M22.36 23.992a1.517 1.517 0 01-1.065-.445L8.366 10.53a1.54 1.54 0 01.166-2.161 1.515 1.515 0 011.981 0l13.005 13.016a1.54 1.54 0 010 2.239 1.516 1.516 0 01-1.157.368z M9.53 23.997a1.525 1.525 0 01-1.085-.368 1.542 1.542 0 010-2.167L21.426 8.415a1.524 1.524 0 012.161.072c.522.56.553 1.422.072 2.018L10.6 23.629c-.297.256-.68.387-1.07.368z'
  })
)()


export const $alertIcon = $svg('g')(
  $path(
    attr({
      'fill-rule': 'evenodd',
      'clip-rule': 'evenodd',
      d: 'M1.99 14.391L9.61 22.01a3.382 3.382 0 004.782 0l7.618-7.617a3.382 3.382 0 000-4.783L14.392 1.99a3.382 3.382 0 00-4.783 0L1.99 9.609a3.382 3.382 0 000 4.782zm.91-.217l6.926 6.925c1.2 1.201 3.147 1.201 4.348 0l6.925-6.925c1.201-1.2 1.201-3.147 0-4.348l-6.925-6.925a3.075 3.075 0 00-4.348 0L2.901 9.826a3.075 3.075 0 000 4.348z'
    })
  )(),
  $path(
    attr({

      d: 'M11 16.8c0 .662.447 1.2 1 1.2.552 0 1-.538 1-1.2 0-.662-.448-1.2-1-1.2-.553 0-1 .538-1 1.2zM12 14c.552 0 1-.538 1-1.2V7.2c0-.663-.448-1.2-1-1.2-.553 0-1 .537-1 1.2v5.6c0 .662.447 1.2 1 1.2z'
    })
  )()
)


export const $caretDown = $path(attr({ d: 'M3.92 3.81a.85.85 0 01-.48-.15L.36 1.54A.85.85 0 01.15.36.84.84 0 011.32.15l2.6 1.79L6.52.15a.84.84 0 011.17.21.85.85 0 01-.21 1.18L4.4 3.66a.83.83 0 01-.48.15z' }))()
// export const $caretDown = $svg('path')(attr({ d: 'M4.616.296c.71.32 1.326.844 2.038 1.163L13.48 4.52a6.105 6.105 0 005.005 0l6.825-3.061c.71-.32 1.328-.84 2.038-1.162l.125-.053A3.308 3.308 0 0128.715 0a3.19 3.19 0 012.296.976c.66.652.989 1.427.989 2.333 0 .906-.33 1.681-.986 2.333L18.498 18.344a3.467 3.467 0 01-1.14.765c-.444.188-.891.291-1.345.314a3.456 3.456 0 01-1.31-.177 2.263 2.263 0 01-1.038-.695L.95 5.64A3.22 3.22 0 010 3.309C0 2.403.317 1.628.95.98c.317-.324.68-.568 1.088-.732a3.308 3.308 0 011.24-.244 3.19 3.19 0 011.338.293z' }))()

export const $caretDblDown = $path(attr({ d: 'M15.97 28.996c-.497 0-.983-.176-1.37-.493L1.77 17.793a2.15 2.15 0 01-.275-3.021 2.142 2.142 0 013.017-.276l11.465 9.6 11.464-9.254a2.143 2.143 0 013.011.311l.006.012a2.14 2.14 0 01-.175 3.022l-.124.106-12.83 10.345c-.41.258-.884.387-1.358.358z M15.97 18.996c-.497 0-.983-.176-1.37-.493L1.77 7.793a2.15 2.15 0 01-.275-3.021 2.142 2.142 0 013.017-.276l11.465 9.6L27.44 4.842a2.143 2.143 0 013.011.311l.006.012a2.14 2.14 0 01-.175 3.022l-.124.106-12.83 10.345c-.41.258-.884.387-1.358.358z' }))()

export const $bull = $path(attr({ d: 'M29.832 7.782c-.65-3.088-3.175-4.65-7.724-4.781a.345.345 0 00-.356.27.35.35 0 00.18.404c2.017 1.054 3.06 2.274 3.279 3.844.242 1.787-1.695 2.408-3.576 2.69a2.073 2.073 0 00-1.649-.669 3.943 3.943 0 00-1.65.375 9.498 9.498 0 01-2.326.449h-.02a9.494 9.494 0 01-2.326-.449 3.942 3.942 0 00-1.65-.375 2.074 2.074 0 00-1.65.67c-1.88-.283-3.818-.904-3.575-2.691.22-1.57 1.261-2.79 3.28-3.844a.35.35 0 00.179-.405.344.344 0 00-.356-.27c-4.548.132-7.075 1.694-7.724 4.782-.774 3.677 1.21 5.83 4.29 7.276l-.372.454-.637.707c-.623.681-1.17 1.376-1.19 2.13a1.616 1.616 0 00.403 1.219 1.747 1.747 0 001.32.456c.315-.005.63-.036.94-.092a25.37 25.37 0 002.18-.486c.274.745.799 2.123 1.245 3.06.338.714.598 1.463.776 2.233-.09.546-.314 2.472.748 3.534.834.834 2.48 1.01 3.713 1.01.194 0 .339-.007.41-.01h.01c.07.003.215.01.41.01 1.233 0 2.878-.176 3.712-1.01 1.063-1.062.838-2.988.748-3.534.178-.77.439-1.519.777-2.234.448-.936.971-2.315 1.244-3.059.52.138 1.346.343 2.18.486.31.056.625.087.94.092a1.747 1.747 0 001.32-.456 1.617 1.617 0 00.404-1.22c-.02-.753-.567-1.448-1.19-2.13l-.638-.706-.372-.454c3.083-1.446 5.067-3.599 4.293-7.276zm-16.288 10.61a1.597 1.597 0 01-1.365.78 1.59 1.59 0 01-1.432-2.281 1.58 1.58 0 01.445-.553.59.59 0 01.755.018l1.477 1.271a.618.618 0 01.12.766zm6.28.78a1.598 1.598 0 01-1.366-.78.617.617 0 01.12-.765l1.478-1.271a.591.591 0 01.755-.018 1.58 1.58 0 01.136 2.367 1.591 1.591 0 01-1.123.465v.001z' }))()
export const $bear = $path(attr({ d: 'M16.533 21.364v5.854c-.007-.01-1.07.012-1.067 0v-5.854a.92.92 0 01-.112-.095l-1.534-1.52a.927.927 0 01-.207-1.014.924.924 0 01.853-.577h3.069a.913.913 0 01.852.577.933.933 0 01-.207 1.013l-1.534 1.52a.885.885 0 01-.113.096zm11.303-10.418c.808 2.116 3.348 9.594.468 13.197-2.787 3.487-7.35 4.693-9.3 5.208-3.002.865-3.008.865-6.01 0-1.949-.515-6.513-1.72-9.3-5.208-2.88-3.604-.34-11.08.468-13.197-.782-.612-2.163-1.967-2.163-3.891C1.999 4.55 4.1 2 6.163 2h.082c1.363.047 2.497 1.483 3.097 2.415a3.714 3.714 0 011.953-.657h9.409c.7.03 1.376.258 1.953.657.597-.932 1.734-2.368 3.097-2.415h.081C27.898 2 30 4.55 30 7.055c0 1.923-1.381 3.279-2.164 3.891zM11.181 14.8c.469 0 .925-.157 1.297-.446.371-.288.638-.693.758-1.15a.743.743 0 00-.315-.811l-2.243-1.438a.727.727 0 00-.862.057 2.136 2.136 0 00-.762 1.644c0 .568.225 1.113.624 1.515.398.402.939.629 1.503.63zm9.487 6.157a5.659 5.659 0 00-.651-2.644 5.605 5.605 0 00-1.807-2.025A3.659 3.659 0 0016 15.55a3.659 3.659 0 00-2.211.736 5.605 5.605 0 00-1.807 2.025 5.659 5.659 0 00-.651 2.644c0 2.913 2.011 4.16 3.698 4.692a3.24 3.24 0 001.94 0c1.687-.533 3.699-1.778 3.699-4.692zm2.277-8.301a2.155 2.155 0 00-.762-1.644.729.729 0 00-.863-.057l-2.243 1.438a.737.737 0 00-.315.81c.12.458.387.863.759 1.151.372.29.828.446 1.297.446a2.12 2.12 0 001.503-.628c.4-.403.623-.948.624-1.516z' }))()
export const $skull = $path(attr({ d: 'M16 2C8.267 2 2 7.486 2 14.249a11.719 11.719 0 005.169 9.5 1.72 1.72 0 01.738 1.636l-.516 3.628a.868.868 0 00.86.994H12.5v-3.07a.438.438 0 01.438-.437h.875a.438.438 0 01.438.438V30h3.498v-3.062a.438.438 0 01.438-.438h.875a.438.438 0 01.438.438V30h4.25a.869.869 0 00.858-.994l-.515-3.628a1.713 1.713 0 01.738-1.635A11.719 11.719 0 0030 14.244C30 7.486 23.733 2 16 2zm-5.251 17.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm10.5 0a3.5 3.5 0 110-7 3.5 3.5 0 010 7z' }))()


export const $external = $path(
  attr({ d: 'M17.5 13.1v6.6c0 .304-.122.578-.322.778-.2.2-.474.322-.778.322H4.3c-.304 0-.577-.122-.778-.322-.2-.2-.322-.474-.322-.778V7.6c0-.304.122-.577.322-.778.2-.2.474-.322.778-.322h6.6a1.1 1.1 0 000-2.2H4.3c-.91 0-1.738.37-2.333.967A3.297 3.297 0 001 7.6v12.1c0 .91.37 1.738.967 2.333A3.297 3.297 0 004.3 23h12.1c.91 0 1.738-.37 2.333-.967A3.297 3.297 0 0019.7 19.7v-6.6a1.1 1.1 0 00-2.2 0zm-6.922 1.878L20.8 4.755V8.7a1.1 1.1 0 002.2 0V2.1a1.094 1.094 0 00-.321-.777l-.002-.002A1.095 1.095 0 0021.9 1h-6.6a1.1 1.1 0 000 2.2h3.945L9.022 13.422a1.099 1.099 0 101.556 1.556z' })
)()

export const $ethScan = $path(
  attr({ d: 'M5.572 11.475a.934.934 0 01.937-.933l1.553.005a.934.934 0 01.933.934v5.874c.175-.052.4-.107.646-.165a.778.778 0 00.6-.757V9.146a.935.935 0 01.933-.934h1.556a.934.934 0 01.934.934v6.763s.39-.158.769-.318a.78.78 0 00.475-.717V6.81a.935.935 0 01.934-.934h1.556a.934.934 0 01.934.934v6.64c1.349-.979 2.716-2.155 3.8-3.57a1.568 1.568 0 00.24-1.463A10.982 10.982 0 0012.138 1C6.039.919.998 5.899 1 12.001a10.968 10.968 0 001.46 5.502 1.39 1.39 0 001.326.688c.295-.026.661-.063 1.097-.114a.777.777 0 00.69-.772v-5.83zM5.538 20.896a10.991 10.991 0 0017.433-9.649c-4.017 5.994-11.434 8.795-17.433 9.649z' })
)()

export const $github = $path(
  attr({
    d: 'M22.278 30.963c-.475-.126-.657-.556-.657-.937 0-.64.02-2.742.02-5.349 0-1.82-.606-3.01-1.284-3.616C24.576 20.58 29 18.929 29 11.44c0-2.128-.733-3.873-1.946-5.235.192-.492.845-2.473-.189-5.16 0 0-1.586-.525-5.202 2.002a17.661 17.661 0 00-4.738-.66c-1.612.008-3.231.223-4.738.66C8.571.524 6.98 1.045 6.98 1.045c-1.03 2.687-.38 4.668-.184 5.16C5.586 7.567 4.85 9.308 4.85 11.44c0 7.472 4.42 9.146 8.622 9.638-.54.487-1.03 1.345-1.201 2.607-1.08.496-3.822 1.358-5.508-1.623 0 0-1-1.872-2.901-2.01 0 0-1.85-.026-.13 1.185 0 0 1.243.598 2.101 2.851 0 0 1.114 3.793 6.38 2.616.007 1.627.024 2.855.024 3.317 0 .386-.19.818-.68.938l10.721.004z'
  })
)()
export const $twitter = $path(
  attr({
    d: 'M23 5.129a8.85 8.85 0 01-2.59.714 4.565 4.565 0 001.984-2.514c-.872.52-1.838.9-2.865 1.103A4.498 4.498 0 0016.234 3c-2.492 0-4.511 2.034-4.511 4.543 0 .355.039.701.116 1.034-3.75-.19-7.076-1.999-9.301-4.75a4.57 4.57 0 00-.61 2.284c0 1.575.795 2.968 2.006 3.782a4.493 4.493 0 01-2.045-.567v.056a4.537 4.537 0 003.622 4.457 4.488 4.488 0 01-2.04.078c.575 1.804 2.242 3.12 4.214 3.159A9.01 9.01 0 011 18.958 12.699 12.699 0 007.92 21c8.3 0 12.842-6.927 12.842-12.933 0-.2-.005-.394-.013-.589A9.119 9.119 0 0023 5.128z'
  })
)()
export const $gitbook = $path(
  attr({
    d: 'M14.502 23.341c.484 0 .878.4.878.893a.886.886 0 01-.878.893.886.886 0 01-.877-.893c0-.492.393-.893.877-.893zm13.78-5.532a.886.886 0 01-.877-.892c0-.493.394-.894.878-.894.483 0 .877.401.877.894a.886.886 0 01-.877.892zm0-3.658c-1.498 0-2.717 1.24-2.717 2.766 0 .296.049.592.144.88l-8.976 4.863a2.693 2.693 0 00-2.231-1.192c-1.036 0-1.98.604-2.437 1.547l-8.064-4.328c-.852-.456-1.49-1.884-1.422-3.184.035-.678.265-1.204.615-1.408.223-.128.49-.117.775.034l.054.03c2.136 1.145 9.13 4.894 9.424 5.033.455.214.707.301 1.481-.072l14.457-7.653c.211-.081.459-.288.459-.601 0-.436-.443-.607-.444-.607-.822-.402-2.086-1.004-3.319-1.591-2.634-1.256-5.62-2.679-6.932-3.378-1.132-.603-2.044-.095-2.206.008l-.316.16c-5.902 2.97-13.802 6.952-14.251 7.23-.806.499-1.304 1.492-1.369 2.726-.1 1.955.88 3.994 2.28 4.742l8.528 4.476C12.007 25.986 13.152 27 14.502 27c1.485 0 2.695-1.218 2.717-2.724l9.392-5.18a2.69 2.69 0 001.672.586c1.498 0 2.717-1.24 2.717-2.765 0-1.526-1.22-2.766-2.717-2.766z'
  })
)()

export const $discord = $path(
  attr({
    d: 'M27.605 7.728A12.798 12.798 0 0020.3 5l-.359.418a17.08 17.08 0 016.472 3.291 22.112 22.112 0 00-19.415-.75c-.836.39-1.386.68-1.501.736a17.699 17.699 0 016.806-3.392L12.05 5a12.793 12.793 0 00-7.295 2.728A34.726 34.726 0 001 22.87a9.418 9.418 0 007.925 3.956s.968-1.17 1.748-2.166a8.08 8.08 0 01-4.548-3.06c.376.26 1.01.62 1.055.65a18.93 18.93 0 0016.224.909c1.05-.396 2.053-.91 2.988-1.53a8.29 8.29 0 01-4.705 3.09c.78.981 1.717 2.107 1.717 2.107a9.497 9.497 0 007.94-3.956 34.51 34.51 0 00-3.74-15.142v-.001zm-13.641 9.846a2.754 2.754 0 01-2.643 2.887 2.895 2.895 0 010-5.774h.043a2.739 2.739 0 012.6 2.728v.159zm6.609 2.424a2.661 2.661 0 01.23-5.311 2.755 2.755 0 012.642 2.887 2.647 2.647 0 01-2.872 2.424z'
  })
)()

export const $instagram = $path(
  attr({
    d: 'M20.8 16a4.8 4.8 0 11-9.6 0 4.8 4.8 0 019.6 0zM31 9.4v13.2a8.41 8.41 0 01-8.4 8.4H9.4A8.41 8.41 0 011 22.6V9.4A8.41 8.41 0 019.4 1h13.2A8.41 8.41 0 0131 9.4zM23.2 16a7.2 7.2 0 10-7.2 7.2 7.208 7.208 0 007.2-7.2zm2.4-7.8a1.8 1.8 0 10-3.6 0 1.8 1.8 0 003.6 0z'
  })
)()



export const $gmx = $path(
  attr({
    d: 'M1.163 26.401c-.162.194-.212.437-.11.522.082.068 20.794.11 20.897.043.058-.039.02-.194-.074-.31a.39.39 0 01-.076-.122c0-.015-.025-.053-.054-.085a7.702 7.702 0 01-.394-.59 5.145 5.145 0 00-.264-.394.633.633 0 01-.072-.122c-.028-.058-.06-.106-.073-.106l-4.349-6.65a.093.093 0 01-.039-.066c0-.023-.024-.07-.053-.105a3.373 3.373 0 01-.174-.25c-.159-.248-.213-.246-.374.018-.068.111-.148.23-.177.265-.03.035-.054.074-.054.087 0 .014-.018.044-.039.067a3.883 3.883 0 00-.185.271l-2.164 3.304a.61.61 0 00-.082.138c-.022.05-.048.09-.058.09-.01 0-.046.046-.077.103-.136.242 0 .222-1.536.222H10.2l.132-.198.193-.289 5.014-7.644c.076-.113.172-.261.214-.33.39-.625.421-.643.604-.343.033.054.07.112.083.13.013.018.083.128.154.244l1.65 2.525c.044.052.376.558.594.907l4.951 7.564a95.647 95.647 0 00.884 1.356c.047.072.12.174.16.228l.077.098 2.863.01c3.65.012 3.428.056 2.989-.596l-.256-.39L16.685 4.857c-.124-.204-.355-.56-.396-.61l-.112-.139c-.077-.096-.19-.133-.287-.093L1.162 26.401z',
  })
)()

export const $walletConnectLogo = $path(
  attr({
    d: 'M7.142 9.778c4.892-5.037 12.824-5.037 17.716 0l.59.606a.659.659 0 010 .912l-2.015 2.074a.307.307 0 01-.443 0l-.81-.834a8.563 8.563 0 00-12.36 0l-.868.894a.307.307 0 01-.442 0l-2.015-2.074a.659.659 0 010-.912l.647-.666zm21.882 4.29l1.793 1.845a.658.658 0 010 .912l-8.084 8.323a.614.614 0 01-.885 0l-5.737-5.907a.153.153 0 00-.222 0l-5.736 5.907a.614.614 0 01-.886 0l-8.084-8.323a.659.659 0 010-.912l1.793-1.846a.614.614 0 01.886 0l5.737 5.907c.061.063.16.063.221 0l5.737-5.907a.614.614 0 01.886 0l5.737 5.907c.06.063.16.063.221 0l5.737-5.907a.614.614 0 01.886 0z',
  })
)()



export const $glp = $path(attr({ d: 'M29.79 9.507h-4.012l-.1-.14A11.747 11.747 0 0014.033 4.42C8.054 5.434 3.817 10.884 4.293 16.9l7.145.012-2.08-5.876 2.556-3.496 4.551 12.943-11.47-.012h-3.56l-.062-.226a13.521 13.521 0 01-.377-1.717C-.408 10.257 5.183 2.39 13.456.998c6.582-1.114 13.05 2.119 16.096 8.058l.238.45zm1.429 6.502c0 7.28-5.253 13.744-12.673 14.997a16.43 16.43 0 01-2.583.213A15.135 15.135 0 012.44 22.9l-.238-.451h3.986l.1.137a11.765 11.765 0 0011.658 4.963c5.979-1.016 10.203-6.466 9.727-12.492l-7.12-.014 2.08 5.877-2.544 3.496-4.563-12.943 15.017.025.063.226c.172.57.306 1.152.401 1.742.145.84.216 1.69.213 2.543z' }))()
export const $btc = $path(attr({ d: 'M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.189-17.98c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z' }))()
export const $bnb = $path(attr({ d: 'M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-3.884-17.596L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26 2.26L10.52 16l-2.26-2.26L6 16zm6.116 1.596l-2.263 2.257.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48l-3.884-3.884zM21.48 16l2.26 2.26L26 16l-2.26-2.26L21.48 16zm-3.188-.002h.001L16 13.706 14.305 15.4l-.195.195-.401.402-.004.003.004.003 2.29 2.291 2.294-2.293.001-.001-.002-.001z' }))()
export const $uni = $path(attr({ d: 'M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0a15.932 15.932 0 00-9.9 3.43c2.572 3.002 6.641 7.78 7.061 8.29l.173.194-.016.319c-.015.432-.147.723-.445 1.015-.34.345-.77.529-1.438.626-.405.054-.547.124-.72.318-.156.184-.222.421-.263 1.004-.066.923-.172 1.296-.577 2.203-.39.88-.471 1.198-.405 1.673.076.556.38.977 1.083 1.49.537.388.785.637.917.944.076.195.091.265.091.583 0 .502-.076.697-.39 1.058-.511.589-1.438 1.058-2.562 1.339-.471.113-.496.113-.496 0 0-.135-.183-.513-.481-1.015-.355-.572-.497-.863-.628-1.311-.147-.503-.198-.837-.172-1.366.03-.497.08-.723.263-1.112.147-.324.238-.464.825-1.242 1.008-1.322 1.357-2.1 1.489-3.2.116-.988.273-1.463.628-1.879.212-.248.263-.345.263-.529 0-.08-.324-.766-1.331-2.672l-.019-.035C7.548 7.45 7.397 7.162 7.416 7.15c.003-.001.008.002.013.005.01.016.755 1.225 1.63 2.688 1.15 1.91 1.662 2.704 1.778 2.828.172.178.42.292.628.292.182 0 .562-.108.744-.222.324-.194.405-.459.208-.74-.201-.282-3.586-4.708-6.467-8.45A15.97 15.97 0 000 16c0 8.837 7.163 16 16 16zM8.457 21.404a.599.599 0 00-.172-.767c-.223-.15-.562-.08-.562.125 0 .053.025.113.106.14.117.07.132.14.04.291-.09.151-.09.292.026.389.182.156.43.07.562-.178zm4.168-14.261c-.274-.043-.289-.054-.157-.07.248-.044.825.016 1.23.113.942.237 1.788.847 2.69 1.922l.232.291.34-.054c1.448-.248 2.936-.054 4.182.556.34.167.876.502.942.583.025.027.066.21.091.389.091.653.05 1.144-.142 1.516-.106.211-.106.265-.04.449.05.14.207.237.354.237.314 0 .638-.529.795-1.268l.066-.292.117.14c.668.794 1.19 1.895 1.266 2.672l.025.21-.116-.183c-.198-.318-.38-.529-.628-.712-.446-.319-.917-.416-2.158-.486-1.124-.07-1.762-.167-2.39-.389-1.073-.378-1.62-.863-2.886-2.66-.562-.794-.917-1.226-1.266-1.588-.77-.793-1.545-1.209-2.547-1.376zm9.732 1.765c.026-.53.091-.88.233-1.198.05-.125.107-.238.117-.238.015 0-.015.097-.05.21-.107.308-.117.74-.052 1.226.092.626.132.712.76 1.393.289.318.628.723.76.89l.222.308-.222-.222c-.274-.28-.902-.81-1.044-.88-.09-.053-.106-.053-.172.017-.05.054-.066.14-.066.545-.015.626-.09 1.015-.288 1.42-.107.21-.116.167-.026-.07.067-.184.076-.265.076-.864 0-1.21-.131-1.506-.926-1.992a10.925 10.925 0 00-.73-.405 3.05 3.05 0 01-.354-.183c.025-.027.795.21 1.1.345.455.194.536.21.587.194.035-.032.06-.145.075-.496zm-10.02-.918c-.077.934.277 2.186.824 2.996.43.626 1.094 1.112 1.59 1.171.325.027.416-.086.274-.307-.208-.308-.456-.794-.522-1.004a10.6 10.6 0 01-.197-.848c-.218-1.144-.456-1.603-.977-1.938a3.073 3.073 0 00-.836-.334l-.132-.027-.025.291zm9.352 9.052c-2.588-1.112-3.5-2.072-3.5-3.703 0-.237.016-.431.016-.431.015 0 .097.072.205.167l.018.016c.521.448 1.109.643 2.744.89.953.152 1.505.265 2 .449 1.58.556 2.563 1.7 2.796 3.244.066.448.025 1.295-.076 1.738-.091.346-.354.988-.42 1.004-.016 0-.04-.07-.04-.183-.026-.584-.3-1.145-.76-1.577-.552-.496-1.256-.874-2.983-1.614zm-1.96-.124c.04.108.107.373.132.583.208 1.312-.43 2.38-1.727 2.807-.132.054-.653.167-1.165.248-1.033.195-1.503.319-1.96.556-.324.168-.729.421-.703.448.015.011.096-.016.172-.043.593-.221 1.246-.334 2.223-.389.39-.026.836-.064.993-.08.876-.125 1.488-.405 1.96-.918a2.58 2.58 0 00.546-.934c.076-.237.091-.335.091-.75 0-.432 0-.513-.09-.777-.122-.351-.249-.6-.421-.81l-.117-.151.066.21zm1.322 2.829c-.34-.794-.42-1.544-.233-2.257.025-.07.05-.14.076-.14.025 0 .106.043.182.097.157.114.481.308 1.322.794 1.058.615 1.66 1.085 2.076 1.63.365.475.587 1.015.694 1.684.066.378.025 1.28-.066 1.657-.288 1.182-.942 2.132-1.894 2.672-.142.081-.263.14-.273.14-.01 0 .04-.14.116-.307.314-.713.355-1.393.117-2.16-.142-.474-.446-1.041-1.043-2.007-.725-1.107-.892-1.404-1.074-1.803zm-6.482 2.585c-1.094.2-2.284.81-3.25 1.674l-.274.275.248.043c1.306.21 1.656.405 2.572 1.409.522.572.704.696 1.134.82a1.198 1.198 0 001.49-.75c.09-.275.08-.723-.026-.945-.263-.54-1.033-.707-1.398-.318-.298.324-.207.826.173.907.036.005.056.007.057.004.002-.004-.024-.018-.081-.047h-.002c-.172-.087-.248-.195-.248-.378-.015-.432.44-.653.861-.459.314.151.43.345.43.68 0 .513-.42.918-.901.848a1.278 1.278 0 01-.744-.416c-.42-.502-.264-1.322.339-1.63.456-.238 1.058-.168 1.53.15.536.379.774.713 1.23 1.842.157.372.34.777.43.917.43.697.967 1.042 1.595 1.042.355 0 .618-.054.942-.238.238-.124.588-.377.562-.404 0-.011-.106.027-.222.07-.694.28-1.398.264-1.803-.054-.264-.21-.471-.6-.578-1.101-.015-.081-.08-.47-.131-.848-.147-.96-.289-1.392-.603-1.894-.324-.513-.952-.934-1.646-1.129-.43-.124-1.215-.15-1.686-.07zM13.045 14.9c.091-.361.39-.723.704-.82.207-.07.613-.032.81.075.38.211.653.67.588 1.005-.066.404-.68.739-1.398.739-.365 0-.497-.054-.638-.248-.091-.124-.117-.53-.066-.75zm1.408-.599c.197.13.238.308.131.475-.08.108-.314.222-.48.222-.264 0-.538-.195-.538-.378 0-.362.532-.556.887-.319z' }))()
export const $link = $path(attr({ d: 'M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zM14.484 6.159L16.495 5s2.012 1.163 2.016 1.163l5.478 3.18L26 10.5v11.002l-2.011 1.16-5.428 3.178L16.549 27l-2.011-1.159-5.527-3.179L7 21.503V10.501l2.007-1.163 5.477-3.18zm-3.466 6.664v6.358l5.477 3.18 5.478-3.18v-6.358l-5.477-3.179-5.478 3.18z' }))()
export const $usd = $path(attr({ 'clip-rule': 'evenodd', 'fill-rule': 'evenodd', d: 'M21 22.99v-7.98c0-.56-.49-1.01-1.1-1.01h-7.7c-.61 0-1.1.45-1.1 1.01v7.98c0 .56.49 1.01 1.1 1.01h7.7c.61 0 1.1-.45 1.1-1.01zm-4.165-5.604l1.634-.259c-.105-.469-.332-.838-.68-1.107-.346-.27-.847-.425-1.504-.466v-.435h-.641v.435c-.72.038-1.264.233-1.63.584a1.734 1.734 0 00-.545 1.305c0 .381.09.705.272.972.182.263.395.455.642.575.249.12.669.263 1.26.427v1.55c-.204-.099-.352-.213-.443-.342-.088-.129-.158-.338-.211-.628l-1.775.206c.052.293.131.544.237.752a2.147 2.147 0 001.143.997c.269.1.62.169 1.05.207v.83h.641v-.83c.36-.015.665-.062.914-.14a2.2 2.2 0 00.703-.392c.223-.179.405-.401.546-.668.143-.267.215-.56.215-.879 0-.545-.198-.994-.593-1.349-.3-.264-.894-.514-1.785-.751v-1.27c.153.082.261.164.326.246.067.079.142.222.224.43zm-1.191-.698c-.188.061-.318.137-.391.228a.496.496 0 00-.11.32c0 .13.036.243.11.34.076.093.206.172.39.237v-1.125zm.641 4.324c.25-.056.431-.147.545-.273a.625.625 0 00.176-.43.562.562 0 00-.15-.378c-.096-.117-.287-.226-.57-.325v1.406zm3.882-12.929H9.75a.836.836 0 00-.833.834c0 .458.375.833.833.833h10.417A.836.836 0 0021 8.917a.836.836 0 00-.833-.834zm2.083.834a1.042 1.042 0 102.084-.001 1.042 1.042 0 00-2.084 0zM32 15.5C32 24.06 24.837 31 16 31S0 24.06 0 15.5C0 6.94 7.163 0 16 0s16 6.94 16 15.5zM6 7.667C6 6.746 6.746 6 7.667 6H10V5c0-.392.49-.707 1.1-.707h9.8c.61 0 1.1.315 1.1.707v1h2.333C25.254 6 26 6.746 26 7.667v10c0 .92-.746 1.666-1.667 1.666h-1.666v5c0 .921-.33 1.667-1.25 1.667H10.583c-.92 0-1.36-.746-1.36-1.667v-5H7.666a1.666 1.666 0 01-1.667-1.666v-10z' }))()
export const $usdt = $path(attr({ 'clip-rule': 'evenodd', 'fill-rule': 'evenodd', d: 'M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16zm-5.312-.59l-3.955-8.314A.163.163 0 0022.586 7H9.119a.165.165 0 00-.148.096l-3.955 8.313a.158.158 0 00.035.187l10.688 10.241c.065.06.16.06.226 0l10.688-10.241a.16.16 0 00.035-.187zm-9.464 1.302v5.3h-2.735v-5.3c-3.078-.144-5.392-.752-5.392-1.48 0-.73 2.314-1.338 5.392-1.481v-1.654h-3.786V9.574H21.01v2.523h-3.786v1.654c3.074.143 5.379.75 5.379 1.48s-2.31 1.337-5.379 1.48zm-.004-.92v-1.85c2.713.121 4.736.595 4.736 1.159 0 .564-2.018 1.037-4.732 1.16h-.017c-.108.006-.507.03-1.342.03a28.4 28.4 0 01-1.376-.03c-2.718-.122-4.75-.596-4.75-1.16 0-.569 2.028-1.038 4.75-1.16v1.85c.178.013.686.044 1.39.044.842 0 1.267-.035 1.34-.044z' }))()
export const $usdc = $path(attr({ 'clip-rule': 'evenodd', 'fill-rule': 'evenodd', d: 'M16 32c8.867 0 16-7.133 16-16S24.867 0 16 0 0 7.133 0 16s7.133 16 16 16zm4.4-13.467c0-2.333-1.4-3.133-4.2-3.466-2-.267-2.4-.8-2.4-1.734 0-.933.667-1.533 2-1.533 1.2 0 1.867.4 2.2 1.4.067.2.267.333.467.333h1.066c.267 0 .467-.2.467-.466V13a3.33 3.33 0 00-3-2.733v-1.6c0-.267-.2-.467-.533-.534h-1c-.267 0-.467.2-.534.534V10.2c-2 .267-3.266 1.6-3.266 3.267 0 2.2 1.333 3.066 4.133 3.4 1.867.333 2.467.733 2.467 1.8 0 1.066-.934 1.8-2.2 1.8-1.734 0-2.334-.734-2.534-1.734-.066-.266-.266-.4-.466-.4h-1.134c-.266 0-.466.2-.466.467v.067c.266 1.666 1.333 2.866 3.533 3.2v1.6c0 .266.2.466.533.533h1c.267 0 .467-.2.534-.533v-1.6c2-.334 3.333-1.734 3.333-3.534zm-13.733-5.8c-1.934 5.134.733 10.934 5.933 12.8.2.134.4.4.4.6v.934c0 .133 0 .2-.067.266-.066.267-.333.4-.6.267a11.993 11.993 0 01-7.8-7.8c-2-6.333 1.467-13.067 7.8-15.067.067-.066.2-.066.267-.066.267.066.4.266.4.533v.933c0 .334-.133.534-.4.667-2.733 1-4.933 3.133-5.933 5.933zM19.067 5c.066-.267.333-.4.6-.267 3.666 1.2 6.6 4.067 7.8 7.867 2 6.333-1.467 13.067-7.8 15.067-.067.066-.2.066-.267.066-.267-.066-.4-.266-.4-.533v-.933c0-.334.133-.534.4-.667 2.733-1 4.933-3.133 5.933-5.933 1.934-5.134-.733-10.934-5.933-12.8-.2-.134-.4-.4-.4-.667v-.933c0-.134 0-.2.067-.267z' }))()
export const $dai = $path(attr({ 'clip-rule': 'evenodd', 'fill-rule': 'evenodd', d: 'M32 16c0-8.836-7.163-16-16-16C7.164 0 0 7.164 0 16c0 8.837 7.164 16 16 16 8.837 0 16-7.163 16-16zm-9.33 1.13H10.63c-.122 0-.182 0-.212-.03-.028-.03-.028-.087-.028-.2v-1.78c0-.14.04-.19.19-.19h12.1c.13 0 .19.05.19.17.05.62.05 1.241 0 1.86-.01.17-.07.17-.2.17zm-.48-4.42a.195.195 0 010 .14h.049c-.02.06-.12.08-.12.08h-11.54c-.19 0-.19-.04-.19-.19V9.19c0-.13.02-.19.17-.19h5.37a7.458 7.458 0 011.7.18 7.188 7.188 0 013 1.52c.173.129.327.28.46.45.282.28.53.592.74.93.14.198.26.41.362.63zm-.51 6.5c.17-.019.34-.019.51 0v.001c.08.04.01.191.01.191a6.496 6.496 0 01-2.79 2.809h-.07a3.976 3.976 0 01-.73.34 7.623 7.623 0 01-2.17.48 2.56 2.56 0 01-.73.05h-5.12c-.2 0-.2-.04-.2-.2V19.41c0-.2.05-.2.2-.2h11.09zm-13.3 5.67l-.003.002v.01h6.94c.786.01 1.569-.052 2.34-.19.813-.16 1.605-.41 2.36-.75.328-.151.642-.335.96-.52l.241-.14c.373-.265.73-.554 1.07-.86.93-.84 1.65-1.89 2.1-3.06a.25.25 0 01.29-.19h1.89c.15 0 .2-.05.2-.22v-1.21c.01-.116.01-.233 0-.35 0-.03.008-.06.016-.09.016-.06.031-.12-.015-.18h-1.58c-.19 0-.19-.02-.19-.19.054-.61.054-1.22 0-1.83-.01-.18.03-.18.17-.18h1.38c.16 0 .22-.04.22-.2v-1.64c-.01-.22-.01-.22-.24-.22h-1.79a.26.26 0 01-.298-.21 8.019 8.019 0 00-.781-1.53 9.635 9.635 0 00-1.07-1.33 8.821 8.821 0 00-1.76-1.36 9.775 9.775 0 00-3.13-1.16 11.428 11.428 0 00-1.62-.18h-7.5c-.2 0-.2.04-.2.2v5.39c0 .19-.04.19-.19.19H6.04c-.16 0-.16.03-.16.14v1.759c0 .16.05.16.17.16h2.17c.16 0 .16.03.16.15v1.88c0 .17-.05.17-.18.17H5.88v1.9c0 .16.05.16.17.16h2.17c.16 0 .16.019.16.15v5.529z' }))()
export const $frax = $path(attr({ 'clip-rule': 'evenodd', 'fill-rule': 'evenodd', d: 'M16 0c8.837 0 16 7.164 16 16 0 8.837-7.163 16-16 16-8.836 0-16-7.163-16-16C0 7.164 7.164 0 16 0zM5.956 8.43A91.81 91.81 0 017.19 7.119l1.217-1.301.247.24c.135.135.701.674 1.257 1.201.267.256.534.511.755.72.238.227.42.4.484.464l.23.225.202-.124c.113-.067.399-.224.646-.342.852-.426 1.688-.679 2.71-.825.426-.062 1.806-.05 2.266.017a8.693 8.693 0 013.41 1.251c.068.05.141.084.152.079.017-.006.645-.657 1.403-1.448.757-.796 1.391-1.442 1.413-1.442.034 0 2.559 2.385 2.581 2.44.006.018-.64.708-1.43 1.532l-1.442 1.51.106.185c.22.37.595 1.178.719 1.537a8.629 8.629 0 01-.741 7.304l-.157.258.342.326c1.032.97 2.721 2.591 2.727 2.608.005.034-2.458 2.609-2.48 2.598a311.605 311.605 0 01-2.867-2.727l-.275-.269-.258.157a8.65 8.65 0 01-3.428 1.15c-.633.079-1.767.05-2.361-.056-1.184-.213-2.256-.617-3.17-1.2l-.18-.113-.19.191-1.481 1.554L8.3 26.17l-.085-.073c-.218-.18-2.513-2.395-2.507-2.412l.058-.062c.18-.192.758-.805 1.44-1.515a98.355 98.355 0 001.509-1.599c.011-.022-.04-.145-.152-.336-.23-.387-.499-.976-.656-1.436a8.613 8.613 0 01.768-7.282l.152-.253-.084-.078c-.035-.03-.434-.412-.96-.914l-.482-.46c-.746-.708-1.352-1.302-1.346-1.32zm13.077 3.272a5.197 5.197 0 00-2.424-.926 5.148 5.148 0 00-5.212 2.816c-.24.494-.37.847-.465 1.341-.101.5-.101 1.442 0 1.947a5.207 5.207 0 002.732 3.635c1.958.999 4.286.662 5.896-.841a5.176 5.176 0 00.673-6.772 6.086 6.086 0 00-1.2-1.2z' }))()
export const $avax = $path(attr({ 'clip-rule': 'evenodd', 'fill-rule': 'evenodd', d: 'M32.032 16.021c0 8.837-7.168 16-16.01 16-8.843 0-16.011-7.163-16.011-16 0-8.836 7.168-16 16.01-16 8.843 0 16.011 7.164 16.011 16zm-20.548 6.367H8.377c-.653 0-.975 0-1.172-.125a.79.79 0 01-.358-.617c-.012-.232.15-.515.472-1.081L14.991 7.05c.327-.574.492-.861.7-.967a.792.792 0 01.716 0c.209.106.374.393.7.967l1.586 2.765c.352.616.531.928.61 1.255.086.358.086.736 0 1.093-.08.33-.257.645-.614 1.27l-4.03 7.119-.01.018c-.356.62-.536.935-.785 1.173-.271.26-.598.448-.956.554-.326.09-.692.09-1.424.09zm7.847 0h4.452c.657 0 .988 0 1.184-.13a.787.787 0 00.359-.62c.01-.224-.147-.497-.456-1.03a6.364 6.364 0 01-.032-.055l-2.23-3.813-.026-.043c-.313-.53-.472-.797-.675-.9a.784.784 0 00-.712 0c-.204.106-.37.385-.696.947l-2.222 3.813-.008.013c-.325.561-.487.842-.476 1.072a.796.796 0 00.358.62c.193.127.523.127 1.18.127z' }))()
export const $gmt = $path(attr({ d: 'M233 466c128.682 0 233-104.318 233-233C466 104.318 361.682 0 233 0 104.318 0 0 104.318 0 233c0 128.682 104.318 233 233 233zm18.165-359.541c-75.459-.156-114.322-.467-118.076-1.091-1.74-.274-3.75-.575-5.414-.824-1.177-.176-2.181-.326-2.796-.423-1.721-.312-3.441 0-4.77.701-1.799 1.014-2.19 1.793-2.19 4.132 0 2.65-1.173 8.964-2.971 15.746-1.877 7.093-6.647 19.799-9.931 26.425-1.955 4.054-3.284 7.561-2.971 7.873 1.173.936 8.836 3.04 9.852 2.65.469-.233 2.19-2.494 3.675-5.144 5.552-9.744 16.656-18.553 25.805-20.501l1.073-.224c1.489-.311 3.433-.716 4.792-1.024 6.021-1.325 37.69-2.962 58.099-3.04 17.907 0 20.488.156 20.488 1.17 0 .701-.626 1.403-1.33 1.715-4.066 1.403-15.326 7.093-19.314 9.821-10.009 6.704-21.504 19.566-25.648 28.608-10.479 22.684-7.82 47.316 6.881 63.764 4.222 4.677 13.293 11.926 17.75 14.187 2.581 1.247 2.659 2.183.391 3.04-.275.106-.814.32-1.549.612a510.762 510.762 0 01-8.851 3.441c-16.421 6.392-33.311 15.824-40.662 22.606-1.251 1.247-2.58 2.261-2.815 2.261-.312 0-3.049 3.04-6.177 6.781-8.993 10.68-12.511 19.8-12.511 31.882 0 24.165 15.17 45.835 40.974 58.619 12.355 6.158 24.554 9.822 42.304 12.784 8.289 1.325 38.551 1.325 46.918 0 27.681-4.521 49.028-14.187 63.807-28.92 8.758-8.73 13.607-16.525 17.204-27.75 2.502-7.717 2.502-20.345 0-28.062-5.083-15.668-14.388-26.971-31.513-38.43-9.306-6.158-12.512-7.951-33.859-18.864a8068.208 8068.208 0 01-33.233-16.993c-9.697-4.911-19.002-9.9-20.722-11.069-8.68-5.925-15.405-13.953-18.533-22.138-1.955-4.911-2.346-21.515-.703-26.581 2.658-8.263 7.741-16.448 13.527-21.905 9.384-8.964 25.414-16.369 39.177-18.162 13.371-1.871 86.25-.39 97.275 1.949.829.174 1.42.311 1.92.155 1.294-.402 1.976-2.767 4.57-11.536 1.33-4.521 2.737-8.964 3.206-9.978.861-2.182.939-5.612.079-7.015-.548-.78-23.616-1.014-113.228-1.248zm-42.147 156.993c-17.829 8.886-30.81 22.45-36.44 38.196-1.642 4.521-1.876 6.392-1.798 16.759 0 11.381.625 15.435 3.44 22.606 7.116 18.318 23.146 31.882 43.79 37.105 11.651 2.962 35.736 4.131 44.415 2.182 13.059-2.884 16.109-3.897 23.224-7.405 9.619-4.677 19.08-13.797 21.817-20.969 1.642-4.209 2.815-10.289 2.815-14.265 0-5.612-1.877-16.058-3.597-20.501-3.441-8.886-11.964-18.708-21.66-24.944-3.988-2.572-23.772-12.55-55.363-27.906-5.395-2.573-10.478-4.755-11.338-4.755-.86 0-5.005 1.714-9.305 3.897z' }))()
export const $eth = $svg('g')(
  $path(attr({ d: 'M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z' }))(),
  $path(attr({ 'fill-opacity': '.298', d: 'M16.498 4v8.87l7.497 3.35zm0 17.968v6.027L24 17.616z' }))(),
  $path(attr({ 'fill-opacity': '.801', d: 'M16.498 20.573l7.497-4.353-7.497-3.348z' }))(),
  $path(attr({ 'fill-opacity': '.298', d: 'M9 16.22l7.498 4.353v-7.701z' }))(),
)


export const $tokenIconMap = {
  [TOKEN_SYMBOL.GMX]: $gmx,
  [TOKEN_SYMBOL.GLP]: $glp,

  [TOKEN_SYMBOL.WBTC]: $btc,
  [TOKEN_SYMBOL.ETH]: $eth,
  [TOKEN_SYMBOL.WETH]: $eth,
  [TOKEN_SYMBOL.UNI]: $uni,
  [TOKEN_SYMBOL.LINK]: $link,
  [TOKEN_SYMBOL.AVAX]: $avax,
  [TOKEN_SYMBOL.WAVAX]: $avax,

  [TOKEN_SYMBOL.DAI]: $dai,
  [TOKEN_SYMBOL.USDC]: $usdc,
  [TOKEN_SYMBOL.USDT]: $usdt,
  [TOKEN_SYMBOL.FRAX]: $frax,
  [TOKEN_SYMBOL.MIM]: $usd,
}


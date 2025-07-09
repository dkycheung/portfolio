class BouncingIcon {
  element: HTMLElement;
  dx: number;
  dy: number;
  y: number;
  x: number;

  constructor(element: HTMLElement, speed: number = 1, angle: number = 0) {
    this.element = element;
    this.x = element.offsetLeft;
    this.y = element.offsetTop;
    this.dx = speed * Math.cos(angle);
    this.dy = speed * Math.sin(angle);
    console.debug({ x: this.x, y: this.y, speed, angle });
  }
}

export default class BouncingIcons {
  icons: BouncingIcon[];
  boundary: HTMLElement;
  animationId: number | null;

  constructor(icons: JQuery<HTMLElement>, boundary: JQuery<HTMLElement>) {
    this.icons = icons
      .map((index, element) => new BouncingIcon(element, Math.random() * 2 + 1, Math.random() * 360))
      .get();
    console.debug({ icons: this.icons, boundary: { w: boundary.width(), h: boundary.height() } });
    this.boundary = boundary.get(0) as HTMLElement;
    this.animationId = null;
  }

  start() {
    const $b = $(this.boundary);
    const boxW = $b.width() ?? 0;
    const boxH = $b.height() ?? 0;
    this.icons.forEach((icon) => {
      const $e = $(icon.element);
      icon.x += icon.dx;
      icon.y += icon.dy;
      // console.log({ index, boxW, boxH, x: icon.x, y: icon.y, dx: icon.dx, dy: icon.dy });
      if (icon.x <= 0 || icon.x >= boxW - ($e.outerWidth() ?? 0)) icon.dx *= -1;
      if (icon.y <= 0 || icon.y >= boxH - ($e.outerHeight() ?? 0)) icon.dy *= -1;
      $e.css({ left: icon.x + 'px', top: icon.y + 'px' });
    });

    this.animationId = requestAnimationFrame(this.start.bind(this));
  }

  stop() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }
}

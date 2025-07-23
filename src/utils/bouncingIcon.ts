type Position = { top: number; left: number };

class BouncingIcon {
  element: HTMLElement;
  dx: number;
  dy: number;
  y: number;
  x: number;

  constructor(element: HTMLElement, speed: number = 1, angle: number = 0, initPos?: Position) {
    this.element = element;
    const $e = $(element);
    initPos ??= $e.position();
    this.x = initPos.left;
    this.y = initPos.top;

    this.dx = speed * Math.cos(angle);
    this.dy = speed * Math.sin(angle);
    this.updatePosition();
    // console.debug({ x: this.x, y: this.y, speed, angle }, { position: initPos, $e });
  }

  move(boundary?: { width: number; height: number }) {
    boundary ??= ($(this.element).closest('.boundary').get(0) as HTMLElement)?.getBoundingClientRect();
    if (!boundary) {
      console.warn('No boundary provided for icon movement:', this.element);
      return;
    }

    this.x += this.dx;
    this.y += this.dy;

    const check = this.checkCollision(boundary);
    this.flipDirections(check);
    this.trimPositionToBoundary(boundary, check);
    this.updatePosition();
  }

  flipDirections(dir: { left: boolean; top: boolean; right: boolean; bottom: boolean }): void {
    const axis: string[] = [];
    if (dir.left || dir.right) {
      this.dx *= -1;
      axis.push('x');
    }
    if (dir.top || dir.bottom) {
      this.dy *= -1;
      axis.push('y');
    }
    // if (axis.length > 0) console.debug(`Flipped direction for icon on ${axis.join(', ')} axis`, dir);
  }

  trimPositionToBoundary(
    boundary: { width: number; height: number },
    checkResult?: { left: boolean; top: boolean; right: boolean; bottom: boolean },
  ): void {
    checkResult ??= this.checkCollision(boundary);
    const rect = this.getRect();

    if (checkResult.left) {
      this.x = 0;
    } else if (checkResult.right) {
      this.x = boundary.width - rect.width;
    }
    if (checkResult.top) {
      this.y = 0;
    } else if (checkResult.bottom) {
      this.y = boundary.height - rect.height;
    }
    // if (checkResult.left || checkResult.right || checkResult.top || checkResult.bottom)
    //   console.debug(
    //     `Trimmed icon to (l:${this.x}, t:${this.y}, r:${rect.right}, b:${rect.bottom}) within boundary (${boundary.width}, ${boundary.height})`,
    //     checkResult,
    //   );
  }

  updatePosition(): void {
    $(this.element).css({ left: `${this.x}px`, top: `${this.y}px` });
  }

  checkCollision(boundary: { width: number; height: number }): {
    left: boolean;
    top: boolean;
    right: boolean;
    bottom: boolean;
  } {
    const rect = this.getRect();
    return {
      left: rect.left < 0,
      top: rect.top < 0,
      right: rect.right > boundary.width,
      bottom: rect.bottom > boundary.height,
    };
  }

  getRect() {
    const $e = $(this.element);
    return new DOMRect($e.position().left, $e.position().top, $e.outerWidth(), $e.outerHeight());
  }

  get Position(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  set Position({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
    this.updatePosition();
  }

  debug(index?: number | string): void {
    if (index !== undefined) index = '';
    else index = `(${index})`;

    console.debug(`Icon${index} at (${this.x}, ${this.y}) with speed (${this.dx}, ${this.dy})`);
  }
}

export default class BouncingIcons {
  icons: BouncingIcon[];
  boundary: HTMLElement;
  animationId: number | null;
  interval: number;
  lastUpdate: number;

  constructor(icons: JQuery<HTMLElement>, boundary: JQuery<HTMLElement>, fps: number = 30) {
    this.boundary = boundary.get(0) as HTMLElement;
    const box = this.boundary.getBoundingClientRect();
    this.icons = icons
      .map((index, element) => {
        return new BouncingIcon(element, (Math.random() * 2 + 1) * (60 / fps), Math.random() * 360, {
          left: Math.random() * (box.width - element.clientWidth),
          top: Math.random() * (box.height - element.clientHeight),
        });
      })
      .get();
    // console.debug({ icons: this.icons, boundary: { w: boundary.width(), h: boundary.height() } });
    this.interval = 1000 / fps;
    this.lastUpdate = Date.now();
    this.animationId = null;
  }

  start() {
    const now = Date.now();
    if (now - this.lastUpdate >= this.interval) {
      this.lastUpdate = now;
      const box = this.boundary.getBoundingClientRect();
      this.icons.forEach((icon) => {
        icon.move(box);
      });
    }

    this.animationId = requestAnimationFrame(this.start.bind(this));
  }

  stop() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }
}

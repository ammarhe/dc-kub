// Hermes (React Native's JS engine) does not define the browser-only `DOMRect`
// global. Some libraries reference it and crash with
// "Property 'DOMRect' doesn't exist". Define a minimal, spec-shaped version
// before anything else loads so that never happens.
//
// This file must be imported FIRST in index.js.

if (typeof global.DOMRect === 'undefined') {
  class DOMRect {
    constructor(x = 0, y = 0, width = 0, height = 0) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.top = Math.min(y, y + height);
      this.bottom = Math.max(y, y + height);
      this.left = Math.min(x, x + width);
      this.right = Math.max(x, x + width);
    }

    static fromRect(other = {}) {
      return new DOMRect(other.x, other.y, other.width, other.height);
    }

    toJSON() {
      const { x, y, width, height, top, bottom, left, right } = this;
      return { x, y, width, height, top, bottom, left, right };
    }
  }

  global.DOMRect = DOMRect;
}

// DOMPoint occasionally travels with the same code paths — define it too, cheaply.
if (typeof global.DOMPoint === 'undefined') {
  class DOMPoint {
    constructor(x = 0, y = 0, z = 0, w = 1) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }
    static fromPoint(other = {}) {
      return new DOMPoint(other.x, other.y, other.z, other.w);
    }
  }
  global.DOMPoint = DOMPoint;
}
